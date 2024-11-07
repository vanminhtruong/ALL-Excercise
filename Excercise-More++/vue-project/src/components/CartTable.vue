<template>
  <div class="overflow-hidden rounded-xl shadow-lg bg-white">
    <!-- Header với gradient -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div class="grid grid-cols-5 gap-4 text-white text-sm font-semibold">
        <div class="tracking-wider">Sản Phẩm</div>
        <div class="tracking-wider">Giá</div>
        <div class="tracking-wider">Số Lượng</div>
        <div class="tracking-wider">Tổng</div>
        <div class="tracking-wider">Hành Động</div>
      </div>
    </div>

    <!-- Cart Items -->
    <div class="divide-y divide-gray-200">
      <CartItem 
        v-for="(item, index) in cartItems" 
        :key="item.id" 
        :item="item" 
        :removeItem="removeItem" 
        :updateQuantity="updateQuantity"
        @remove-item="removeItem"
        @update-quantity="updateQuantity"
        :class="{
          'bg-gray-50': index % 2 === 0,
          'hover:bg-blue-50 transition-colors duration-150': true,
          'p-6': true,
        }"
        class="grid grid-cols-5 gap-4 items-center"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      />
    </div>

    <!-- Empty State với animation -->
    <div 
      v-if="cartItems.length === 0" 
      class="p-8 text-center text-gray-500"
      data-aos="fade-up"
    >
      <div class="transform transition-all duration-300 hover:scale-105">
        <svg 
          class="w-16 h-16 mx-auto mb-4 text-gray-400 animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <p class="text-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Giỏ hàng trống
        </p>
        <p class="mt-2 text-gray-400">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import CartItem from './CartItem.vue'

const props = defineProps({
  cartItems: {
    type: Array,
    required: true
  },
  removeItem: {
    type: Function,
    required: true
  },
  updateQuantity: {
    type: Function,
    required: true
  }
})
</script>

<style scoped>
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>