<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <div class="search-container">
    <i class="fas fa-search"></i>
    <input 
      type="text" 
      placeholder="Buscar tareas o proyectos..." 
      v-model="searchQuery"
      @input="handleSearch"
    >
  </div>
</template>

<style scoped>
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

@media (max-width: 768px) {
  .search-container {
    width: 200px;
  }
}

@media (max-width: 576px) {
  .search-container {
    width: 100%;
  }
}
</style> 