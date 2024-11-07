<template>
  <div v-if="cartItems.length > 0">
    <table class="w-full table-auto mb-6">
      <thead>
        <tr>
          <th class="px-4 py-2">Sản Phẩm</th>
          <th class="px-4 py-2">Giá</th>
          <th class="px-4 py-2">Số Lượng</th>
          <th class="px-4 py-2">Tổng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id" class="text-center">
          <td class="border px-4 py-2">{{ item.name }}</td>
          <td class="border px-4 py-2">${{ item.price }}</td>
          <td class="border px-4 py-2">{{ item.quantity }}</td>
          <td class="border px-4 py-2">${{ item.price * item.quantity }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="text-right mb-6">
      <p class="text-lg">Tổng: ${{ cartTotal }}</p>
    </div>
    
    <button 
      @click="confirmPurchase" 
      class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
    >
      Xác Nhận Mua Hàng
    </button>
  </div>
  <div v-else>
    <p>Giỏ hàng của bạn đang trống.</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  cartItems: {
    type: Array,
    required: true
  },
  cartTotal: {
    type: Number,
    required: true
  },
  confirmPurchase: {
    type: Function,
    required: true
  }
})
</script>

<style scoped>
/* Add any specific styles for the Cart section here */
</style>