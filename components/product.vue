<template>
  <!-- Success message -->
  <div v-if="link" class="mb-4 rounded-md bg-blue-100 p-3 text-blue-800">
    {{ link }}
  </div>

  <!-- Error message -->
  <div v-if="error" class="mb-4 rounded-md bg-red-100 p-3 text-red-800">
    {{ error }}
  </div>

  <!-- Search / Actions -->
  <div class="mb-6 flex flex-wrap gap-2">
    <input
      class="flex-1 rounded-md border border-gray-300 px-3 py-2
             focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Search"
      @input="search($event.target.value)"
    />

    <button
      v-if="selected.length"
      class="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
      @click="generate"
    >
      Generate Link
    </button>

    <select
      class="rounded-md border border-gray-300 px-3 py-2 text-sm"
      @change="sort($event.target.value)"
    >
      <option value="">Sort</option>
      <option value="asc">Price Ascending</option>
      <option value="desc">Price Descending</option>
    </select>
  </div>

  <!-- Products grid -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
    <div
      v-for="product in products"
      :key="product.id"
      @click="select(product.id)"
      class="cursor-pointer"
    >
      <div
        :class="[
          'rounded-lg border p-3 shadow-sm transition',
          selected.includes(product.id)
            ? 'border-cyan-600 ring-2 ring-cyan-500'
            : 'hover:shadow-md'
        ]"
      >
        <img
          :src="product.image"
          alt=""
          class="h-48 w-full rounded-md object-cover"
        />

        <div class="mt-3">
          <p class="text-sm font-medium text-gray-800">
            {{ product.title }}
          </p>

          <p class="mt-1 text-sm text-gray-600">
            ${{ product.price }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Load more -->
  <div
    v-if="filters.page < lastPage"
    class="mt-6 flex justify-center"
  >
    <button
      class="rounded-md bg-indigo-600 px-6 py-2 text-sm text-white hover:bg-indigo-700"
      @click="loadMore"
    >
      Load More
    </button>
  </div>
</template>

<script setup lang="ts">

interface Product {
  id: number
  title: string
  description: string
  image: string
  price: number
}

const props = defineProps<{
  products: Product[]
  filters: {
    s: string
    sort: string
    page: number
  }
  lastPage: number
}>()

const emit = defineEmits<{
  (e: 'set-filters', value: typeof props.filters): void
}>()

const config = useRuntimeConfig()

const selected = ref<number[]>([])
const link = ref('')
const error = ref('')

const search = (s: string) => {
  emit('set-filters', { ...props.filters, s, page: 1 })
}

const sort = (sort: string) => {
  emit('set-filters', { ...props.filters, sort, page: 1 })
}

const loadMore = () => {
  emit('set-filters', {
    ...props.filters,
    page: props.filters.page + 1
  })
}

const select = (id: number) => {
  selected.value = selected.value.includes(id)
    ? selected.value.filter(v => v !== id)
    : [...selected.value, id]
}

const generate = async () => {
  try {
    const data = await $fetch<{ code: string }>(
      `${config.public.apiBaseUrl}/api/ambassador/links`,
      {
        method: 'POST',
        credentials: 'include',
        body: { products: selected.value }
      }
    )

    link.value = `Link generated: ${config.public.checkoutUrl}/${data.code}`
  } catch {
    error.value = 'You must be logged in to generate a link!'
  } finally {
    setTimeout(() => {
      link.value = ''
      error.value = ''
    }, 5000)
  }
}
</script>
