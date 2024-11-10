<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/organisms/Navbar.vue'
import MatrixBackground from './components/atoms/MatrixBackground.vue'
</script>

<template>
  <div>
    <MatrixBackground />
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  @apply container mx-auto;
}
</style>