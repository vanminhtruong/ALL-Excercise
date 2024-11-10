import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'

export const useTaskStore = defineStore('task', () => {
  // Tải dữ liệu từ localStorage khi khởi tạo
  const storedTasks = localStorage.getItem('tasks')
  const tasks = ref(storedTasks ? JSON.parse(storedTasks) : [])

  // Thêm công việc mới
  const addTask = (task) => {
    tasks.value.push(task)
    console.log('Task added:', task) // Debug
  }

  // Chỉnh sửa công việc
  const editTask = (id, updatedTask) => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updatedTask }
      console.log(`Task with id ${id} edited:`, tasks.value[index])
    } else {
      console.log(`Task with id ${id} not found.`)
    }
  }

  // Xóa công việc
  const deleteTask = (id) => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      const [removedTask] = tasks.value.splice(index, 1)
      console.log(`Task with id ${id} deleted:`, removedTask)
    } else {
      console.log(`Task with id ${id} not found.`)
    }
  }

  // Các hàm lọc công việc theo ngày, tuần, tháng
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

  // Trạng thái lọc công việc
  const filteredTasks = ref({
    view: 'day', // 'day', 'week', 'month'
    date: dayjs().format('YYYY-MM-DD'),
  })

  // Danh sách công việc đã lọc
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

  // Thiết lập chế độ xem
  const setView = (newView) => {
    filteredTasks.value.view = newView
    console.log(`View set to: ${newView}`) // Debug
  }

  // Thiết lập ngày
  const setDate = (newDate) => {
    filteredTasks.value.date = newDate
    console.log(`Date set to: ${newDate}`) // Debug
  }

  // Theo dõi sự thay đổi của tasks và lưu vào localStorage
  watch(tasks, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
    console.log('Tasks saved to localStorage')
  }, { deep: true })

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    filteredTasks,
    filteredTaskList,
    setView,
    setDate,
  }
})