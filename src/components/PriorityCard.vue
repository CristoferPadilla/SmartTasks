<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="priority-card">
    <div class="priority-header">
      <i :class="icon"></i>
      <h3>{{ title }}</h3>
    </div>
    <ul class="priority-list">
      <li class="priority-item" v-for="item in items" :key="item.id">
        <div class="item-info">
          <span class="item-title">{{ item.name }}</span>
          <span class="item-detail">{{ item.description || `Proyecto: ${item.project} | Vence: ${item.dueDate}` }}</span>
        </div>
        <span v-if="item.priority" class="item-value status-badge" :class="'status-' + item.priority">
          {{ item.priorityText }}
        </span>
        <span v-else class="item-value">{{ item.assignee }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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
</style> 