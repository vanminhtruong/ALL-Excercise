<!-- src/components/CartActions.vue -->
<template>
  <div class="mt-4 text-right">
    <p class="text-lg">Tổng: ${{ cartTotal }}</p>
    <button 
      @click="clearCart" 
      class="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Làm Trống Giỏ Hàng
    </button>
    <button 
      @click="proceedToCheckout" 
      class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
    >
      Tiến Hành Thanh Toán
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  cartTotal: {
    type: Number,
    required: true
  },
  clearCart: {
    type: Function,
    required: true
  },
  proceedToCheckout: {
    type: Function,
    required: true
  }
})
</script>