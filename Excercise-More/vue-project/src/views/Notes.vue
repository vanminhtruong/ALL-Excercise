<template>
  <div class="container mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-center">Ứng dụng Ghi Chú</h1>  
      <div class="flex items-center space-x-4">
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            v-model="isBulkSelecting"
            class="form-checkbox h-5 w-5 text-blue-600"
          />
          <span class="text-gray-700">Chọn nhiều</span>
        </label>
        <!-- Nút Xóa đã chọn -->
        <button
          v-if="selectedNotes.length > 0"
          @click="deleteSelectedNotes"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
        >
          Xóa đã chọn
        </button>
        <button @click="toggleForm" class="text-3xl font-bold text-blue-500 hover:text-blue-700">
          +
        </button>
      </div>
    </div>

    <!-- Backdrop -->
    <transition name="fade">
      <div 
        v-if="showForm" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
        @click="toggleForm"
      ></div>
    </transition>

    <!-- Hiển thị NoteForm khi showForm là true với hiệu ứng slide-in -->
    <transition name="slide">
      <div 
        v-if="showForm" 
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <NoteForm 
          @submit-note="handleSubmit" 
          :noteToEdit="noteToEdit" 
          @close-form="toggleForm" 
        />
      </div>
    </transition>

    <!-- Danh sách ghi chú -->
    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Danh sách Ghi Chú Của Tôi</h2>
      <ul class="space-y-4">
        <!-- Hiển thị checkbox "Chọn tất cả" khi đang trong chế độ chọn nhiều -->
        <div v-if="isBulkSelecting" class="flex items-center mb-4">
          <input
            type="checkbox"
            v-model="selectAll"
            @change="toggleSelectAll"
            class="form-checkbox h-5 w-5 text-green-600 mr-2"
          />
          <span class="text-gray-700">Chọn tất cả</span>
        </div>
        <NoteItem 
          v-for="note in paginatedNotes" 
          :key="note.id" 
          :note="note" 
          @edit-note="handleEdit" 
          @delete-note="handleDelete"
          :isBulkSelecting="isBulkSelecting"
          @toggle-select="toggleSelect"
          :isSelected="selectedNotes.includes(note.id)"
        />
      </ul>
      <p v-if="notes.length === 0" class="text-center text-gray-500 mt-4">Không có ghi chú nào. Hãy thêm ghi chú mới!</p>
    </div>

    <!-- Phân trang -->
    <div v-if="totalPages > 1" class="flex justify-center mt-6 space-x-2">
      <!-- Nút Trước -->
      <button 
        @click="changePage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Trước
      </button>
      
      <!-- Các nút số trang -->
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'px-3 py-1 rounded hover:bg-blue-600 transition',
          { 'bg-blue-500 text-white': currentPage === page, 'bg-gray-200 text-gray-700': currentPage !== page }
        ]"
      >
        {{ page }}
      </button>
      
      <!-- Nút Sau -->
      <button 
        @click="changePage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Sau
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useNoteStore } from '../stores/noteStore'
import NoteItem from '../components/NoteItem.vue'
import NoteForm from '../components/NoteForm.vue'

// Khởi tạo store
const noteStore = useNoteStore()

// Sử dụng storeToRefs để giữ tính phản ứng khi destructure
const { notes } = storeToRefs(noteStore)

const noteToEdit = ref(null)
const showForm = ref(false) // Trạng thái hiển thị form
const isBulkSelecting = ref(false) // Trạng thái chọn nhiều
const selectedNotes = ref([]) // Danh sách các ghi chú được chọn
const selectAll = ref(false) // Trạng thái "Chọn tất cả"

// Phân trang
const currentPage = ref(1) // Trang hiện tại
const notesPerPage = 4 // Số lượng ghi chú mỗi trang

// Computed property để tính tổng số trang
const totalPages = computed(() => {
  return Math.ceil(notes.value.length / notesPerPage)
})

// Computed property để lấy các ghi chú của trang hiện tại
const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * notesPerPage
  const end = start + notesPerPage
  return notes.value.slice(start, end)
})

// Xử lý khi nhận được ghi chú từ form
const handleSubmit = (note) => {
  if (noteToEdit.value) {
    noteStore.editNote(note)
    noteToEdit.value = null
  } else {
    noteStore.addNote(note)
  }
  toggleForm() // Đóng form sau khi submit
}

// Xử lý khi muốn chỉnh sửa ghi chú
const handleEdit = (note) => {
  noteToEdit.value = { ...note }
  showForm.value = true // Mở form để chỉnh sửa
}

// Xử lý khi muốn xóa ghi chú
const handleDelete = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
    noteStore.deleteNote(id)
    // Nếu đang trong chế độ chọn nhiều, loại bỏ id đã xóa khỏi selectedNotes
    const index = selectedNotes.value.indexOf(id)
    if (index !== -1) {
      selectedNotes.value.splice(index, 1)
    }
  }
}

// Hàm toggle hiển thị form
const toggleForm = () => {
  showForm.value = !showForm.value
  if (!showForm.value) {
    // Khi đóng form, reset các trạng thái liên quan đến chọn nhiều
    isBulkSelecting.value = false
    selectedNotes.value = []
    selectAll.value = false
    currentPage.value = 1 // Reset về trang đầu khi đóng form
  }
}

// Hàm xử lý phím Esc để đóng modal
const handleEsc = (event) => {
  if (event.key === 'Escape' && showForm.value) {
    toggleForm()
  }
}

import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
})

// Hàm thêm hoặc loại bỏ ghi chú khỏi selectedNotes
const toggleSelect = (noteId) => {
  const index = selectedNotes.value.indexOf(noteId)
  if (index === -1) {
    selectedNotes.value.push(noteId)
  } else {
    selectedNotes.value.splice(index, 1)
  }
}

// Hàm chọn hoặc bỏ chọn tất cả các ghi chú
const toggleSelectAll = () => {
  if (selectAll.value) {
    // Chọn tất cả
    selectedNotes.value = notes.value.map(note => note.id)
  } else {
    // Bỏ chọn tất cả
    selectedNotes.value = []
  }
}

// Watcher để cập nhật trạng thái "Chọn tất cả" khi selectedNotes thay đổi
watch(selectedNotes, (newSelected) => {
  if (newSelected.length === notes.value.length && notes.value.length > 0) {
    selectAll.value = true
  } else {
    selectAll.value = false
  }
})

// Watcher để reset selectedNotes khi notes thay đổi (ví dụ khi một ghi chú bị xóa)
watch(notes, (newNotes) => {
  // Loại bỏ các id không còn trong notes nữa
  selectedNotes.value = selectedNotes.value.filter(id => newNotes.some(note => note.id === id))
  
  // Cập nhật trạng thái "Chọn tất cả"
  if (selectedNotes.value.length === newNotes.length && newNotes.length > 0) {
    selectAll.value = true
  } else {
    selectAll.value = false
  }
})

// Hàm xóa các ghi chú đã chọn
const deleteSelectedNotes = () => {
  if (confirm('Bạn có chắc chắn muốn xóa các ghi chú đã chọn?')) {
    selectedNotes.value.forEach(id => {
      noteStore.deleteNote(id)
    })
    // Reset selectedNotes sau khi xóa
    selectedNotes.value = []
    isBulkSelecting.value = false
    selectAll.value = false
    currentPage.value = 1 // Reset về trang đầu sau khi xóa
  }
}

// Hàm để thay đổi trang
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 800px;
}

/* Hiệu ứng cho backdrop */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 0.5;
}

/* Định nghĩa các lớp hiệu ứng cho chuyển đổi slide-in từ bên phải */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Phân trang */
.flex.justify-center button {
  min-width: 40px;
}
</style>