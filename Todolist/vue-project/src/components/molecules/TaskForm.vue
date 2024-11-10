<!-- src/components/molecules/TaskForm.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-8">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Thêm Công Việc Mới</h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nội dung công việc
          </label>
          <Input
            v-model="taskContent"
            placeholder="Nhập nội dung công việc..."
            class="form-input"
            required
          />
        </div>

        
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ngày thực hiện
          </label>
          <Input
            v-model="taskDate"
            type="date"
            class="form-input"
            required
          />
        </div>

        
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            v-model="taskStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          >
            <option value="to do">Todo</option>
            <option value="done">Done</option>
            <option value="reject">Reject</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <Button
          type="submit"
          variant="primary"
          class="px-6 py-2 transform hover:scale-105 transition-transform duration-200"
        >
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            Thêm Công Việc
          </span>
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import Input from '../atoms/Input.vue'
import Button from '../atoms/Button.vue'
import { useTaskInput } from '../../composables/useTaskInput'
import { useTasksStore } from '../../stores/tasksStore'
import { useToast } from 'vue-toastification'

// Khởi tạo store
const tasksStore = useTasksStore()

const { taskContent, taskDate, taskStatus } = useTaskInput()

const toast = useToast()

const handleSubmit = async () => {
  const newTask = {
    id: Date.now(),
    content: taskContent.value,
    date: taskDate.value,
    status: taskStatus.value,
    completed: false,
  }
  tasksStore.addTask(newTask)
  toast.success('Task add successfully!')
  taskContent.value = ''
  taskDate.value = ''
  taskStatus.value = 'to do'
}
</script>

<style scoped>
.form-group {
  @apply relative;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
         transition-colors duration-200;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white {
  animation: slideDown 0.3s ease-out;
}
</style>