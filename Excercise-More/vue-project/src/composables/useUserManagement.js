import { ref, computed, watch } from 'vue'
import { useUserStore } from '../stores/userStore'

// Remove the top-level store initialization
// const userStore = useUserStore()

export function useUserManagement() {
  // Initialize the store inside the function
  const userStore = useUserStore()

  // Reactive state
  const searchQuery = ref('')
  const currentPage = ref(1)
  const usersPerPage = 5

  // Computed properties
  const filteredUsers = computed(() => {
    if (searchQuery.value.trim() === '') {
      return userStore.users
    }
    return userStore.users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / usersPerPage)
  })

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * usersPerPage
    const end = start + usersPerPage
    return filteredUsers.value.slice(start, end)
  })

  // Watchers
  watch(searchQuery, () => {
    currentPage.value = 1
  })

  // Methods
  const handleSearch = (query) => {
    searchQuery.value = query
  }

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  return {
    searchQuery,
    currentPage,
    usersPerPage,
    filteredUsers,
    totalPages,
    paginatedUsers,
    handleSearch,
    changePage
  }
}