<script setup>
import { RouterLink, RouterView } from 'vue-router'

const links = [
  { name: 'Home', to: '/', label: 'Home Page' },
  { name: 'ClickCounter', to: '/click-counter', label: 'Đếm Lượt Nhấp' },
  { name: 'ProductManager', to: '/product-manager', label: 'Quản Lý Sản Phẩm' },
  { name: 'Register', to: '/register', label: 'Đăng Ký' },
  { name: 'CountdownTimer', to: '/countdown-timer', label: 'Đồng Hồ Đếm Ngược' },
  { name: 'Notes', to: '/notes', label: 'Ghi Chú' },
  { name: 'Weather', to: '/weather', label: 'Thời Tiết' },
  { name: 'UserManagement', to: '/user-management', label: 'Quản Lý Người Dùng' },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <ul class="flex space-x-6 py-4">
          <li v-for="link in links" :key="link.name">
            <RouterLink :to="link.to" class="text-blue-500 hover:text-blue-700 transition ease-in-out duration-300">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
    <RouterView />
    <footer class="bg-white shadow-inner mt-10">
      <div class="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
        &copy; 2023 Your Company. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  @apply container mx-auto;
}
</style>