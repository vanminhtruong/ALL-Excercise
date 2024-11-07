// src/stores/userStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 1. State: List of users
  const users = ref([
    { id: 1, name: 'Nguyen Van A', email: 'a@example.com' },
    { id: 2, name: 'Tran Thi B', email: 'b@example.com' },
    { id: 3, name: 'Le Van C', email: 'c@example.com' },
    { id: 4, name: 'Phan Thi D', email: 'd@example.com' },
    { id: 5, name: 'Hoang Van E', email: 'e@example.com' },
    { id: 6, name: 'Dang Thi F', email: 'f@example.com' },
    { id: 7, name: 'Bui Van G', email: 'g@example.com' },
    { id: 8, name: 'Vo Thi H', email: 'h@example.com' },
    { id: 9, name: 'Do Van I', email: 'i@example.com' },
    { id: 10, name: 'Ngo Thi J', email: 'j@example.com' },
    { id: 11, name: 'Mai Van K', email: 'k@example.com' },
    { id: 12, name: 'Pham Thi L', email: 'l@example.com' },
    // Add more users as needed for pagination
  ])

  // 2. Computed property for total users
  const totalUsers = computed(() => users.value.length)

  // 3. Method to add a new user
  const addUser = (user) => {
    users.value.push(user)
  }

  // 4. Method to edit an existing user
  const editUser = (updatedUser) => {
    const index = users.value.findIndex(user => user.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = updatedUser
    }
  }

  // 5. Method to delete a user
  const deleteUser = (id) => {
    users.value = users.value.filter(user => user.id !== id)
  }

  // 6. Return state and methods
  return { users, totalUsers, addUser, editUser, deleteUser }
})