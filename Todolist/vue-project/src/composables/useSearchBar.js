import { ref, watch } from 'vue'
import { useTasksStore } from '../stores/tasksStore'

export function useSearchBar() {
  const tasksStore = useTasksStore()
  const searchQuery = ref('')

  const applySearch = () => {
    tasksStore.setSearchQuery(searchQuery.value)
  }

  watch(searchQuery, () => {
    applySearch()
  })

  return {
    searchQuery,
    applySearch,
  }
}