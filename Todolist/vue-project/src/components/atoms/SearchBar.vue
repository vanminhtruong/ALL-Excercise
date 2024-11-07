<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      @input="applySearch"
      type="text"
      placeholder="Search tasks..."
      class="search-input"
    />
  </div>
</template>

<script setup>
import { useSearchBar } from '../../composables/useSearchBar'

const { searchQuery, applySearch } = useSearchBar()
</script>

<style scoped>
.search-bar {
  @apply flex-1;
}

.search-input {
  @apply w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out;
}
</style>