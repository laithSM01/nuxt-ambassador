<template>
    <div>
    <h2>this is products page</h2>
    <div class="grid grid-cols-4 gap-5">
    <div v-for="product in products" :key="product.id">
    <NuxtLink :to="`/admin/products/${product.id}`" class="text-blue-600 hover:underline">
    {{ product.title }}
    </NuxtLink>
    </div>
    </div>
    </div>
</template>

<script setup>
    definePageMeta({
    })
    const config = useRuntimeConfig()
    const {data: products} = await useFetch(`${config.public.apiBaseUrl}/api/admin/products`, {
        credentials: 'include'
    })
</script>
