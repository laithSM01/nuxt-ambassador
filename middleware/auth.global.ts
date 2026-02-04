import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  // Restore session once (refresh / hard reload)
  if (!userStore.user) {
    try {
      await useAuth().getUser()
    } catch {
      // silently fail — public pages must still work
    }
  }
})