<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="mt-6">
    <h3 class="text-lg font-semibold mb-2">Confirmation Status</h3>
    <ul class="list-disc list-inside">
      <li v-for="product in products" :key="product.id" class="flex justify-between">
        <span>{{ product.name }}</span>
        <span :class="{'text-green-500': product.isCheck, 'text-red-500': !product.isCheck}">
          {{ product.isCheck ? 'Đã xác nhận' : 'Chưa xác nhận' }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>