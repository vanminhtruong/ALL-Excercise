<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
    <div class="container mx-auto px-4 relative">
      <!-- Cart Icon with floating animation -->
      <CartIcon 
        class="transform hover:scale-110 transition-transform duration-300 animate-float ml-[95%]"
        data-aos="fade-left"
      />

      <!-- Title with gradient text -->
      <h1 
        class="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
        data-aos="fade-down"
      >
        Danh Sách Sản Phẩm
      </h1>

      <!-- Search and Filter with slide animation -->
      <div data-aos="fade-up" data-aos-delay="200">
        <SearchAndFilter 
          :searchQuery="searchQuery" 
          :selectedCategory="selectedCategory" 
          :categories="categories"
          @update:searchQuery="val => searchQuery = val"
          @update:selectedCategory="val => selectedCategory = val"
          class="transform hover:shadow-lg transition-all duration-300"
        />
      </div>

      <!-- Product Grid with stagger animation -->
      <div 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
      >
        <div 
          v-for="(product, index) in filteredProducts" 
          :key="product.id"
          :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          :data-aos-delay="index * 100"
          class="transform hover:-translate-y-2 transition-all duration-300"
        >
          <ProductItem 
            :product="product"
            @add-to-cart="addToCart"
            @buy-now="buyNow"
            class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="filteredProducts.length === 0"
        class="text-center py-12"
        data-aos="fade-up"
      >
        <div class="text-gray-500 text-xl">
          Không tìm thấy sản phẩm phù hợp
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CartIcon from '../components/CartIcon.vue'
import SearchAndFilter from '../components/SearchAndFilter.vue'
import ProductItem from '../components/ProductItem.vue'
import { useProductList } from '../composables/useProductList'

const {
  searchQuery,
  selectedCategory,
  categories,
  filteredProducts,
  cartTotal,
  addToCart,
  buyNow
} = useProductList()
</script>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Glass morphism effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>