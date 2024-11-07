<template>
  <div>
    <span v-if="!isEditing" :class="{'line-through text-gray-500': completed}">
      {{ content }}
    </span>
    <input
      v-else
      v-model="editedContent"
      @blur="updateContent"
      type="text"
      class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
      required
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const props = defineProps({
  isEditing: {
    type: Boolean,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update-content'])

const editedContent = ref(props.content)

watch(() => props.content, (newVal) => {
  if (!props.isEditing) {
    editedContent.value = newVal
  }
})

const updateContent = () => {
  emits('update-content', editedContent.value)
}
</script>

<style scoped>
/* Thêm bất kỳ kiểu dáng bổ sung nào nếu cần */
</style>