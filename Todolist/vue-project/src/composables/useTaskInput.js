// src/composables/useTaskInput.js
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasksStore'

export const useTaskInput = () => {
  const taskContent = ref('')
  const taskDate = ref('')
  const taskStatus = ref('to do')
  
  const tasksStore = useTasksStore()

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      content: taskContent.value,
      date: taskDate.value,
      status: taskStatus.value,
      completed: false,
    }
    tasksStore.addTask(newTask)
    // Reset các trường input
    taskContent.value = ''
    taskDate.value = ''
    taskStatus.value = 'to do'
  }

  return {
    taskContent,
    taskDate,
    taskStatus,
    addTask,
  }
}