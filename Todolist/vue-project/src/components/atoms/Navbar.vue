<template>
  <nav class="bg-blue-600 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-white text-xl font-bold">TodoList</RouterLink>
      <div class="space-x-4">
        <RouterLink to="/" class="text-white hover:underline">Home</RouterLink>
        <RouterLink to="/tasks" class="text-white hover:underline">Tasks</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>