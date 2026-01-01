<template>
    <div>
    <h2>this is users page</h2>
    <div class="grid grid-cols-4 gap-5">
    <div v-for="user in users" :key="user.id">
    <NuxtLink :to="`/admin/users/${user.id}`" class="text-blue-600 hover:underline">
    {{ user.name }}
    </NuxtLink>
    </div>
    </div>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: 'auth'
    })
</script>
