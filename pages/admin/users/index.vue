<template>
    <div>
      <h2>Ambassadors</h2>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="error" class="text-red-600">{{ error }}</div>
      <div v-else>
        <table class="w-full border-collapse border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.first_name }} {{ user.last_name }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <NuxtLink :to="`/admin/users/${user.id}/links`" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  View
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex gap-2 mt-4 justify-center">
          <button 
            v-for="pageNum in totalPages" 
            :key="pageNum"
            @click="currentPage = pageNum"
            :class="currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-300'"
            class="px-3 py-1 rounded"
          >
            {{ pageNum }}
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
const { ambassadors, loading, error, fetchAmbassadors } = useAmbassadors()
const currentPage = ref(1)
const perPage = ref(10)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return ambassadors.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(ambassadors.value.length / perPage.value)
})

onMounted(() => {
  fetchAmbassadors()
})
</script>
