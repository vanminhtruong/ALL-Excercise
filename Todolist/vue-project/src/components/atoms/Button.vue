<template>
  <button
    :type="type"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
})

const buttonClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200'
    case 'danger':
      return 'px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200'
    case 'tertiary':
      return 'px-4 py-2 bg-transparent text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200'
    default:
      return 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200'
  }
})
</script>

<style scoped>
/* Thêm các kiểu dáng bổ sung nếu cần */
</style>