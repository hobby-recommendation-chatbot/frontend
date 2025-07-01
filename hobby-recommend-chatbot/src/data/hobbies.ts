import type { Hobby } from '../types';

export const hobbies: Hobby[] = [
  {
    id: '1',
    name: '조류 관찰',
    description: '자연 속에서 다양한 새들을 관찰하고 기록하는 평화로운 취미입니다.',
    image: 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '자연/아웃도어',
    difficulty: '초급',
    materials: [
      '쌍안경 (8x42 또는 10x42 권장)',
      '조류 도감 또는 식별 앱',
      '관찰 일지 및 필기구',
      '편안한 복장과 등산화',
      '카메라 (선택사항)'
    ],
    additionalInfo: '조류 관찰은 자연과 함께하는 명상적인 활동입니다. 새벽 시간대가 가장 활발한 관찰 시간이며, 계절에 따라 다른 종류의 새들을 만날 수 있습니다.',
    tips: [
      '조용히 움직이고 밝은 색 옷은 피하세요',
      '새들의 울음소리를 먼저 익혀보세요',
      '지역 조류 관찰 동호회에 가입해보세요'
    ]
  },
  {
    id: '2',
    name: '수채화',
    description: '투명하고 부드러운 물감의 매력을 느낄 수 있는 예술 활동입니다.',
    image: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '예술/창작',
    difficulty: '중급',
    materials: [
      '수채화 물감 세트 (12색 이상)',
      '수채화 전용 붓 (다양한 크기)',
      '수채화 용지 (140g 이상)',
      '물통 2개 (깨끗한 물용, 더러운 물용)',
      '마스킹 테이프',
      '스펀지 및 휴지'
    ],
    additionalInfo: '수채화는 물과 물감의 조화로 만들어지는 예술입니다. 실수도 작품의 일부가 될 수 있는 유연한 매체로, 초보자도 쉽게 시작할 수 있습니다.',
    tips: [
      '물의 양 조절이 가장 중요합니다',
      '밝은 색부터 어두운 색 순으로 칠하세요',
      '종이가 마르기 전에 작업하면 자연스러운 번짐 효과를 얻을 수 있습니다'
    ]
  },
  {
    id: '3',
    name: '도시 사진',
    description: '도시의 일상과 건축물을 포착하는 현대적인 사진 장르입니다.',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '사진/영상',
    difficulty: '중급',
    materials: [
      '카메라 (DSLR, 미러리스, 또는 스마트폰)',
      '다양한 렌즈 (광각, 표준, 망원)',
      '삼각대',
      '여분 배터리 및 메모리 카드',
      '카메라 가방',
      '사진 편집 소프트웨어'
    ],
    additionalInfo: '도시 사진은 건축물, 거리의 사람들, 도시의 빛과 그림자를 담는 장르입니다. 골든 아워와 블루 아워에 촬영하면 더욱 인상적인 사진을 얻을 수 있습니다.',
    tips: [
      '구도에서 선의 역할을 중요하게 생각하세요',
      '사람들의 일상적인 순간을 포착해보세요',
      '빛의 방향과 질을 관찰하며 촬영하세요'
    ]
  },
  {
    id: '4',
    name: '원예',
    description: '식물을 키우며 자연의 생명력을 느낄 수 있는 힐링 취미입니다.',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '자연/가드닝',
    difficulty: '초급',
    materials: [
      '화분 (다양한 크기)',
      '배양토',
      '원예용 가위',
      '물뿌리개',
      '삽과 호미',
      '비료',
      '씨앗 또는 모종'
    ],
    additionalInfo: '원예는 식물과 함께하는 생활을 통해 스트레스를 해소하고 성취감을 느낄 수 있는 취미입니다. 실내에서도 충분히 즐길 수 있어 접근성이 좋습니다.',
    tips: [
      '초보자는 키우기 쉬운 식물부터 시작하세요',
      '물주기 일정을 정해 규칙적으로 관리하세요',
      '식물의 성장 일지를 작성해보세요'
    ]
  },
  {
    id: '5',
    name: '요가',
    description: '몸과 마음의 균형을 찾는 고대 인도의 수행법입니다.',
    image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: '운동/건강',
    difficulty: '초급',
    materials: [
      '요가 매트',
      '편안한 운동복',
      '요가 블록 (선택사항)',
      '요가 스트랩 (선택사항)',
      '볼스터 또는 쿠션',
      '타월'
    ],
    additionalInfo: '요가는 신체의 유연성과 근력을 기르는 동시에 마음의 평화를 찾을 수 있는 종합적인 운동입니다. 꾸준히 하면 자세 교정과 스트레스 해소에 큰 도움이 됩니다.',
    tips: [
      '자신의 몸 상태에 맞춰 무리하지 마세요',
      '호흡에 집중하며 동작을 수행하세요',
      '매일 조금씩이라도 꾸준히 하는 것이 중요합니다'
    ]
  },
  {
    id: '6',
    name: '천체 관측',
    description: '밤하늘의 별과 행성을 관찰하는 로맨틱한 취미입니다.',
    image: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=800',
    category: '과학/자연',
    difficulty: '중급',
    materials: [
      '천체망원경 또는 쌍안경',
      '별자리판',
      '천체 관측 앱',
      '적색 손전등',
      '접이식 의자',
      '따뜻한 옷'
    ],
    additionalInfo: '천체 관측은 우주의 신비를 직접 경험할 수 있는 취미입니다. 도시 외곽의 어두운 곳에서 관측하면 더 많은 별을 볼 수 있습니다.',
    tips: [
      '달이 없는 날이 별 관측에 좋습니다',
      '눈이 어둠에 적응할 때까지 30분 정도 기다리세요',
      '날씨 예보를 확인하고 맑은 날을 선택하세요'
    ]
  }
];