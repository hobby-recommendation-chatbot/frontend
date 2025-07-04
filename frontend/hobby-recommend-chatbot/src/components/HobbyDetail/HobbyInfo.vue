<template>
  <div class="info-panel">
    <div class="hero-image">
      <!-- 이미지가 없는 경우 기본 아이콘 표시 -->
      <div class="image-placeholder" v-if="!hobby.image_url">
        <div class="hobby-icon">🎯</div>
      </div>
      <img v-else :src="getImageUrl(hobby.image_url)" :alt="hobby.name" />
      <div class="image-overlay">
        <h2>{{ hobby.name }}</h2>
      </div>
    </div>
    
    <div class="info-content">
      <!-- 기본 설명 섹션 -->
      <div class="description-card" v-if="hobby.desc">
        <h3>📖 기본 설명</h3>
        <div class="formatted-text" v-html="formattedDesc"></div>
      </div>
      
      <!-- 상세 설명 섹션 -->
      <div class="description-card" v-if="hobby.detail">
        <h3>📋 상세 정보</h3>
        <div class="formatted-text" v-html="formattedDetail"></div>
      </div>
      
      <!-- 설명이 없는 경우 -->
      <div class="description-card" v-if="!hobby.desc && !hobby.detail">
        <h3>📖 설명</h3>
        <p>상세 정보가 제공되지 않았습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Hobby } from '../../types';

const props = defineProps<{
  hobby: Hobby;
}>();

const BASE_URL = 'https://backend-ssafy-9057.fly.dev/';

function getImageUrl(imageUrl: string) {
  return BASE_URL + imageUrl;
}

// 텍스트를 HTML로 포맷팅하는 함수
const formatText = (text: string): string => {
  if (!text) return '';
  
  
  const formatted = text
    // 줄바꿈을 <br>로 변경
    .replace(/\\n/g, '<br>')  
    .replace(/\n/g, '<br>')
    // 숫자로 시작하는 목록을 강조
    .replace(/^(\d+\.\s+)(.+)$/gm, '<strong>$1</strong>$2')
    .replace(/(<br>){3,}/g, '<br><br>');

  return formatted;
};

const formattedDesc = computed(() => {
  return props.hobby.desc ? formatText(props.hobby.desc) : '';
});

const formattedDetail = computed(() => {
  return props.hobby.detail ? formatText(props.hobby.detail) : '';
});
</script>

<style scoped>
.info-panel {
  padding-bottom: 2rem;
  animation: fadeIn 0.3s ease-out;
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

.formatted-text {
  text-align: left;
  color: #4b5563;
  line-height: 1.6;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .info-content {
    padding: 1rem;
  }
}
</style>