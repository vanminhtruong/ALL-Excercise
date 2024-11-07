<template>
  <div class="card border rounded shadow p-4">
    <!-- <component :is="type" class="mb-4"> -->
    <slot name="content"></slot>
    <!-- </component> -->
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'div'
  }
})
</script>

<style scoped>
.card {
  max-width: 400px;
}
</style>