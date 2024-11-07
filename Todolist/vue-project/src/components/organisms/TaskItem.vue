<template>
  <tr 
    v-if="task" 
    class="hover:bg-gray-50 transition duration-300 ease-in-out"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <td class="w-[5%] px-4 py-3 relative">
      <div v-show="isHovered || selected" class="absolute left-2 top-1/2 transform -translate-y-1/2">
        <Checkbox 
          :model-value="selected"
          @update:model-value="handleSelection" 
          class="cursor-pointer" 
        />
      </div>
    </td>
    <td class="w-[20%] px-4 py-3">
      <TaskActions
        :isEditing="isEditing"
        @edit="handleEdit"
        @save="handleSave"
        @cancel="handleCancel"
        @delete="handleDelete"
      />
    </td>
    <td class="w-[10%] px-4 py-3 text-center">
      <Checkbox 
        :model-value="taskCompleted"
        @update:model-value="toggleCompletion" 
      />
    </td>
    <td class="w-[30%] px-4 py-3">
      <TaskContent
        :isEditing="isEditing"
        :content="task.content"
        :completed="task.completed"
        @update-content="updateContent"
      />
    </td>
    <td class="w-[15%] px-4 py-3">
      <TaskStatus
        :isEditing="isEditing"
        :status="task.status"
        @update-status="updateStatusField"
      />
    </td>
    <td class="w-[20%] px-4 py-3">
      <TaskDate
        :isEditing="isEditing"
        :date="task.date"
        @update-date="updateDateField"
      />
    </td>
  </tr>
</template>

<script setup>
import { ref, watch } from 'vue'
import TaskActions from '../atoms/TaskActions.vue'
import TaskContent from '../atoms/TaskContent.vue'
import TaskStatus from '../atoms/TaskStatus.vue'
import TaskDate from '../atoms/TaskDate.vue'
import Checkbox from '../atoms/Checkbox.vue'
import { useTaskItem } from '../../composables/useTaskItem'

const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: () => ({
      content: '',
      completed: false,
      status: 'to do',
      date: '',
    })
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['select', 'update-completion'])

const isHovered = ref(false)
const selected = ref(props.isSelected)
const taskCompleted = ref(props.task.completed)

watch(() => props.isSelected, (newVal) => {
  selected.value = newVal
})

watch(() => props.task.completed, (newVal) => {
  taskCompleted.value = newVal
})

const handleSelection = (value) => {
  selected.value = value
  emits('select', props.task.id, value)
}

const toggleCompletion = (value) => {
  taskCompleted.value = value
  emits('update-completion', props.task.id, value)
}

const { 
  toggleComplete, 
  updateStatusField, 
  deleteTask, 
  editTask, 
  saveTask, 
  cancelEdit, 
  isEditing, 
  updateContent, 
  updateDateField 
} = useTaskItem(props.task)

const handleEdit = () => {
  editTask()
}

const handleSave = () => {
  saveTask()
}

const handleCancel = () => {
  cancelEdit()
}

const handleDelete = () => {
  deleteTask();

}
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>