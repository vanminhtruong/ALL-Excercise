<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/organisms/Navbar.vue'
</script>

<template>
  <div>
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  @apply container mx-auto;
}
</style>