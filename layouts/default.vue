<template>
    <div class="min-h-screen bg-gray-50">
     <header class="bg-white shadow">
     <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <ul class="flex space-x-8 h-16 items-center">
     <li><NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium">Home</NuxtLink></li>
     <li><NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium">About</NuxtLink></li>
     <li><NuxtLink to="/admin/products" class="text-gray-700 hover:text-blue-600 font-medium">Products</NuxtLink></li>
     <li><NuxtLink to="/admin/login" class="text-gray-700 hover:text-blue-600 font-medium">Login</NuxtLink></li>
     <li><a href="/about" class="text-red-600 hover:text-red-800 font-medium">normal about</a></li>
     </ul>
     </nav>
     </header>
     
     <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- This is where the page content will be injected -->
        <slot />
     </main>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>