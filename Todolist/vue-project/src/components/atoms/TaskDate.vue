<template>
  <div>
    <span v-if="!isEditing">{{ formattedDate }}</span>
    <input
      v-else
      v-model="editedDate"
      @blur="updateDate"
      type="date"
      class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      required
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue'

const props = defineProps({
  isEditing: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update-date'])

const editedDate = ref(props.date)

watch(() => props.date, (newVal) => {
  if (!props.isEditing) {
    editedDate.value = newVal
  }
})

const updateDate = () => {
  emits('update-date', editedDate.value)
}

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString()
})
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>