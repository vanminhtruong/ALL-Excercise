<!-- src/components/ProductItem.vue -->
<template>
  <div class="border rounded-lg p-4 flex flex-col">
    <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
    <p class="text-gray-700 mb-4">${{ product.price }}</p>
    <div class="mt-auto flex items-center justify-between">
      <!-- Biểu Tượng Giỏ Hàng để Thêm vào Giỏ Hàng -->
      <button 
        @click="$emit('add-to-cart', product)" 
        class="text-blue-500 hover:text-blue-700" 
        aria-label="Add to cart"
      >
        <!-- Cart Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-10a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
      </button>
      <!-- Nút "Mua Ngay" -->
      <button 
        @click="$emit('buy-now', product)"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Mua Ngay
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* Thêm bất kỳ kiểu dáng cụ thể nào cho thành phần ở đây */
</style>