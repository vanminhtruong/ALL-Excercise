<template>
  <div class="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-300">
    <h2 class="text-xl font-bold mb-2">{{ product.name }}</h2>
    <p class="text-gray-700 mb-2">Danh mục: {{ product.category }}</p>
    <p class="text-green-600 font-semibold">{{ formattedPrice }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Computed để định dạng giá tiền
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(props.product.price)
})
</script>

<style scoped>
/* Thêm kiểu dáng cụ thể cho ProductCard tại đây */
</style>