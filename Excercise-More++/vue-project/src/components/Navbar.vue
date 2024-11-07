<template>
  <nav class="bg-blue-600 p-4">
    <ul class="flex space-x-4">
      <li>
        <RouterLink to="/" class="text-white">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/products" class="text-white">Products</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const cartTotal = computed(() => cartStore.totalPrice)
</script>

<style scoped>
/* Add any component-specific styles here */
</style>