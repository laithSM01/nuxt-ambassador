<template>
  <div class="min-h-screen bg-gray-50">
    <AmbassadorNav />
    <AmbassadorHeader />

    <main class="max-w-7xl mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AmbassadorNav from '@/components/ambassadorNav.vue'
import AmbassadorHeader from '@/components/ambassadorHeader.vue'
</script>
