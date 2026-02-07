<template>
  <div class="max-w-xl space-y-8">
    <h3 class="text-lg font-semibold">Account Information</h3>

    <form @submit.prevent="infoSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          v-model="infoData.first_name"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          v-model="infoData.last_name"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          v-model="infoData.email"
          type="email"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        class="rounded-md border border-gray-300 px-4 py-2 text-sm
               hover:bg-gray-100 transition"
      >
        Save
      </button>
    </form>

    <h3 class="text-lg font-semibold">Change Password</h3>

    <form @submit.prevent="passwordSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          v-model="passwordData.password"
          type="password"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          Password Confirm
        </label>
        <input
          v-model="passwordData.password_confirm"
          type="password"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        class="rounded-md border border-gray-300 px-4 py-2 text-sm
               hover:bg-gray-100 transition"
      >
        Save
      </button>
    </form>
  </div>
</template>


<script setup lang="ts">

definePageMeta({
  layout: 'ambassador',
  // middleware: 'admin'
})

const userStore = useUserStore()
const config = useRuntimeConfig()
const scope = 'ambassador' // or getScope()

// ---------- reactive state ----------
const infoData = reactive({
  first_name: '',
  last_name: '',
  email: ''
})

const passwordData = reactive({
  password: '',
  password_confirm: ''
})

// ---------- sync store → form ----------
watch(
  () => userStore.user,
  (user) => {
    if (!user) return

    infoData.first_name = user.first_name
    infoData.last_name = user.last_name
    infoData.email = user.email
  },
  { immediate: true }
)

// ---------- submit handlers ----------
const infoSubmit = async () => {
  const data = await $fetch(
    `${config.public.apiBaseUrl}/api/${scope}/profile/info`,
    {
      method: 'PUT',
      credentials: 'include',
      body: infoData
    }
  )

  userStore.setUser(data)
}

const passwordSubmit = async () => {
  await $fetch(
    `${config.public.apiBaseUrl}/api/${scope}/profile/password`,
    {
      method: 'PUT',
      credentials: 'include',
      body: passwordData
    }
  )

  passwordData.password = ''
  passwordData.password_confirm = ''
}
</script>

