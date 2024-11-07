<template>
  <select
    class="border p-2 rounded w-full"
    v-bind="$attrs"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <slot></slot>
  </select>
</template>

<script setup>

</script>