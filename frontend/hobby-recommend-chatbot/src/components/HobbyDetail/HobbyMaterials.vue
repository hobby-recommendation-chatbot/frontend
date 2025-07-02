<template>
  <div class="materials-panel">
    <div class="section-header">
      <h3>🛍️ 필요한 준비물</h3>
      <p>시작하기 위해 필요한 기본 도구들을 준비해보세요</p>
    </div>
    
    <div class="materials-list">
      <div 
        v-for="(material, index) in hobby.materials" 
        :key="index"
        class="material-item"
      >
        <div class="material-check">✓</div>
        <span>{{ material }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hobby } from '../../types';

defineProps<{
  hobby: Hobby;
}>();
</script>

<style scoped>
.materials-panel {
  padding: 1.5rem;
  padding-bottom: 2rem;
  animation: fadeIn 0.3s ease-out;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 700;
}

.section-header p {
  margin: 0;
  color: #6b7280;
}

.materials-list {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.material-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.material-item:last-child {
  border-bottom: none;
}

.material-check {
  width: 24px;
  height: 24px;
  background: #dcfce7;
  color: #166534;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .materials-panel {
    padding: 1rem;
  }
}
</style>