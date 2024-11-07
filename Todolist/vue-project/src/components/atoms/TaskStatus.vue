<template>
  <div>
    <select
      v-if="!isEditing"
      :value="status"
      @change="updateStatus($event.target.value)"
      class="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
    >
      <option value="to do">To Do</option>
      <option value="done">Done</option>
      <option value="reject">Reject</option>
    </select>

    <select
      v-else
      :value="editedStatus"
      @change="updateStatusField($event.target.value)"
      class="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
      required
    >
      <option value="to do">To Do</option>
      <option value="done">Done</option>
      <option value="reject">Reject</option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  isEditing: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update-status'])

const editedStatus = ref(props.status)

watch(() => props.status, (newVal) => {
  if (!props.isEditing) {
    editedStatus.value = newVal
  }
})

const updateStatus = (newStatus) => {
  emits('update-status', newStatus)
}

const updateStatusField = (newStatus) => {
  emits('update-status', newStatus)
}
</script>