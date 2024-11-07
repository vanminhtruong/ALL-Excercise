<template>
  <form @submit.prevent="submitTask" class="flex flex-col space-y-2">
    <input 
      v-model="title" 
      type="text" 
      placeholder="Tên công việc" 
      class="p-2 border rounded" 
      required 
    />
    <input 
      v-model="date" 
      type="date" 
      class="p-2 border rounded" 
      required 
    />
    <button type="submit" class="bg-blue-500 text-white p-2 rounded">
      Thêm Công Việc
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../../stores/taskStore'
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs'

const title = ref('')
const date = ref(dayjs().format('YYYY-MM-DD'))

const taskStore = useTaskStore()
const toast = useToast()

const submitTask = () => {
  const newTask = {
    id: Date.now(),
    title: title.value,
    date: dayjs(date.value).format('YYYY-MM-DD'),
  }
  console.log('Submitting task:', newTask) // Debug
  taskStore.addTask(newTask)
  taskStore.setDate(newTask.date) // Update date in store to display immediately
  toast.success('Đã thêm công việc thành công!')
  title.value = ''
  date.value = dayjs().format('YYYY-MM-DD')
}
</script>

<style scoped>
/* Thêm style nếu cần */
</style>