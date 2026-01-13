// Global App State Management with Zustand (Mock Mode Support)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearningItem, Playlist } from '@/lib/types';

interface AppStore {
  // State
  playlists: Playlist[];
  currentPlaylistId: string | null;
  isOnboardingCompleted: boolean;
  isDarkMode: boolean;

  // Actions
  addPlaylist: (playlist: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deletePlaylist: (id: string) => void;
  setCurrentPlaylist: (id: string | null) => void;
  
  addLearningItem: (playlistId: string, item: Omit<LearningItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLearningItem: (playlistId: string, itemId: string, updates: Partial<LearningItem>) => void;
  deleteLearningItem: (playlistId: string, itemId: string) => void;
  
  completeOnboarding: () => void;
  toggleDarkMode: () => void;
  resetOnboarding: () => void;
}

// Helper to generate IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial State
      playlists: [
        {
          id: 'default',
          name: 'マイプレイリスト',
          items: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      currentPlaylistId: 'default',
      isOnboardingCompleted: false,
      isDarkMode: false,

      // Actions
      addPlaylist: (playlist) =>
        set((state) => ({
          playlists: [
            ...state.playlists,
            {
              ...playlist,
              id: generateId(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),

      deletePlaylist: (id) =>
        set((state) => ({
          playlists: state.playlists.filter((p) => p.id !== id),
          currentPlaylistId:
            state.currentPlaylistId === id
              ? state.playlists[0]?.id || null
              : state.currentPlaylistId,
        })),

      setCurrentPlaylist: (id) =>
        set({ currentPlaylistId: id }),

      addLearningItem: (playlistId, item) =>
        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === playlistId
              ? {
                  ...p,
                  items: [
                    ...p.items,
                    {
                      ...item,
                      id: generateId(),
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                  ],
                  updatedAt: new Date(),
                }
              : p
          ),
        })),

      updateLearningItem: (playlistId, itemId, updates) =>
        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === playlistId
              ? {
                  ...p,
                  items: p.items.map((item) =>
                    item.id === itemId
                      ? { ...item, ...updates, updatedAt: new Date() }
                      : item
                  ),
                  updatedAt: new Date(),
                }
              : p
          ),
        })),

      deleteLearningItem: (playlistId, itemId) =>
        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === playlistId
              ? {
                  ...p,
                  items: p.items.filter((item) => item.id !== itemId),
                  updatedAt: new Date(),
                }
              : p
          ),
        })),

      completeOnboarding: () =>
        set({ isOnboardingCompleted: true }),

      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),

      resetOnboarding: () =>
        set({ isOnboardingCompleted: false }),
    }),
    {
      name: 'learning-jockey-storage',
    }
  )
);
