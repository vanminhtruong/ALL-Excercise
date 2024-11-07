<!-- src/components/UserItem.vue -->
<template>
  <li class="p-4 bg-white rounded-lg shadow-md flex justify-between items-center mb-2">
    <div>
      <h3 class="text-lg font-semibold">{{ user.name }}</h3>
      <p class="text-gray-600">{{ user.email }}</p>
    </div>
  </li>
</template>

<script setup>
// 1. Import necessary modules
import { defineProps } from 'vue'

// 2. Define props
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>