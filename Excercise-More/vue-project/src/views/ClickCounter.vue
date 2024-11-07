<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-4xl font-extrabold mb-6 text-blue-600 animate-pulse">Ứng dụng Đếm Số Lượt Nhấp Chuột</h1>
    <button 
      @click="increment" 
      class="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
    >
      Nhấp vào tôi!
    </button>
    <p class="mt-6 text-2xl text-gray-700 animate-fade-in">Số lượt nhấp: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}
</style>