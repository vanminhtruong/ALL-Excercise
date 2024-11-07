import { computed, ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

export function useCheckout() {
    const cartStore = useCartStore()
    const cartItems = computed(() => cartStore.items)
    const cartTotal = computed(() => cartStore.totalPrice)

    const router = useRouter()
    const route = useRoute()
    const toast = useToast()

    // Check if the user is performing a "Buy Now" action
    const isBuyNow = computed(() => route.query.buyNow === 'true')

    // Retrieve product information from query parameters
    const buyNowProduct = ref({
        id: route.query.productId || '',
        name: route.query.productName || '',
        price: Number(route.query.productPrice) || 0
    })

    // Method to confirm purchase
    const confirmPurchase = () => {
        if (isBuyNow.value) {
        // Handle "Buy Now" purchase
            toast.success('Đơn hàng đã được xác nhận! Cảm ơn bạn đã đặt hàng.')
            router.push('/products')
        } else {
        // Handle checkout from cart
            toast.success('Đơn hàng đã được xác nhận! Cảm ơn bạn đã đặt hàng.')
            cartStore.clearCart()
            router.push('/products')
        }
    }

    // Method to navigate back to the Products page
    const goBack = () => {
        router.push('/products')
        toast.info('Đã quay trở lại trang Sản Phẩm.')
    }

    return {
        cartItems,
        cartTotal,
        isBuyNow,
        buyNowProduct,
        confirmPurchase,
        goBack
    }
}