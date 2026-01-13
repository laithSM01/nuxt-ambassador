<template>
  <div class="max-w-5xl mx-auto p-4 space-y-4">
    <h2 class="text-2xl font-semibold mb-4">Orders</h2>

    <!-- Loading / Error -->
    <p v-if="loading" class="text-gray-500">Loading orders...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <!-- Orders -->
    <div
      v-for="order in orders"
      :key="order.id"
      class="border rounded-xl shadow-sm overflow-hidden"
    >
      <!-- Header -->
      <button
        class="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
        @click="toggle(order.id)"
      >
        <div>
          <p class="font-medium">{{ order.name }}</p>
          <p class="text-sm text-gray-500">
            {{ order.order_items.length }} items
          </p>
        </div>

        <div class="flex items-center gap-4">
          <span class="font-semibold">${{ order.total }}</span>
          <svg
            class="w-5 h-5 transition-transform"
            :class="{ 'rotate-180': openOrder === order.id }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <!-- Content -->
      <div v-show="openOrder === order.id" class="p-4 bg-white">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm border">
            <thead class="bg-gray-100">
              <tr>
                <th class="p-2 text-left">#</th>
                <th class="p-2 text-left">Product</th>
                <th class="p-2 text-left">Price</th>
                <th class="p-2 text-left">Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in order.order_items"
                :key="item.id"
                class="border-t"
              >
                <td class="p-2">{{ item.id }}</td>
                <td class="p-2">{{ item.product_title }}</td>
                <td class="p-2">${{ item.price }}</td>
                <td class="p-2">{{ item.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { orders, loading, error, fetchOrders } = useOrders()

const openOrder = ref(null)

const toggle = (id) => {
  openOrder.value = openOrder.value === id ? null : id
}

fetchOrders()
</script>
