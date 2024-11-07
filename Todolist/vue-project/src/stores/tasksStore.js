// src/stores/tasksStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const LOCAL_STORAGE_KEY = 'tasks';

export const useTasksStore = defineStore('tasksStore', () => {
  const tasks = ref(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
  const filter = ref('all')
  const searchQuery = ref('');

  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
      const matchesFilter = filter.value === 'all' || task.status === filter.value;
      const matchesSearch = task.content.toLowerCase().includes(searchQuery.value.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  });

  const addTask = (newTask) => {
    tasks.value.push(newTask);
  };

  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  };

  const deleteTasks = (taskIds) => {
    tasks.value = tasks.value.filter(task => !taskIds.includes(task.id));
  };

  const toggleTaskCompletion = (taskId, isCompleted) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.completed = isCompleted;
    }
  };

  const updateTaskContent = (taskId, newContent) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.content = newContent;
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  };

  const updateTaskDate = (taskId, newDate) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.date = newDate;
    }
  };

  const updateTask = (taskId, updatedFields) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      Object.assign(task, updatedFields);
    }
  };

  const setFilter = (newFilter) => {
    filter.value = newFilter;
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  watch(tasks, (newTasks) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }, { deep: true });

  return {
    tasks,
    filteredTasks,
    filter,
    searchQuery,
    addTask,
    deleteTask,
    deleteTasks,
    toggleTaskCompletion,
    updateTaskContent,
    updateTaskStatus,
    updateTaskDate,
    updateTask,
    setFilter,
    setSearchQuery,
  }
});