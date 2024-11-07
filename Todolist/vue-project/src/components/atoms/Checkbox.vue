<template>
  <input
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Thêm các kiểu dáng bổ sung nếu cần */
</style>