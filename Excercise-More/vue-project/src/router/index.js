import { createRouter, createWebHistory } from 'vue-router'
import ClickCounter from '../views/ClickCounter.vue'
import Home from '../views/Home.vue'
import ProductManager from '../views/ProductManager.vue'
import Register from '../views/Register.vue'
import CountdownTimer from '../views/CountdownTimer/CountdownTimer.vue'
import Test from '../views/test.vue'
import Notes from '../views/Notes.vue'
import Weather from '../views/Weather.vue'
import UserManagement from '../views/UserManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/click-counter',
      name: 'ClickCounter',
      component: ClickCounter
    },
    {
      path: '/product-manager',
      name: 'ProductManager',
      component: ProductManager
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/countdown-timer',
      name: 'CountdownTimer',
      component: CountdownTimer
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/notes',
      name: 'Notes',
      component: Notes
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/user-management',
      name: 'UserManagement',
      component: UserManagement
    }
  ]
})

export default router
