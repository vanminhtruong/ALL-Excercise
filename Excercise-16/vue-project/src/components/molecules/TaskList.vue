<template>
  <div class="mt-4">
    <h2 class="text-xl font-bold mb-2">Công việc {{ viewText }} {{ currentDate }}</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="p-2 border-b" @click="()=>console.log('Task',task)">
        {{ task.title }}
      </li>
    </ul>
    <p v-if="tasks.length === 0" class="text-gray-500 mt-2">Không có công việc nào.</p>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useTaskStore } from '../../stores/taskStore'

onMounted(() => {
  console.log('TaskList mounted') // Debug
})

const taskStore = useTaskStore()

const view = computed(() => taskStore.filteredTasks.view)
const currentDate = computed(() => taskStore.filteredTasks.date)
const tasks = computed(() => taskStore.filteredTaskList)

const viewText = computed(() => {
  if (view.value === 'day') return 'ngày'
  if (view.value === 'week') return 'tuần'
  if (view.value === 'month') return 'tháng'
  return ''
})

// Debugging: Watch for changes in tasks
watch(tasks, (newTasks) => {
  console.log('Tasks updated:', newTasks)
})

// Initial debug log
console.log('Computed tasks:', tasks.value)
</script>

<style scoped>
/* Thêm style nếu cần */
</style>