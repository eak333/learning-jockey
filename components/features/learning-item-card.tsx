'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ExternalLink, MoreVertical, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LearningItem } from '@/lib/types';

interface LearningItemCardProps {
  item: LearningItem;
  onDelete: () => void;
}

const statusLabels = {
  draft: '下書き',
  processing: '処理中',
  completed: '完了',
};

const statusColors = {
  draft: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  processing: 'bg-orange-200 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  completed: 'bg-teal-200 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
};

export function LearningItemCard({ item, onDelete }: LearningItemCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 dark:from-teal-500 dark:to-cyan-500 flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {format(new Date(item.createdAt), 'PPP', { locale: ja })}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
              {item.content}
            </p>

            <div className="flex items-center gap-2">
              <Badge className={statusColors[item.status]}>
                {statusLabels[item.status]}
              </Badge>
              {item.source && (
                <Badge variant="outline" className="text-xs">
                  {item.source}
                </Badge>
              )}
              {item.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {item.notebookLmUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(item.notebookLmUrl, '_blank')}
                className="mt-2"
              >
                <ExternalLink size={14} className="mr-2" />
                NotebookLMで開く
              </Button>
            )}
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <MoreVertical size={18} />
            </Button>

            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-10"
              >
                <button
                  onClick={() => {
                    onDelete();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  削除
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
