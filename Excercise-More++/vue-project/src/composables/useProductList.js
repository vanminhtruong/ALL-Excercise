// src/composables/useProductList.js
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export function useProductList() {
  // Giả sử có một danh sách sản phẩm
  const products = ref([
    { id: 1, name: 'Sản Phẩm A', price: 100, category: 'Điện tử' },
    { id: 2, name: 'Sản Phẩm B', price: 150, category: 'Đồ Gia Dụng' },
    { id: 3, name: 'Sản Phẩm C', price: 200, category: 'Thời Trang' },
    { id: 4, name: 'Sản Phẩm D', price: 250, category: 'Điện tử' },
    { id: 5, name: 'Sản Phẩm E', price: 80, category: 'Sách' },
    { id: 6, name: 'Sản Phẩm F', price: 80, category: 'Sách' },
    { id: 7, name: 'Sản Phẩm G', price: 80, category: 'Sách' },
    { id: 8, name: 'Sản Phẩm H', price: 80, category: 'Sách' },
  ])
  
  const cartStore = useCartStore()
  const cartTotal = computed(() => cartStore.totalPrice)
  
  // Trạng Thái Tìm Kiếm và Lọc
  const searchQuery = ref('')
  const selectedCategory = ref('All')
  
  // Thuộc Tính Tính Toán cho Sản Phẩm Được Lọc
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = selectedCategory.value === 'All' || product.category === selectedCategory.value
      return matchesSearch && matchesCategory
    })
  })
  
  // Các Danh Mục Có Sẵn
  const categories = computed(() => {
    const cats = products.value.map(product => product.category)
    return ['All', ...new Set(cats)]
  })
  
  const toast = useToast()
  const router = useRouter()
  
  // Phương Thức Thêm Vào Giỏ Hàng
  const addToCart = (product) => {
    cartStore.addToCart(product)
    toast.success(`${product.name} đã được thêm vào giỏ hàng`)
  }
  
  // Phương Thức "Mua Ngay" (Không Thêm vào Giỏ Hàng và Điều Hướng đến Checkout với Sản Phẩm)
  const buyNow = (product) => {
    router.push({ 
      path: '/checkout',
      query: { 
        buyNow: true,
        productId: product.id,
        productName: product.name,
        productPrice: product.price 
      } 
    })
    toast.info(`Đang chuyển đến trang Thanh Toán cho ${product.name}`)
  }
  
  return {
    products,
    cartTotal,
    searchQuery,
    selectedCategory,
    filteredProducts,
    categories,
    addToCart,
    buyNow
  }
}