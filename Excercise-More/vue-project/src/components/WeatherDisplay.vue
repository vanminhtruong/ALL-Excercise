<template>
  <div class="bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg rounded-xl p-6 flex flex-col items-center space-y-4 transition transform hover:scale-105 duration-300">
    <img 
      :src="weather.icon" 
      :alt="weather.description" 
      class="w-32 h-32 drop-shadow-md" 
    />
    <div class="text-center">
      <h2 class="text-3xl font-bold text-white">{{ weather.city }}, {{ weather.country }}</h2>
      <p class="text-lg text-indigo-200 capitalize">{{ weather.description }}</p>
      <p class="text-5xl font-extrabold text-white">{{ weather.temperature }}°C</p>
    </div>
    <div class="bg-white bg-opacity-25 rounded-full px-4 py-2">
      <p class="text-white text-md">Thời gian hiện tại: <span class="font-semibold">{{ currentTime }}</span></p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  weather: {
    type: Object,
    required: true
  },
  currentTime: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>