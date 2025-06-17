<template>
  <div>
    <WelcomeBanner :userName="userName" />
    
    <div class="stats-container">
      <StatCard 
        v-for="stat in stats" 
        :key="stat.title"
        :icon="stat.icon"
        :value="stat.value"
        :title="stat.title"
      />
    </div>
    
    <div class="content-section">
      <div class="section-header">
        <h2 class="section-title">Tareas Prioritarias</h2>
      </div>
      
      <div class="priority-section">
        <PriorityCard
          title="Urgentes"
          icon="fas fa-exclamation-circle"
          :items="urgentTasks"
        />
        
        <PriorityCard
          title="Próximas"
          icon="fas fa-clock"
          :items="upcomingTasks"
        />
      </div>
    </div>
    
    <div class="content-section">
      <div class="section-header">
        <h2 class="section-title">Proyectos Recientes</h2>
        <div class="section-actions">
          <router-link to="/proyectos/nuevo" class="register-btn">
            <i class="fas fa-plus"></i>
            Nuevo Proyecto
          </router-link>
          <router-link to="/proyectos" class="section-action">
            Ver todos
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
      
      <div class="recent-jobs">
        <JobCard
          v-for="project in recentProjects"
          :key="project.id"
          :id="project.id"
          :date="project.date"
          :name="project.name"
          :leader="project.leader"
          :tasks="project.tasks"
          :deadline="project.deadline"
          :progress="project.progress"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PriorityCard from '../components/PriorityCard.vue'
import JobCard from '../components/JobCard.vue'
import StatCard from '../components/StatCard.vue'
import WelcomeBanner from '../components/WelcomeBanner.vue'

const userName = ref('Cristofer')

const stats = ref([
  { icon: 'fas fa-exclamation-triangle', value: '8', title: 'Tareas urgentes' },
  { icon: 'fas fa-check-circle', value: '24', title: 'Completadas esta semana' },
  { icon: 'fas fa-project-diagram', value: '5', title: 'Proyectos activos' },
  { icon: 'fas fa-clock', value: '12', title: 'Pendientes hoy' }
])

const urgentTasks = ref([
  { id: 1, name: 'Revisar diseño UI', project: 'SmartTask v2', dueDate: 'Hoy', priority: 'high', priorityText: 'Urgente' },
  { id: 2, name: 'Corregir bugs reportados', project: 'SmartTask v1', dueDate: 'Mañana', priority: 'high', priorityText: 'Urgente' },
  { id: 3, name: 'Preparar presentación', project: 'Reunión clientes', dueDate: '20/06', priority: 'medium', priorityText: 'Alta' },
  { id: 4, name: 'Actualizar documentación', project: 'SmartTask API', dueDate: '22/06', priority: 'low', priorityText: 'Media' }
])

const upcomingTasks = ref([
  { id: 1, name: 'Revisar código equipo', description: 'Revisión semanal', dueDate: '25/06', assignee: 'Equipo Dev' },
  { id: 2, name: 'Planificar sprint', description: 'Sprint planning', dueDate: '28/06', assignee: 'Todo el equipo' },
  { id: 3, name: 'Entrevista nuevo dev', description: 'Entrevista técnica', dueDate: '30/06', assignee: 'Cristofer + HR' },
  { id: 4, name: 'Actualizar servidores', description: 'Mantenimiento mensual', dueDate: '05/07', assignee: 'Equipo IT' }
])

const recentProjects = ref([
  { id: 'PR-02458', date: '12 Jun 2025', name: 'SmartTask v2', leader: 'Cristofer', tasks: '24/45', deadline: '15 Jul 2025', progress: 53 },
  { id: 'PR-02457', date: '11 Jun 2025', name: 'Portal Clientes', leader: 'María Rodríguez', tasks: '38/42', deadline: '20 Jun 2025', progress: 90 },
  { id: 'PR-02456', date: '10 Jun 2025', name: 'API Integración', leader: 'Roberto Sánchez', tasks: '15/18', deadline: '25 Jun 2025', progress: 83 }
])
</script>

<style scoped>
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.content-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  color: #2c3e50;
  margin: 0;
}

.section-actions {
  display: flex;
  gap: 15px;
}

.register-btn {
  background: var(--primary-color);
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.3s;
}

.register-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.section-action {
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  transition: all 0.3s;
}

.section-action:hover {
  color: #45a049;
}

.priority-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.recent-jobs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .priority-section,
  .recent-jobs {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .section-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style> 