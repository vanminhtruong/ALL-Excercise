<!-- src/components/CartIcon.vue -->
<template>
  <RouterLink to="/cart" class="flex items-center space-x-1 text-gray-700">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-10a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
    <span class="bg-red-500 text-white text-xs rounded-full px-2 py-1">
      {{ cartTotal }}
    </span>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const cartTotal = computed(() => cartStore.totalPrice)
</script>

<style scoped>
/* Thêm bất kỳ kiểu dáng cụ thể nào cho thành phần ở đây */
</style>