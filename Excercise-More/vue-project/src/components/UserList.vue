<!-- src/components/UserList.vue -->
<template>
  <ul>
    <UserItem 
      v-for="user in users" 
      :key="user.id" 
      :user="user" 
    />
  </ul>
</template>

<script setup>
// 1. Import necessary modules and components
import { defineProps } from 'vue'
import UserItem from './UserItem.vue'

// 2. Define props
const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>