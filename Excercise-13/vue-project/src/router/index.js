import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DynamicCardPage from '../views/DynamicCardPage.vue'
import ProductManagementPage from '../views/ProductManagementPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dynamic-card',
      name: 'DynamicCardPage',
      component: DynamicCardPage
    },
    {
      path: '/product-management',
      name: 'ProductManagementPage',
      component: ProductManagementPage
    }
  ]
})

export default router
