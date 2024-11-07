<template>
  <div class="p-8">
    <h1 class="text-2xl mb-4">Dynamic Card Example</h1>
    <Card type="img">
      <template #content>
        <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="w-full h-auto" />
      </template>
      <template #footer>
        <p class="text-center">This is an image card.</p>
      </template>
    </Card>

    <Card type="video">
      <template #content>
        <video controls class="w-full">
          <source :src="videoSrc" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </template>
      <template #footer>
        <p class="text-center">This is a video card.</p>
      </template>
    </Card>

    <Card type="div">
      <template #content>
        <p>This is a text card. You can put any content here.</p>
      </template>
      <template #footer>
        <p class="text-center">This is a text card footer.</p>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from '../components/molecules/Card.vue'
import adamVideo from '../assets/video/adam.mp4'

const videoSrc = adamVideo
</script>

<style scoped>
/* Thêm các kiểu dáng cụ thể cho trang ở đây */
</style>