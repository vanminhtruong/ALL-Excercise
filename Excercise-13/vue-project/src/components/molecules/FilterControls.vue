<template>
  <div class="flex flex-col md:flex-row md:space-x-4 mb-4">
    <Input
      v-model="localSearchQuery"
      placeholder="Tìm kiếm theo tên"
      class="mb-2 md:mb-0"
    />
    <Select
      v-model="localSelectedCategory"
      class="mb-2 md:mb-0"
    >
      <option value="">Tất cả danh mục</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </Select>
    <Select
      v-model="localSortOption"
      class="mb-2 md:mb-0"
    >
      <option value="">Sắp xếp theo</option>
      <option value="price-asc">Giá: Thấp đến Cao</option>
      <option value="price-desc">Giá: Cao đến Thấp</option>
      <option value="name-asc">Tên: A đến Z</option>
      <option value="name-desc">Tên: Z đến A</option>
    </Select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Input from '../atoms/Input.vue'
import Select from '../atoms/Select.vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  },
  selectedCategory: {
    type: String,
    default: ''
  },
  sortOption: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:searchQuery', 'update:selectedCategory', 'update:sortOption'])

const localSearchQuery = ref(props.searchQuery)
const localSelectedCategory = ref(props.selectedCategory)
const localSortOption = ref(props.sortOption)

// Watchers để phát ra sự kiện khi local state thay đổi
watch(localSearchQuery, (newVal) => {
  emits('update:searchQuery', newVal)
})

watch(localSelectedCategory, (newVal) => {
  emits('update:selectedCategory', newVal)
})

watch(localSortOption, (newVal) => {
  emits('update:sortOption', newVal)
})
</script>

<style scoped>
/* Thêm kiểu dáng cụ thể cho bộ lọc tại đây */
</style>