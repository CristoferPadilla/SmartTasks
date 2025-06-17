<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="stat-card">
    <div class="stat-icon">
      <i :class="icon"></i>
    </div>
    <div class="stat-info">
      <h3>{{ value }}</h3>
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<style scoped>
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
</style> 