<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-600">
    <h1 class="text-5xl font-extrabold text-white mb-12">Chào mừng bạn đến với Ai Là Triệu Phú!</h1>
    <Button @click="startQuiz" class="w-64">Bắt Đầu Trò Chơi</Button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from '../components/atoms/Button.vue'

const router = useRouter()

const startQuiz = () => {
  router.push({ name: 'Question', params: { id: 0 } })
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>