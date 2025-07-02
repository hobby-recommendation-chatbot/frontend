export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Hobby {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  difficulty: string;
  materials: string[];
  additionalInfo: string;
  tips: string[];
}

export type AppState = 'chat' | 'recommendations' | 'detail';