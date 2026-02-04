export const useProducts = () => {
  const config = useRuntimeConfig()
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    const { data, pending, error } = await useAsyncData(
      'products',
      () => $fetch(`${config.public.apiBaseUrl}/api/admin/products`, {
        credentials: 'include'
      })
    )
    
    return {
      products: data,
      loading: pending,
      error
    }
  }

    const fetchProductById = async (id: any) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useFetch(`${config.public.apiBaseUrl}/api/admin/products/${id}`, {
        credentials: 'include'
      })
      return data.value
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch product'
      return null
    } finally {
      loading.value = false
    }
  }

   const createProduct = async (productData: any) => {
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
    } catch (err: any) {
      error.value = err.message || 'Failed to create product'
      return null
    } finally {
      loading.value = false
    }
  }

    const updateProduct = async (id: any, productData: any) => {
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
    } catch (err: any) {
      error.value = err.message || 'Failed to update product'
      return null
    } finally {
      loading.value = false
    }
  }

    const deleteProduct = async (id: any) => {
    loading.value = true
    error.value = null
    try {
      await useFetch(`${config.public.apiBaseUrl}/api/admin/products/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      await fetchProducts() // Refresh list
      return true
    } catch (err: any) {
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
