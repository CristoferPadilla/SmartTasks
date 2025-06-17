<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    name: 'Rediseño de Sitio Web',
    description: 'Actualización completa del sitio web corporativo',
    status: 'en progreso',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    leader: 'Ana Martínez',
    progress: 35
  },
  {
    id: 2,
    name: 'App Móvil',
    description: 'Desarrollo de aplicación móvil para clientes',
    status: 'planificado',
    startDate: '2024-04-01',
    endDate: '2024-08-31',
    leader: 'Carlos Rodríguez',
    progress: 0
  }
])

const filters = ref({
  status: 'todos',
  search: ''
})

const showNewProjectModal = ref(false)
const showEditProjectModal = ref(false)
const selectedProject = ref(null)

const newProject = ref({
  name: '',
  description: '',
  status: 'planificado',
  startDate: '',
  endDate: '',
  leader: '',
  progress: 0
})

const handleFilterChange = (type, value) => {
  filters.value[type] = value
}

const handleSearch = (value) => {
  filters.value.search = value
}

const createNewProject = () => {
  const project = {
    id: projects.value.length + 1,
    ...newProject.value
  }
  projects.value.push(project)
  showNewProjectModal.value = false
  resetNewProjectForm()
}

const resetNewProjectForm = () => {
  newProject.value = {
    name: '',
    description: '',
    status: 'planificado',
    startDate: '',
    endDate: '',
    leader: '',
    progress: 0
  }
}

const editProject = (project) => {
  selectedProject.value = { ...project }
  showEditProjectModal.value = true
}

const updateProject = () => {
  const index = projects.value.findIndex(p => p.id === selectedProject.value.id)
  if (index !== -1) {
    projects.value[index] = { ...selectedProject.value }
  }
  showEditProjectModal.value = false
  selectedProject.value = null
}

const deleteProject = (projectId) => {
  if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
    projects.value = projects.value.filter(p => p.id !== projectId)
  }
}
</script>

<template>
  <div class="projects-layout">
    <div class="projects-header">
      <h1>Gestión de Proyectos</h1>
      <button class="new-project-btn" @click="showNewProjectModal = true">
        <i class="fas fa-plus"></i>
        Nuevo Proyecto
      </button>
    </div>

    <div class="projects-filters">
      <div class="filter-group">
        <label>Estado:</label>
        <select v-model="filters.status" @change="handleFilterChange('status', $event.target.value)">
          <option value="todos">Todos</option>
          <option value="planificado">Planificado</option>
          <option value="en progreso">En Progreso</option>
          <option value="completado">Completado</option>
          <option value="suspendido">Suspendido</option>
        </select>
      </div>

      <div class="search-group">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="Buscar proyectos..." 
          v-model="filters.search"
          @input="handleSearch($event.target.value)"
        >
      </div>
    </div>

    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-header">
          <h3>{{ project.name }}</h3>
          <span :class="['status-badge', project.status]">{{ project.status }}</span>
        </div>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-details">
          <div class="detail">
            <i class="fas fa-calendar"></i>
            <span>{{ project.startDate }} - {{ project.endDate }}</span>
          </div>
          <div class="detail">
            <i class="fas fa-user"></i>
            <span>{{ project.leader }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: project.progress + '%' }"></div>
            <span>{{ project.progress }}%</span>
          </div>
        </div>
        <div class="project-actions">
          <button class="action-btn edit" @click="editProject(project)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete" @click="deleteProject(project.id)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Nuevo Proyecto -->
    <div v-if="showNewProjectModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Crear Nuevo Proyecto</h2>
          <button class="close-btn" @click="showNewProjectModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="createNewProject" class="project-form">
          <div class="form-group">
            <label for="name">Nombre del Proyecto</label>
            <input 
              type="text" 
              id="name" 
              v-model="newProject.name" 
              required
              placeholder="Ingrese el nombre del proyecto"
            >
          </div>

          <div class="form-group">
            <label for="description">Descripción</label>
            <textarea 
              id="description" 
              v-model="newProject.description" 
              required
              placeholder="Ingrese la descripción del proyecto"
              rows="3"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="status">Estado</label>
              <select id="status" v-model="newProject.status" required>
                <option value="planificado">Planificado</option>
                <option value="en progreso">En Progreso</option>
                <option value="completado">Completado</option>
                <option value="suspendido">Suspendido</option>
              </select>
            </div>

            <div class="form-group">
              <label for="progress">Progreso (%)</label>
              <input 
                type="number" 
                id="progress" 
                v-model="newProject.progress" 
                min="0" 
                max="100" 
                required
              >
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="startDate">Fecha de Inicio</label>
              <input 
                type="date" 
                id="startDate" 
                v-model="newProject.startDate" 
                required
              >
            </div>

            <div class="form-group">
              <label for="endDate">Fecha de Fin</label>
              <input 
                type="date" 
                id="endDate" 
                v-model="newProject.endDate" 
                required
              >
            </div>
          </div>

          <div class="form-group">
            <label for="leader">Líder del Proyecto</label>
            <input 
              type="text" 
              id="leader" 
              v-model="newProject.leader" 
              required
              placeholder="Nombre del líder del proyecto"
            >
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="showNewProjectModal = false">
              Cancelar
            </button>
            <button type="submit" class="submit-btn">
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Edición -->
    <div v-if="showEditProjectModal && selectedProject" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar Proyecto</h2>
          <button class="close-btn" @click="showEditProjectModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="updateProject" class="project-form">
          <div class="form-group">
            <label for="edit-name">Nombre del Proyecto</label>
            <input 
              type="text" 
              id="edit-name" 
              v-model="selectedProject.name" 
              required
              placeholder="Ingrese el nombre del proyecto"
            >
          </div>

          <div class="form-group">
            <label for="edit-description">Descripción</label>
            <textarea 
              id="edit-description" 
              v-model="selectedProject.description" 
              required
              placeholder="Ingrese la descripción del proyecto"
              rows="3"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-status">Estado</label>
              <select id="edit-status" v-model="selectedProject.status" required>
                <option value="planificado">Planificado</option>
                <option value="en progreso">En Progreso</option>
                <option value="completado">Completado</option>
                <option value="suspendido">Suspendido</option>
              </select>
            </div>

            <div class="form-group">
              <label for="edit-progress">Progreso (%)</label>
              <input 
                type="number" 
                id="edit-progress" 
                v-model="selectedProject.progress" 
                min="0" 
                max="100" 
                required
              >
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-startDate">Fecha de Inicio</label>
              <input 
                type="date" 
                id="edit-startDate" 
                v-model="selectedProject.startDate" 
                required
              >
            </div>

            <div class="form-group">
              <label for="edit-endDate">Fecha de Fin</label>
              <input 
                type="date" 
                id="edit-endDate" 
                v-model="selectedProject.endDate" 
                required
              >
            </div>
          </div>

          <div class="form-group">
            <label for="edit-leader">Líder del Proyecto</label>
            <input 
              type="text" 
              id="edit-leader" 
              v-model="selectedProject.leader" 
              required
              placeholder="Nombre del líder del proyecto"
            >
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="showEditProjectModal = false">
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
.projects-layout {
  padding: 20px;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.projects-header h1 {
  font-size: 24px;
  color: #2c3e50;
}

.new-project-btn {
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

.new-project-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.projects-filters {
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.project-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.project-header h3 {
  font-size: 18px;
  color: #2c3e50;
  margin: 0;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.planificado {
  background: #e3f2fd;
  color: #1976d2;
}

.status-badge.en-progreso {
  background: #fff3e0;
  color: #ef6c00;
}

.status-badge.completado {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.suspendido {
  background: #ffebee;
  color: #c62828;
}

.project-description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.4;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.detail i {
  color: #999;
}

.progress-bar {
  background: #f5f5f5;
  border-radius: 4px;
  height: 8px;
  position: relative;
  margin-top: 5px;
}

.progress {
  background: #4CAF50;
  border-radius: 4px;
  height: 100%;
  transition: width 0.3s ease;
}

.progress-bar span {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 12px;
  color: #666;
}

.project-actions {
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

.project-form {
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