<!-- src/components/CartItem.vue -->
<template>
  <tr class="text-center">
    <td class="border px-4 py-2">{{ item.name }}</td>
    <td class="border px-4 py-2">${{ item.price }}</td>
    <td class="border px-4 py-2">
      <input 
        type="number" 
        :value="item.quantity" 
        @input="onQuantityChange($event.target.value)" 
        class="w-16 text-center border rounded"
        min="1"
      />
    </td>
    <td class="border px-4 py-2">${{ item.price * item.quantity }}</td>
    <td class="border px-4 py-2">
      <button 
        @click="removeItem(item.id)" 
        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Xóa
      </button>
    </td>
  </tr>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  removeItem: {
    type: Function,
    required: true
  },
  updateQuantity: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['remove-item', 'update-quantity'])

const onQuantityChange = (value) => {
  const quantity = parseInt(value)
  if (quantity > 0) {
    emit('update-quantity', props.item.id, quantity)
  }
}
</script>
