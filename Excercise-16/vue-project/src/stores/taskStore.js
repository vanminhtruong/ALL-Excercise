import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'

export const useTaskStore = defineStore('task', () => {
  // Bước 1: Tải dữ liệu từ localStorage khi khởi tạo
  const storedTasks = localStorage.getItem('tasks')
  const tasks = ref(storedTasks ? JSON.parse(storedTasks) : [])

  const addTask = (task) => {
    tasks.value.push(task)
    console.log('Task added:', task) // Debug
  }

  const getTasksByDate = (date) => {
    const targetDate = dayjs(date)
    const result = tasks.value.filter(task => dayjs(task.date).isSame(targetDate, 'day'))
    console.log(`getTasksByDate(${date}) =>`, result) // Debug
    return result
  }

  const getTasksByWeek = (date) => {
    const startOfWeek = dayjs(date).startOf('week')
    const endOfWeek = dayjs(date).endOf('week')

    const result = tasks.value.filter(task => {
      const taskDate = dayjs(task.date)
      return (
        (taskDate.isAfter(startOfWeek) || taskDate.isSame(startOfWeek, 'day')) &&
        (taskDate.isBefore(endOfWeek) || taskDate.isSame(endOfWeek, 'day'))
      )
    })
    console.log(`getTasksByWeek(${date}) =>`, result) // Debug
    return result
  }

  const getTasksByMonth = (date) => {
    const startOfMonth = dayjs(date).startOf('month')
    const endOfMonth = dayjs(date).endOf('month')

    const result = tasks.value.filter(task => {
      const taskDate = dayjs(task.date)
      return (
        (taskDate.isAfter(startOfMonth) || taskDate.isSame(startOfMonth, 'day')) &&
        (taskDate.isBefore(endOfMonth) || taskDate.isSame(endOfMonth, 'day'))
      )
    })
    console.log(`getTasksByMonth(${date}) =>`, result) // Debug
    return result
  }

  const filteredTasks = ref({
    view: 'day', // 'day', 'week', 'month'
    date: dayjs().format('YYYY-MM-DD'),
  })

  const filteredTaskList = computed(() => {
    const { view, date } = filteredTasks.value
    console.log(`Filtering tasks with view: ${view}, date: ${date}`) // Debug
    if (view === 'day') {
      return getTasksByDate(date)
    } else if (view === 'week') {
      return getTasksByWeek(date)
    } else if (view === 'month') {
      return getTasksByMonth(date)
    }
    return []
  })

  const setView = (newView) => {
    filteredTasks.value.view = newView
    console.log(`View set to: ${newView}`) // Debug
  }

  const setDate = (newDate) => {
    filteredTasks.value.date = newDate
    console.log(`Date set to: ${newDate}`) // Debug
  }

  // Bước 2: Theo dõi sự thay đổi của tasks và lưu vào localStorage
  watch(tasks, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
    console.log('Tasks saved to localStorage')
  }, { deep: true })

  return {
    tasks,
    addTask,
    filteredTasks,
    filteredTaskList,
    setView,
    setDate,
  }
})