<template>
  <div class="task-page">
    <TaskForm />
    <div class="filters-search">
      <TaskFilters />
      <SearchBar />
    </div>
    <TaskList :tasks="filteredTasks" /> <!-- Pass the tasks prop -->
  </div>
</template>

<script setup>
import TaskForm from '../molecules/TaskForm.vue'
import TaskFilters from '../molecules/TaskFilters.vue'
import TaskList from '../organisms/TaskList.vue'
import SearchBar from '../atoms/SearchBar.vue'
import { useTaskList } from '../../composables/useTaskList' // Import the composable

const { filteredTasks } = useTaskList() // Destructure filteredTasks from the composable
</script>

<style scoped>
.task-page {
  @apply max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6;
}

.filters-search {
  @apply flex flex-col md:flex-row md:space-x-4 mb-6;
}
</style>