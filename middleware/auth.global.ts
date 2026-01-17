// wrap middle ware function in a built in function provided by nuxt
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path === '/admin/login') return

  const userStore = useUserStore()

  // Try restoring session on refresh
  if (!userStore.user) {
    await useAuth().getUser()
  }

  if (import.meta.client &&!userStore.user) {
    return navigateTo('/admin/login')
  }
})