import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/productStore'

export function useProductManagement() {
  const productStore = useProductStore()

  // Sử dụng storeToRefs để giữ tính reactive khi destructuring
  const { 
    categories, 
    searchQuery, 
    selectedCategory, 
    sortOption, 
    sortedProducts 
  } = storeToRefs(productStore)

  // Các phương thức cập nhật state trong store
  const updateSearchQuery = (query) => {
    productStore.searchQuery = query
  }

  const updateSelectedCategory = (category) => {
    productStore.selectedCategory = category
  }

  const updateSortOption = (sort) => {
    productStore.sortOption = sort
  }

  return {
    categories,
    searchQuery,
    selectedCategory,
    sortOption,
    sortedProducts,
    updateSearchQuery,
    updateSelectedCategory,
    updateSortOption
  }
}