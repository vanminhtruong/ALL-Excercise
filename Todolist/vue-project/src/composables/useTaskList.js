import { computed } from 'vue'
import { useTasksStore } from '../stores/tasksStore'

export function useTaskList() {
  const tasksStore = useTasksStore()
  const filteredTasks = computed(() => tasksStore.filteredTasks)
  
  return {
    filteredTasks,
  }
}