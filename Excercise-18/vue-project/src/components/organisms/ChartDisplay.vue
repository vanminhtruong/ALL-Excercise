<template>
  <div class="chart-display">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useChartDataStore } from '../../stores/chartData'
import { useChartTypeStore } from '../../stores/chartType'

Chart.register(...registerables)

const chartRef = ref(null)
const chartDataStore = useChartDataStore()
const chartTypeStore = useChartTypeStore()

let chartInstance = null

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }
  chartInstance = new Chart(chartRef.value, {
    type: chartTypeStore.selectedType,
    data: chartDataStore.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })
}

watch(
  () => [chartDataStore.chartData, chartTypeStore.selectedType],
  () => {
    renderChart()
  }
)

onMounted(() => {
  renderChart()
})
</script>

<style lang="scss" scoped>
.chart-display {
  position: relative;
  height: 400px;
  width: 100%;
}
</style>