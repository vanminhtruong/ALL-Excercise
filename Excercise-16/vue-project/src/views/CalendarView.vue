<!-- src/views/CalendarView.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Quản lý Công Việc với Lịch</h1>
    <div class="flex space-x-4">
      <div class="w-1/3">
        <Calendar />
        <AddTaskForm class="mt-4" />
        <div class="mt-4 flex space-x-2">
          <button 
            @click="setView('day')" 
            :class="{'bg-blue-500 text-white': view === 'day', 'bg-gray-200 text-gray-700': view !== 'day'}"
            class="px-3 py-1 rounded"
          >
            Ngày
          </button>
          <button 
            @click="setView('week')" 
            :class="{'bg-blue-500 text-white': view === 'week', 'bg-gray-200 text-gray-700': view !== 'week'}"
            class="px-3 py-1 rounded"
          >
            Tuần
          </button>
          <button 
            @click="setView('month')" 
            :class="{'bg-blue-500 text-white': view === 'month', 'bg-gray-200 text-gray-700': view !== 'month'}"
            class="px-3 py-1 rounded"
          >
            Tháng
          </button>
        </div>
      </div>
      <div class="w-2/3">
        <TaskList />
      </div>
    </div>
  </div>
</template>

<script setup>
import Calendar from '../components/atoms/Calendar.vue'
import TaskList from '../components/molecules/TaskList.vue'
import AddTaskForm from '../components/atoms/AddTaskForm.vue'
import { useTaskStore } from '../stores/taskStore'
import { computed, watch } from 'vue'

const taskStore = useTaskStore()

const setView = (newView) => {
  console.log(`Setting view to: ${newView}`) // Debug
  taskStore.setView(newView)
}

const view = computed(() => taskStore.filteredTasks.view)

// Debugging
watch(view, (newView) => {
  console.log(`View updated to: ${newView}`)
})
</script>

<style scoped>
/* Thêm style nếu cần */
</style>