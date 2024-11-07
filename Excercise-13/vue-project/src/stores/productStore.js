import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  // Trạng thái sản phẩm
  const products = ref([
    { id: 1, name: 'Laptop', price: 20000000, category: 'Điện tử' },
    { id: 2, name: 'Cuốn Sách', price: 200000, category: 'Sách' },
    { id: 3, name: 'Áo Thun', price: 300000, category: 'Quần áo' },
    { id: 4, name: 'Iphone-11 Pro max', price: 25000000, category: 'Smartphone' },
  ])

  // Computed để lấy danh sách các danh mục sản phẩm duy nhất
  const categories = computed(() => {
    const cats = products.value.map(product => product.category)
    return [...new Set(cats)]
  })

  // Trạng thái bộ lọc
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const sortOption = ref('')

  // Computed để lọc sản phẩm
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = selectedCategory.value ? product.category === selectedCategory.value : true
      return matchesSearch && matchesCategory
    })
  })

  // Computed để sắp xếp sản phẩm
  const sortedProducts = computed(() => {
    const sorted = [...filteredProducts.value]
    switch (sortOption.value) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return sorted
    }
  })

  return {
    products,          // Danh sách sản phẩm
    categories,        // Danh mục sản phẩm duy nhất
    searchQuery,       // Chuỗi tìm kiếm
    selectedCategory,  // Danh mục được chọn để lọc
    sortOption,        // Tùy chọn sắp xếp
    filteredProducts,  // Sản phẩm đã được lọc
    sortedProducts     // Sản phẩm đã được sắp xếp
  }
})