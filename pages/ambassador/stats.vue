<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border border-gray-200 rounded-lg">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">
            Link
          </th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">
            Users
          </th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">
            Revenue
          </th>
        </tr>
      </thead>

      <tbody class="divide-y">
        <tr
          v-for="link in links"
          :key="link.id"
          class="hover:bg-gray-50"
        >
          <td class="px-4 py-2 text-sm text-gray-800">
            {{ checkoutUrl(link.code) }}
          </td>

          <td class="px-4 py-2 text-sm">
            {{ link.count }}
          </td>

          <td class="px-4 py-2 text-sm">
            ${{ link.revenue }}
          </td>
        </tr>

        <tr v-if="!links.length">
          <td colspan="3" class="px-4 py-6 text-center text-sm text-gray-500">
            No stats available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'ambassador',
  // middleware: 'admin'
})

interface Link {
  id: number
  code: string
  count: number
  revenue: number
}

const config = useRuntimeConfig()
const links = ref<Link[]>([])

onMounted(async () => {
  links.value = await $fetch(
    `${config.public.apiBaseUrl}/api/ambassador/stats`,
    {
      credentials: 'include'
    }
  )
})

const checkoutUrl = (code: string) =>
  `${config.public.checkoutUrl}/${code}`
</script>
