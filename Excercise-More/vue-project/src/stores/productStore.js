import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref([
    { id: 1, name: 'Sản phẩm A', price: 100000 },
    { id: 2, name: 'Sản phẩm B', price: 200000 },
    { id: 3, name: 'Sản phẩm C', price: 150000 },
    { id: 4, name: 'Sản phẩm D', price: 250000 },
  ])

  return { products }
})