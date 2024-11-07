<script setup>
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 to-indigo-400">
    <h1 class="text-5xl font-bold text-white mb-4 drop-shadow-lg">Welcome to My Vue App</h1>
    <p class="text-xl text-white mb-8">Building beautiful and professional interfaces with Vue and Tailwind CSS.</p>
    <div class="flex space-x-4">
      <RouterLink to="/click-counter" class="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
        Đếm Lượt Nhấp
      </RouterLink>
      <RouterLink to="/product-manager" class="px-5 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300">
        Quản Lý Sản Phẩm
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
</style>