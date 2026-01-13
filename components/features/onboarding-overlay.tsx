'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mic, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/lib/store/app-store';

const onboardingSteps = [
  {
    id: 1,
    icon: BookOpen,
    title: 'KindleやWeb記事から知識を集める',
    description: '気になった文章をコピーして、このアプリに追加しましょう。',
  },
  {
    id: 2,
    icon: Mic,
    title: 'NotebookLMで音声化する',
    description: '追加したテキストを、AIポッドキャスト形式の音声に変換できます。',
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'このアプリで管理・復習する',
    description: 'プレイリストを作成して、いつでもどこでも学習できます。',
  },
];

export function OnboardingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isOnboardingCompleted, completeOnboarding } = useAppStore();

  if (isOnboardingCompleted) return null;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md"
        >
          <Card className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 shadow-2xl">
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <motion.div
                key={step.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 dark:from-teal-500 dark:to-cyan-500 flex items-center justify-center"
              >
                <Icon size={40} className="text-white" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {step.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>

              <div className="flex gap-2">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'w-8 bg-orange-500 dark:bg-teal-500'
                        : 'w-2 bg-slate-300 dark:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3 w-full">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1"
                  >
                    戻る
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-teal-500 dark:to-cyan-500 hover:opacity-90"
                >
                  {currentStep === onboardingSteps.length - 1
                    ? '始める'
                    : '次へ'}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
