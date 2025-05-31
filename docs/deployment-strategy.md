# デプロイ戦略 & 画像ストレージ選定

## 推奨構成

### 🥇 最優先: Vercel + Vercel Blob

```typescript
// 環境変数設定
BLOB_READ_WRITE_TOKEN=vercel_blob_token
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your_secret
```

**実装例:**

```typescript
// src/lib/blob.ts
import { put, del } from "@vercel/blob";

export async function uploadStoryImage(file: File, storyId: string) {
  const filename = `stories/${storyId}/${Date.now()}-${file.name}`;
  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
  });
  return blob.url;
}

export async function deleteStoryImage(url: string) {
  await del(url);
}
```

### 🥈 コスト重視: Vercel + Cloudinary

```typescript
// 環境変数設定
CLOUDINARY_CLOUD_NAME = your_cloud_name;
CLOUDINARY_API_KEY = your_api_key;
CLOUDINARY_API_SECRET = your_api_secret;
```

**実装例:**

```typescript
// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto",
          transformation: [
            { width: 1200, height: 800, crop: "limit" },
            { quality: "auto" },
            { format: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });
}
```

## デプロイ手順

### 1. Vercel設定

```bash
# Vercel CLI インストール
npm i -g vercel

# プロジェクト初期化
vercel

# 環境変数設定
vercel env add BLOB_READ_WRITE_TOKEN
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
```

### 2. データベース設定

```sql
-- Vercel Postgres または Supabase
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. tRPC API実装

```typescript
// src/server/api/routers/image.ts
export const imageRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(
      z.object({
        storyId: z.string(),
        filename: z.string(),
        size: z.number(),
        mimeType: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Blob URLを生成してDBに保存
      const image = await ctx.db.image.create({
        data: {
          storyId: input.storyId,
          filename: input.filename,
          size: input.size,
          mimeType: input.mimeType,
          url: "", // フロントエンドで設定
        },
      });
      return image;
    }),
});
```

## コスト監視

### Vercel使用量チェック

```typescript
// 月次使用量アラート設定
export function setupUsageAlerts() {
  // Vercel APIで使用量取得
  // 80%到達時にSlack通知など
}
```

### 画像最適化

```typescript
// 画像圧縮設定
export const imageOptimization = {
  maxWidth: 1200,
  maxHeight: 800,
  quality: 80,
  format: "webp",
};
```

## 段階的移行計画

1. **Phase 1**: Vercel Hobbyで開発・テスト
2. **Phase 2**: Vercel Proにアップグレード
3. **Phase 3**: 使用量に応じてストレージ最適化
4. **Phase 4**: 必要に応じてCDN強化

## 緊急時対応

- **コスト急増時**: Spend Management設定で自動停止
- **ストレージ不足時**: Cloudinaryへの段階的移行
- **パフォーマンス問題**: Edge Functionsの活用
