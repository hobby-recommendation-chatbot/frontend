<template>
  <div class="chat-container" ref="chatContainerRef">
    <div class="chat-header">
      <div class="avatar">
        <div class="avatar-icon">🤖</div>
      </div>
      <div class="header-info">
        <h2>취미 추천 AI</h2>
        <p>당신만의 완벽한 취미를 찾아드려요</p>
      </div>
    </div>
    
    <div class="chat-messages" ref="messagesContainer">
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="message-wrapper"
        :class="{ 'user-message': message.isUser, 'ai-message': !message.isUser }"
      >
        <div class="message">
          <div class="message-content">
            {{ message.content }}
          </div>
        </div>
        <div class="message-time">
          {{ formatTime(message.timestamp) }}
        </div>
      </div>
    </div>

    <div class="typing-indicator" v-if="isTyping">
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span class="typing-text">AI가 답변을 준비중이에요...</span>
    </div>

    <div class="chat-input-container" v-if="!isComplete">
      <div class="input-wrapper">
        <!-- <input
          v-model="userInput"
          @keypress.enter="sendMessage"
          @input="handleInput"
          @focus="handleInputFocus"
          type="text"
          placeholder="답변을 입력해주세요..."
          class="chat-input"
          :disabled="isTyping || waitingForAI"
          ref="chatInputRef"
        /> -->
        <input
          v-model="userInput"
          @keypress.enter="sendMessage"
          @input="handleInput"
          type="text"
          placeholder="답변을 입력해주세요..."
          class="chat-input"
          :disabled="isTyping || waitingForAI"
          ref="chatInputRef"
        />
        <button 
          @click="sendMessage"
          :disabled="!userInput.trim()
                      || isTyping
                      || waitingForAI
                      || !token"
          class="send-button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted  } from 'vue';
import type { Hobby, Message } from '../types';
import axios from 'axios'

const token = ref('');

const emit = defineEmits<{
  showRecommendations: [recommendations:Hobby[]]
}>();

const messages = ref<Message[]>([]);
const messagesContainer = ref<HTMLElement>();
const userInput = ref('');
const isTyping = ref(false);
const waitingForAI = ref(false);
const isComplete = ref(false);
const chatInputRef = ref<HTMLInputElement | null>(null);
const chatContainerRef = ref<HTMLElement | null>(null);
const chatInputContainerRef = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

const addMessage = (content: string, isUser: boolean) => {
  const message: Message = {
    id: Date.now().toString(),
    content,
    isUser,
    timestamp: new Date()
  };
  messages.value.push(message);
  scrollToBottom();
};

const handleInput = () => {
  // 입력 중일 때의 처리 (필요시 타이핑 인디케이터 등)
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isTyping.value || waitingForAI.value || !token.value) return;

  const messageText = userInput.value.trim();
  userInput.value = '';

  addMessage(messageText, true);

  waitingForAI.value = true;
  isTyping.value = true;

  try {
    const res = await axios.post('https://backend-ssafy-9057.fly.dev/chat', {
      token: token.value,
      message: messageText,
    });

    const data = res.data.data;

    if (data.message) {
      addMessage(data.message, false);
    } else if (data.recommend_result) {
      addMessage('취미 추천을 드릴게요!', false);
    } else {
      addMessage('알 수 없는 응답입니다.', false);
    }

    const backendIsComplete = data.isComplete || !!data.recommend_result;

    if (backendIsComplete) {
      isComplete.value = true;
      await new Promise(resolve => setTimeout(resolve, 2000));
      emit('showRecommendations', data.recommend_result);
    }

  } catch (error) {
    addMessage('서버 오류가 발생했습니다. 다시 시도해주세요.', false);
    console.error(error);
  } finally {
    waitingForAI.value = false;
    isTyping.value = false;

    await nextTick();
    if (chatInputRef.value && !isComplete.value) {
      chatInputRef.value.focus();
    }
    scrollToBottom();
  }
};

const initializeChat = async () => {
  try {
    const res = await axios.get('https://backend-ssafy-9057.fly.dev/generate-token');
    token.value = res.data.data.token;

    addMessage('안녕하세요!', false);

    await nextTick();
    if (chatInputRef.value) {
      chatInputRef.value.focus();
    }
    scrollToBottom();
  } catch (error) {
    console.error("초기화 실패:", error);
    addMessage('서버 오류로 대화를 시작할 수 없습니다.', false);
  }
};

// 동적 높이 설정 함수 (padding-bottom과 bottom은 CSS로 관리)
const setDynamicHeight = async () => {
  await nextTick();
  if (chatContainerRef.value) {
    let viewportHeight = 0;
    if (window.visualViewport) {
      viewportHeight = window.visualViewport.height;
    } else {
      viewportHeight = window.innerHeight;
    }
    chatContainerRef.value.style.height = `${viewportHeight}px`;
    // 여기서 messagesContainer.value.style.paddingBottom 설정은 제거
    // typingIndicatorElement.style.bottom 설정도 제거
    scrollToBottom();
  }
};


onMounted(() => {
  initializeChat();

  setDynamicHeight(); // 초기 로드 시 높이 설정

  window.addEventListener('resize', setDynamicHeight);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setDynamicHeight);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', setDynamicHeight);
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', setDynamicHeight);
  }
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  /* height는 JavaScript에서 동적으로 설정하므로 여기서는 제거하거나 100vh로 둡니다. */
  /* min-height: 100vh; /* 이 줄은 여전히 제거되어야 합니다. */
  background: linear-gradient(135deg, #929ddc 0%, #764ba2 100%);
  position: relative;
}


.chat-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8da8de, #d8afff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.avatar-icon {
  font-size: 1.5rem;
}

.header-info h2 {
  color: white;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.header-info p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 90px; /* 입력창 높이(약 76px) + 여유 공간(약 14px) */
  -webkit-overflow-scrolling: touch;
}

.message-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.user-message {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.ai-message {
  flex-direction: row;
  justify-content: flex-start;
}

.message {
  max-width: 75%;
  animation: messageSlide 0.3s ease-out;
}

.user-message .message {
  background: rgba(155, 146, 160, 0.9);
  color: white;
  padding: 0.875rem 1rem;
  border-radius: 1.25rem 1.25rem 0.25rem 1.25rem;
  backdrop-filter: blur(10px);
}

.ai-message .message {
  background: rgba(199, 175, 255, 0.9);
  color: white;
  padding: 0.875rem 1rem;
  border-radius: 1.25rem 1.25rem 1.25rem 0.25rem;
  backdrop-filter: blur(10px);
}

.message-content {
  line-height: 1.5;
  white-space: pre-line;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
  min-width: 20px;
  color: rgb(255, 255, 255);
}

.user-message .message-time {
  text-align: left;
}

.ai-message .message-time {
  text-align: right;
}

.typing-indicator {
  position: absolute;
  bottom: 90px; /* chat-messages의 padding-bottom과 동일하게 설정하여 입력창 위에 위치 */
  left: 1rem;
  right: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.typing-dots {
  display: flex;
  gap: 0.25rem;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  animation: typingDot 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }
.typing-dots span:nth-child(3) { animation-delay: 0s; }

.typing-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
}

.chat-input-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem; /* 이 패딩이 입력창의 실제 높이에 영향을 줍니다. */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.input-wrapper {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.chat-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.875rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  /* iOS 키보드 대응: 확대 방지 및 스타일 개선 */
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.chat-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.chat-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.chat-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B5CF6, #A855F7);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.send-button svg {
  width: 22px !important;
  height: 22px !important;
  display: block;
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* iOS 전용 스타일 */
@supports (-webkit-touch-callout: none) {
  .chat-container {
    /* iOS Safari에서 100vh 대신 사용 */
    min-height: -webkit-fill-available;
  }
  
  .chat-messages {
    /* iOS에서 rubber band 효과 제거 */
    overscroll-behavior-y: none;
    -webkit-overflow-scrolling: touch;
  }
  
  .chat-input {
    /* iOS에서 입력창 확대 방지 */
    font-size: 16px;
  }
}

@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typingDot {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .message {
    max-width: 85%;
  }
  
  .chat-header {
    padding: 1rem;
  }
  
  .chat-input-container {
    padding: 0.75rem;
  }
  
.chat-messages {
    padding-bottom: 90px; /* 모바일에서도 동일하게 적용 */
  }
}
</style>