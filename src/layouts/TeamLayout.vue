<script setup>
import { ref } from 'vue'

const teamMembers = ref([
  {
    id: 1,
    name: 'Ana Martínez',
    role: 'Project Manager',
    email: 'ana.martinez@empresa.com',
    phone: '+34 612 345 678',
    department: 'Gestión',
    status: 'activo',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Desarrollador Senior',
    email: 'carlos.rodriguez@empresa.com',
    phone: '+34 623 456 789',
    department: 'Desarrollo',
    status: 'activo',
    joinDate: '2023-03-20'
  }
])

const filters = ref({
  department: 'todos',
  status: 'todos',
  search: ''
})

const showNewMemberModal = ref(false)
const showEditMemberModal = ref(false)
const selectedMember = ref(null)

const newMember = ref({
  name: '',
  role: '',
  email: '',
  phone: '',
  department: '',
  status: 'activo',
  joinDate: ''
})

const handleFilterChange = (type, value) => {
  filters.value[type] = value
}

const handleSearch = (value) => {
  filters.value.search = value
}

const createNewMember = () => {
  const member = {
    id: teamMembers.value.length + 1,
    ...newMember.value
  }
  teamMembers.value.push(member)
  showNewMemberModal.value = false
  resetNewMemberForm()
}

const resetNewMemberForm = () => {
  newMember.value = {
    name: '',
    role: '',
    email: '',
    phone: '',
    department: '',
    status: 'activo',
    joinDate: ''
  }
}

const editMember = (member) => {
  selectedMember.value = { ...member }
  showEditMemberModal.value = true
}

const updateMember = () => {
  const index = teamMembers.value.findIndex(m => m.id === selectedMember.value.id)
  if (index !== -1) {
    teamMembers.value[index] = { ...selectedMember.value }
  }
  showEditMemberModal.value = false
  selectedMember.value = null
}

const deleteMember = (memberId) => {
  if (confirm('¿Estás seguro de que deseas eliminar este miembro del equipo?')) {
    teamMembers.value = teamMembers.value.filter(m => m.id !== memberId)
  }
}
</script>

<template>
  <div class="team-layout">
    <div class="team-header">
      <h1>Gestión del Equipo</h1>
      <button class="new-member-btn" @click="showNewMemberModal = true">
        <i class="fas fa-plus"></i>
        Nuevo Miembro
      </button>
    </div>

    <div class="team-filters">
      <div class="filter-group">
        <label>Departamento:</label>
        <select v-model="filters.department" @change="handleFilterChange('department', $event.target.value)">
          <option value="todos">Todos</option>
          <option value="Gestión">Gestión</option>
          <option value="Desarrollo">Desarrollo</option>
          <option value="Diseño">Diseño</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Estado:</label>
        <select v-model="filters.status" @change="handleFilterChange('status', $event.target.value)">
          <option value="todos">Todos</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
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
            <i class="fas fa-user"></i>
          </div>
          <div class="member-info">
            <h3>{{ member.name }}</h3>
            <span class="role">{{ member.role }}</span>
          </div>
          <span :class="['status-badge', member.status]">{{ member.status }}</span>
        </div>

        <div class="member-details">
          <div class="detail">
            <i class="fas fa-envelope"></i>
            <span>{{ member.email }}</span>
          </div>
          <div class="detail">
            <i class="fas fa-phone"></i>
            <span>{{ member.phone }}</span>
          </div>
          <div class="detail">
            <i class="fas fa-building"></i>
            <span>{{ member.department }}</span>
          </div>
          <div class="detail">
            <i class="fas fa-calendar"></i>
            <span>Ingreso: {{ member.joinDate }}</span>
          </div>
        </div>

        <div class="member-actions">
          <button class="action-btn edit" @click="editMember(member)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete" @click="deleteMember(member.id)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Nuevo Miembro -->
    <div v-if="showNewMemberModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Agregar Nuevo Miembro</h2>
          <button class="close-btn" @click="showNewMemberModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="createNewMember" class="member-form">
          <div class="form-group">
            <label for="name">Nombre Completo</label>
            <input 
              type="text" 
              id="name" 
              v-model="newMember.name" 
              required
              placeholder="Ingrese el nombre completo"
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="role">Cargo</label>
              <input 
                type="text" 
                id="role" 
                v-model="newMember.role" 
                required
                placeholder="Ingrese el cargo"
              >
            </div>

            <div class="form-group">
              <label for="department">Departamento</label>
              <select id="department" v-model="newMember.department" required>
                <option value="Gestión">Gestión</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Diseño">Diseño</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input 
                type="email" 
                id="email" 
                v-model="newMember.email" 
                required
                placeholder="ejemplo@empresa.com"
              >
            </div>

            <div class="form-group">
              <label for="phone">Teléfono</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="newMember.phone" 
                required
                placeholder="+34 XXX XXX XXX"
              >
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="status">Estado</label>
              <select id="status" v-model="newMember.status" required>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div class="form-group">
              <label for="joinDate">Fecha de Ingreso</label>
              <input 
                type="date" 
                id="joinDate" 
                v-model="newMember.joinDate" 
                required
              >
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="showNewMemberModal = false">
              Cancelar
            </button>
            <button type="submit" class="submit-btn">
              Agregar Miembro
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Edición -->
    <div v-if="showEditMemberModal && selectedMember" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar Miembro</h2>
          <button class="close-btn" @click="showEditMemberModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="updateMember" class="member-form">
          <div class="form-group">
            <label for="edit-name">Nombre Completo</label>
            <input 
              type="text" 
              id="edit-name" 
              v-model="selectedMember.name" 
              required
              placeholder="Ingrese el nombre completo"
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-role">Cargo</label>
              <input 
                type="text" 
                id="edit-role" 
                v-model="selectedMember.role" 
                required
                placeholder="Ingrese el cargo"
              >
            </div>

            <div class="form-group">
              <label for="edit-department">Departamento</label>
              <select id="edit-department" v-model="selectedMember.department" required>
                <option value="Gestión">Gestión</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Diseño">Diseño</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-email">Correo Electrónico</label>
              <input 
                type="email" 
                id="edit-email" 
                v-model="selectedMember.email" 
                required
                placeholder="ejemplo@empresa.com"
              >
            </div>

            <div class="form-group">
              <label for="edit-phone">Teléfono</label>
              <input 
                type="tel" 
                id="edit-phone" 
                v-model="selectedMember.phone" 
                required
                placeholder="+34 XXX XXX XXX"
              >
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-status">Estado</label>
              <select id="edit-status" v-model="selectedMember.status" required>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div class="form-group">
              <label for="edit-joinDate">Fecha de Ingreso</label>
              <input 
                type="date" 
                id="edit-joinDate" 
                v-model="selectedMember.joinDate" 
                required
              >
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="showEditMemberModal = false">
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
  width: 50px;
  height: 50px;
  background: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1976d2;
  font-size: 20px;
}

.member-info {
  flex: 1;
}

.member-info h3 {
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
}

.member-info .role {
  font-size: 14px;
  color: #666;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.activo {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.inactivo {
  background: #ffebee;
  color: #c62828;
}

.member-details {
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
  width: 16px;
}

.member-actions {
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

.member-form {
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
.form-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
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