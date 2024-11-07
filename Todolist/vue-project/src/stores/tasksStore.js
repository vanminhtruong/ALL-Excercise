// src/stores/tasksStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// Khóa để lưu trữ trong localStorage
const LOCAL_STORAGE_KEY = 'tasks';

export const useTasksStore = defineStore('tasksStore', () => {
  // Khởi tạo tasks từ localStorage nếu có, nếu không thì mảng trống
  const tasks = ref(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);

  // Getter để lọc tasks dựa trên trạng thái
  const filter = ref('all'); // Các giá trị: 'all', 'to do', 'done', 'reject'

  const filteredTasks = computed(() => {
    if (filter.value === 'all') {
      return tasks.value;
    }
    return tasks.value.filter(task => task.status === filter.value);
  });

  // Thêm một task mới
  const addTask = (newTask) => {
    tasks.value.push(newTask);
  };

  // Xóa một task theo ID
  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  };

  // Xóa nhiều task theo danh sách ID
  const deleteTasks = (taskIds) => {
    tasks.value = tasks.value.filter(task => !taskIds.includes(task.id));
  };

  // Cập nhật trạng thái hoàn thành của một task
  const toggleTaskCompletion = (taskId, isCompleted) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.completed = isCompleted;
    }
  };

  // Cập nhật nội dung của một task
  const updateTaskContent = (taskId, newContent) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.content = newContent;
    }
  };

  // Cập nhật trạng thái của một task
  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  };

  // Cập nhật ngày của một task
  const updateTaskDate = (taskId, newDate) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.date = newDate;
    }
  };

  // Thêm phương thức updateTask để cập nhật nhiều thuộc tính cùng lúc
  const updateTask = (taskId, updatedFields) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      Object.assign(task, updatedFields);
    }
  };

  // Đặt bộ lọc
  const setFilter = (newFilter) => {
    filter.value = newFilter;
  };

  // Lưu tasks vào localStorage mỗi khi tasks thay đổi
  watch(tasks, (newTasks) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }, { deep: true });

  return {
    tasks,
    filteredTasks,
    filter,
    addTask,
    deleteTask,
    deleteTasks,
    toggleTaskCompletion,
    updateTaskContent,
    updateTaskStatus,
    updateTaskDate,
    updateTask, // Thêm phương thức updateTask vào return
    setFilter,
  }
});