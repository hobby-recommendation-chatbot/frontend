<template>
  <div class="detail-container">
    <div class="detail-header">
      <button @click="goBack" class="back-button">
        ← 목록으로
      </button>
      <h1>{{ hobby.name }}</h1>
      <div class="header-meta">
        <span class="category-tag">{{ hobby.category }}</span>
        <span class="difficulty-tag" :class="getDifficultyClass(hobby.difficulty)">
          {{ hobby.difficulty }}
        </span>
      </div>
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
      <!-- 상세정보 탭 -->
      <div v-if="activeTab === 'info'" class="tab-panel info-panel">
        <div class="hero-image">
          <img :src="hobby.image" :alt="hobby.name" />
          <div class="image-overlay">
            <h2>{{ hobby.name }}</h2>
          </div>
        </div>
        
        <div class="info-content">
          <div class="description-card">
            <h3>📖 상세 설명</h3>
            <p>{{ hobby.description }}</p>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📂</div>
              <div class="stat-content">
                <span class="stat-label">카테고리</span>
                <span class="stat-value">{{ hobby.category }}</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-content">
                <span class="stat-label">난이도</span>
                <span class="stat-value">{{ hobby.difficulty }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 준비물 탭 -->
      <div v-if="activeTab === 'materials'" class="tab-panel materials-panel">
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
        
        <div class="tips-section">
          <h4>💡 구매 팁</h4>
          <ul class="tips-list">
            <li v-for="(tip, index) in hobby.tips" :key="index">
              {{ tip }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 추가정보 탭 -->
      <div v-if="activeTab === 'additional'" class="tab-panel additional-panel">
        <div class="section-header">
          <h3>📚 알아두면 좋은 정보</h3>
          <p>더 깊이 있게 즐기기 위한 유용한 정보들</p>
        </div>
        
        <div class="additional-content">
          <div class="content-card">
            <h4>🎯 시작하기 전에</h4>
            <p>{{ hobby.additionalInfo }}</p>
          </div>
          
          <div class="tips-section">
            <h4>🔥 전문가 팁</h4>
            <div class="expert-tips">
              <div 
                v-for="(tip, index) in hobby.tips" 
                :key="index"
                class="tip-card"
              >
                <div class="tip-number">{{ index + 1 }}</div>
                <div class="tip-content">{{ tip }}</div>
              </div>
            </div>
          </div>
          
          <div class="community-section">
            <h4>👥 커뮤니티 참여</h4>
            <div class="community-cards">
              <div class="community-card">
                <div class="community-icon">📱</div>
                <div class="community-info">
                  <h5>온라인 커뮤니티</h5>
                  <p>관련 카페나 앱에서 정보를 공유하고 소통해보세요</p>
                </div>
              </div>
              
              <div class="community-card">
                <div class="community-icon">🏪</div>
                <div class="community-info">
                  <h5>오프라인 모임</h5>
                  <p>지역 동호회나 클래스에 참여해 직접 배워보세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Hobby } from '../types';

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

const getDifficultyClass = (difficulty: string) => {
  switch(difficulty) {
    case '초급': return 'beginner';
    case '중급': return 'intermediate';
    case '고급': return 'advanced';
    default: return 'beginner';
  }
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

.header-meta {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.category-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  backdrop-filter: blur(10px);
}

.difficulty-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.difficulty-tag.beginner {
  background: #dcfce7;
  color: #166534;
}

.difficulty-tag.intermediate {
  background: #fef3c7;
  color: #92400e;
}

.difficulty-tag.advanced {
  background: #fee2e2;
  color: #991b1b;
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

.tab-panel {
  animation: fadeIn 0.3s ease-out;
}

.info-panel {
  padding-bottom: 2rem;
}

.hero-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 2rem 1rem 1rem;
  color: white;
}

.image-overlay h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.info-content {
  padding: 1.5rem;
}

.description-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.description-card h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 600;
}

.description-card p {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-card {
  background: white;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-weight: 600;
  color: #1f2937;
}

.materials-panel, .additional-panel {
  padding: 1.5rem;
  padding-bottom: 2rem;
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

.tips-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tips-section h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 600;
}

.tips-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #4b5563;
  line-height: 1.6;
}

.tips-list li {
  margin-bottom: 0.5rem;
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

.expert-tips {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.tip-number {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #8B5CF6, #A855F7);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  flex-shrink: 0;
}

.tip-content {
  color: #4b5563;
  line-height: 1.6;
}

.community-section {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.community-section h4 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 600;
}

.community-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.community-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
}

.community-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.community-info h5 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 0.875rem;
  font-weight: 600;
}

.community-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .detail-header {
    padding: 1.5rem 1rem;
  }
  
  .detail-header h1 {
    font-size: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .materials-panel, .additional-panel {
    padding: 1rem;
  }
  
  .back-button {
    top: 1rem;
    left: 0.5rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>