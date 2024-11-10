import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChartTypeStore = defineStore('chartType', () => {
  const selectedType = ref('bar')
  
  const chartOptions = [
    { label: 'Cột', value: 'bar' },
    { label: 'Đường', value: 'line' },
    { label: 'Tròn', value: 'pie' },
  ]

  const setChartType = (type) => {
    selectedType.value = type
  }

  return {
    selectedType,
    chartOptions,
    setChartType,
  }
})