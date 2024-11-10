<template>
  <div class="warehouse-manager">
    <h1>Quản Lý Kho Hàng</h1>
    <div class="categories">
      <CategoryList
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryList from '../components/organisms/CategoryList.vue'

const categories = ref([
  {
    id: 1,
    name: 'Danh Mục A',
    products: [
      { id: 1, name: 'Sản Phẩm 1', description: 'Mô tả sản phẩm 1' },
      { id: 2, name: 'Sản Phẩm 2', description: 'Mô tả sản phẩm 2' }
    ]
  },
  {
    id: 2,
    name: 'Danh Mục B',
    products: [
      { id: 3, name: 'Sản Phẩm 3', description: 'Mô tả sản phẩm 3' },
      { id: 4, name: 'Sản Phẩm 4', description: 'Mô tả sản phẩm 4' }
    ]
  }
])
</script>

<style scoped lang="scss">
.warehouse-manager {
  padding: 2rem;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #34495e;
  }

  .categories {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>