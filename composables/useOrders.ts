export const useOrders = () => {
  const config = useRuntimeConfig()
  const orders = ref([])
  const loading = ref(false)
  const error = ref(null)

    const fetchOrders = async () => {
        loading.value = true
        error.value = null
        try {
            const {data } = await useFetch(`${config.public.apiBaseUrl}/api/admin/orders`, {
                credentials: 'include'
            })
            orders.value = data.value || []
        } catch (err) {
            error.value = err
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