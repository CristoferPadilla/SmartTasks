<template>
  <div class="dashboard">
    <!-- Menú toggle para móviles -->
    <div class="menu-toggle" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </div>
    
    <!-- Barra lateral / Navbar -->
    <div class="sidebar" :class="{ active: sidebarActive }">
      <div class="logo-container">
        <a href="#" class="logo">
          <i class="fas fa-tasks"></i>
          <span>SmartTask</span>
        </a>
      </div>
      
      <div class="nav-links">
        <div class="nav-top">
          <a href="#" class="nav-link" :class="{ active: activeTab === 'inicio' }" @click.prevent="setActiveTab('inicio')">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
          </a>
          <a href="#" class="nav-link" :class="{ active: activeTab === 'tareas' }" @click.prevent="setActiveTab('tareas')">
            <i class="fas fa-check-circle"></i>
            <span>Tareas</span>
          </a>
          <a href="#" class="nav-link" :class="{ active: activeTab === 'proyectos' }" @click.prevent="setActiveTab('proyectos')">
            <i class="fas fa-project-diagram"></i>
            <span>Proyectos</span>
          </a>
          <a href="#" class="nav-link" :class="{ active: activeTab === 'equipo' }" @click.prevent="setActiveTab('equipo')">
            <i class="fas fa-users"></i>
            <span>Equipo</span>
          </a>
          <a href="#" class="nav-link" :class="{ active: activeTab === 'calendario' }" @click.prevent="setActiveTab('calendario')">
            <i class="fas fa-calendar-alt"></i>
            <span>Calendario</span>
          </a>
          <a href="#" class="nav-link" :class="{ active: activeTab === 'ajustes' }" @click.prevent="setActiveTab('ajustes')">
            <i class="fas fa-cog"></i>
            <span>Ajustes</span>
          </a>
        </div>
        
        <!-- Botón de cerrar sesión -->
        <div class="nav-bottom">
          <div class="nav-link" id="logoutBtn" style="background: rgba(231, 76, 60, 0.2);" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar Sesión</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Contenido principal -->
    <div class="main-content">
      <div class="topbar">
        <SearchBar @search="handleSearch" />
        
        <div class="user-actions">
          <div class="notification-btn">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">{{ notificationCount }}</span>
          </div>
          <div class="user-profile">
            {{ userInitial }}
          </div>
        </div>
      </div>
      
      <div class="dashboard-container">
        <!-- Mensaje de estado para cierre de sesión -->
        <div class="status-message" :class="statusClass" v-if="statusMessage">
          {{ statusMessage }}
        </div>
        
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
              <a href="#" class="register-btn">
                <i class="fas fa-plus"></i>
                Nuevo Proyecto
              </a>
              <a href="#" class="section-action">
                Ver todos
                <i class="fas fa-arrow-right"></i>
              </a>
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PriorityCard from '../components/PriorityCard.vue'
import JobCard from '../components/JobCard.vue'
import StatCard from '../components/StatCard.vue'
import WelcomeBanner from '../components/WelcomeBanner.vue'
import SearchBar from '../components/SearchBar.vue'

const sidebarActive = ref(false)
const activeTab = ref('inicio')
const notificationCount = ref(3)
const userName = ref('Cristofer')
const userInitial = ref('C')
const statusMessage = ref('')
const statusClass = ref('')

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

const toggleSidebar = () => {
  sidebarActive.value = !sidebarActive.value
}

const setActiveTab = (tab) => {
  activeTab.value = tab
  if (window.innerWidth < 576) {
    sidebarActive.value = false
  }
}

const logout = () => {
  statusMessage.value = 'Sesión cerrada exitosamente. Redirigiendo...'
  statusClass.value = 'success'
  
  setTimeout(() => {
    statusMessage.value = ''
    alert('Redirigiendo a página de login')
  }, 1500)
}

const handleSearch = (query) => {
  console.log('Búsqueda:', query)
  // Implementar lógica de búsqueda
}
</script>

<style scoped>
/* Estilos del layout principal */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: #f5f7fa;
  color: #333;
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Barra lateral / Navbar */
.sidebar {
  width: 250px;
  background: #2c3e50;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: all 0.3s;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  z-index: 100;
  position: fixed;
}

.logo-container {
  padding: 25px 20px;
  text-align: center;
  border-bottom: 1px solid #34495e;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.logo i {
  font-size: 28px;
  color: #4CAF50;
}

.nav-links {
  padding: 20px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-top {
  flex: 1;
}

.nav-bottom {
  padding: 15px 0;
  border-top: 1px solid #34495e;
  margin-top: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 18px 25px;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
  margin-bottom: 8px;
  cursor: pointer;
}

.nav-link:hover {
  color: #fff;
  background: rgba(76, 175, 80, 0.15);
}

.nav-link.active {
  color: #fff;
  background: rgba(76, 175, 80, 0.25);
  border-left: 4px solid #4CAF50;
}

.nav-link.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(76, 175, 80, 0.25), transparent);
  z-index: -1;
}

.nav-link i {
  font-size: 20px;
  margin-right: 15px;
  width: 24px;
  text-align: center;
}

/* Contenido principal */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
  margin-left: 250px;
}

.topbar {
  background: #fff;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-btn, .user-profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.notification-btn {
  background: #f5f7fa;
  color: #555;
  position: relative;
}

.notification-btn:hover {
  background: #4CAF50;
  color: #fff;
}

.notification-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  background: #e74c3c;
  color: #fff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile {
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: #fff;
  font-weight: 600;
  font-size: 18px;
}

.dashboard-container {
  padding: 30px;
  flex: 1;
  overflow-y: auto;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.content-section {
  background: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.section-actions {
  display: flex;
  gap: 15px;
}

.section-action {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-action:hover {
  text-decoration: underline;
}

.register-btn {
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  text-decoration: none;
}

.register-btn:hover {
  background: #0b7dda;
  transform: translateY(-2px);
}

.priority-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.recent-jobs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* Mensaje de estado */
.status-message {
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
  text-align: center;
  font-weight: 500;
}

.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Responsive */
@media (max-width: 992px) {
  .sidebar {
    width: 70px;
  }
  
  .logo span, .nav-link span {
    display: none;
  }
  
  .logo i, .nav-link i {
    margin-right: 0;
    font-size: 24px;
  }
  
  .nav-link {
    justify-content: center;
    padding: 15px 10px;
  }
  
  .section-actions {
    flex-direction: column;
    align-items: flex-end;
  }
  
  .main-content {
    margin-left: 70px;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .priority-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .topbar {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
  
  .sidebar {
    position: fixed;
    left: -250px;
    height: 100vh;
  }
  
  .sidebar.active {
    left: 0;
  }
  
  .menu-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: #4CAF50;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
  }
  
  .section-actions {
    width: 100%;
    margin-top: 15px;
    flex-direction: row;
    justify-content: flex-end;
  }
  
  .main-content {
    margin-left: 0;
  }
}
</style>