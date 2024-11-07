<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Item from './components/item.vue';
import Check from './components/Check.vue';
import List from './components/List.vue';
</script>

<template>
  <div class="wrapper">
    <div>
      <List />
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col items-center justify-center min-h-screen bg-gray-100;
}
</style>
