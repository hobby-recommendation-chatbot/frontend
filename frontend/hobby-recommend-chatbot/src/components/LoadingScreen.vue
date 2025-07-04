<template>
  <div class="loading-container">
    <div class="loading-content">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      
      <div class="loading-text">
        <h2>{{ hobbyName }} 정보를 불러오는 중...</h2>
        <p>{{ currentMessage }}</p>
      </div>
      
      <div class="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
  hobbyName?: string;
}>();

const currentMessage = ref('상세 정보를 준비하고 있어요');

const messages = [
  '상세 정보를 준비하고 있어요',
  '필요한 준비물을 확인하고 있어요',
  '추가 정보를 수집하고 있어요',
  '거의 다 준비되었어요!'
];

let messageInterval: NodeJS.Timeout;

onMounted(() => {
  let messageIndex = 0;
  messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.length;
    currentMessage.value = messages[messageIndex];
  }, 1500);
});

onUnmounted(() => {
  if (messageInterval) {
    clearInterval(messageInterval);
  }
});
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-content {
  text-align: center;
  color: white;
  max-width: 400px;
  padding: 0 20px;
}

.loading-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
}

.spinner-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  border: 4px solid transparent;
  border-top: 4px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.spinner-ring:nth-child(2) {
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  border-top: 4px solid rgba(255, 255, 255, 0.6);
  animation-duration: 2s;
  animation-direction: reverse;
}

.spinner-ring:nth-child(3) {
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  border-top: 4px solid rgba(255, 255, 255, 0.4);
  animation-duration: 1s;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.loading-text p {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  animation: bounce 1.4s infinite ease-in-out;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .loading-content {
    padding: 0 40px;
  }
  
  .loading-text h2 {
    font-size: 1.3rem;
  }
  
  .loading-text p {
    font-size: 0.9rem;
  }
  
  .loading-spinner {
    width: 60px;
    height: 60px;
  }
  
  .spinner-ring {
    width: 60px;
    height: 60px;
  }
  
  .spinner-ring:nth-child(2) {
    width: 45px;
    height: 45px;
    top: 7.5px;
    left: 7.5px;
  }
  
  .spinner-ring:nth-child(3) {
    width: 30px;
    height: 30px;
    top: 15px;
    left: 15px;
  }
}
</style>