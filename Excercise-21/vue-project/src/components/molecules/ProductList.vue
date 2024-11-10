<template>
  <draggable v-model="products" @end="onEnd" class="product-list" item-key="id">
    <template #item="{ element }">
      <ProductCard :product="element" />
    </template>
  </draggable>
</template>

<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import ProductCard from '../atoms/ProductCard.vue'

const props = defineProps({
  initialProducts: {
    type: Array,
    required: true
  }
})

const products = ref([...props.initialProducts])

watch(products, (newVal) => {
  // Xử lý khi danh sách sản phẩm thay đổi
  // Ví dụ: Gửi dữ liệu lên server hoặc cập nhật trạng thái
})

const onEnd = (event) => {
  // Xử lý sự kiện khi kéo-thả kết thúc
  console.log('Kéo-thả kết thúc', event)
}
</script>

<style scoped lang="scss">
.product-list {
  min-height: 200px;
}
</style>