<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Đăng Ký Tài Khoản</h1>
    <form @submit.prevent="handleSubmit" class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 mb-2">UserName:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập tên của bạn"
          required
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="example@domain.com"
          required
        />
        <p v-if="email && !emailIsValid" class="text-red-500 text-sm mt-1">Email không hợp lệ.</p>
      </div>

      <div class="mb-6">
        <label for="password" class="block text-gray-700 mb-2">PassWord:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập mật khẩu"
          required
        />
        <p v-if="password && !passwordIsValid" class="text-red-500 text-sm mt-1">
          Mật khẩu phải có ít nhất 6 ký tự.
        </p>
      </div>
      <button
        type="submit"
        :disabled="!formIsValid"
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
      >
        Đăng Ký Tài Khoản
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('');

const emailIsValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value);
})

const passwordIsValid = computed(() => {
  return password.value.length >= 6;
})

const formIsValid = computed(() => {
  return name.value.trim() !== '' && emailIsValid.value && passwordIsValid.value
})

const handleSubmit = () => {
  alert('Đăng ký thành công tài khoản!');
  name.value = ''
  email.value = ''
  password.value = ''
}
</script>
