<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
    <p class="text-gray-700 mb-4">Giá: ${{ product.price }}</p>
    <p class="text-gray-700 mb-4">Số Lượng: 1</p>
    <p class="text-gray-700 mb-4">Tổng: ${{ product.price }}</p>
    
    <button 
      @click="confirmPurchase"
      class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
    >
      Xác Nhận Mua Hàng
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  confirmPurchase: {
    type: Function,
    required: true
  }
})
</script>

<style scoped>
/* Add any specific styles for the Buy Now section here */
</style>