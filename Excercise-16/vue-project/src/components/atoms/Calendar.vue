<!-- src/components/atoms/Calendar.vue -->
<template>
  <div>
    <VCalendar 
      v-model="selectedDate" 
      :attributes="attributes" 
      @dayclick="onDateChange" 
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTaskStore } from '../../stores/taskStore'
import dayjs from 'dayjs'

const selectedDate = ref(new Date())
const taskStore = useTaskStore()

const onDateChange = ({ date }) => {
  const formattedDate = dayjs(date).format('YYYY-MM-DD')
  console.log(`Date clicked: ${formattedDate}`) // Debug
  taskStore.setDate(formattedDate)
}

const attributes = ref([
  {
    key: 'today',
    highlight: true,
    dates: new Date(),
  }
])

watch(selectedDate, (newDate) => {
  onDateChange({ date: newDate })
  console.log(`Selected date changed to: ${dayjs(newDate).format('YYYY-MM-DD')}`) // Debug
})
</script>

<style scoped>
/* Thêm style nếu cần */
</style>