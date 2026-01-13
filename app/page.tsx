'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Moon, Sun, ListMusic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingOverlay } from '@/components/features/onboarding-overlay';
import { EmptyState } from '@/components/features/empty-state';
import { InputModal } from '@/components/features/input-modal';
import { LearningItemCard } from '@/components/features/learning-item-card';
import { useAppStore } from '@/lib/store/app-store';

export default function HomePage() {
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    playlists,
    currentPlaylistId,
    isDarkMode,
    toggleDarkMode,
    deleteLearningItem,
  } = useAppStore();

  // Handle mounting for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode, mounted]);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const currentPlaylist = playlists.find((p) => p.id === currentPlaylistId);
  const items = currentPlaylist?.items || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <OnboardingOverlay />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 dark:from-teal-500 dark:to-cyan-500 flex items-center justify-center">
              <ListMusic size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                My Learning Jockey
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentPlaylist?.name || 'プレイリスト'}
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-slate-400" />
              ) : (
                <Moon size={20} className="text-slate-600" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <EmptyState
              key="empty"
              onAddClick={() => setIsInputModalOpen(true)}
            />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  学習ログ
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-3">
                    {items.length}件
                  </span>
                </h2>
              </div>

              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <LearningItemCard
                    key={item.id}
                    item={item}
                    onDelete={() => {
                      if (currentPlaylistId) {
                        deleteLearningItem(currentPlaylistId, item.id);
                      }
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          size="lg"
          onClick={() => setIsInputModalOpen(true)}
          className="w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-orange-500 to-pink-500 dark:from-teal-500 dark:to-cyan-500 hover:opacity-90 hover:scale-110 transition-transform"
        >
          <Plus size={28} className="text-white" />
        </Button>
      </motion.div>

      {/* Input Modal */}
      <InputModal
        open={isInputModalOpen}
        onOpenChange={setIsInputModalOpen}
      />
    </div>
  );
}
