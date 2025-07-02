<template>
  <div class="additional-panel">
    <div class="section-header">
      <h3>📚 알아두면 좋은 정보</h3>
      <p>더 깊이 있게 즐기기 위한 유용한 정보들</p>
    </div>
    
    <div class="additional-content">
      <div class="content-card">
        <h4>🎯 시작하기 전에</h4>
        <p>{{ hobby.additionalInfo }}</p>
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
.additional-panel {
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

.additional-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.content-card h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 600;
}

.content-card p {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .additional-panel {
    padding: 1rem;
  }
}
</style>