<template>
    <div>
      <NuxtLink to="/admin/products" class="text-blue-600 hover:underline mb-4 inline-block">← Back to Products</NuxtLink>
      
      <div class="bg-white rounded-lg shadow p-6 max-w-2xl">
        <h2 class="text-2xl font-bold mb-6">Create New Product</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium mb-2">Title</label>
            <input v-model="form.title" type="text" class="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2">Description</label>
            <textarea v-model="form.description" class="w-full border border-gray-300 rounded px-4 py-2 h-24" required></textarea>
          </div>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2">Price</label>
            <input v-model.number="form.price" type="number" step="0.01" class="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2">Image</label>
            <input @change="handleImageChange" type="file" accept="image/*" class="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          
          <div v-if="error" class="text-red-600 mt-4">{{ error }}</div>
          
          <div class="flex gap-2 mt-6">
            <button type="submit" :disabled="loading" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded disabled:opacity-50">
              {{ loading ? 'Creating...' : 'Create Product' }}
            </button>
            <NuxtLink to="/admin/products" class="bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded">
              Cancel
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
</template>

<script setup>
  const router = useRouter()
  const { loading, error, createProduct } = useProducts()
  const form = ref({
    title: '',
    description: '',
    price: null
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      form.value.image = file
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('price', form.value.price)
    if (form.value.image) {
      formData.append('image', form.value.image)
    }
    const result = await createProduct(formData)
    if (result) {
      router.push('/admin/products')
    }
  }
</script>
