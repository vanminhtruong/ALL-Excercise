<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 to-orange-200 p-6">
    <h1 class="text-4xl font-bold mb-8 text-gray-800 animate-pulse">Đồng Hồ Đếm Ngược</h1>
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <!-- Transition cho Form Nhập Liệu -->
      <transition name="fade-slide" mode="out-in">
        <form v-if="!isCounting" @submit.prevent="startCountdown" class="space-y-6">
          <div>
            <label for="hours" class="block text-gray-700 mb-2">Giờ:</label>
            <input
              type="number"
              id="hours"
              v-model.number="hours"
              min="0"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              placeholder="0"
              required
            />
          </div>
          <div>
            <label for="minutes" class="block text-gray-700 mb-2">Phút:</label>
            <input
              type="number"
              id="minutes"
              v-model.number="minutes"
              min="0"
              max="59"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              placeholder="0"
              required
            />
          </div>
          <div>
            <label for="seconds" class="block text-gray-700 mb-2">Giây:</label>
            <input
              type="number"
              id="seconds"
              v-model.number="seconds"
              min="0"
              max="59"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              placeholder="0"
              required
            />
          </div>
          <button
            type="submit"
            :disabled="isCounting"
            class="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300 disabled:opacity-50"
          >
            Bắt Đầu Đếm Ngược
          </button>
        </form>
      </transition>

      <!-- Transition cho Countdown Display -->
      <transition name="fade-slide-up" mode="out-in">
        <div v-if="isCounting">
          <CountdownDisplay :formattedTime="formattedTime" @stop="stopCountdown" class="mt-[-10px]"/>
        </div>
      </transition>
    </div>
    <div v-if="timeUp" class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-pulse">
      <p>Thời gian đã hết!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import CountdownDisplay from '../../components/CountdownDisplay.vue'

// Khai báo các reactive property
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const totalSeconds = ref(0)
const isCounting = ref(false)
const timeUp = ref(false)
let timer = null

// Hàm bắt đầu đếm ngược
const startCountdown = () => {
  totalSeconds.value = hours.value * 3600 + minutes.value * 60 + seconds.value
  if (totalSeconds.value > 0) {
    isCounting.value = true
    timeUp.value = false
    timer = setInterval(() => {
      if (totalSeconds.value > 0) {
        totalSeconds.value--;
      } else {
        clearInterval(timer)
        isCounting.value = false
        timeUp.value = true
      }
    }, 1000)
  }
}

// Hàm dừng đếm ngược
const stopCountdown = () => {
  clearInterval(timer)
  isCounting.value = false
}

// Computed property để định dạng thời gian
const formattedTime = computed(() => {
  const hrs = Math.floor(totalSeconds.value / 3600)
  const mins = Math.floor((totalSeconds.value % 3600) / 60)
  const secs = totalSeconds.value % 60
  return `${hrs.toString().padStart(2, '0')}:${mins
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})

// Watchers để reset timer nếu các input thay đổi trong khi đang đếm
watch([hours, minutes, seconds], () => {
  if (isCounting.value) {
    stopCountdown()
  }
})
</script>

<style scoped>
/* Transition cho form nhập liệu */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Transition cho Countdown Display */
.fade-slide-up-enter-active, .fade-slide-up-leave-active {
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}
.fade-slide-up-enter-from, .fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}
.fade-slide-up-enter-to, .fade-slide-up-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Hiệu ứng cho thông báo thời gian đã hết */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>