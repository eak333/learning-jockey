// Zod Validation Schemas

import { z } from 'zod';

export const learningItemInputSchema = z.object({
  title: z.string()
    .min(1, 'タイトルを入力してください。')
    .max(200, 'タイトルは200文字以内にしてください。'),
  content: z.string()
    .min(10, '10文字以上入力してください。')
    .max(5000, '5000文字以内にしてください。'),
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
