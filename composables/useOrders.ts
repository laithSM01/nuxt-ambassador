export const useOrders = () => {
  const config = useRuntimeConfig()
  const orders = ref([])
  const loading = ref(false)
  const error = ref(null)

const fetchOrders = async () => {
  loading.value = true
  error.value = null

  try {
    orders.value = await $fetch(`${config.public.apiBaseUrl}/api/admin/orders`, {
      credentials: 'include'
    })
  } catch (err : any) {
    error.value = err.message || 'Failed to fetch orders'
  } finally {
    loading.value = false
  }
}

    return {
        orders,
        loading,
        error,
        fetchOrders
    }
}