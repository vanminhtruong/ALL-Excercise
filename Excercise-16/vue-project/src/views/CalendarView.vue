<template>
  <div class="relative container mx-auto p-8 overflow-hidden">
    <h1 class="text-3xl font-bold mb-6 text-green-500">Quản lý Công Việc với Lịch</h1>
    <div class="flex transition-all duration-500 pr-[70px]" :class="{ 'ml-0': !showTodoList, '-ml-1/3': showTodoList }">

      <div class="w-2/3 bg-black bg-opacity-70 p-4 rounded-lg shadow-lg flex flex-col items-center flex-shrink-0">
        <Calendar class="mb-4 w-full" />
        <AddTaskForm class="mt-4 w-full" />
        <div class="mt-6 flex space-x-3 justify-center w-full">
          <button 
            @click="setView('day')" 
            :class="buttonClasses('day')"
            class="px-4 py-2 rounded-md transition duration-300 flex-1"
          >
            Ngày
          </button>
          <button 
            @click="setView('week')" 
            :class="buttonClasses('week')"
            class="px-4 py-2 rounded-md transition duration-300 flex-1"
          >
            Tuần
          </button>
          <button 
            @click="setView('month')" 
            :class="buttonClasses('month')"
            class="px-4 py-2 rounded-md transition duration-300 flex-1"
          >
            Tháng
          </button>
        </div>
        <!-- Nút Hiển thị / Ẩn To-Do List -->
        <div class="mt-6 flex justify-center w-full">
          <button 
            @click="toggleTodoList" 
            class="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 w-full"
          >
            {{ todoButtonText }}
          </button>
        </div>
      </div>
      
      <!-- To-Do List xuất hiện bên phải nội dung chính -->
      <div class="w-1/3 bg-black bg-opacity-70 p-4 rounded-lg shadow-lg flex-shrink-0">
        <transition name="slide">
          <TaskList v-if="showTodoList" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import Calendar from '../components/atoms/Calendar.vue'
import TaskList from '../components/molecules/TaskList.vue'
import AddTaskForm from '../components/atoms/AddTaskForm.vue'
import { useTaskStore } from '../stores/taskStore'
import { computed, ref, watch } from 'vue'

const taskStore = useTaskStore()

const setView = (newView) => {
  console.log(`Setting view to: ${newView}`) // Debug
  taskStore.setView(newView)
}

const view = computed(() => taskStore.filteredTasks.view)

// Định nghĩa các lớp cho nút xem
const buttonClasses = (buttonView) => {
  return view.value === buttonView
    ? 'bg-green-500 text-black'
    : 'bg-gray-800 text-green-500 hover:bg-green-700 hover:text-white'
}

// State để kiểm soát việc hiển thị To-Do List
const showTodoList = ref(false)

// Hàm toggle hiển thị To-Do List
const toggleTodoList = () => {
  showTodoList.value = !showTodoList.value
}

const todoButtonText = computed(() => {
  return showTodoList.value ? 'Ẩn giao diện' : 'Hiển thị giao diện'
})

// Debugging
watch(view, (newView) => {
  console.log(`View updated to: ${newView}`)
})
</script>

<style scoped>
/* Thêm hiệu ứng chuyển động cho To-Do List */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(100%);
}

@media (min-width: 768px) {
  .container {
    max-width: 1200px;
  }
}

/* Đảm bảo nội dung không tràn ra ngoài khi di chuyển */
.container {
  overflow: hidden;
}

/* Điều chỉnh margin-left để dịch chuyển nội dung chính mà không bị cắt xén */
.ml-0 {
  margin-left: 0;
}

</style>