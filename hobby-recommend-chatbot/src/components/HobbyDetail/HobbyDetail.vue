<template>
  <div class="detail-container">
    <div class="detail-header">
      <button @click="goBack" class="back-button">
        ← 목록으로
      </button>
      <h1>{{ hobby.name }}</h1>
    </div>

    <div class="tab-navigation">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
      >
        {{ tab.icon }} {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <HobbyInfo 
        v-if="activeTab === 'info'" 
        :hobby="hobby" 
      />
      
      <HobbyMaterials 
        v-if="activeTab === 'materials'" 
        :hobby="hobby" 
      />
      
      <HobbyAdditionalInfo 
        v-if="activeTab === 'additional'" 
        :hobby="hobby" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Hobby } from '../../types';
import HobbyInfo from './HobbyInfo.vue';
import HobbyMaterials from './HobbyMaterials.vue';
import HobbyAdditionalInfo from './HobbyAdditionalInfo.vue';

const props = defineProps<{
  hobby: Hobby;
}>();

const emit = defineEmits<{
  back: [];
}>();

const activeTab = ref('info');

const tabs = [
  { id: 'info', label: '상세정보', icon: '📋' },
  { id: 'materials', label: '준비물', icon: '🛍️' },
  { id: 'additional', label: '추가정보', icon: '📚' }
];

const goBack = () => {
  emit('back');
};
</script>

<style scoped>
.detail-container {
  min-height: 100vh;
  background: #f9fafb;
}

.detail-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  position: relative;
}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.detail-header h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 700;
}

.tab-navigation {
  display: flex;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 1rem;
  overflow-x: auto;
}

.tab-button {
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-button.active {
  color: #8B5CF6;
  border-bottom-color: #8B5CF6;
}

.tab-button:hover {
  color: #8B5CF6;
}

.tab-content {
  flex: 1;
}

@media (max-width: 768px) {
  .detail-header {
    padding: 1.5rem 1rem;
  }

  .detail-header h1 {
    font-size: 1.5rem;
  }

  .back-button {
    top: 1rem;
    left: 0.5rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>