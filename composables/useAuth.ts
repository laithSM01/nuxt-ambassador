export const useAuth = () => {
  const config = useRuntimeConfig()
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    try {
      const url = `${config.public.apiBaseUrl}/api/admin/login`

      // Django backend sets JWT in httponly cookie and returns { message: '...' }
      const data = await $fetch(url, {
        method: 'POST',
        body: { email, password },
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Important: include cookies in request/response
      })

      // Store email locally for reference (JWT is in httponly cookie)
      user.value = { email }

      return { success: true, message: data }
    } catch (err: any) {
      console.error('Login failed:', err)
      const message = err?.data?.message || err?.message || String(err)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      const url = `${config.public.apiBaseUrl}/api/admin/logout`
      await $fetch(url, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (e) {
      // ignore errors on logout
      console.error('Logout error:', e)
    } finally {
      // Clear local state
      user.value = null
      useCookie('user').value = null
      useCookie('jwt').value = null // Clear JWT cookie reference if stored locally
      await navigateTo('/admin/login')
    }
  }

  return {
    user: readonly(user),
    isLoggedIn,
    login,
    logout
  }
}