const GITHUB_API_URL = 'https://api.github.com'

export type GitHubRepo = {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  topics: string[]
}

// Server-side fetch with token (used at build time)
export async function getRepository(owner: string, repo: string): Promise<GitHubRepo> {
  const token = import.meta.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  }

  if (!token) {
    console.warn(
      'GitHub token is not available. Check that your .env file contains GITHUB_TOKEN and that you have restarted your dev server.',
    )
  } else {
    headers.Authorization = `Bearer ${token}` // Changed to Bearer format
  }

  const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, { headers })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`)
  }

  return response.json()
}
