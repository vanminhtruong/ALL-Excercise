import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useNoteStore = defineStore('note', () => {
  const notes = ref([])

  // Tải dữ liệu từ localStorage khi khởi tạo store
  const loadNotes = () => {
    const storedNotes = localStorage.getItem('notes')
    if (storedNotes) {
      notes.value = JSON.parse(storedNotes)
    }
  }

  // Lưu dữ liệu vào localStorage mỗi khi notes thay đổi
  watch(notes, (newNotes) => {
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }, { deep: true })

  // Thêm một ghi chú mới
  const addNote = (note) => {
    notes.value.push(note)
  }

  // Sửa một ghi chú
  const editNote = (updatedNote) => {
    const index = notes.value.findIndex(note => note.id === updatedNote.id)
    if (index !== -1) {
      notes.value[index] = updatedNote
    }
  }

  // Xóa một ghi chú
  const deleteNote = (id) => {
    notes.value = notes.value.filter(note => note.id !== id)
  }

  // Tìm một ghi chú theo ID
  const getNoteById = (id) => {
    return notes.value.find(note => note.id === id)
  }

  // Khởi tạo store
  loadNotes()

  return { notes, addNote, editNote, deleteNote, getNoteById }
})