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
        <div class="search-container">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Buscar tareas o proyectos..." v-model="searchQuery">
        </div>
        
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
        
        <div class="welcome-banner">
          <div class="welcome-text">
            <h1>Bienvenido de nuevo, {{ userName }}</h1>
            <p>Aquí tienes un resumen de tus tareas y proyectos pendientes que requieren atención.</p>
          </div>
          <div class="welcome-icon">
            <i class="fas fa-clipboard-check"></i>
          </div>
        </div>
        
        <div class="stats-container">
          <div class="stat-card" v-for="stat in stats" :key="stat.title">
            <div class="stat-icon">
              <i :class="stat.icon"></i>
            </div>
            <div class="stat-info">
              <h3>{{ stat.value }}</h3>
              <p>{{ stat.title }}</p>
            </div>
          </div>
        </div>
        
        <div class="content-section">
          <div class="section-header">
            <h2 class="section-title">Tareas Prioritarias</h2>
          </div>
          
          <div class="priority-section">
            <div class="priority-card">
              <div class="priority-header">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Urgentes</h3>
              </div>
              <ul class="priority-list">
                <li class="priority-item" v-for="task in urgentTasks" :key="task.id">
                  <div class="item-info">
                    <span class="item-title">{{ task.name }}</span>
                    <span class="item-detail">Proyecto: {{ task.project }} | Vence: {{ task.dueDate }}</span>
                  </div>
                  <span class="item-value status-badge" :class="'status-' + task.priority">
                    {{ task.priorityText }}
                  </span>
                </li>
              </ul>
            </div>
            
            <div class="priority-card">
              <div class="priority-header">
                <i class="fas fa-clock"></i>
                <h3>Próximas</h3>
              </div>
              <ul class="priority-list">
                <li class="priority-item" v-for="task in upcomingTasks" :key="task.id">
                  <div class="item-info">
                    <span class="item-title">{{ task.name }}</span>
                    <span class="item-detail">{{ task.description }} | Vence: {{ task.dueDate }}</span>
                  </div>
                  <span class="item-value">{{ task.assignee }}</span>
                </li>
              </ul>
            </div>
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
            <div class="job-card" v-for="project in recentProjects" :key="project.id">
              <div class="job-header">
                <span class="job-id">#{{ project.id }}</span>
                <span class="job-date">{{ project.date }}</span>
              </div>
              <div class="job-info">
                <h3 class="job-client">{{ project.name }}</h3>
                <div class="job-details">
                  <div class="job-detail">
                    <div class="detail-icon">
                      <i class="fas fa-user-tie"></i>
                    </div>
                    <div class="detail-text">
                      <div class="detail-title">Líder</div>
                      <div class="detail-value">{{ project.leader }}</div>
                    </div>
                  </div>
                  <div class="job-detail">
                    <div class="detail-icon">
                      <i class="fas fa-tasks"></i>
                    </div>
                    <div class="detail-text">
                      <div class="detail-title">Tareas</div>
                      <div class="detail-value">{{ project.tasks }} completadas</div>
                    </div>
                  </div>
                  <div class="job-detail">
                    <div class="detail-icon">
                      <i class="fas fa-calendar-day"></i>
                    </div>
                    <div class="detail-text">
                      <div class="detail-title">Fecha límite</div>
                      <div class="detail-value">{{ project.deadline }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="job-footer">
                <div class="job-amount">{{ project.progress }}% completado</div>
                <div class="job-actions">
                  <button class="action-btn">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn">
                    <i class="fas fa-chart-pie"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      sidebarActive: false,
      activeTab: 'inicio',
      searchQuery: '',
      notificationCount: 3,
      userName: 'Cristofer',
      userInitial: 'C',
      statusMessage: '',
      statusClass: '',
      stats: [
        { icon: 'fas fa-exclamation-triangle', value: '8', title: 'Tareas urgentes' },
        { icon: 'fas fa-check-circle', value: '24', title: 'Completadas esta semana' },
        { icon: 'fas fa-project-diagram', value: '5', title: 'Proyectos activos' },
        { icon: 'fas fa-clock', value: '12', title: 'Pendientes hoy' }
      ],
      urgentTasks: [
        { id: 1, name: 'Revisar diseño UI', project: 'SmartTask v2', dueDate: 'Hoy', priority: 'high', priorityText: 'Urgente' },
        { id: 2, name: 'Corregir bugs reportados', project: 'SmartTask v1', dueDate: 'Mañana', priority: 'high', priorityText: 'Urgente' },
        { id: 3, name: 'Preparar presentación', project: 'Reunión clientes', dueDate: '20/06', priority: 'medium', priorityText: 'Alta' },
        { id: 4, name: 'Actualizar documentación', project: 'SmartTask API', dueDate: '22/06', priority: 'low', priorityText: 'Media' }
      ],
      upcomingTasks: [
        { id: 1, name: 'Revisar código equipo', description: 'Revisión semanal', dueDate: '25/06', assignee: 'Equipo Dev' },
        { id: 2, name: 'Planificar sprint', description: 'Sprint planning', dueDate: '28/06', assignee: 'Todo el equipo' },
        { id: 3, name: 'Entrevista nuevo dev', description: 'Entrevista técnica', dueDate: '30/06', assignee: 'Cristofer + HR' },
        { id: 4, name: 'Actualizar servidores', description: 'Mantenimiento mensual', dueDate: '05/07', assignee: 'Equipo IT' }
      ],
      recentProjects: [
        { id: 'PR-02458', date: '12 Jun 2025', name: 'SmartTask v2', leader: 'Cristofer', tasks: '24/45', deadline: '15 Jul 2025', progress: 53 },
        { id: 'PR-02457', date: '11 Jun 2025', name: 'Portal Clientes', leader: 'María Rodríguez', tasks: '38/42', deadline: '20 Jun 2025', progress: 90 },
        { id: 'PR-02456', date: '10 Jun 2025', name: 'API Integración', leader: 'Roberto Sánchez', tasks: '15/18', deadline: '25 Jun 2025', progress: 83 }
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
      if (window.innerWidth < 576) {
        this.sidebarActive = false;
      }
    },
    logout() {
      this.statusMessage = 'Sesión cerrada exitosamente. Redirigiendo...';
      this.statusClass = 'success';
      
      setTimeout(() => {
        // En una aplicación real, aquí redirigiríamos al login
        this.statusMessage = '';
        // Simulación de redirección
        alert('Redirigiendo a página de login');
      }, 1500);
    }
  },
  mounted() {
    // Simular notificaciones dinámicas
    setInterval(() => {
      this.notificationCount = Math.floor(Math.random() * 5) + 1;
    }, 30000);
  }
};
</script>

<style scoped>
/* Todos los estilos originales aquí */
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
  background: #2c3e50; /* Azul oscuro industrial */
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
  color: #4CAF50; /* Verde para tareas completadas */
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
  background: rgba(76, 175, 80, 0.15); /* Verde más claro */
}

.nav-link.active {
  color: #fff;
  background: rgba(76, 175, 80, 0.25); /* Verde */
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

.search-container {
  position: relative;
  width: 300px;
}

.search-container input {
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 14px;
  background: #f5f7fa;
  transition: all 0.3s;
}

.search-container input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.search-container i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
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

.welcome-banner {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 20px rgba(44, 62, 80, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.welcome-text h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}

.welcome-text p {
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
}

.welcome-icon {
  font-size: 70px;
  opacity: 0.2;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: rgba(76, 175, 80, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #4CAF50;
  margin-right: 20px;
}

.stat-info h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-info p {
  color: #777;
  font-size: 14px;
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

@media (max-width: 992px) {
  .priority-section {
    grid-template-columns: 1fr;
  }
}

.priority-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.priority-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.priority-header i {
  font-size: 24px;
  margin-right: 10px;
  color: #e74c3c;
}

.priority-header h3 {
  font-size: 18px;
  color: #2c3e50;
}

.priority-list {
  list-style: none;
}

.priority-item {
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.priority-item:last-child {
  border-bottom: none;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-title {
  font-weight: 500;
  margin-bottom: 3px;
  color: #2c3e50;
}

.item-detail {
  font-size: 13px;
  color: #7f8c8d;
}

.item-value {
  font-weight: 600;
  color: #e74c3c;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-high {
  background: rgba(231, 76, 60, 0.2);
  color: #c0392b;
}

.status-medium {
  background: rgba(241, 196, 15, 0.2);
  color: #b7950b;
}

.status-low {
  background: rgba(46, 204, 113, 0.2);
  color: #27ae60;
}

.recent-jobs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.job-card {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  background: #fff;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.job-header {
  padding: 15px 20px;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.job-id {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.job-date {
  color: #7f8c8d;
  font-size: 13px;
}

.job-info {
  padding: 20px;
}

.job-client {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
}

.job-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;
}

.job-detail {
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ecf0f1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7f8c8d;
}

.detail-text {
  flex: 1;
}

.detail-title {
  font-weight: 500;
  font-size: 14px;
  color: #2c3e50;
}

.detail-value {
  font-size: 13px;
  color: #7f8c8d;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
}

.job-amount {
  font-weight: 700;
  color: #4CAF50;
}

.job-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #ecf0f1;
  color: #7f8c8d;
  border: none;
}

.action-btn:hover {
  background: #2196F3;
  color: white;
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
  
  .search-container {
    width: 200px;
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
  .welcome-banner {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .welcome-icon {
    display: none;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .search-container {
    width: 150px;
  }
}

@media (max-width: 576px) {
  .topbar {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
  
  .search-container {
    width: 100%;
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
</style>