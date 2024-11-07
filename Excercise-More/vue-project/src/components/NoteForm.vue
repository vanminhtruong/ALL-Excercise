<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative" @click.stop>
    <!-- Nút X để đóng form -->
    <button 
      @click="emitCloseForm" 
      class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
      aria-label="Đóng form"
    >
      ✕
    </button>

    <h2 class="text-2xl font-semibold mb-4">{{ isEditing ? 'Sửa Ghi Chú' : 'Thêm Ghi Chú Mới' }}</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="title" class="block text-gray-700 mb-2">Tiêu Đề:</label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập tiêu đề ghi chú"
          required
        />
      </div>
      <div>
        <label for="content" class="block text-gray-700 mb-2">Nội Dung:</label>
        <textarea
          id="content"
          v-model="content"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập nội dung ghi chú"
          rows="4"
          required
        ></textarea>
      </div>
      <div class="flex justify-end space-x-2">
        <button 
          type="button" 
          @click="emitCloseForm" 
          v-if="isEditing" 
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">
          Hủy
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          {{ isEditing ? 'Cập Nhật' : 'Thêm' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  noteToEdit: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit-note', 'close-form'])

const title = ref('')
const content = ref('')
const isEditing = ref(false)

// Định nghĩa hàm resetForm trước khi sử dụng trong watcher
const resetForm = () => {
  title.value = ''
  content.value = ''
  isEditing.value = false
}

const emitCloseForm = () => {
  emit('close-form')
  resetForm()
}

const submitForm = () => {
  if (title.value.trim() === '' || content.value.trim() === '') {
    alert('Vui lòng nhập đầy đủ thông tin.')
    return
  }

  const note = {
    id: isEditing.value ? props.noteToEdit.id : Date.now(),
    title: title.value,
    content: content.value
  }

  emit('submit-note', note)
  resetForm()
}

// Thêm { immediate: true } để watcher chạy khi component được mount
watch(
  () => props.noteToEdit,
  (newNote) => {
    if (newNote) {
      title.value = newNote.title
      content.value = newNote.content
      isEditing.value = true
    } else {
      resetForm()
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
button {
  @apply text-white rounded;
}

/* Đảm bảo rằng modal form có độ rộng tối đa và phù hợp trên các thiết bị */
.bg-white {
  width: 100%;
  max-width: 500px;
}

@media (max-width: 640px) {
  .bg-white {
    max-width: 90%;
  }
}

/* Định dạng cho nút X */
button[aria-label="Đóng form"] {
  @apply text-xl;
}
</style>