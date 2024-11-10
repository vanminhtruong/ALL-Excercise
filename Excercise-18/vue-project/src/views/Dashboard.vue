<template>
  <div class="dashboard">
    <h1>Báo Cáo Thống Kê</h1>
    <DateRangePicker />
    <ChartSelector />
    <ChartDisplay />
  </div>
</template>

<script setup>
import ChartSelector from '../components/molecules/ChartSelector.vue'
import DateRangePicker from '../components/molecules/DateRangePicker.vue'
import ChartDisplay from '../components/organisms/ChartDisplay.vue'
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 2rem;
  background-color: #fff;
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>