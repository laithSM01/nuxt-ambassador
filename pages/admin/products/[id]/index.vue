<template>
    <div>
      <NuxtLink to="/admin/products" class="text-blue-600 hover:underline mb-4 inline-block">← Back to Products</NuxtLink>
      
      <div v-if="loading" class="text-center mt-4">Loading...</div>
      <div v-else-if="error" class="text-red-600 mt-4">{{ error }}</div>
      <div v-else-if="product" class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold mb-4">{{ product.title }}</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-gray-600">Description</p>
            <p class="font-medium">{{ product.description }}</p>
          </div>
          <div>
            <p class="text-gray-600">Price</p>
            <p class="font-medium text-xl">${{ product.price }}</p>
          </div>
        </div>
        <div class="mt-6 flex gap-2">
          <NuxtLink :to="`/admin/products/${id}/edit`" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded">
            Edit
          </NuxtLink>
          <button @click="handleDelete" class="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
  const route = useRoute()
  const router = useRouter()
  const id = route.params.id
  const { loading, error, fetchProductById, deleteProduct } = useProducts()
  const product = ref(null)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      const success = await deleteProduct(id)
      if (success) {
        router.push('/admin/products')
      }
    }
  }

  onMounted(async () => {
    product.value = await fetchProductById(id)
  })
</script>