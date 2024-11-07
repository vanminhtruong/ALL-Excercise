<template>
  <button 
    @click="handleClick" 
    :disabled="disabled"
    class="px-6 py-3 bg-yellow-400 text-gray-800 font-bold rounded-lg hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh nếu cần */
</style>