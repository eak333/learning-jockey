// Core Types for My Learning Jockey

export interface LearningItem {
  id: string;
  title: string;
  content: string;
  source: string; // e.g., "Kindle", "Web", "Manual"
  audioUrl?: string;
  notebookLmUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  status: 'draft' | 'processing' | 'completed';
}

export interface Playlist {
  id: string;
  name: string;
  items: LearningItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface AppState {
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  isOnboardingCompleted: boolean;
  isDarkMode: boolean;
}
