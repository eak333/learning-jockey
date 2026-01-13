# デプロイメントガイド

## 🚀 クイックデプロイ

### Vercel（推奨）

1. **GitHubにプッシュ**
   ```bash
   git remote add origin https://github.com/your-username/learning-jockey.git
   git push -u origin main
   ```

2. **Vercelに接続**
   - [Vercel](https://vercel.com/new)にアクセス
   - GitHubリポジトリを選択
   - デプロイ開始

3. **環境変数（オプション）**
   - Supabaseを使用する場合のみ設定
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Netlify

1. **デプロイ設定**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

2. **環境変数**
   - Vercelと同じ手順で設定

### その他のプラットフォーム

- **Cloudflare Pages**: Static Export モードに変更が必要
- **AWS Amplify**: 自動検出でデプロイ可能
- **Railway**: Dockerfile を使用

## 📱 PWAインストール手順

### iOS (Safari)

1. Safariでアプリを開く
2. 共有ボタン（□↑）をタップ
3. 「ホーム画面に追加」を選択
4. 「追加」をタップ

### Android (Chrome)

1. Chromeでアプリを開く
2. メニュー（⋮）をタップ
3. 「アプリをインストール」を選択
4. 「インストール」をタップ

### デスクトップ (Chrome/Edge)

1. URLバーの右側のインストールアイコン（⊕）をクリック
2. 「インストール」をクリック

## 🔧 本番環境の設定

### 環境変数

```env
# 必須（モックモードを使用しない場合）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# オプション
NODE_ENV=production
```

### ビルド最適化

```bash
# 本番ビルド
npm run build

# 本番起動
npm start

# PM2を使用した起動
npm run pm2:start
```

### パフォーマンス最適化

- ✅ Next.js Image Optimization 有効
- ✅ Static Generation 活用
- ✅ Code Splitting 自動化
- ✅ PWA Service Worker

## 📊 モニタリング

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### エラートラッキング（Sentry）

```bash
npm install @sentry/nextjs
```

詳細は [Sentry Next.js ドキュメント](https://docs.sentry.io/platforms/javascript/guides/nextjs/) を参照

## 🔒 セキュリティ

### 本番環境のチェックリスト

- [ ] 環境変数が正しく設定されている
- [ ] Supabase RLS（Row Level Security）が有効
- [ ] HTTPS接続が強制されている
- [ ] CSP（Content Security Policy）が設定されている
- [ ] 依存関係の脆弱性スキャン実施

### CSP設定例

```tsx
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://notebooklm.google.com;",
          },
        ],
      },
    ]
  },
}
```

## 🐛 トラブルシューティング

### ビルドエラー

```bash
# キャッシュクリア
rm -rf .next node_modules
npm install
npm run build
```

### 環境変数が反映されない

- Vercel/Netlifyで環境変数を再設定
- 再デプロイを実行

### PWAが動作しない

- HTTPSで接続しているか確認
- Service Workerが正しく登録されているか確認
- ブラウザのキャッシュをクリア

## 📞 サポート

問題が解決しない場合は、[Issues](https://github.com/your-repo/issues)でお問い合わせください。
