<template>
  <div class="date-range-picker">
    <label>Từ:</label>
    <input type="date" v-model="startDate" @change="updateDateRange" />
    <label>Đến:</label>
    <input type="date" v-model="endDate" @change="updateDateRange" />
  </div>
</template>

<script setup>
import { useChartDataStore } from '../../stores/chartData'

const chartDataStore = useChartDataStore()

const startDate = chartDataStore.startDate
const endDate = chartDataStore.endDate

const updateDateRange = () => {
  chartDataStore.setDateRange(startDate.value, endDate.value)
}
</script>

<style lang="scss" scoped>
.date-range-picker {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  label {
    margin: 0 0.5rem 0 1rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>