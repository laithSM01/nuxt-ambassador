export const useAmbassadors = () => {
  const config = useRuntimeConfig()
  const ambassadors = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAmbassadors = async () => {
    loading.value = true
    error.value = null
    try {
      const url = `${config.public.apiBaseUrl}/api/admin/ambassadors`
      ambassadors.value = await $fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Failed to fetch ambassadors'
      console.error('Fetch ambassadors error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    ambassadors: readonly(ambassadors),
    loading: readonly(loading),
    error: readonly(error),
    fetchAmbassadors
  }
}