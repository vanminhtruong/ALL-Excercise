<template>
  <div class="mt-8">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Danh Sách Công Việc</h2>

    <div v-if="selectedTasks.length > 0" class="mb-6 flex items-center space-x-4">
      <span class="text-gray-700">{{ selectedTasks.length }} đã chọn</span>
      <Button variant="secondary" @click="selectAll">Chọn Tất Cả</Button>
      <Button variant="danger" @click="deleteSelected">Xóa Đã Chọn</Button>
      <Button variant="tertiary" @click="cancelSelection">Hủy Chọn</Button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow-md">
        <thead class="bg-blue-50">
          <tr>
            <th class="w-[5%] px-4 py-3">
              <Checkbox 
                v-show="selectedTasks.length > 0"
                :model-value="allSelected"
                @update:model-value="toggleSelectAll"
              />
            </th>
            <th class="w-[20%] px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Hành Động
            </th>
            <th class="w-[10%] px-4 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
              Hoàn Thành
            </th>
            <th class="w-[30%] px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Nội Dung
            </th>
            <th class="w-[15%] px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Trạng Thái
            </th>
            <th class="w-[20%] px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Ngày
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <TaskItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            :isSelected="selectedTasks.includes(task.id)"
            @select="handleSelection"
            @update-completion="handleCompletion"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TaskItem from './TaskItem.vue'
import Button from '../atoms/Button.vue'
import Checkbox from '../atoms/Checkbox.vue'
import { useTasksStore } from '../../stores/tasksStore'

const tasksStore = useTasksStore()
const selectedTasks = ref([])
const tasks = computed(() => tasksStore.filteredTasks)

const allSelected = computed({
  get: () => selectedTasks.value.length === tasks.value.length && tasks.value.length > 0,
  set: (value) => toggleSelectAll(value)
})

const selectAll = () => {
  selectedTasks.value = tasks.value.map(task => task.id)
}

const toggleSelectAll = (value) => {
  selectedTasks.value = value ? tasks.value.map(task => task.id) : []
}

const handleSelection = (taskId, isSelected) => {
  if (isSelected) {
    if (!selectedTasks.value.includes(taskId)) {
      selectedTasks.value.push(taskId)
    }
  } else {
    selectedTasks.value = selectedTasks.value.filter(id => id !== taskId)
  }
}

const handleCompletion = (taskId, isCompleted) => {
  tasksStore.toggleTaskCompletion(taskId, isCompleted)
}

const deleteSelected = () => {
  selectedTasks.value.forEach(taskId => {
    tasksStore.deleteTask(taskId)
  })
  selectedTasks.value = []
}

const cancelSelection = () => {
  selectedTasks.value = []
}
</script>

<style scoped>
.overflow-x-auto {
  @apply rounded-lg border border-gray-200;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

tr:hover {
  @apply bg-gray-50;
}
</style>