export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  email?: string;
  displayName?: string;
  theme: Theme;
  isAnonymous: boolean;
  createdAt: Date;
  lastActive: Date;
}

export interface MoodCheckIn {
  id: string;
  userId: string;
  mood: string;
  emoji: string;
  note?: string;
  timestamp: Date;
  isPrivate: boolean;
}

export interface Post {
  id: string;
  userId: string;
  imageUrl?: string;
  caption: string;
  moodTag: string;
  createdAt: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  text: string;
  createdAt: Date;
}
