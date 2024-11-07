<template>
  <form @submit.prevent="onSubmit" class="flex mb-4">
    <input
      type="text"
      v-model="city"
      placeholder="Nhập tên thành phố"
      class="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
    <button
      type="submit"
      class="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300"
    >
      Tìm kiếm
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['fetch-weather'])
const city = ref('')

const onSubmit = () => {
  if (city.value.trim() !== '') {
    emit('fetch-weather', city.value.trim())
    city.value = ''
  }
}
</script>

<style scoped>
/* Thêm các style tùy chỉnh tại đây nếu cần */
</style>