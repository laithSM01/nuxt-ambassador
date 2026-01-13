<template>
    <div class="min-h-screen bg-gray-50">
     <header class="bg-white shadow">
     <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <ul class="flex space-x-8 h-16 items-center">
     <li><NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium">Home</NuxtLink></li>
     <li><NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium">About</NuxtLink></li>
     <li><NuxtLink to="/admin/users" class="text-gray-700 hover:text-blue-600 font-medium">Users</NuxtLink></li>
     <li><NuxtLink to="/admin/products" class="text-gray-700 hover:text-blue-600 font-medium">Products</NuxtLink></li>
     <li><NuxtLink to="/admin/orders" class="text-gray-700 hover:text-blue-600 font-medium">Orders</NuxtLink></li>
     <li><NuxtLink to="/admin/login" class="text-gray-700 hover:text-blue-600 font-medium">Login</NuxtLink></li>
     <li><NuxtLink to="/admin/register" class="text-gray-700 hover:text-blue-600 font-medium">Register</NuxtLink></li>
     <li><NuxtLink to="/admin/profile" class="text-gray-700 hover:text-blue-600 font-medium">Profile</NuxtLink></li>
     <li><a href="/about" class="text-red-600 hover:text-red-800 font-medium">normal about</a></li>
     <li v-if="isLoggedIn">
        <button @click="handleLogout" class="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded">
          Logout
        </button>
     </li>
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
  const { isLoggedIn, logout, getUser } = useAuth()
  const handleLogout = async () => {
    await logout()
  }
  onServerPrefetch(async () => {
  await getUser()
})
  console.log('Layout loaded', isLoggedIn.value)
  watch(isLoggedIn, (val) => {
  console.log('Auth changed:', val)
})
</script>
