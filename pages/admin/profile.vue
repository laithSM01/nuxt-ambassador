<template>
  <div v-if="user" class="max-w-2xl mx-auto px-4 py-8">
    <!-- Account Info -->
    <h2 class="text-xl font-semibold mb-4">Account Information</h2>

    <form @submit.prevent="infoSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">First Name</label>
        <input
          v-model="user.first_name"
          type="text"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Last Name</label>
        <input
          v-model="user.last_name"
          type="text"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          v-model="user.email"
          type="email"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save
      </button>
    </form>

    <!-- Change Password -->
    <h2 class="text-xl font-semibold mt-10 mb-4">Change Password</h2>

    <form @submit.prevent="passwordSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          v-model="password_confirm"
          type="password"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save
      </button>
    </form>
  </div>
    <div v-else class="text-center py-8">
    Loading profile...
  </div>
</template>

<script setup>
const {changePassword,updateUserInfo, getUser } = useAuth()


const password = ref('')
const password_confirm = ref('')
const userStore = useUserStore()
// const user = userStore.user
const { user } = storeToRefs(userStore)

onMounted(async () => {
  if (!user.value) {
    await useAuth().getUser()
  }
})

const infoSubmit = async () => {
await updateUserInfo(user.value.first_name, user.value.last_name, user.value.email)
}

const passwordSubmit = async () => {
  await changePassword(password.value, password_confirm.value)
}
</script>