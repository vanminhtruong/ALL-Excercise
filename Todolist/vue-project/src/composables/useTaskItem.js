import { ref } from 'vue'
import { useTasksStore } from '../stores/tasksStore'
import { useToast } from 'vue-toastification'

export function useTaskItem(task) {
  const tasksStore = useTasksStore()
  const toast = useToast()

  const isEditing = ref(false)
  const editedTask = ref({
    content: task.content,
    date: task.date,
    status: task.status,
  })

  const toggleComplete = () => {
    tasksStore.toggleTaskCompletion(task.id)
    toast.info('Task completion toggled.')
  }

  const updateStatusField = (newStatus) => {
    tasksStore.updateTask(task.id, { status: newStatus })
    toast.info('Task status updated.')
  }

  const deleteTask = () => {
    tasksStore.deleteTask(task.id)
    toast.error('Task deleted.')
  }

  const editTask = () => {
    isEditing.value = true
    toast.info('Editing task...')
  }

  const saveTask = () => {
    if (
      editedTask.value.content &&
      editedTask.value.date &&
      editedTask.value.status
    ) {
      tasksStore.updateTask(task.id, {
        content: editedTask.value.content,
        date: editedTask.value.date,
        status: editedTask.value.status,
      })
      toast.success('Task updated successfully!')
      isEditing.value = false
    } else {
      toast.error('Please fill in all fields.')
    }
  }

  const cancelEdit = () => {
    editedTask.value = {
      content: task.content,
      date: task.date,
      status: task.status,
    }
    isEditing.value = false
    toast.info('Edit canceled.')
  }

  const updateContent = (newContent) => {
    editedTask.value.content = newContent
  }

  const updateDateField = (newDate) => {
    editedTask.value.date = newDate
  }

  return {
    toggleComplete,
    updateStatusField,
    deleteTask,
    editTask,
    saveTask,
    cancelEdit,
    isEditing,
    editedTask,
    updateContent,
    updateDateField,
  }
}