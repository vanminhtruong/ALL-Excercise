<script setup>
import { defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['confirm'])

onMounted(() => {
  console.log(`Item component for ${props.product.name} has been created.`)
})

const confirmProduct = () => {
  emits('confirm', props.product.id)
}
</script>

<template>
  <div class="flex items-center justify-between p-2 border rounded">
    <span class="mr-4">{{ product.name }}</span>
    <button
      @click="confirmProduct"
      :disabled="product.isCheck"
      class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Xác nhận sản phẩm
    </button>
  </div>
</template>
