<template>
  <section class="bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
    <div class="max-w-7xl mx-auto px-6 py-16 text-center">
      <h1 class="text-4xl font-bold tracking-tight">
        <span v-if="user">${{ user.revenue }}</span>
        <span v-else>Welcome 👋</span>
      </h1>

      <p class="mt-4 text-lg text-indigo-100">
        <span v-if="user">You’ve earned this so far. Keep sharing and growing.</span>
        <span v-else>Share referral links and earn real money.</span>
      </p>

      <div v-if="!user" class="mt-8 flex justify-center gap-4">
        <NuxtLink
          to="/ambassador/login"
          class="px-6 py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition"
        >
          Login
        </NuxtLink>

        <NuxtLink
          to="/ambassador/register"
          class="px-6 py-3 rounded-lg bg-indigo-700 hover:bg-indigo-800 font-semibold transition"
        >
          Register
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>