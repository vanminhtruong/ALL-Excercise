<template>
  <div class="chart-selector">
    <label for="chart-type">Chọn loại biểu đồ:</label>
    <Select
      id="chart-type"
      v-model="selectedType"
      :options="chartOptions"
      @update:modelValue="onTypeChange"
    />
  </div>
</template>

<script setup>
import Select from '../atoms/Select.vue'
import { useChartTypeStore } from '../../stores/chartType'

const chartTypeStore = useChartTypeStore()

const selectedType = chartTypeStore.selectedType
const chartOptions = chartTypeStore.chartOptions

const onTypeChange = (value) => {
  chartTypeStore.setChartType(value)
}
</script>

<style lang="scss" scoped>
.chart-selector {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  label {
    margin-right: 0.5rem;
  }
}
</style>