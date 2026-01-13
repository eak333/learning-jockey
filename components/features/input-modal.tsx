'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { learningItemInputSchema } from '@/lib/schemas/validation';
import { useAppStore } from '@/lib/store/app-store';

interface InputModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InputModal({ open, onOpenChange }: InputModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { currentPlaylistId, addLearningItem } = useAppStore();

  const handleSubmit = async () => {
    try {
      // Validate input
      const validated = learningItemInputSchema.parse({
        title,
        content,
        source: 'Manual',
      });

      setIsProcessing(true);

      // Generate prompt for NotebookLM
      const prompt = `以下のテキストを元に、初心者にも分かりやすいポッドキャスト風の解説を作成してください。\n\n【タイトル】\n${validated.title}\n\n【内容】\n${validated.content}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(prompt);

      // Add to playlist
      if (currentPlaylistId) {
        addLearningItem(currentPlaylistId, {
          title: validated.title,
          content: validated.content,
          source: validated.source,
          status: 'processing',
        });
      }

      // Show success toast
      toast.success('コピーしました！', {
        description: 'NotebookLMに貼り付けてください。',
        action: {
          label: 'NotebookLMを開く',
          onClick: () => {
            window.open('https://notebooklm.google.com/', '_blank');
          },
        },
      });

      // Open NotebookLM
      setTimeout(() => {
        window.open('https://notebooklm.google.com/', '_blank');
      }, 500);

      // Reset form
      setTitle('');
      setContent('');
      onOpenChange(false);
    } catch (error: any) {
      if (error.errors) {
        toast.error('入力エラー', {
          description: error.errors[0]?.message || '入力内容を確認してください。',
        });
      } else {
        toast.error('エラーが発生しました', {
          description: 'もう一度お試しください。',
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="text-orange-500 dark:text-teal-500" />
            新しい知識を追加
          </DialogTitle>
          <DialogDescription>
            学習したい内容を入力してください。NotebookLMで音声化できます。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              タイトル
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：量子コンピューティングの基礎"
              className="bg-white dark:bg-slate-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              内容
              <span className="text-xs text-slate-500 ml-2">
                ({content.length.toLocaleString()}文字
                {content.length > 100000 && ` ≈ ${Math.round(content.length / 100000 * 10) / 10}冊分`})
              </span>
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="学習したいテキストを貼り付けてください（10文字以上、最大50万文字まで対応）&#13;&#10;&#13;&#10;書籍1冊分（約10〜20万文字）でも問題ありません。"
              className="min-h-[300px] max-h-[500px] bg-white dark:bg-slate-800 resize-y"
            />
          </div>

          <div className="bg-orange-50 dark:bg-teal-900/20 border border-orange-200 dark:border-teal-700 rounded-lg p-4">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>💡 ヒント：</strong> 送信すると、NotebookLM用のプロンプトがクリップボードにコピーされ、自動的にNotebookLMが開きます。
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              📚 書籍1冊分（10〜20万文字）も対応。長文でも安心して貼り付けてください。
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isProcessing}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isProcessing || content.length < 10}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-teal-500 dark:to-cyan-500 hover:opacity-90"
            >
              {isProcessing ? (
                '処理中...'
              ) : (
                <>
                  <Copy className="mr-2" size={16} />
                  コピーして送信
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
