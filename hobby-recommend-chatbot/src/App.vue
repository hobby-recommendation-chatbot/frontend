<template>
  <div class="chatbot-container">
    <!-- 채팅 영역 -->
    <div class="chat-area" :class="{ 'blur-background': showRecommendations || showDetail }">
      <div class="chat-header">
        <h2>취미 추천 AI 챗봇</h2>
      </div>
      
      <div class="chat-messages" ref="messagesContainer">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="message"
          :class="message.type"
        >
          <div class="message-bubble">
            {{ message.text }}
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <input 
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="메시지를 입력하세요..."
          type="text"
        />
        <button @click="sendMessage" :disabled="!newMessage.trim()">전송</button>
      </div>
    </div>

    <!-- 추천 모달 -->
    <div v-if="showRecommendations" class="modal-overlay" @click="closeRecommendations">
      <div class="recommendations-modal" @click.stop>
        <div class="modal-header">
          <h3>추천 취미</h3>
          <button @click="closeRecommendations" class="close-btn">×</button>
        </div>
        
        <div class="recommendations-container">
          <div 
            v-for="(hobby, index) in hobbies" 
            :key="index"
            class="hobby-card"
            :class="{ 'active': index === activeHobbyIndex, 'blurred': index !== activeHobbyIndex }"
            @click="setActiveHobby(index)"
          >
            <img :src="hobby.image" :alt="hobby.name" />
            <h4>{{ hobby.name }}</h4>
            <p>{{ hobby.description }}</p>
            <button @click="selectHobby(hobby)" class="select-btn">이 취미가 좋아!</button>
          </div>
        </div>
        
        <div class="modal-navigation">
          <button @click="prevHobby" :disabled="activeHobbyIndex === 0">이전</button>
          <span>{{ activeHobbyIndex + 1 }} / {{ hobbies.length }}</span>
          <button @click="nextHobby" :disabled="activeHobbyIndex === hobbies.length - 1">다음</button>
        </div>
      </div>
    </div>

    <!-- 상세 정보 모달 -->
    <div v-if="showDetail" class="modal-overlay" @click="closeDetail">
      <div class="detail-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedHobby.name }}</h3>
          <button @click="closeDetail" class="close-btn">×</button>
        </div>
        
        <div class="detail-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="{ 'active': activeTab === tab.key }"
            class="tab-btn"
          >
            {{ tab.label }}
          </button>
        </div>
        
        <div class="detail-content">
          <!-- 상세 정보 탭 -->
          <div v-if="activeTab === 'info'" class="tab-content">
            <img :src="selectedHobby.image" :alt="selectedHobby.name" class="detail-image" />
            <p class="detail-description">{{ selectedHobby.detailInfo }}</p>
          </div>
          
          <!-- 준비물 탭 -->
          <div v-if="activeTab === 'supplies'" class="tab-content">
            <div class="supplies-content">
              <p>{{ selectedHobby.supplies }}</p>
            </div>
          </div>
          
          <!-- 추가 정보 탭 -->
          <div v-if="activeTab === 'additional'" class="tab-content">
            <div class="additional-content">
              <div v-if="loadingAdditionalInfo" class="loading">
                추가 정보를 불러오는 중...
              </div>
              <div v-else>
                <p>{{ selectedHobby.additionalInfo }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HobbyChatbot',
  data() {
    return {
      messages: [
        {
          type: 'ai',
          text: '안녕하세요! 취미 추천 AI입니다. 어떤 취미를 찾고 계신가요?'
        }
      ],
      newMessage: '',
      showRecommendations: false,
      showDetail: false,
      activeHobbyIndex: 0,
      selectedHobby: null,
      activeTab: 'info',
      loadingAdditionalInfo: false,
      tabs: [
        { key: 'info', label: '상세 정보' },
        { key: 'supplies', label: '준비물' },
        { key: 'additional', label: '추가 정보' }
      ],
      hobbies: [
        {
          name: '조류 관찰',
          description: '자연 속에서 다양한 새들을 관찰하고 기록하는 취미',
          image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=200&fit=crop',
          detailInfo: '조류 관찰(Bird watching)은 자연 속에서 야생 조류를 관찰하고 기록하는 취미입니다. 계절에 따라 다른 새들을 만날 수 있으며, 자연과 함께하는 평화로운 시간을 보낼 수 있습니다.',
          supplies: '쌍안경, 조류 도감, 필드노트, 편안한 복장, 카메라(선택사항). 초보자라면 8x42 배율의 쌍안경을 추천합니다. 조용히 움직일 수 있는 편안한 신발도 중요합니다.',
          additionalInfo: '전국 각지에 조류 관찰 동호회가 있으며, 한국조류학회에서 정기적으로 탐조 행사를 개최합니다. 철새 이동 시기인 봄, 가을이 관찰하기 좋은 계절입니다.'
        },
        {
          name: '가드닝',
          description: '식물을 기르고 정원을 가꾸는 취미',
          image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
          detailInfo: '가드닝은 식물을 심고 기르며 정원을 꾸미는 취미입니다. 작은 화분부터 시작해서 베란다 정원, 옥상 정원까지 다양한 형태로 즐길 수 있습니다.',
          supplies: '화분, 배양토, 씨앗이나 모종, 물뿌리개, 가위, 삽, 장갑. 초보자에게는 키우기 쉬운 허브류나 다육식물을 추천합니다.',
          additionalInfo: '실내에서는 공기정화 식물을, 야외에서는 계절별 꽃과 채소를 기를 수 있습니다. 지역 농업기술센터에서 관련 교육을 받을 수 있습니다.'
        },
        {
          name: '독서',
          description: '다양한 장르의 책을 읽으며 지식과 상상력을 기르는 취미',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
          detailInfo: '독서는 책을 통해 새로운 지식을 얻고 상상력을 기르는 취미입니다. 소설, 에세이, 자기계발서, 전문서 등 다양한 장르를 통해 시야를 넓힐 수 있습니다.',
          supplies: '책, 북마크, 독서대(선택사항), 독서 노트, 펜. 전자책 리더기나 태블릿을 활용하면 더 편리하게 독서할 수 있습니다.',
          additionalInfo: '도서관 이용, 독서 모임 참여, 온라인 서점 활용 등 다양한 방법으로 책을 접할 수 있습니다. 독서 기록 앱을 사용하면 읽은 책을 체계적으로 관리할 수 있습니다.'
        }
      ]
    }
  },
  methods: {
    sendMessage() {
      if (!this.newMessage.trim()) return;
      
      // 사용자 메시지 추가
      this.messages.push({
        type: 'user',
        text: this.newMessage
      });
      
      const userMessage = this.newMessage;
      this.newMessage = '';
      
      // AI 응답 시뮬레이션
      setTimeout(() => {
        this.simulateAIResponse(userMessage);
      }, 1000);
      
      // 스크롤을 맨 아래로
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    
    simulateAIResponse(userMessage) {
      let response = '';
      
      if (userMessage.includes('취미') || userMessage.includes('추천')) {
        response = '좋은 취미들을 추천해드릴게요! 잠시만 기다려주세요.';
        this.messages.push({
          type: 'ai',
          text: response
        });
        
        // 추천 모달 표시
        setTimeout(() => {
          this.showRecommendations = true;
        }, 1500);
      } else {
        response = '더 구체적으로 어떤 종류의 취미를 원하시는지 알려주세요. 예를 들어 "야외 활동 취미 추천해줘" 라고 말씀해주시면 더 정확한 추천을 해드릴 수 있어요!';
        this.messages.push({
          type: 'ai',
          text: response
        });
      }
      
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    },
    
    closeRecommendations() {
      this.showRecommendations = false;
      this.activeHobbyIndex = 0;
    },
    
    setActiveHobby(index) {
      this.activeHobbyIndex = index;
    },
    
    prevHobby() {
      if (this.activeHobbyIndex > 0) {
        this.activeHobbyIndex--;
      }
    },
    
    nextHobby() {
      if (this.activeHobbyIndex < this.hobbies.length - 1) {
        this.activeHobbyIndex++;
      }
    },
    
    selectHobby(hobby) {
      this.selectedHobby = hobby;
      this.showRecommendations = false;
      this.showDetail = true;
      this.activeTab = 'info';
      
      // AI 메시지 추가
      this.messages.push({
        type: 'ai',
        text: `${hobby.name}을(를) 선택하셨네요! 좋은 선택입니다. 상세 정보를 확인해보세요.`
      });
    },
    
    closeDetail() {
      this.showDetail = false;
      this.selectedHobby = null;
      this.activeTab = 'info';
    }
  }
}
</script>

<style scoped>
.chatbot-container {
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.chat-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: filter 0.3s ease;
}

.blur-background {
  filter: blur(5px);
}

.chat-header {
  padding: 20px;
  text-align: center;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.chat-header h2 {
  margin: 0;
  font-weight: 300;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message {
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.ai {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
}

.message.user .message-bubble {
  background: #e0e0e0;
  color: #333;
}

.message.ai .message-bubble {
  background: #7c4dff;
  color: white;
}

.chat-input {
  padding: 20px;
  display: flex;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.chat-input input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 25px;
  outline: none;
  font-size: 16px;
}

.chat-input button {
  padding: 12px 24px;
  background: #7c4dff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.chat-input button:hover:not(:disabled) {
  background: #6c3ce0;
}

.chat-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.recommendations-modal,
.detail-modal {
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recommendations-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.hobby-card {
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.hobby-card.active {
  border-color: #7c4dff;
  background: white;
  box-shadow: 0 4px 12px rgba(124, 77, 255, 0.15);
}

.hobby-card.blurred {
  opacity: 0.5;
  filter: blur(2px);
}

.hobby-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.hobby-card h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.hobby-card p {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
}

.select-btn {
  width: 100%;
  padding: 10px;
  background: #7c4dff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.select-btn:hover {
  background: #6c3ce0;
}

.modal-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.modal-navigation button {
  padding: 8px 16px;
  background: #7c4dff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.modal-navigation button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 상세 정보 모달 스타일 */
.detail-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.tab-btn {
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.tab-btn.active {
  color: #7c4dff;
  border-bottom-color: #7c4dff;
}

.tab-content {
  padding: 16px 0;
}

.detail-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.detail-description,
.supplies-content p,
.additional-content p {
  line-height: 1.6;
  color: #333;
  margin: 0;
}

.loading {
  text-align: center;
  color: #666;
  padding: 40px 0;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .recommendations-modal,
  .detail-modal {
    width: 95%;
    max-height: 90vh;
    padding: 16px;
  }
  
  .hobby-card img {
    height: 150px;
  }
  
  .chat-input {
    padding: 16px;
  }
  
  .chat-messages {
    padding: 16px;
  }
}
</style>