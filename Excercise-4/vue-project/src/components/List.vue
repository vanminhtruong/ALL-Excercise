<script setup>
import { ref } from 'vue'
import Item from './item.vue'
import Check from './Check.vue'

const products = ref([
  { id: 1, name: 'Product A', isCheck: false },
  { id: 2, name: 'Product B', isCheck: false },
  { id: 3, name: 'Product C', isCheck: false },
])

const handleConfirm = (productId) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    alert(`Product ID: ${productId} confirmed`)
    product.isCheck = true
  }
}
</script>

<template>
  <div class="w-full max-w-md p-4 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4">Product List</h2>
    <div class="space-y-2">
      <Item
        v-for="product in products"
        :key="product.id"
        :product="product"
        @confirm="handleConfirm"
      />
    </div>
    <Check :products="products" />
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>