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

      return { success: true, message: data.message }
    } catch (err: any) {
      console.error('Login failed:', err)
      const message = err?.data?.message || err?.message || String(err)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      const url = `${config.public.apiBaseUrl}/api/logout`
      await $fetch(url, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (e) {
      // ignore errors on logout
    } finally {
      user.value = null
      useCookie('user').value = null
      await navigateTo('/admin/login')
    }
  }

  const initUser = () => {
    // const userCookie = useCookie('user')
    // if (userCookie.value) user.value = userCookie.value
  }

  initUser()

  return {
    user: readonly(user),
    isLoggedIn,
    login,
    logout
  }
}