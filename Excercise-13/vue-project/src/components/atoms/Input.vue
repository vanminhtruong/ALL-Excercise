<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="border p-2 rounded w-full"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
/* Thêm kiểu dáng cụ thể cho input tại đây */
</style>