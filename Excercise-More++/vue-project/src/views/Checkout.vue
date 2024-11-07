<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
    <div class="container mx-auto p-4 max-w-4xl">
      <!-- Checkout Header với animation fade-in -->
      <div 
        class="bg-white rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-500 hover:shadow-xl"
        data-aos="fade-down"
      >
        <CheckoutHeader :goBack="goBack"/>
      </div>

      <!-- Content Section với animation slide-up -->
      <div 
        class="bg-white rounded-lg shadow-lg p-6"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <!-- Buy Now Section -->
        <div v-if="isBuyNow" class="space-y-6">
          <div class="animate-pulse bg-green-50 rounded-lg p-4 mb-4">
            <p class="text-green-600 text-sm">Đang xử lý thanh toán trực tiếp</p>
          </div>
          <BuyNowSection 
            :product="buyNowProduct" 
            :confirmPurchase="confirmPurchase"
            class="transform transition-all duration-300 hover:scale-102"
          />
        </div>

        <!-- Cart Section -->
        <div v-else class="space-y-6">
          <div class="animate-pulse bg-blue-50 rounded-lg p-4 mb-4">
            <p class="text-blue-600 text-sm">Đang xử lý giỏ hàng của bạn</p>
          </div>
          <CartSection 
            :cartItems="cartItems" 
            :cartTotal="cartTotal" 
            :confirmPurchase="confirmPurchase"
            class="transform transition-all duration-300 hover:scale-102" 
          />
        </div>

        <!-- Progress Steps -->
        <div class="mt-8 flex justify-center space-x-4">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span class="text-white text-sm">1</span>
            </div>
            <div class="ml-2 text-sm font-medium text-green-500">Giỏ hàng</div>
          </div>
          <div class="w-16 h-0.5 bg-gray-200 mt-4"></div>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
              <span class="text-white text-sm">2</span>
            </div>
            <div class="ml-2 text-sm font-medium text-blue-500">Thanh toán</div>
          </div>
          <div class="w-16 h-0.5 bg-gray-200 mt-4"></div>
          <div class="flex items-center opacity-50">
            <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span class="text-white text-sm">3</span>
            </div>
            <div class="ml-2 text-sm font-medium text-gray-500">Hoàn tất</div>
          </div>
        </div>
      </div>

      <!-- Security Badge -->
      <div 
        class="mt-8 text-center"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div class="inline-flex items-center space-x-2 text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Thanh toán an toàn & bảo mật</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckoutHeader from '../components/CheckoutHeader.vue'
import BuyNowSection from '../components/BuyNowSection.vue'
import CartSection from '../components/CartSection.vue'
import { useCheckout } from '../composables/useCheckout'

const {
  cartItems,
  cartTotal,
  isBuyNow,
  buyNowProduct,
  confirmPurchase,
  goBack
} = useCheckout()
</script>

<style>
@keyframes scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.hover\:scale-102:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease-in-out;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>