const GITHUB_API_URL = 'https://api.github.com'

// Cache interface
interface CacheEntry<T> {
  data: T
  timestamp: number
}

// Cache configuration
const CACHE_TTL = 60 * 60 * 1000 // 1 hour in milliseconds
const cache = new Map<string, CacheEntry<GitHubRepo>>()

export interface GitHubRepo {
  name: string
  html_url: string
  description: string
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  pushed_at: string
}

export async function getRepository(owner: string, repo: string): Promise<GitHubRepo> {
  const cacheKey = `${owner}/${repo}`
  const cached = cache.get(cacheKey)

  // Return cached data if it's still valid
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.debug(`[GitHub API] Cache hit for ${cacheKey}`)
    return cached.data
  }

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    }

    // Add authorization header if GITHUB_TOKEN is available
    if (import.meta.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${import.meta.env.GITHUB_TOKEN}`
    }

    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
      headers,
    })

    // Check rate limit headers
    const rateLimit = {
      limit: Number(response.headers.get('x-ratelimit-limit')),
      remaining: Number(response.headers.get('x-ratelimit-remaining')),
      reset: new Date(Number(response.headers.get('x-ratelimit-reset')) * 1000),
    }

    if (!response.ok) {
      if (response.status === 403 && rateLimit.remaining === 0) {
        const resetTime = rateLimit.reset.toLocaleTimeString()
        throw new Error(
          `GitHub API rate limit exceeded. Resets at ${resetTime}. ` +
            `Limit: ${rateLimit.limit}, Remaining: ${rateLimit.remaining}`,
        )
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Store in cache
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    })

    console.debug(
      `[GitHub API] Cache miss for ${cacheKey}, rate limit remaining: ${rateLimit.remaining}`,
    )
    return data
  } catch (error) {
    // If we have stale cache data, return it on error
    if (cached) {
      console.warn(`[GitHub API] Error fetching fresh data, using stale cache for ${cacheKey}`)
      return cached.data
    }
    throw error
  }
}
