<template>
  <div>
    <h2 class="text-3xl font-semibold text-white mb-6">{{ question }}</h2>
    <div class="grid grid-cols-2 gap-4">
      <Option
        v-for="(option, index) in options"
        :key="index"
        :option="option"
        :index="index"
        v-model="selectedOption"
        class="bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300 p-4 rounded-lg cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup>
import Option from './Option.vue' 
import { ref, watch } from 'vue'

const props = defineProps({
  question: String,
  options: Array,
  selected: Number
})

const emit = defineEmits(['update:selected'])

const selectedOption = ref(props.selected !== undefined ? props.selected : null)

watch(selectedOption, (newVal) => {
  emit('update:selected', newVal)
})

watch(() => props.question, () => {
  selectedOption.value = props.selected !== undefined ? props.selected : null
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>