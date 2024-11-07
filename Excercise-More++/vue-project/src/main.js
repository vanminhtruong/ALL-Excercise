// Excercise-More++/vue-project/src/main.js
import './assets/main.scss'
import 'aos/dist/aos.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AOS from 'aos'

// Import Vue Toastification và CSS của nó
import Toast, { POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)

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