<script setup lang="ts">
import { ref } from 'vue';
import ChatWindow from './components/ChatWindow.vue';
import RecommendationModal from './components/RecommendationModal.vue';
import HobbyDetail from './components/HobbyDetail/HobbyDetail.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import type { AppState, Hobby } from './types';

const currentState = ref<AppState>('chat');
const selectedHobby = ref<Hobby | null>(null);
const isLoading = ref(false);

const hobbyList = ref<Hobby[]>([]);

const showRecommendations = (recommendations: Hobby[]) => {
  hobbyList.value = recommendations;
  currentState.value = 'recommendations';
};

const closeRecommendations = () => {
  currentState.value = 'chat';
};

const selectHobby = async (hobby: Hobby) => {
  selectedHobby.value = hobby;
  isLoading.value = true;
  currentState.value = 'detail';
  
  try {
    const response = await fetch(`https://backend-ssafy-9057.fly.dev/recommend-hobby/${encodeURIComponent(hobby.name)}`);
    const data = await response.json();
    
    selectedHobby.value = {
      ...hobby,
      ...data,
    };
  } catch (error) {
    console.error('❌ 취미 추가 정보 불러오기 실패:', error);
  } finally {
    isLoading.value = false;
  }
};

const goBackToRecommendations = () => {
  currentState.value = 'recommendations';
};
</script>

<template>
  <div id="app">
    <ChatWindow 
      v-if="currentState === 'chat'"
      @show-recommendations="showRecommendations"
    />
    
    <RecommendationModal
      v-if="currentState === 'recommendations'"
      :hobbies="hobbyList"
      @close="closeRecommendations"
      @select-hobby="selectHobby"
    />
    
    <!-- 로딩 중일 때 로딩 화면 표시 -->
    <LoadingScreen
      v-if="currentState === 'detail' && isLoading"
      :hobby-name="selectedHobby?.name"
    />
    
    <!-- 로딩 완료 후-->
    <HobbyDetail
      v-if="currentState === 'detail' && !isLoading && selectedHobby"
      :hobby="selectedHobby"
      @back="goBackToRecommendations"
    />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: #f9fafb;
}

#app {
  width: 100%;
  min-height: 100vh;
}

:root {
  --primary-gradient: linear-gradient(135deg, #8B5CF6, #A855F7);
  --secondary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --surface: #ffffff;
  --background: #f9fafb;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border: #e5e7eb;
  --shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.5);
}

button {
  font-family: inherit;
  font-size: inherit;
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

button:focus-visible {
  outline: 2px solid #8B5CF6;
  outline-offset: 2px;
}
</style>