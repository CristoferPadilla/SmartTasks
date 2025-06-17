<script setup>
import { ref } from 'vue'

const tasks = ref([
  {
    id: 1,
    title: 'Revisar diseño UI',
    description: 'Revisar y aprobar el diseño de la nueva interfaz',
    status: 'pendiente',
    priority: 'alta',
    dueDate: '2024-03-20',
    assignee: 'Juan Pérez'
  },
  {
    id: 2,
    title: 'Implementar autenticación',
    description: 'Implementar sistema de autenticación con JWT',
    status: 'en progreso',
    priority: 'alta',
    dueDate: '2024-03-22',
    assignee: 'María García'
  }
])

const filters = ref({
  status: 'todos',
  priority: 'todos',
  search: ''
})

const showNewTaskModal = ref(false)
const showEditTaskModal = ref(false)
const selectedTask = ref(null)

const newTask = ref({
  title: '',
  description: '',
  status: 'pendiente',
  priority: 'media',
  dueDate: '',
  assignee: ''
})

const handleFilterChange = (type, value) => {
  filters.value[type] = value
}

const handleSearch = (value) => {
  filters.value.search = value
}

const createNewTask = () => {
  const task = {
    id: tasks.value.length + 1,
    ...newTask.value
  }
  tasks.value.push(task)
  showNewTaskModal.value = false
  resetNewTaskForm()
}

const resetNewTaskForm = () => {
  newTask.value = {
    title: '',
    description: '',
    status: 'pendiente',
    priority: 'media',
    dueDate: '',
    assignee: ''
  }
}

const editTask = (task) => {
  selectedTask.value = { ...task }
  showEditTaskModal.value = true
}

const updateTask = () => {
  const index = tasks.value.findIndex(t => t.id === selectedTask.value.id)
  if (index !== -1) {
    tasks.value[index] = { ...selectedTask.value }
  }
  showEditTaskModal.value = false
  selectedTask.value = null
}

const deleteTask = (taskId) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
  }
}
</script>

<template>
  <div class="tasks-layout">
    <div class="tasks-header">
      <h1>Gestión de Tareas</h1>
      <button class="new-task-btn" @click="showNewTaskModal = true">
        <i class="fas fa-plus"></i>
        Nueva Tarea
      </button>
    </div>

    <div class="tasks-filters">
      <div class="filter-group">
        <label>Estado:</label>
        <select v-model="filters.status" @change="handleFilterChange('status', $event.target.value)">
          <option value="todos">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Prioridad:</label>
        <select v-model="filters.priority" @change="handleFilterChange('priority', $event.target.value)">
          <option value="todos">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      <div class="search-group">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="Buscar tareas..." 
          v-model="filters.search"
          @input="handleSearch($event.target.value)"
        >
      </div>
    </div>

    <div class="tasks-grid">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <div class="task-header">
          <h3>{{ task.title }}</h3>
          <span :class="['priority-badge', task.priority]">{{ task.priority }}</span>
        </div>
        <p class="task-description">{{ task.description }}</p>
        <div class="task-details">
          <div class="detail">
            <i class="fas fa-calendar"></i>
            <span>{{ task.dueDate }}</span>
          </div>
          <div class="detail">
            <i class="fas fa-user"></i>
            <span>{{ task.assignee }}</span>
          </div>
          <div class="detail">
            <i class="fas fa-tag"></i>
            <span>{{ task.status }}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="action-btn edit" @click="editTask(task)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete" @click="deleteTask(task.id)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Nueva Tarea -->
    <div v-if="showNewTaskModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Crear Nueva Tarea</h2>
          <button class="close-btn" @click="showNewTaskModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="createNewTask" class="task-form">
          <div class="form-group">
            <label for="title">Título</label>
            <input 
              type="text" 
              id="title" 
              v-model="newTask.title" 
              required
              placeholder="Ingrese el título de la tarea"
            >
          </div>

          <div class="form-group">
            <label for="description">Descripción</label>
            <textarea 
              id="description" 
              v-model="newTask.description" 
              required
              placeholder="Ingrese la descripción de la tarea"
              rows="3"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="status">Estado</label>
              <select id="status" v-model="newTask.status" required>
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completada">Completada</option>
              </select>
            </div>

            <div class="form-group">
              <label for="priority">Prioridad</label>
              <select id="priority" v-model="newTask.priority" required>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="dueDate">Fecha de Vencimiento</label>
              <input 
                type="date" 
                id="dueDate" 
                v-model="newTask.dueDate" 
                required
              >
            </div>

            <div class="form-group">
              <label for="assignee">Asignado a</label>
              <input 
                type="text" 
                id="assignee" 
                v-model="newTask.assignee" 
                required
                placeholder="Nombre del responsable"
              >
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="showNewTaskModal = false">
              Cancelar
            </button>
            <button type="submit" class="submit-btn">
              Crear Tarea
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Edición -->
    <div v-if="showEditTaskModal && selectedTask" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar Tarea</h2>
          <button class="close-btn" @click="showEditTaskModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="updateTask" class="task-form">
          <div class="form-group">
            <label for="edit-title">Título</label>
            <input 
              type="text" 
              id="edit-title" 
              v-model="selectedTask.title" 
              required
              placeholder="Ingrese el título de la tarea"
            >
          </div>

          <div class="form-group">
            <label for="edit-description">Descripción</label>
            <textarea 
              id="edit-description" 
              v-model="selectedTask.description" 
              required
              placeholder="Ingrese la descripción de la tarea"
              rows="3"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-status">Estado</label>
              <select id="edit-status" v-model="selectedTask.status" required>
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completada">Completada</option>
              </select>
            </div>

            <div class="form-group">
              <label for="edit-priority">Prioridad</label>
              <select id="edit-priority" v-model="selectedTask.priority" required>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-dueDate">Fecha de Vencimiento</label>
              <input 
                type="date" 
                id="edit-dueDate" 
                v-model="selectedTask.dueDate" 
                required
              >
            </div>

            <div class="form-group">
              <label for="edit-assignee">Asignado a</label>
              <input 
                type="text" 
                id="edit-assignee" 
                v-model="selectedTask.assignee" 
                required
                placeholder="Nombre del responsable"
              >
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="showEditTaskModal = false">
              Cancelar
            </button>
            <button type="submit" class="submit-btn">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tasks-layout {
  padding: 20px;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.tasks-header h1 {
  font-size: 24px;
  color: #2c3e50;
}

.new-task-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.new-task-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.tasks-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: 500;
  color: #2c3e50;
}

.filter-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.search-group {
  flex: 1;
  position: relative;
}

.search-group i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-group input {
  width: 100%;
  padding: 8px 8px 8px 35px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.task-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.task-header h3 {
  font-size: 18px;
  color: #2c3e50;
  margin: 0;
}

.priority-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.priority-badge.alta {
  background: #ffebee;
  color: #c62828;
}

.priority-badge.media {
  background: #fff3e0;
  color: #ef6c00;
}

.priority-badge.baja {
  background: #e8f5e9;
  color: #2e7d32;
}

.task-description {
  color: #666;
  margin-bottom: 15px;
  font-size: 14px;
}

.task-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

.detail i {
  color: #999;
  width: 16px;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.action-btn {
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.edit {
  background: #2196F3;
  color: white;
  margin-right: 8px;
}

.action-btn.delete {
  background: #f44336;
  color: white;
}

.action-btn:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .tasks-filters {
    flex-direction: column;
  }
  
  .search-group {
    width: 100%;
  }
  
  .tasks-grid {
    grid-template-columns: 1fr;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
}

.submit-btn:hover {
  background: #45a049;
}
</style> 