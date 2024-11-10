<template>
  <div class="mt-4">
    <h2 class="text-xl font-bold mb-2 text-green-500">Công việc {{ viewText }} {{ currentDate }}</h2>
    
    <div v-if="showSelectAllButton" class="flex justify-start mb-2">
      <button 
        @click="selectAllTasks" 
        class="bg-[#00ff00] text-green-700 font-bold uppercase text-white px-4 py-2 rounded hover:text-[#000] transition duration-300"
      >
        Chọn Tất Cả
      </button>
    </div>
    
    <ul>
      <li 
        v-for="task in paginatedTasks" 
        :key="task.id" 
        class="p-2 border-b border-green-500 flex flex-col relative group"
      >
        <!-- Checkbox xuất hiện khi hover hoặc khi được chọn -->
        <input
          v-if="!editingTaskId"
          type="checkbox"
          v-model="selectedTasks"
          :value="task.id"
          class="absolute right-4 top-4 opacity-0 group-hover:opacity-100 selected-checkbox transition-opacity duration-300 cursor-pointer"
        />

        <div v-if="editingTaskId === task.id" class="flex flex-1">
          <input 
            v-model="editedTitle" 
            type="text" 
            class="p-2 border rounded mr-2 bg-gray-800 text-green-500 w-[125px]"
          />
          <input 
            v-model="editedDate" 
            type="date" 
            class="p-2 border rounded mr-2 bg-gray-800 text-green-500 w-[125px]"
          />
        </div>

        <div v-else class="flex-1 text-green-500">
          {{ task.title }} - {{ task.date }}
        </div>

        <div class="flex space-x-2">
          <button 
            v-if="editingTaskId !== task.id" 
            @click="startEditing(task)" 
            class="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button 
            @click="deleteTask(task.id)"
            class="text-red-500 hover:text-red-700 ml-[10px]"
          >
            Delete
          </button>

          <button 
            v-if="editingTaskId === task.id" 
            @click="saveEdit(task.id)" 
            class="text-green-500 hover:text-green-700 ml-[-10px]"
          >
            Save
          </button>
          <button 
            v-if="editingTaskId === task.id" 
            @click="cancelEdit" 
            class="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </li>
    </ul>
    <p v-if="tasks.length === 0" class="text-gray-500 mt-2">Không có công việc nào.</p> 

    <!-- Đây là bố cục phân trang của trang web trong đó có đánh số thứ tự của trang -->
    <div v-if="totalPages > 1" class="flex justify-center mt-4 space-x-2">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1" 
        class="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Trước
      </button>
      <span class="px-3 py-1 text-white">
        Trang {{ currentPage }} / {{ totalPages }}
      </span>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages" 
        class="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Tiếp
      </button>
    </div>

    <!-- Thông tin và nút hành động cho các mục đã chọn -->
    <div v-if="selectedTasks.length > 0" class="flex justify-between items-center mt-4 bg-black bg-opacity-80 p-2 rounded shadow-md matrix-selection">
      <div class="text-green-500 text-sm">
        Đã chọn {{ selectedTasks.length }} {{ selectedTasks.length === 1 ? 'mục' : 'mục' }}
      </div>
      <div class="space-x-2">
        <button 
          @click="deleteSelectedTasks" 
          class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 text-sm"
        >
          Delete Selected
        </button>
        <button 
          @click="cancelSelection" 
          class="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-900 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useTaskStore } from '../../stores/taskStore'

const taskStore = useTaskStore()

const view = computed(() => taskStore.filteredTasks.view)
const currentDate = computed(() => taskStore.filteredTasks.date)
const tasks = computed(() => taskStore.filteredTaskList)

const viewText = computed(() => {
  if (view.value === 'day') return 'ngày'
  if (view.value === 'week') return 'tuần'
  if (view.value === 'month') return 'tháng'
  return ''
})

// Local state để theo dõi công việc đang được chỉnh sửa
const editingTaskId = ref(null)
const editedTitle = ref('')
const editedDate = ref('')

// Phân trang
const pageSize = 7
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(tasks.value.length / pageSize))

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return tasks.value.slice(start, end)
})

// Quản lý các mục được chọn
const selectedTasks = ref([])

// Xác định xem có nên hiển thị nút "Select All" hay không
const showSelectAllButton = computed(() => {
  const currentPageTaskIds = paginatedTasks.value.map(task => task.id)
  const allSelected = currentPageTaskIds.every(id => selectedTasks.value.includes(id))
  return !allSelected && currentPageTaskIds.some(id => !selectedTasks.value.includes(id))
})

// Bắt đầu chỉnh sửa một công việc
const startEditing = (task) => {
  editingTaskId.value = task.id
  editedTitle.value = task.title
  editedDate.value = task.date
  console.log(`Editing task ID: ${editingTaskId.value}`) // Debug
}

// Lưu các thay đổi sau khi chỉnh sửa
const saveEdit = (id) => {
  if (editedTitle.value.trim() && editedDate.value) {
    taskStore.editTask(id, { title: editedTitle.value, date: editedDate.value })
    editingTaskId.value = null
    editedTitle.value = ''
    editedDate.value = ''
    console.log(`Saved task ID: ${id}`) // Debug
  } else {
    alert('Vui lòng nhập đầy đủ thông tin công việc.')
  }
}

// Hủy bỏ quá trình chỉnh sửa
const cancelEdit = () => {
  editingTaskId.value = null
  editedTitle.value = ''
  editedDate.value = ''
  console.log('Edit canceled') // Debug
}

// Xóa một công việc
const deleteTask = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa công việc này không?')) {
    taskStore.deleteTask(id)
    console.log(`Deleted task ID: ${id}`) // Debug
    // Nếu sau khi xóa, số trang giảm xuống dưới currentPage, thì giảm currentPage
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1
    }
    // Nếu công việc đã chọn bị xóa, hãy loại bỏ nó khỏi danh sách chọn
    selectedTasks.value = selectedTasks.value.filter(taskId => taskId !== id)
  }
}

// Chuyển sang trang trước
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Chuyển sang trang tiếp theo
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Xóa các công việc đã chọn
const deleteSelectedTasks = () => {
  if (confirm('Bạn có chắc chắn muốn xóa các công việc đã chọn không?')) {
    selectedTasks.value.forEach(id => {
      taskStore.deleteTask(id)
      console.log(`Deleted task ID: ${id}`) // Debug
    })
    selectedTasks.value = []
    // Điều chỉnh currentPage nếu cần
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1
    }
  }
}

// Hủy bỏ việc chọn các công việc
const cancelSelection = () => {
  selectedTasks.value = []
  console.log('Selection canceled') // Debug
}

// Chọn tất cả các công việc trong trang hiện tại
const selectAllTasks = () => {
  const currentPageTaskIds = paginatedTasks.value.map(task => task.id)
  selectedTasks.value = [...new Set([...selectedTasks.value, ...currentPageTaskIds])]
}

// Watcher để theo dõi sự thay đổi của tasks và điều chỉnh currentPage nếu cần
watch(tasks, (newTasks) => {
  console.log('Tasks updated:', newTasks)
  // Nếu currentPage vượt quá totalPages sau khi cập nhật tasks, điều chỉnh lại
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1
  }
})

// Reset currentPage khi view hoặc date thay đổi
watch([view, currentDate], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Thêm style nếu cần */

/* Đảm bảo số trang hiển thị màu trắng để dễ nhìn trên nền tối */
span {
  color: white;
}

/* Hiển thị checkbox khi hover hoặc khi được chọn */
.selected-checkbox {
  opacity: 0;
}

.group:hover .selected-checkbox,
.selected-checkbox:checked {
  opacity: 100;
}

/* Style cho thông tin và nút hành động khi có mục được chọn */
.flex.justify-between.items-center {
  background-color: #010a0a; /* Màu nền đen với độ trong suốt thấp */
  border-radius: 0.5rem;
  padding: 0.5rem;
}

/* Định dạng văn bản xanh lá cây */
.text-green-500 {
  color: #00ff00; /* Màu xanh lá cây Matrix */
  font-size: 0.875rem; /* Nhỏ hơn để chuyên nghiệp */
}

/* Nút "Delete Selected" */
.bg-red-600 {
  background-color: #ff0000; /* Màu đỏ nổi bật */
}

.bg-gray-700 {
  background-color: #1a202c; /* Màu xám đậm */
}

/* Nút "Cancel" */
.bg-gray-700 {
  background-color: #1a202c; /* Màu xám đậm */
}

/* Điều chỉnh kích thước và padding cho các nút */
button.bg-red-500,
button.bg-gray-500 {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

/* Hover effects cho nút để tương phản tốt hơn */
button.bg-red-500:hover {
  background-color: #cc0000; /* Màu đỏ tối hơn */
}

button.bg-gray-500:hover {
  background-color: #333333; /* Màu xám tối hơn */
}

/* Nút Chọn Tất Cả */
.flex.justify-start.mb-2 button {
  /* Bạn có thể thêm các style tùy chỉnh cho nút "Select All" tại đây nếu cần */
}

/* Điều chỉnh vị trí và kích thước của checkbox nếu cần */
input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

/* Đảm bảo nút "Cancel" không có nội dung trống */
button.bg-gray-500 {
  min-width: 100px;
  text-align: center;
}

/* Style cho vùng bao quanh nút "Delete Selected" và "Cancel" giống Matrix */
.matrix-selection {
  background-color: rgba(0, 0, 0, 0.8); /* Nền đen với độ trong suốt */
  border: 2px solid #00ff00; /* Viền xanh lá cây */
}

/* Các nút bên trong vùng Matrix */
.matrix-selection button {
  border: 1px solid #00ff00; /* Viền xanh lá cây */
}

.matrix-selection button:hover {
  border-color: #00cc00; /* Viền xanh lá cây đậm hơn khi hover */
}

/* Giảm kích thước tổng thể của vùng hành động để trông chuyên nghiệp hơn */
.matrix-selection {
  padding: 0.5rem 1rem;
}

.matrix-selection .text-green-500 {
  font-weight: bold;
}

</style>