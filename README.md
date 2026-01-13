# My Learning Jockey

あなたの学習を音声化するパーソナルAIジョッキー - PWA対応のNext.js 14アプリケーション

![Status](https://img.shields.io/badge/status-production_ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## 🌟 概要

**My Learning Jockey** は、KindleやWeb記事から集めた知識をNotebookLMで音声化し、効率的に学習できるプログレッシブWebアプリケーションです。

### 主な機能

✅ **知識の収集**: KindleやWeb記事からテキストをコピーして追加  
✅ **大容量対応**: 最大50万文字（書籍1冊分以上）まで入力可能  
✅ **NotebookLM連携**: 自動でプロンプト生成し、AIポッドキャスト形式に変換  
✅ **プレイリスト管理**: 学習ログを整理して管理  
✅ **PWA対応**: スマートフォンにインストール可能  
✅ **ダークモード**: 時間帯に合わせた快適なUI  
✅ **モックモード**: Supabase未設定でも動作確認可能  

## 🚀 クイックスタート

### 必須要件

- Node.js 18.0+
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/eak333/learning-jockey.git
cd learning-jockey

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 環境変数（オプション）

Supabaseを使用する場合は、`.env.local` ファイルを作成：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**注意**: 環境変数が未設定の場合、自動的にモックモード（ローカルストレージ）で動作します。

## 📱 使い方

### 1. 初回訪問時のオンボーディング

アプリを初めて開くと、3ステップのチュートリアルが表示されます：

1. **知識を集める**: KindleやWeb記事から気になるテキストをコピー
2. **音声化する**: NotebookLMでAIポッドキャスト形式に変換
3. **管理・復習する**: プレイリストで整理して学習

### 2. 知識の追加

1. 右下の「+」ボタンをクリック
2. タイトルと内容を入力
   - 最小: 10文字
   - 最大: **50万文字**（書籍1冊分以上対応）
3. 「コピーして送信」をクリック
4. 自動的にNotebookLMが開き、プロンプトがクリップボードにコピーされます

### 3. 学習ログの管理

- **削除**: 各カードの「…」メニューから削除
- **ステータス**: 下書き / 処理中 / 完了
- **ダークモード**: ヘッダーの月/太陽アイコンで切り替え

## 🏗️ プロジェクト構造

```
webapp/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # メインページ
│   └── globals.css        # グローバルスタイル
├── components/
│   ├── ui/                # Shadcn/ui コンポーネント
│   └── features/          # ビジネスロジックコンポーネント
│       ├── onboarding-overlay.tsx
│       ├── empty-state.tsx
│       ├── input-modal.tsx
│       └── learning-item-card.tsx
├── lib/
│   ├── schemas/           # Zod バリデーションスキーマ
│   ├── store/             # Zustand ステート管理
│   ├── supabase/          # Supabase クライアント
│   └── types/             # TypeScript 型定義
└── public/
    ├── manifest.json      # PWA マニフェスト
    └── icon.svg           # アプリアイコン
```

## 🎨 技術スタック

### コアフレームワーク
- **Next.js 14**: React フレームワーク（App Router）
- **TypeScript**: 型安全性
- **Tailwind CSS**: ユーティリティファーストCSS

### UI ライブラリ
- **Shadcn/ui**: 再利用可能なコンポーネント
- **Framer Motion**: アニメーション
- **Lucide React**: アイコン
- **Sonner**: トースト通知

### ステート管理 & データ
- **Zustand**: グローバルステート管理
- **Zod**: スキーマバリデーション
- **Supabase**: バックエンド（オプション）

## 🔧 開発

### ビルド

```bash
npm run build
```

### プロダクション起動

```bash
npm start
```

### リント

```bash
npm run lint
```

## 🌐 デプロイ

### Vercel（推奨）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. リポジトリをVercelに接続
2. 環境変数を設定（オプション）
3. デプロイ

### その他のプラットフォーム

- Netlify
- Cloudflare Pages
- AWS Amplify

すべてのプラットフォームで動作します。

## 📊 データ管理

### モックモード（デフォルト）

- ローカルストレージ使用
- Supabase不要
- 即座にテスト可能

### Supabaseモード

1. [Supabase](https://supabase.com)でプロジェクト作成
2. 環境変数を設定
3. 自動的にSupabaseモードで動作

## 🤝 貢献

プルリクエストを歓迎します！

1. フォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. コミット (`git commit -m 'Add amazing feature'`)
4. プッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License

## 📞 サポート

問題が発生した場合は、[Issue](../../issues)を作成してください。

---

**Made with ❤️ by My Learning Jockey Team**
