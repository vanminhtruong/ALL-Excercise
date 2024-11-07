<!-- src/components/SearchAndFilter.vue -->
<template>
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
    <!-- Thanh Tìm Kiếm -->
    <input 
      type="text" 
      :value="searchQuery" 
      @input="onSearchChange" 
      placeholder="Tìm kiếm sản phẩm..." 
      class="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
    
    <!-- Hộp Xuống Lọc Theo Danh Mục -->
    <select 
      :value="selectedCategory" 
      @change="onCategoryChange" 
      class="w-full sm:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      <option value="All">Tất Cả</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  selectedCategory: {
    type: String,
    default: 'All'
  },
  categories: {
    type: Array,
    default: () => ['All']
  }
})

const emit = defineEmits(['update:searchQuery', 'update:selectedCategory'])

// Emit the updated search query
const onSearchChange = (event) => {
  emit('update:searchQuery', event.target.value)
}

// Emit the updated selected category
const onCategoryChange = (event) => {
  emit('update:selectedCategory', event.target.value)
}
</script>

<style scoped>
/* Thêm bất kỳ kiểu dáng cụ thể nào cho thành phần ở đây */
</style>