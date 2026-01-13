<template>
  <main class="min-h-screen flex items-center justify-center px-4">
    <form
      @submit.prevent="submit"
      class="w-full max-w-sm bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h1 class="text-xl font-semibold text-center">
        Please register
      </h1>

      <div>
        <label class="block text-sm font-medium mb-1">First Name</label>
        <input
          v-model="first_name"
          type="text"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Last Name</label>
        <input
          v-model="last_name"
          type="text"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          v-model="password_confirm"
          type="password"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const password_confirm = ref('')

const router = useRouter()

const submit = async () => {
  await $fetch('/register', {
    method: 'POST',
    body: {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
      password_confirm: password_confirm.value
    }
  })

  router.push('/login')
}
</script>