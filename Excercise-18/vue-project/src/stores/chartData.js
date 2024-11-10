import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChartDataStore = defineStore('chartData', () => {
  const startDate = ref('')
  const endDate = ref('')
  const chartData = ref({
    labels: [],
    datasets: [],
  })

  const setDateRange = (start, end) => {
    startDate.value = start
    endDate.value = end
    fetchData()
  }

  const fetchData = () => {
    chartData.value = {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'],
      datasets: [
        {
          label: 'Doanh số',
          data: [100, 200, 150, 300],
          backgroundColor: 'rgba(52, 152, 219, 0.5)',
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 1,
        },
      ],
    }
  }

  return {
    startDate,
    endDate,
    chartData,
    setDateRange,
  }
})
