import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WarehouseManager from '../views/WarehouseManager.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/warehouse',
    name: 'WarehouseManager',
    component: WarehouseManager
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router