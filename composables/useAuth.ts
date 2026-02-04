export const useAuth = () => {
  const config = useRuntimeConfig()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const isLoggedIn = computed(() => !!user.value)
  const route = useRoute()

  const getScope = () =>
    route.path.startsWith('/ambassador') ? 'ambassador' : 'admin'

  const login = async (email: string, password: string) => {
    try {
      const scope = getScope()
      const url = `${config.public.apiBaseUrl}/api/${scope}/login`
      console.log('Logging in to scope:', scope)

      // Django backend sets JWT in httponly cookie and returns { message: '...' }
      const data = await $fetch(url, {
        method: 'POST',
        body: { email, password },
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Important: include cookies in request/response
      })

      // Store email locally for reference (JWT is in httponly cookie)
      // user.value = { email }
      await getUser()

      return { success: true, message: data }
    } catch (err: any) {
      console.error('Login failed:', err)
      const message = err?.data?.message || err?.message || String(err)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      const scope = getScope()
      const url = `${config.public.apiBaseUrl}/api/${scope}/logout`
      await $fetch(url, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (e) {
      // ignore errors on logout
      console.error('Logout error:', e)
    } finally {
      // Clear local state
      userStore.setUser(null)
      await navigateTo('/admin/login')
    }
  }

    const changePassword = async (
    password: string,
    password_confirm: string
  ) => {
    try {
      const scope = getScope()
      const url = `${config.public.apiBaseUrl}/api/${scope}/users/password`
      await $fetch(url, {
        method: 'PUT',
        body: {
          password,
          password_confirm
        },
        credentials: 'include'
      })

      return { success: true }
    } catch (err: any) {
      const message = err?.data?.message || err?.message || String(err)
      return { success: false, error: message }
    }
  }

const updateUserInfo = async (
  first_name: string,
  last_name: string,
  email: string
) => {
  try {
    const scope = getScope()
    const url = `${config.public.apiBaseUrl}/api/${scope}/users/info`

    const data = await $fetch(url, {
      method: 'PUT',
      body: {
        first_name,
        last_name,
        email
      },
      credentials: 'include'
    })

    userStore.setUser(data)

    return { success: true }
  } catch (err: any) {
    const message = err?.data?.message || err?.message || String(err)
    return { success: false, error: message }
  }
}

const getUser = async () => {
  try {
    const scope = getScope()
    const url = `${config.public.apiBaseUrl}/api/${scope}/user`

    const headers = process.server
      ? useRequestHeaders(['cookie'])
      : undefined

    const data = await $fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers
    })

    userStore.setUser(data)
    return data
  } catch {
    userStore.setUser(null)
    return null
  }
}

  return {
    user: readonly(user),
    isLoggedIn,
    login,
    logout,
    changePassword,
    updateUserInfo,
    getUser
  }
}