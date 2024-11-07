// src/composables/useFilters.js
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasksStore'

export function useFilters() {
  const tasksStore = useTasksStore()

  const statuses = ['to do', 'done', 'reject']
  const currentFilter = ref('all')

  const applyFilter = () => {
    tasksStore.setFilter(currentFilter.value)
  }

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return {
    statuses,
    currentFilter,
    applyFilter,
    capitalize,
  }
}