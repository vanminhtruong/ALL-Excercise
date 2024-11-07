<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Ứng Dụng Thời Tiết</h1>
    <WeatherInput @fetch-weather="fetchWeather" />
    <WeatherDisplay 
      v-if="weatherData" 
      :weather="weatherData" 
      :current-time="currentTime" 
    />
    <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import WeatherInput from '../components/WeatherInput.vue'
import WeatherDisplay from '../components/WeatherDisplay.vue'

const weatherData = ref(null)
const error = ref('')
const currentTime = ref('')

let timer = null

const fetchWeather = async (city) => {
  const apiKey = '27ab52b3fa96e42a15236a40eba8392f' // API key của bạn
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}&lang=vi`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Không tìm thấy thành phố. Vui lòng kiểm tra lại.')
    }
    const data = await response.json()
    weatherData.value = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      timezone: data.timezone // Thêm thông tin múi giờ
    }
    error.value = ''
    setCurrentTime(data.timezone)
  } catch (err) {
    error.value = err.message
    weatherData.value = null
    clearInterval(timer)
    currentTime.value = ''
  }
}

const setCurrentTime = (timezoneOffset) => {
  // Clear previous timer nếu có
  if (timer) {
    clearInterval(timer)
  }

  const updateTime = () => {
    const utc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000)
    const cityTime = new Date(utc + (timezoneOffset * 1000))
    currentTime.value = cityTime.toLocaleTimeString('vi-VN', { hour12: false })
  }

  updateTime() // Cập nhật ngay lập tức
  timer = setInterval(updateTime, 1000) // Cập nhật mỗi giây
}

// Cleanup khi component bị hủy
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>