<template>
  <div class="flex space-x-2">
    <Button @click.stop="handlePrimaryClick" variant="primary">
      {{ isEditing ? 'Save' : 'Edit' }}
    </Button>
    <Button
      v-if="isEditing"
      @click.stop="handleCancelEdit"
      variant="secondary"
    >
      Cancel
    </Button>
    <Button
      v-else
      @click.stop="handleDeleteTask"
      variant="danger"
    >
      Delete
    </Button>
  </div>
</template>

<script setup>
import Button from './Button.vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isEditing: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['edit', 'save', 'cancel', 'delete'])

let renderCount = 0

const handlePrimaryClick = () => {
  renderCount++
  if (props.isEditing) {
    emits('save')
    console.log("Actions save đã được gọi:", renderCount, "lần")
  } else {
    emits('edit')
    console.log("Actions edit đã được gọi:", renderCount, "lần")
  }
}

const handleCancelEdit = () => {
  emits('cancel')
}

const handleDeleteTask = () => {
  emits('delete')
}
</script>

<style scoped>
/* Thêm các kiểu dáng bổ sung nếu cần */
</style>