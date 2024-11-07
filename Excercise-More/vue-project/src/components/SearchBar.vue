```vue:src/components/SearchBar.vue
<template>
  <div class="mb-4">
    <input
      type="text"
      v-model="searchQuery"
      @input="emitSearch"
      placeholder="Tìm kiếm theo tên người dùng..."
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['search'])

const searchQuery = ref('')

// Emit the search query whenever it changes
const emitSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<style scoped>
/* Custom styles if needed */
</style>