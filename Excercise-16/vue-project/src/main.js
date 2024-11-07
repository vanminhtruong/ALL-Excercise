// src/main.js
import './assets/main.scss'
import 'aos/dist/aos.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AOS from 'aos'

// Import Vue Toastification và CSS của nó
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Import VCalendar và CSS của nó
import VCalendar from 'v-calendar'
import 'v-calendar/style.css' // Đường dẫn chính xác

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Đăng ký VCalendar plugin
app.use(VCalendar, {
  componentPrefix: 'V' // Đặt prefix cho các component của VCalendar
})

// Cấu hình Vue Toastification
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
})

app.mount('#app')

AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
})