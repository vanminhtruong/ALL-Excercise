// src/composables/useCart.js
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export function useCart() {
  const cartStore = useCartStore()
  const cartItems = computed(() => cartStore.items)
  const cartTotal = computed(() => cartStore.totalPrice)

  const router = useRouter()
  const toast = useToast()

  const removeItem = (id) => {
    cartStore.removeFromCart(id)
    toast.success('Sản phẩm đã được xóa khỏi giỏ hàng')
  }

  const clearCart = () => {
    cartStore.clearCart()
    toast.success('Giỏ hàng đã được làm trống')
  }

  const goBack = () => {
    router.push('/products')
    toast.info('Đã quay trở lại trang Sản Phẩm.')
  }

  const proceedToCheckout = () => {
    router.push('/checkout')
    toast.info('Đang chuyển đến trang Thanh Toán.')
  }

  const updateQuantity = (id, quantity) => {
    cartStore.updateQuantity(id, quantity)
    toast.success('Số lượng đã được cập nhật')
  }

  return {
    cartItems,
    cartTotal,
    removeItem,
    clearCart,
    goBack,
    proceedToCheckout,
    updateQuantity
  }
}