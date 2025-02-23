<template>
  <div
    class="project-card__stats"
    :aria-label="
      isNL
        ? `Repository statistieken: ${stars} sterren, ${forks} forks`
        : `Repository statistics: ${stars} stars, ${forks} forks`
    "
  >
    <div class="project-card__stat">
      <Icon icon="mdi:star" :width="24" />
      <span>{{ stars }}</span>
    </div>
    <div class="project-card__stat">
      <Icon icon="mdi:source-fork" :width="24" />
      <span>{{ forks }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  owner: string
  repo: string
  initialStars: number
  initialForks: number
}>()

const CACHE_TIME = 5 * 60 * 1000 // 5 minutes
const stars = ref(props.initialStars)
const forks = ref(props.initialForks)
const isNL = ref(false) // Default to English

function getFromCache(key: string) {
  const cached = localStorage.getItem(key)
  if (!cached) return null

  const { data, timestamp } = JSON.parse(cached)
  if (Date.now() - timestamp > CACHE_TIME) {
    localStorage.removeItem(key)
    return null
  }

  return data
}

function saveToCache(key: string, data: unknown) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  )
}

async function updateStats() {
  const cacheKey = `github-stats-${props.owner}-${props.repo}`

  try {
    // Check cache first
    const cached = getFromCache(cacheKey)
    if (cached) {
      stars.value = cached.stargazers_count
      forks.value = cached.forks_count
      return
    }

    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    }

    const token = import.meta.env.GITHUB_TOKEN
    if (token) {
      headers.Authorization = `token ${token}`
    }

    const response = await fetch(`https://api.github.com/repos/${props.owner}/${props.repo}`, {
      headers,
    })

    if (!response.ok) {
      console.error('GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
      })
      return
    }

    const data = await response.json()
    stars.value = data.stargazers_count
    forks.value = data.forks_count
    saveToCache(cacheKey, data)
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
  }
}

onMounted(() => {
  // Check language after component is mounted
  isNL.value = document.documentElement.lang === 'nl'
  updateStats()
})
</script>

<style>
.project-card__stats {
  display: flex;
  gap: 1rem;
  margin-block-start: 1.5rem;
}

.project-card__stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--sl-color-gray-2);
  margin-block-start: 0 !important;
}
</style>
