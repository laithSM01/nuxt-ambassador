<template>
  <header class="bg-white border-b">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex h-16 items-center justify-between">
        <!-- Left -->
        <nav class="flex gap-6">
          <NuxtLink
            to="/ambassador"
            class="font-medium text-gray-600 hover:text-indigo-600"
            active-class="text-indigo-600"
          >
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/ambassador/stats"
            class="font-medium text-gray-600 hover:text-indigo-600"
            active-class="text-indigo-600"
          >
            Stats
          </NuxtLink>

          <NuxtLink
            to="/ambassador/rankings"
            class="font-medium text-gray-600 hover:text-indigo-600"
            active-class="text-indigo-600"
          >
            Rankings
          </NuxtLink>
        </nav>

        <!-- Right -->
        <div class="flex items-center gap-4">
          <template v-if="user">
            <NuxtLink
              to="/ambassador/profile"
              class="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100"
            >
              {{ user.first_name }} {{ user.last_name }}
            </NuxtLink>

            <button
              @click="handleLogout"
              class="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <NuxtLink
              to="/ambassador/login"
              class="text-gray-600 hover:text-indigo-600"
            >
              Login
            </NuxtLink>

            <NuxtLink
              to="/ambassador/register"
              class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Sign up
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { logout } = useAuth()
const userStore = useUserStore()
const user = computed(() => userStore.user)

const handleLogout = async () => {
  await logout()
}
</script>
