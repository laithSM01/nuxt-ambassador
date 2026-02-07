<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border border-gray-200 rounded-lg">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">
            #
          </th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">
            Name
          </th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">
            Revenue
          </th>
        </tr>
      </thead>

      <tbody class="divide-y">
        <tr
          v-for="([name, value], index) in rankingEntries"
          :key="name"
          class="hover:bg-gray-50"
        >
          <td class="px-4 py-2 text-sm">
            {{ index + 1 }}
          </td>

          <td class="px-4 py-2 text-sm text-gray-800">
            {{ name }}
          </td>

          <td class="px-4 py-2 text-sm">
            ${{ value }}
          </td>
        </tr>

        <tr v-if="!rankingEntries.length">
          <td
            colspan="3"
            class="px-4 py-6 text-center text-sm text-gray-500"
          >
            No rankings available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup lang="ts">

definePageMeta({
  layout: 'ambassador'
})

// rankings = object: { [name: string]: revenue }
const rankings = ref<Record<string, number>>({})

const config = useRuntimeConfig()

onMounted(async () => {
  rankings.value = await $fetch(
    `${config.public.apiBaseUrl}/api/ambassador/rankings`,
    {
      credentials: 'include'
    }
  )
})

// Convert object → iterable array for v-for
const rankingEntries = computed(() =>
  Object.entries(rankings.value)
)
</script>
