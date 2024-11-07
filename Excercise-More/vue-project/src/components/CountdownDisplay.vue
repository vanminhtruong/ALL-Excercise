<template>
  <div class="mt-8 text-center animate-fade-in">
    <h2 class="text-3xl font-semibold text-gray-800">
      {{ formattedTime }}
    </h2>
    <button
      @click="$emit('stop')"
      class="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
    >
      Dừng Đếm Ngược
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  formattedTime: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
/* Thêm các style cụ thể cho component nếu cần */
</style>