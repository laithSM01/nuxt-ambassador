import { ref, readonly } from 'vue'

interface Stat {
  id: number
  code: string
  count: number
  revenue: number
}

export const useStats = () => {
  const config = useRuntimeConfig()

  const stats = ref<Stat[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStats = async () => {
    loading.value = true
    error.value = null
    try {
      const url = `${config.public.apiBaseUrl}/api/ambassador/stats`
      stats.value = await $fetch<Stat[]>(url, {
        method: 'GET',
        credentials: 'include'
      })
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Failed to fetch stats'
      console.error('Fetch stats error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    stats: readonly(stats),
    loading: readonly(loading),
    error: readonly(error),
    fetchStats
  }
}
