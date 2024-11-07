```vue:src/components/organisms/QuizContainer.vue
<template>
  <div class="p-8 bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg shadow-lg relative">
    <div class="mb-6 text-center">
      <h1 class="text-5xl font-extrabold text-yellow-300 mt-5">Ai Là Triệu Phú</h1>
    </div>
    <div class="p-6 bg-blue-900 rounded-lg">
      <Question 
        v-if="currentQuestionData" 
        :question="currentQuestionData.question" 
        :options="currentQuestionData.options" 
        :selected="currentAnswer" 
        @update:selected="handleAnswer" 
      />
    </div>
    <div class="mt-6 flex justify-center">
      <Button 
        @click="startTimerAndNextQuestion" 
        :disabled="currentAnswer === null || isNavigating" 
        class="w-32"
      >
        Tiếp Theo
      </Button>
    </div>

    <!-- Countdown Timer -->
    <div class="absolute top-4 right-4 text-white">
      <span class="font-bold">Thời gian còn lại:</span> {{ formattedTimer }}
    </div>

    <!-- Timer Overlay -->
    <div 
      v-if="isNavigating" 
      class="absolute inset-0 flex items-center justify-center bg-blue-900 bg-opacity-75 rounded-lg"
    >
      <div class="text-white text-lg">
        Chuyển câu hỏi trong {{ navigationTimer }} giây...
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useQuizStore } from '../../stores/quiz'
import Question from '../molecules/Question.vue'
import Button from '../atoms/Button.vue'
import { useRouter, useRoute } from 'vue-router'

const quizStore = useQuizStore()
const router = useRouter()
const route = useRoute()

const MAIN_TIMER_DURATION = 240 // 4 phút trong giây
const NAVIGATION_TIMER_DURATION = 3 // 3 giây cho chuyển câu hỏi

const mainTimer = ref(MAIN_TIMER_DURATION)
const navigationTimer = ref(NAVIGATION_TIMER_DURATION)
const isNavigating = ref(false)

let mainTimerInterval = null
let navigationTimerInterval = null

const currentQuestionFromRoute = computed(() => {
  const id = parseInt(route.params.id)
  return isNaN(id) ? 0 : id
})

const currentQuestionData = computed(() => {
  return quizStore.questions[currentQuestionFromRoute.value]
})

const currentAnswer = computed(() => {
  return quizStore.answers[currentQuestionFromRoute.value] !== undefined
    ? quizStore.answers[currentQuestionFromRoute.value]
    : null
})

const handleAnswer = (index) => {
  quizStore.answerQuestion(index, currentQuestionFromRoute.value)
}

const startMainTimer = () => {
  // Xóa bất kỳ timer chính nào đang chạy
  if (mainTimerInterval) {
    clearInterval(mainTimerInterval)
  }

  // Khởi tạo lại thời gian
  mainTimer.value = MAIN_TIMER_DURATION

  // Bắt đầu đếm ngược
  mainTimerInterval = setInterval(() => {
    if (mainTimer.value > 0) {
      mainTimer.value--
    } else {
      clearInterval(mainTimerInterval)
      navigateToResult()
    }
  }, 1000)
}

const startNavigationTimer = () => {
  // Xóa bất kỳ timer điều hướng nào đang chạy
  if (navigationTimerInterval) {
    clearInterval(navigationTimerInterval)
  }

  // Khởi tạo lại thời gian và hiển thị overlay
  navigationTimer.value = NAVIGATION_TIMER_DURATION
  isNavigating.value = true

  // Bắt đầu đếm ngược cho chuyển câu hỏi
  navigationTimerInterval = setInterval(() => {
    if (navigationTimer.value > 0) {
      navigationTimer.value--
    } else {
      clearInterval(navigationTimerInterval)
      navigateToNextQuestion()
    }
  }, 1000)
}

const startTimerAndNextQuestion = () => {
  // Dừng timer chính khi người dùng đã trả lời
  if (mainTimerInterval) {
    clearInterval(mainTimerInterval)
  }

  // Bắt đầu timer chuyển câu hỏi
  startNavigationTimer()
}

const navigateToNextQuestion = () => {
  isNavigating.value = false
  navigationTimer.value = NAVIGATION_TIMER_DURATION
  if (currentQuestionFromRoute.value + 1 < quizStore.questions.length) {
    router.push({ name: 'Question', params: { id: currentQuestionFromRoute.value + 1 } })
  } else {
    router.push({ name: 'Result' })
  }
}

const navigateToResult = () => {
  isNavigating.value = false
  // Xóa timer điều hướng nếu nó đang chạy
  if (navigationTimerInterval) {
    clearInterval(navigationTimerInterval)
  }
  router.push({ name: 'Result' })
}

// Bắt đầu timer chính khi component được mount hoặc khi câu hỏi thay đổi
onMounted(() => {
  startMainTimer()
})

watch(currentQuestionFromRoute, () => {
  startMainTimer()
})

// Dọn dẹp tất cả các timer khi component bị unmount
onBeforeUnmount(() => {
  if (mainTimerInterval) {
    clearInterval(mainTimerInterval)
  }
  if (navigationTimerInterval) {
    clearInterval(navigationTimerInterval)
  }
})

// Định dạng lại timer chính thành MM:SS
const formattedTimer = computed(() => {
  const minutes = Math.floor(mainTimer.value / 60)
  const seconds = mainTimer.value % 60
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh nếu cần */
</style>