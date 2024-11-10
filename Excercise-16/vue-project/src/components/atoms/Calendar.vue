<template>
  <div class="calendar-container">
    <VCalendar 
      v-model="selectedDate" 
      :attributes="attributes" 
      @dayclick="onDateChange" 
      class="matrix-calendar ml-[50%] translate-x-[-50%] mt-[30px]"
      transparent
      borderless
      :masks="{
        weekdays: 'WWW',
      }"
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
:deep(.matrix-calendar),
:deep(.vc-container),
:deep(.vc-pane),
:deep(.vc-header),
:deep(.vc-weeks),
:deep(.vc-day) {
  background-color: #000 !important;
  border: none !important;
  color: #00ff00 !important;
}

/* Style cho container chính */
.matrix-calendar {
  background-color: rgba(0, 0, 0, 0.9) !important;
  color: #00ff00 !important;
  border: 2px solid #00ff00 !important;
  box-shadow: 0 0 10px #00ff00 !important;
}

/* Override tất cả các phần tử con */
.matrix-calendar :deep(*) {
  color: #00ff00 !important;
  background-color: transparent !important;
  border-color: #00ff00 !important;
}

.matrix-calendar :deep(.vc-title),
.matrix-calendar :deep(.vc-arrow),
.matrix-calendar :deep(.vc-weekday) {
  color: #00ff00 !important;
  font-weight: bold;
  text-shadow: 0 0 5px #00ff00;
}

.matrix-calendar :deep(.vc-day) {
  background-color: rgba(0, 0, 0, 0.8) !important;
  transition: all 0.3s ease;
}

.matrix-calendar :deep(.vc-day:hover) {
  background-color: rgba(0, 255, 0, 0.2) !important;
  box-shadow: 0 0 15px #00ff00 !important;
}

.matrix-calendar :deep(.vc-day-content) {
  color: #00ff00 !important;
  height: 32px !important;
  width: 32px !important;
  position: relative;
  z-index: 1;
}

.matrix-calendar :deep(.vc-day-content:hover) {
  background-color: rgba(0, 255, 0, 0.3) !important;
  color: #ffffff !important;
  font-weight: bold;
}

.matrix-calendar :deep(.vc-highlight) {
  background-color: rgba(0, 255, 0, 0.2) !important;
  border: 1px solid #00ff00 !important;
}

.matrix-calendar :deep(.vc-day.is-today) {
  background-color: rgba(0, 255, 0, 0.15) !important;
}

.matrix-calendar :deep(.vc-day.is-today .vc-day-content) {
  color: #ffffff !important;
  font-weight: bold;
  text-shadow: 0 0 5px #00ff00;
}

.matrix-calendar :deep(.vc-day.is-selected) {
  background-color: rgba(0, 255, 0, 0.3) !important;
}

.matrix-calendar :deep(.vc-day.is-selected .vc-day-content) {
  color: #ffffff !important;
  font-weight: bold;
  text-shadow: 0 0 5px #00ff00;
}

/* Đảm bảo không có màu nền trắng */
.matrix-calendar :deep(.vc-popover-content) {
  background-color: rgba(0, 0, 0, 0.95) !important;
  border: 1px solid #00ff00 !important;
  color: #00ff00 !important;
}

/* Xóa tất cả borders mặc định */
.matrix-calendar :deep(.vc-border),
.matrix-calendar :deep(.vc-border-2),
.matrix-calendar :deep(.vc-border-3) {
  border: none !important;
}
</style>