// wrap middle ware function in a built in function provided by nuxt
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
    const authenticated = useCookie('user') // TODO: Replace with actual authentication check
    // Don't redirect if already on login page or other public routes
    if (to.path === '/admin/login') {
        return 
    }

    if (!authenticated.value) {
        return navigateTo('/admin/login')
    }
})