export const useUserLinks = () => {
  const config = useRuntimeConfig()
  const links = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUserLinks = async (userId: number) => {
    loading.value = true
    error.value = null
    try {
      const url = `${config.public.apiBaseUrl}/api/admin/users/${userId}/links`
      links.value = await $fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'Failed to fetch links'
      console.error('Fetch links error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    links: readonly(links),
    loading: readonly(loading),
    error: readonly(error),
    fetchUserLinks
  }
}
