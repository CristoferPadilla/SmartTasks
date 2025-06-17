<script setup>
defineProps({
  userName: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="welcome-banner">
    <div class="welcome-text">
      <h1>Bienvenido de nuevo, {{ userName }}</h1>
      <p>Aquí tienes un resumen de tus tareas y proyectos pendientes que requieren atención.</p>
    </div>
    <div class="welcome-icon">
      <i class="fas fa-clipboard-check"></i>
    </div>
  </div>
</template>

<style scoped>
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

@media (max-width: 768px) {
  .welcome-banner {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .welcome-icon {
    display: none;
  }
}
</style> 