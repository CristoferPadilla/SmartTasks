<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    name: 'SmartTask v2',
    description: 'Rediseño y mejora de la plataforma de gestión de tareas',
    status: 'en progreso',
    progress: 65,
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    leader: 'Juan Pérez',
    team: ['María García', 'Carlos López', 'Ana Martínez']
  },
  {
    id: 2,
    name: 'Portal de Clientes',
    description: 'Desarrollo de portal web para gestión de clientes',
    status: 'planificado',
    progress: 0,
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    leader: 'María García',
    team: ['Juan Pérez', 'Carlos López']
  }
])

const filters = ref({
  status: 'todos',
  search: ''
})

const showNewProjectModal = ref(false)

const handleFilterChange = (type, value) => {
  filters.value[type] = value
}

const handleSearch = (value) => {
  filters.value.search = value
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
        
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${project.progress}%` }"></div>
          <span class="progress-text">{{ project.progress }}%</span>
        </div>
        
        <div class="project-details">
          <div class="detail">
            <i class="fas fa-calendar"></i>
            <div class="detail-info">
              <span class="detail-label">Inicio</span>
              <span class="detail-value">{{ project.startDate }}</span>
            </div>
          </div>
          <div class="detail">
            <i class="fas fa-calendar-check"></i>
            <div class="detail-info">
              <span class="detail-label">Fin</span>
              <span class="detail-value">{{ project.endDate }}</span>
            </div>
          </div>
          <div class="detail">
            <i class="fas fa-user-tie"></i>
            <div class="detail-info">
              <span class="detail-label">Líder</span>
              <span class="detail-value">{{ project.leader }}</span>
            </div>
          </div>
        </div>
        
        <div class="team-section">
          <h4>Equipo</h4>
          <div class="team-members">
            <div v-for="member in project.team" :key="member" class="team-member">
              <i class="fas fa-user"></i>
              <span>{{ member }}</span>
            </div>
          </div>
        </div>
        
        <div class="project-actions">
          <button class="action-btn view">
            <i class="fas fa-eye"></i>
            Ver Detalles
          </button>
          <button class="action-btn edit">
            <i class="fas fa-edit"></i>
            Editar
          </button>
        </div>
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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

.project-description {
  color: #666;
  margin-bottom: 15px;
  font-size: 14px;
}

.progress-bar {
  height: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 15px;
  position: relative;
}

.progress {
  height: 100%;
  background: #4CAF50;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 12px;
  color: #666;
}

.project-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail i {
  color: #666;
  font-size: 16px;
}

.detail-info {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 12px;
  color: #999;
}

.detail-value {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
}

.team-section {
  margin-bottom: 20px;
}

.team-section h4 {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.team-members {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.team-member {
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.team-member i {
  font-size: 10px;
}

.project-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.action-btn.view {
  background: #e3f2fd;
  color: #1976d2;
}

.action-btn.edit {
  background: #fff3e0;
  color: #ef6c00;
}

.action-btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .projects-filters {
    flex-direction: column;
  }
  
  .search-group {
    width: 100%;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-details {
    grid-template-columns: 1fr;
  }
}
</style> 