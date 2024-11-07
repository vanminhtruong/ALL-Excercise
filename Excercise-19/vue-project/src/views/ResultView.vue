<template>
  <div class="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-4xl font-extrabold text-green-600 mb-4">Kết Quả</h2>
      <p class="text-2xl mb-6">Bạn đã đạt được <span class="font-bold">{{ score }}</span>/<span class="font-bold">{{ total }}</span> điểm.</p>
      
      <div class="space-y-4">
        <div 
          v-for="(question, index) in quizStore.questions" 
          :key="index" 
          class="p-4 border rounded-lg flex items-start"
        >
          <div class="mr-4">
            <span 
              v-if="isCorrect(index)" 
              class="text-green-600 text-2xl"
              aria-label="Correct Answer"
            >
              ✔️
            </span>
            <span 
              v-else 
              class="text-red-600 text-2xl"
              aria-label="Incorrect Answer"
            >
              ❌
            </span>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">{{ index + 1 }}. {{ question.question }}</h3>
            <p 
              class="text-lg {{ isCorrect(index) ? 'text-green-600' : 'text-red-600' }}"
            >
              <span class="font-bold">Đáp án của bạn đã chọn:</span> {{ userAnswer(index) }}
            </p>
            <p v-if="!isCorrect(index)" class="text-lg text-green-600">
              <span class="font-bold">Đáp án đúng:</span> {{ correctAnswer(index) }}
            </p>
          </div>
        </div>
      </div>
      
      <div class="mt-6 flex justify-center">
        <Button @click="restartQuiz" class="w-48">Làm Lại</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuizStore } from '../stores/quiz'
import Button from '../components/atoms/Button.vue'
import { useRouter } from 'vue-router'

const quizStore = useQuizStore()
const router = useRouter()

const score = computed(() => quizStore.score)
const total = computed(() => quizStore.questions.length)

const restartQuiz = () => {
  // Reset câu trả lời trong store
  quizStore.resetQuiz()
  
  // Di chuyển về màn hình Home
  router.push({ name: 'Home' })
}

const userAnswer = (index) => {
  const answerIndex = quizStore.answers[index]
  return answerIndex !== undefined ? quizStore.questions[index].options[answerIndex] : 'Không trả lời'
}

const correctAnswer = (index) => {
  const correctIndex = quizStore.questions[index].correct
  return quizStore.questions[index].options[correctIndex]
}

const isCorrect = (index) => {
  return quizStore.answers[index] === quizStore.questions[index].correct
}
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh nếu cần */
</style>