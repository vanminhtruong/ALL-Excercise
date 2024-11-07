<template>
  <div class="wrapper">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup>
import Navbar from './components/atoms/Navbar.vue'
</script>

<style scoped>
.wrapper {
  @apply bg-gray-100 min-h-screen;
}
</style>