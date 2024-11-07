<template>
  <div @click="selectOption" :class="optionClasses">
    <label class="flex items-center w-full">
      <input
        type="radio"
        :value="index"
        :checked="props.modelValue === index"
        @change="selectOption"
        class="form-radio h-6 w-6 text-yellow-400 focus:ring-yellow-400"
      />
      <span class="ml-3 text-lg">{{ option }}</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  option: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const selectOption = () => {
  emit('update:modelValue', props.index)
}

const optionClasses = computed(() => ({
  'border border-yellow-400 rounded-lg p-4': true,
  'bg-yellow-500': props.modelValue === props.index,
  'hover:bg-yellow-600': props.modelValue !== props.index,
  'transition-colors duration-300 cursor-pointer': true,
}))
</script>

<style scoped>
/* Add any component-specific styles here */
</style>