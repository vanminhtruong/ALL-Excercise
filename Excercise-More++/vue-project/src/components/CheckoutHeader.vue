```vue:src/components/CheckoutHeader.vue
<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold">Thanh Toán</h1>
    <button 
      @click="goBack" 
      class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Quay Về
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  goBack: {
    type: Function,
    required: true
  }
})
</script>

<style scoped>
/* Add any specific styles for the header here */
</style>