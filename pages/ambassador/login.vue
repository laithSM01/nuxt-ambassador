<template>
  <div class="login-form">
    <h2>Ambassador Login</h2>
    <form @submit.prevent="login">
      <input type="text" placeholder="Username" v-model="username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button>Login</button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'ambassador',
})

  const router = useRouter()
  const username = ref()
  const password = ref()

  const login = async () => {
    const result = await useAuth().login(username.value, password.value, 'ambassador')
    if (result.success) {
      router.push('/ambassador')
    }
  }
</script>

<style scoped>
  .login-form {
    width: 400px;
    margin: 80px auto;
    padding: 20px 40px 40px;
    background: #fff;
    border-radius: 4px;
  }
  input {
    display: block;
    box-sizing: border-box;
    padding: 8px;
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #bbb;
    border-radius: 4px;
  }
  button {
    background: #00dc82;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px;
  }
</style>