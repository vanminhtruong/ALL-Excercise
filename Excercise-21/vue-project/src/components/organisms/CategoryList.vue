<template>
  <div class="category-list">
    <h2>{{ category.name }}</h2>
    <ProductList :initialProducts="category.products" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import ProductList from '../molecules/ProductList.vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.category-list {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;

  h2 {
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }
}
</style>