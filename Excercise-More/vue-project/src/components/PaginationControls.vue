<!-- src/components/PaginationControls.vue -->
<template>
  <div class="flex justify-center space-x-2 mt-4">
    <!-- 1. Previous Page Button -->
    <button 
      @click="goToPreviousPage" 
      :disabled="currentPage === 1"
      class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
    >
      Trước
    </button>

    <!-- 2. Page Number Buttons -->
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="[
        'px-3 py-1 rounded transition',
        { 'bg-blue-500 text-white': currentPage === page },
        { 'bg-gray-200 text-gray-700': currentPage !== page }
      ]"
    >
      {{ page }}
    </button>

    <!-- 3. Next Page Button -->
    <button 
      @click="goToNextPage" 
      :disabled="currentPage === totalPages"
      class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
    >
      Sau
    </button>
  </div>
</template>

<script setup>
// 1. Import necessary modules
import { defineProps, defineEmits } from 'vue'

// 2. Define props
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

// 3. Define emits
const emit = defineEmits(['change-page'])

// 4. Method to go to a specific page
const goToPage = (page) => {
  emit('change-page', page)
}

// 5. Method to go to the previous page
const goToPreviousPage = () => {
  if (props.currentPage > 1) {
    emit('change-page', props.currentPage - 1)
  }
}

// 6. Method to go to the next page
const goToNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('change-page', props.currentPage + 1)
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>