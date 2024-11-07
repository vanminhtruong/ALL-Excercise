<template>
  <nav class="bg-blue-800 p-4 shadow-lg">
    <ul class="flex space-x-4 justify-center">
      <li>
        <RouterLink to="/" class="text-white hover:text-yellow-400 font-semibold">Home</RouterLink>
      </li>
      <li v-if="isQuizStarted">
        <RouterLink to="/result" class="text-white hover:text-yellow-400 font-semibold">Kết Quả</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useQuizStore } from '../../stores/quiz'

const quizStore = useQuizStore()

const isQuizStarted = computed(() => quizStore.answers.length > 0)
</script>

<style scoped>
/* Add any component-specific styles here */
</style>