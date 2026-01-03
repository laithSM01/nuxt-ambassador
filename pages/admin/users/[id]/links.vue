<template>
    <div>
      <h2>User Links</h2>
      <NuxtLink to="/admin/users" class="text-blue-600 hover:underline mb-4 inline-block">← Back to Users</NuxtLink>
      
      <div v-if="loading" class="text-center mt-4">Loading...</div>
      <div v-else-if="error" class="text-red-600 mt-4">{{ error }}</div>
      <div v-else-if="links.length > 0" class="mt-4">
        <table class="w-full border-collapse border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="border border-gray-300 px-4 py-2 text-left">#</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Code</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Count</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="link in links" :key="link.id" class="hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">{{ link.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ link.code }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ link.orders.length }}</td>
              <td class="border border-gray-300 px-4 py-2">${{ link.orders.reduce((s, o) => s + o.total, 0) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-gray-500 mt-4">No links found</div>
    </div>
</template>

<script setup>
const route = useRoute()
const userId = route.params.id
const { links, loading, error, fetchUserLinks } = useUserLinks()

onMounted(() => {
  fetchUserLinks(userId)
})
</script>
