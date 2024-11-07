<template>
  <div class="p-8">
    <h1 class="text-2xl mb-4">Quản Lý Sản Phẩm</h1>
    <FilterControls
      :categories="categories"
      :searchQuery="searchQuery"
      :selectedCategory="selectedCategory"
      :sortOption="sortOption"
      @update:searchQuery="updateSearchQuery"
      @update:selectedCategory="updateSelectedCategory"
      @update:sortOption="updateSortOption"
    />
    <ProductList :products="sortedProducts" />
  </div>
</template>

<script setup>
import { useProductManagement } from '../composables/useProductManagement'
import FilterControls from '../components/molecules/FilterControls.vue'
import ProductList from '../components/organisms/ProductList.vue'

// Sử dụng composable để quản lý sản phẩm
const {
  categories,
  searchQuery,
  selectedCategory,
  sortOption,
  sortedProducts,
  updateSearchQuery,
  updateSelectedCategory,
  updateSortOption
} = useProductManagement()
</script>

<style scoped>
/* Thêm kiểu dáng cụ thể cho trang tại đây */
</style>