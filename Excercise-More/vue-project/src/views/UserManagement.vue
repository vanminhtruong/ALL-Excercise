<!-- src/views/UserManagement.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Quản Lý Người Dùng</h1>
    
    <!-- 1. Search Bar -->
    <SearchBar @search="handleSearch" />
    
    <!-- 2. User List -->
    <UserList :users="paginatedUsers" />
    
    <!-- 3. Pagination Controls -->
    <PaginationControls 
      :currentPage="currentPage" 
      :totalPages="totalPages" 
      @change-page="changePage" 
    />
  </div>
</template>

<script setup>
// 1. Import necessary modules and components
import { useUserManagement } from '../composables/useUserManagement'
import SearchBar from '../components/SearchBar.vue'
import UserList from '../components/UserList.vue'
import PaginationControls from '../components/PaginationControls.vue'

// 2. Utilize the composable
const {
  searchQuery,
  currentPage,
  usersPerPage,
  filteredUsers,
  totalPages,
  paginatedUsers,
  handleSearch,
  changePage
} = useUserManagement()
</script>
