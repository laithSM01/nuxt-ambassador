<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Products</h2>
      <NuxtLink to="/admin/products/create" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded">
        + New Product
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center mt-4">Loading...</div>
    <div v-else-if="error" class="text-red-600 mt-4">{{ error }}</div>
    <div v-else-if="products && products.length > 0" class="grid grid-cols-4 gap-5">
      <div v-for="product in products" :key="product.id" class="border border-gray-300 rounded p-4 hover:shadow-lg">
        <NuxtLink :to="`/admin/products/${product.id}`" class="text-blue-600 hover:underline font-medium block mb-2">
          {{ product.title }}
        </NuxtLink>
        <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>
        <p class="font-bold text-lg mb-3">${{ product.price }}</p>
        <div class="flex gap-2">
          <NuxtLink :to="`/admin/products/${product.id}`" class="text-blue-600 hover:text-blue-800 text-sm">Edit</NuxtLink>
          <button @click="handleDelete(product.id)" class="text-red-600 hover:text-red-800 text-sm">Delete</button>
        </div>
      </div>
    </div>
    <div v-else class="text-gray-500 mt-4">No products found</div>
  </div>
</template>

<script setup>
definePageMeta({})

const { fetchProducts, deleteProduct } = useProducts()
const { products, loading, error } = await fetchProducts()

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    const result = await deleteProduct(id)
    if (result.success) {
      // Refresh the page data
      await refreshNuxtData('products')
    } else {
      alert(result.error)
    }
  }
}
</script>