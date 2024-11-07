<template>
  <li class="p-4 bg-white rounded-lg shadow-md flex items-center">
    <!-- Checkbox cho Bulk Selection -->
    <input
      v-if="isBulkSelecting"
      type="checkbox"
      :checked="isSelected"
      @change="toggleSelect"
      class="form-checkbox h-5 w-5 text-blue-600 mr-4"
    />

    <div class="flex-1">
      <h3 class="text-xl font-medium text-gray-800">{{ note.title }}</h3>
      <p class="text-gray-600">{{ note.content }}</p>
    </div>

    <div class="flex space-x-2">
      <button v-if="!isBulkSelecting" @click="$emit('edit-note', note)" class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300">
        Sửa
      </button>
      <button v-if="!isBulkSelecting" @click="$emit('delete-note', note.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
        Xóa
      </button>
    </div>
    
  </li>
</template>

<script setup>
const props = defineProps({
  note: {
    type: Object,
    required: true
  },
  isBulkSelecting: {
    type: Boolean,
    default: false
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit-note', 'delete-note', 'toggle-select'])

const toggleSelect = () => {
  emit('toggle-select', props.note.id)
}
</script>

<style scoped lang="scss">
li {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    color: #4a5568;
  }

  button {
    @apply px-3 py-1 rounded text-white;
  }
}
</style>