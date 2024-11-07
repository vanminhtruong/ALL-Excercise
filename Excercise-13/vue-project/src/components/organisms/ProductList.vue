<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
import ProductCard from '../molecules/ProductCard.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
/* Thêm kiểu dáng cụ thể cho ProductList tại đây */
</style>