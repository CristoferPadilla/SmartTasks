<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  leader: {
    type: String,
    required: true
  },
  tasks: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="job-card">
    <div class="job-header">
      <span class="job-id">#{{ id }}</span>
      <span class="job-date">{{ date }}</span>
    </div>
    <div class="job-info">
      <h3 class="job-client">{{ name }}</h3>
      <div class="job-details">
        <div class="job-detail">
          <div class="detail-icon">
            <i class="fas fa-user-tie"></i>
          </div>
          <div class="detail-text">
            <div class="detail-title">Líder</div>
            <div class="detail-value">{{ leader }}</div>
          </div>
        </div>
        <div class="job-detail">
          <div class="detail-icon">
            <i class="fas fa-tasks"></i>
          </div>
          <div class="detail-text">
            <div class="detail-title">Tareas</div>
            <div class="detail-value">{{ tasks }} completadas</div>
          </div>
        </div>
        <div class="job-detail">
          <div class="detail-icon">
            <i class="fas fa-calendar-day"></i>
          </div>
          <div class="detail-text">
            <div class="detail-title">Fecha límite</div>
            <div class="detail-value">{{ deadline }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="job-footer">
      <div class="job-amount">{{ progress }}% completado</div>
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
</template>

<style scoped>
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
</style> 