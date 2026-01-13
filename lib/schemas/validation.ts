// Zod Validation Schemas

import { z } from 'zod';

export const learningItemInputSchema = z.object({
  title: z.string()
    .min(1, 'タイトルを入力してください。')
    .max(500, 'タイトルは500文字以内にしてください。'),
  content: z.string()
    .min(10, '10文字以上入力してください。')
    .max(500000, '50万文字以内にしてください。'), // 書籍1冊分以上対応
  source: z.string().optional().default('Manual'),
  tags: z.array(z.string()).optional(),
});

export type LearningItemInput = z.infer<typeof learningItemInputSchema>;

export const playlistSchema = z.object({
  name: z.string()
    .min(1, 'プレイリスト名を入力してください。')
    .max(100, 'プレイリスト名は100文字以内にしてください。'),
});

export type PlaylistInput = z.infer<typeof playlistSchema>;
