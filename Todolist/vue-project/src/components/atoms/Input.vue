<template>
  <input
    :type="type"
    :placeholder="placeholder"
    v-model="inputValue"
    class="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
})

const emits = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

// Watch for changes in the prop and update the local inputValue accordingly
watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal
  }
)

// Emit the update when inputValue changes
watch(inputValue, (newVal) => {
  emits('update:modelValue', newVal)
})
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>