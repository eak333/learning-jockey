'use client';

import { motion } from 'framer-motion';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center mb-6"
      >
        <BookOpen size={64} className="text-orange-500 dark:text-teal-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3"
      >
        まだ学習ログがありません
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-600 dark:text-slate-300 mb-8 max-w-md"
      >
        右下のボタンから最初の知識を追加しましょう。<br />
        KindleやWeb記事から、気になったテキストをコピーして始められます。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={onAddClick}
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-pink-500 dark:from-teal-500 dark:to-cyan-500 hover:opacity-90 shadow-lg"
        >
          <Plus className="mr-2" size={20} />
          最初の知識を追加
        </Button>
      </motion.div>
    </motion.div>
  );
}
