export interface Trail {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  totalSteps: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: {
    title: string;
    completed: boolean;
  }[];
}

export interface Session {
  id: string;
  title: string;
  with: string;
  duration: number;
  type: 'Meditation' | 'Masterclass' | 'Conversation';
}

export interface ConnectRoom {
  id: string;
  title: string;
  description: string;
  members: number;
  capacity: number;
  recentMessages: {
    user: string;
    message: string;
    timestamp: string;
  }[];
}

export interface FeedItem {
  id: string;
  quote: string;
  author: string;
}
