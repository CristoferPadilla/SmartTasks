<script setup>
import { ref } from 'vue'

const teamMembers = ref([
  {
    id: 1,
    name: 'Juan Pérez',
    role: 'Desarrollador Frontend',
    email: 'juan.perez@smarttask.com',
    phone: '+34 123 456 789',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'disponible',
    skills: ['Vue.js', 'React', 'TypeScript'],
    projects: ['SmartTask v2', 'Portal Clientes']
  },
  {
    id: 2,
    name: 'María García',
    role: 'Diseñadora UI/UX',
    email: 'maria.garcia@smarttask.com',
    phone: '+34 987 654 321',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'ocupado',
    skills: ['Figma', 'Adobe XD', 'UI Design'],
    projects: ['SmartTask v2']
  }
])

const filters = ref({
  role: 'todos',
  status: 'todos',
  search: ''
})

const showNewMemberModal = ref(false)

const handleFilterChange = (type, value) => {
  filters.value[type] = value
}

const handleSearch = (value) => {
  filters.value.search = value
}
</script>

<template>
  <div class="team-layout">
    <div class="team-header">
      <h1>Gestión del Equipo</h1>
      <button class="new-member-btn" @click="showNewMemberModal = true">
        <i class="fas fa-user-plus"></i>
        Nuevo Miembro
      </button>
    </div>

    <div class="team-filters">
      <div class="filter-group">
        <label>Rol:</label>
        <select v-model="filters.role" @change="handleFilterChange('role', $event.target.value)">
          <option value="todos">Todos</option>
          <option value="desarrollador">Desarrollador</option>
          <option value="diseñador">Diseñador</option>
          <option value="producto">Producto</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Estado:</label>
        <select v-model="filters.status" @change="handleFilterChange('status', $event.target.value)">
          <option value="todos">Todos</option>
          <option value="disponible">Disponible</option>
          <option value="ocupado">Ocupado</option>
          <option value="ausente">Ausente</option>
        </select>
      </div>

      <div class="search-group">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="Buscar miembros..." 
          v-model="filters.search"
          @input="handleSearch($event.target.value)"
        >
      </div>
    </div>

    <div class="team-grid">
      <div v-for="member in teamMembers" :key="member.id" class="member-card">
        <div class="member-header">
          <div class="member-avatar">
            <img :src="member.avatar" :alt="member.name">
            <span :class="['status-indicator', member.status]"></span>
          </div>
          <div class="member-info">
            <h3>{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
          </div>
        </div>

        <div class="member-contact">
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>{{ member.email }}</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <span>{{ member.phone }}</span>
          </div>
        </div>

        <div class="member-skills">
          <h4>Habilidades</h4>
          <div class="skills-list">
            <span v-for="skill in member.skills" :key="skill" class="skill-tag">
              {{ skill }}
            </span>
          </div>
        </div>

        <div class="member-projects">
          <h4>Proyectos</h4>
          <div class="projects-list">
            <span v-for="project in member.projects" :key="project" class="project-tag">
              {{ project }}
            </span>
          </div>
        </div>

        <div class="member-actions">
          <button class="action-btn message">
            <i class="fas fa-comment"></i>
            Mensaje
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
.team-layout {
  padding: 20px;
}

.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.team-header h1 {
  font-size: 24px;
  color: #2c3e50;
}

.new-member-btn {
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

.new-member-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.team-filters {
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

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.member-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.member-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.member-avatar {
  position: relative;
}

.member-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.disponible {
  background: #4CAF50;
}

.status-indicator.ocupado {
  background: #FFC107;
}

.status-indicator.ausente {
  background: #F44336;
}

.member-info h3 {
  font-size: 18px;
  color: #2c3e50;
  margin: 0;
}

.member-role {
  color: #666;
  font-size: 14px;
  margin: 5px 0 0;
}

.member-contact {
  margin-bottom: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.contact-item i {
  color: #999;
  width: 16px;
}

.member-skills, .member-projects {
  margin-bottom: 20px;
}

.member-skills h4, .member-projects h4 {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.skills-list, .projects-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag, .project-tag {
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.member-actions {
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

.action-btn.message {
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
  .team-filters {
    flex-direction: column;
  }
  
  .search-group {
    width: 100%;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style> 