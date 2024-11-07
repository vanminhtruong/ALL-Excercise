<template>
  <div class="task-filters">
    <Button variant="secondary" @click="setFilter('all')">All</Button>
    <Button variant="secondary" @click="setFilter('to do')">To Do</Button>
    <Button variant="secondary" @click="setFilter('done')">Done</Button>
    <Button variant="secondary" @click="setFilter('reject')">Reject</Button>
  </div>
</template>

<script setup>
import Button from '../atoms/Button.vue'
import { useTasksStore } from '../../stores/tasksStore'

const tasksStore = useTasksStore()

const setFilter = (filter) => {
  tasksStore.setFilter(filter)
}
</script>

<style scoped>
.task-filters {
  @apply flex space-x-2;
}
</style>