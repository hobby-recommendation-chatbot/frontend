export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Hobby {
  name: string;
  eng_name?: string;
  desc?: string;
  detail?: string;
  equipments?: string | string[];
  additional_info?: string;
  image_url : string;
}

export type AppState = 'chat' | 'recommendations' | 'detail';