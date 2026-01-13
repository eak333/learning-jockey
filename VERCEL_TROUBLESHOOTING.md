# Vercel 404 エラー トラブルシューティング

## 🚨 現在の問題

**症状**: https://learning-jockey.vercel.app/ にアクセスすると `404: NOT_FOUND` エラー

**Vercel設定**:
- Build Machine: Standard (4 vCPUs, 8 GB Memory)
- Node.js Version: 24.x
- Function CPU: Standard (1 vCPU, 2 GB Memory)

## 🔍 原因の可能性

### 1. Next.js 16.1.1 と Node.js 24.x の互換性問題
Next.js 16.1.1は非常に新しいバージョンで、Node.js 24.xとの組み合わせで問題が発生している可能性があります。

### 2. 出力ディレクトリの問題
Vercelが`.next`ディレクトリを正しく認識していない可能性があります。

## ✅ 実施した修正

### 修正1: Node.js エンジン要件を追加
```json
// package.json
"engines": {
  "node": ">=20.0.0"
}
```

コミット: `91c9c7f`

## 🔧 Vercel ダッシュボードでの推奨設定

### 手動で確認・変更する項目

1. **Node.js Version を変更**:
   - Settings → General → Node.js Version
   - **24.x から 20.x に変更** (推奨)
   - または **22.x** を試す

2. **Build & Development Settings を確認**:
   - Framework Preset: **Next.js** (自動検出されているはず)
   - Build Command: `npm run build` または `next build`
   - Output Directory: `.next` (デフォルトのまま)
   - Install Command: `npm install` (デフォルトのまま)

3. **Environment Variables を確認**:
   - Supabase関連の環境変数は設定しない（モックモードで動作するため）
   - 何も設定しなくてOK

4. **Function Region を確認**:
   - Settings → Functions
   - デフォルトのままでOK

## 📋 Vercel ダッシュボードでの手順

### ステップ1: Node.js バージョン変更
```
1. https://vercel.com/eak333/learning-jockey/settings/general にアクセス
2. "Node.js Version" セクションを探す
3. "24.x" から "20.x" に変更
4. "Save" をクリック
```

### ステップ2: 再デプロイ
```
1. https://vercel.com/eak333/learning-jockey にアクセス
2. 最新のデプロイメントを探す
3. "..." メニューをクリック
4. "Redeploy" を選択
5. "Redeploy" をクリックして確認
```

## 🧪 代替案

### 代替案1: Next.js バージョンをダウングレード
もしNode.jsバージョン変更で解決しない場合：

```bash
cd /home/user/webapp
npm install next@15.1.0
npm install eslint-config-next@15.1.0
git add package.json package-lock.json
git commit -m "Downgrade Next.js to 15.1.0 for Vercel compatibility"
git push origin main
```

### 代替案2: 明示的な出力設定
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  distDir: '.next',
};
```

## 🔍 ビルドログの確認方法

Vercelダッシュボードでビルドログを確認：

```
1. https://vercel.com/eak333/learning-jockey にアクセス
2. 最新のデプロイメントをクリック
3. "Building" タブをクリック
4. エラーメッセージを探す
```

よくあるエラー：
- `Error: Page "/[[...catchall]]" is missing` → 出力ディレクトリの問題
- `Module not found` → 依存関係の問題
- `SyntaxError` → Node.jsバージョンの問題

## 📞 サポートが必要な場合

### Vercel ビルドログから情報を取得
以下の情報を共有してください：
1. ビルドログの最後の50行
2. デプロイメントURL
3. エラーメッセージ全文

### GitHub Issue
https://github.com/eak333/learning-jockey/issues で報告

## ✅ 解決確認チェックリスト

- [ ] Vercel ダッシュボードで Node.js 20.x に変更
- [ ] 再デプロイを実行
- [ ] ビルドが成功（"Ready" ステータス）
- [ ] https://learning-jockey.vercel.app/ にアクセス可能
- [ ] オンボーディングが表示される
- [ ] 機能が正常に動作する

---

**最優先アクション**: Vercel ダッシュボードで **Node.js バージョンを 24.x → 20.x に変更**して再デプロイしてください。
