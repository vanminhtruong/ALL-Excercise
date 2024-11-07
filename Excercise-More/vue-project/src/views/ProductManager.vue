<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Ứng dụng Quản lý Sản phẩm</h1>
    <div class="mb-6 flex flex-col md:flex-row items-center justify-center">
      <label for="minPrice" class="w-full md:w-1/4 text-gray-700 mb-2 md:mb-0">Giá trị tối thiểu:</label>
      <input
        type="number"
        id="minPrice"
        v-model.number="minPrice"
        class="w-full md:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Nhập giá tối thiểu"
      />
    </div>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Danh sách sản phẩm</h2>
      <ul class="space-y-4">
        <li v-for="product in filteredProducts" :key="product.id" class="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 class="text-xl font-medium text-gray-800">{{ product.name }}</h3>
            <p class="text-gray-600">Giá: {{ formatPrice(product.price) }}</p>
          </div>
        </li>
      </ul>
      <p v-if="filteredProducts.length === 0" class="text-center text-gray-500 mt-4">Không có sản phẩm nào thỏa mãn điều kiện lọc.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/productStore'

// Initialize the product store
const productStore = useProductStore()

// Reactive state for minimum price filter
const minPrice = ref(0)

// Computed property to filter products based on minimum price
const filteredProducts = computed(() => {
  return productStore.products.filter(product => product.price >= minPrice.value)
})

// Helper method to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>