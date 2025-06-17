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

const handleFilterChange = (type, value) => {
  filters.value[type] = value
}

const handleSearch = (value) => {
  filters.value.search = value
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
          <button class="action-btn edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
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
  gap: 10px;
  justify-content: flex-end;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.edit {
  background: #e3f2fd;
  color: #1976d2;
}

.action-btn.delete {
  background: #ffebee;
  color: #c62828;
}

.action-btn:hover {
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
</style> 