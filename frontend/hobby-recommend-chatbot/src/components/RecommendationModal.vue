<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2>🎯 맞춤 취미 추천</h2>
        <p>당신에게 딱 맞는 취미들을 준비했어요!</p>
        <button @click="closeModal" class="close-button">×</button>
      </div>
      
      <div class="recommendations-scroll" ref="scrollContainer">
        <div 
          v-for="(hobby, index) in hobbies"
          :key="index"
          class="recommendation-card"
          :class="{ 'active': index === activeIndex }"
          :ref="(el: any) => setCardRef(el, index)"
        >
          <div class="card-image">
            <!-- 이미지가 있는 경우 -->
            <img 
              v-if="hobby.image_url" 
              :src="hobby.image_url" 
              :alt="hobby.name" 
            />
            <!-- 이미지가 없는 경우 기본 아이콘 -->
            <div v-else class="image-placeholder">
              <div class="hobby-icon">🎯</div>
            </div>
            <div class="card-overlay"></div>
          </div>
          
          <div class="card-content">
            <div class="card-header">
              <h3>{{ hobby.name }}</h3>
            </div>
            
            <!-- 설명 우선순위: desc > detail > 기본 메시지 -->
            <p class="description">
              {{ hobby.desc || hobby.detail || '이 취미에 대한 새로운 경험을 시작해보세요!' }}
            </p>
            
            <button
              @click="selectHobby(hobby)"
              class="select-button"
            >
              이 취미가 좋아! 🎉
            </button>
          </div>
        </div>
      </div>
      
      <!-- 추천 결과가 없는 경우 -->
      <div v-if="!hobbies || hobbies.length === 0" class="no-recommendations">
        <div class="no-recommendations-icon">🤔</div>
        <h3>추천할 취미를 찾고 있어요</h3>
        <p>잠시만 기다려주세요...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Hobby } from '../types';

// Props 정의 - 백엔드에서 받아온 취미 목록
const props = defineProps<{
  hobbies: Hobby[];
}>();

const emit = defineEmits<{
  close: [];
  selectHobby: [hobby: Hobby];
}>();

const scrollContainer = ref<HTMLElement>();
const cardRefs = ref<HTMLElement[]>([]);
const activeIndex = ref(0);

const closeModal = () => {
  emit('close');
};

const selectHobby = (hobby: Hobby) => {
  emit('selectHobby', hobby);
};

const setCardRef = (el: any, index: number) => {
  if (el) {
    cardRefs.value[index] = el;
  }
};

const updateActiveCard = () => {
  if (!scrollContainer.value) return;
  
  const containerRect = scrollContainer.value.getBoundingClientRect();
  const containerCenter = containerRect.top + containerRect.height / 2;
  
  let closestIndex = 0;
  let closestDistance = Infinity;
  
  cardRefs.value.forEach((card, index) => {
    if (!card) return;
    
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.top + cardRect.height / 2;
    const distance = Math.abs(cardCenter - containerCenter);
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
  
  activeIndex.value = closestIndex;
};

const onScroll = () => {
  updateActiveCard();
};

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', onScroll);
  updateActiveCard();
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-container {
  background: white;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 400px;
  height: 80vh;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.4s ease-out;
  position: relative;
}

.modal-header {
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid #f3f4f6;
  position: relative;
}

.modal-header h2 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal-header p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #9ca3af;
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: #f3f4f6;
  color: #374151;
}

.recommendations-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.recommendations-scroll::-webkit-scrollbar {
  display: none;
}

.recommendation-card {
  background: white;
  border-radius: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: scale(0.95);
  opacity: 0.6;
  filter: blur(1px);
}

.recommendation-card.active {
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.2);
  border: 2px solid #8B5CF6;
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recommendation-card.active .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
}

.card-content {
  padding: 1.25rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.card-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  flex: 1;
}

.description {
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.card-meta {
  margin-bottom: 1rem;
}

.select-button {
  width: 100%;
  background: linear-gradient(135deg, #8B5CF6, #A855F7);
  color: white;
  border: none;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.select-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

.select-button:active {
  transform: translateY(0);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    height: 85vh;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .recommendations-scroll {
    padding: 0.75rem;
  }
  
  .card-content {
    padding: 1rem;
  }
}
</style>