export const useProducts = () => {
  const config = useRuntimeConfig()
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

    const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useFetch(`${config.public.apiBaseUrl}/api/admin/products`, {
        credentials: 'include'
      })
      products.value = data.value || []
    } catch (err) {
      error.value = err.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

    const fetchProductById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useFetch(`${config.public.apiBaseUrl}/api/admin/products/${id}`, {
        credentials: 'include'
      })
      return data.value
    } catch (err) {
      error.value = err.message || 'Failed to fetch product'
      return null
    } finally {
      loading.value = false
    }
  }

   const createProduct = async (productData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${config.public.apiBaseUrl}/api/admin/products`, {
        method: 'POST',
        body: productData,
        credentials: 'include',
        headers: productData instanceof FormData ? {} : { 'Content-Type': 'application/json' }
      })
      await fetchProducts() // Refresh list
      return response
    } catch (err) {
      error.value = err.message || 'Failed to create product'
      return null
    } finally {
      loading.value = false
    }
  }

    const updateProduct = async (id, productData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${config.public.apiBaseUrl}/api/admin/products/${id}`, {
        method: 'PUT',
        body: productData,
        credentials: 'include'
      })
      await fetchProducts() // Refresh list
      return response
    } catch (err) {
      error.value = err.message || 'Failed to update product'
      return null
    } finally {
      loading.value = false
    }
  }

    const deleteProduct = async (id) => {
    loading.value = true
    error.value = null
    try {
      await useFetch(`${config.public.apiBaseUrl}/api/admin/products/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      await fetchProducts() // Refresh list
      return true
    } catch (err) {
      error.value = err.message || 'Failed to delete product'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
