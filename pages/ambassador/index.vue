<template>
  <Products
    :products="products"
    :filters="filters"
    :lastPage="lastPage"
    @set-filters="load"
  />
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'ambassador'
})

interface Product {
  id: number
  title: string
  description: string
  image: string
  price: number
}

const config = useRuntimeConfig()

const products = ref<Product[]>([])
const lastPage = ref(0)

const filters = reactive({
  s: '',
  sort: '',
  page: 1
})

const load = async (f = filters) => {
  Object.assign(filters, f)

  const params = new URLSearchParams()
  if (filters.s) params.append('s', filters.s)
  if (filters.sort) params.append('sort', filters.sort)
  params.append('page', String(filters.page))

  const data = await $fetch<{
    data: Product[]
    meta: { last_page: number }
  }>(
    // `${config.public.apiBaseUrl}/api/ambassador/products/backend?${params}`,
    `${config.public.apiBaseUrl}/api/ambassador/products/backend?${params.toString()}`,
    { credentials: 'include' }
  )

  products.value =
    filters.page === 1
      ? data.data
      : [...products.value, ...data.data]

      console.log(data.data)

  lastPage.value = data.meta.last_page
}

onMounted(() => load())
</script>
