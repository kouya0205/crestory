# 自分史作成 personal-history

## 1. 要件定義

### 基本機能

- **自分史エピソード作成**: ユーザーが人生の出来事を記録・整理
- **AIサポート機能**: 文章作成の支援、画像キャプション生成
- **画像アップロード**: エピソードに関連する写真の添付
- **ライフイベントタグ付け**: 出来事をカテゴリ別に分類
- **公開範囲設定**: プライベート・家族限定での共有制御
- **家族共有機能**: 家族メンバーとのエピソード共有
- **時系列表示**: 人生の流れを時間軸で可視化
- **検索・フィルタリング**: タグや期間での絞り込み

### 入力項目

- **基本情報**

  - タイトル（必須）: エピソードの見出し
  - 本文（必須）: 詳細な内容記述（リッチテキスト対応）
  - 出来事の日付（任意）: いつ起こったかの記録
  - ライフイベントタグ（任意）: 誕生、学生時代、就職、結婚、子育て等
  - 公開範囲（必須）: プライベート・家族限定から選択

- **メディア情報**

  - 画像アップロード（任意）: 複数枚対応、順序指定可能
  - 画像キャプション（任意）: AI提案機能付き

- **メタデータ**
  - 作成日時: 自動記録
  - 更新日時: 自動更新
  - 作成者ID: ログインユーザー情報

## 2. 画面設計

### 1. 自分史作成の手順

1. **エピソード作成開始**

   - ダッシュボードから「新しいエピソードを作成」ボタンをクリック
   - `/app/stories/new` へ遷移

2. **基本情報入力**

   - タイトル入力フィールド
   - 本文入力エリア（リッチテキストエディタ）
   - 出来事の日付選択（カレンダーピッカー）
   - ライフイベントタグ選択（ドロップダウン）

3. **画像アップロード**

   - ドラッグ&ドロップ対応のアップロードエリア
   - 画像プレビュー機能
   - 画像の順序変更（ドラッグ&ドロップ）
   - AIによるキャプション提案

4. **公開設定**

   - プライベート・家族限定の選択
   - 設定内容のプレビュー

5. **確認・保存**
   - 入力内容の最終確認
   - 保存・下書き保存の選択

### 2. 主要コンポーネント

- **StoryForm**: エピソード作成・編集フォーム
- **ImageUploader**: 画像アップロード・管理コンポーネント
- **RichTextEditor**: リッチテキスト入力エディタ
- **DatePicker**: 日付選択コンポーネント
- **TagSelector**: ライフイベントタグ選択
- **VisibilitySelector**: 公開範囲設定
- **StoryPreview**: エピソードプレビュー表示
- **StoryCard**: エピソード一覧表示用カード
- **Timeline**: 時系列表示コンポーネント

## 3. 技術実装計画

### フロントエンド

- **フォームライブラリ**: `react-hook-form` - 既にインストール済み
- **バリデーション**: `zod` - 既にインストール済み
- **UI コンポーネント**: Radix UI + shadcn/ui（既存）+ カスタムコンポーネント
- **画像アップロード**: クライアントサイドでのプレビューと圧縮
- **リッチテキストエディタ**: TipTap または React Quill
- **日付処理**: `date-fns` - 既にインストール済み
- **状態管理**: フォーム内は react-hook-form、グローバル状態は tRPC + TanStack Query

### バックエンド

- **API エンドポイント**:
  - `POST /api/trpc/story.create` - エピソード作成
  - `PUT /api/trpc/story.update` - エピソード更新
  - `DELETE /api/trpc/story.delete` - エピソード削除
  - `GET /api/trpc/story.getById` - 特定エピソード取得
  - `GET /api/trpc/story.getByUser` - ユーザーのエピソード一覧
  - `GET /api/trpc/story.getByFamily` - 家族共有エピソード一覧
  - `POST /api/trpc/image.upload` - 画像アップロード
  - `DELETE /api/trpc/image.delete` - 画像削除
  - `POST /api/trpc/ai.generateCaption` - AI画像キャプション生成

### 画像ストレージ

- **ストレージ**: AWS S3 または Cloudinary
- **画像処理**: 自動リサイズ・圧縮
- **CDN**: CloudFront または Cloudinary CDN
- **セキュリティ**: 署名付きURL、アクセス制御

## 4. 実装ステップ

1. **準備フェーズ**

   - 必要なライブラリのインストール（リッチテキストエディタ、画像処理）
   - tRPCルーターの拡張
   - Zodスキーマの定義
   - 画像ストレージの設定

2. **UI 実装フェーズ**

   - 基本フォームレイアウト実装
   - リッチテキストエディタの統合
   - 画像アップロードコンポーネント
   - 日付・タグ選択コンポーネント
   - レスポンシブデザイン対応

3. **機能拡張フェーズ**

   - tRPC APIエンドポイントの実装
   - 画像アップロード・管理機能
   - AI機能の統合（キャプション生成）
   - 家族共有機能の実装
   - 検索・フィルタリング機能

4. **テスト・最適化フェーズ**
   - フォーム入力テスト
   - 画像アップロードテスト
   - エッジケースのハンドリング
   - パフォーマンス最適化
   - セキュリティテスト

## 5. ルーティング設計

## 認証関連ページ (ログイン前アクセス)

| パス                      | 説明                                                     |
| ------------------------- | -------------------------------------------------------- |
| `/`                       | トップページ（サービス紹介、ログイン/新規登録への導線）  |
| `/signup`                 | 新規ユーザー登録ページ                                   |
| `/login`                  | ログインページ                                           |
| `/password-reset`         | パスワードリセット申請ページ                             |
| `/password-reset/confirm` | パスワードリセット実行ページ（メール内のリンクから遷移） |

## メインアプリケーションページ (ログイン後アクセス)

| パス                                                 | 説明                                                   |
| ---------------------------------------------------- | ------------------------------------------------------ |
| `/app`                                               | ダッシュボード（マイ自分史エピソード一覧の初期表示）   |
| `/app/profile`                                       | プロフィール編集ページ                                 |
| `/app/stories/new`                                   | 自分史エピソード新規作成ページ                         |
| `/app/stories/[storyId]`                             | 自分史エピソード詳細表示ページ（自分のエピソード）     |
| `/app/stories/[storyId]/edit`                        | 自分史エピソード編集ページ                             |
| `/app/family`                                        | 家族管理ページ                                         |
| `/app/family/[familyMemberUserId]/stories`           | 共有された家族メンバーの自分史エピソード一覧ページ     |
| `/app/family/[familyMemberUserId]/stories/[storyId]` | 共有された家族メンバーの自分史エピソード詳細表示ページ |

### 家族管理ページの機能

- 自分の家族ID表示
- 家族メンバー登録（他ユーザーの家族ID入力）
- 家族申請の承認/拒否
- 登録済み家族メンバー一覧

## その他静的ページ

| パス       | 説明                       |
| ---------- | -------------------------- |
| `/terms`   | 利用規約ページ             |
| `/privacy` | プライバシーポリシーページ |
| `/help`    | ヘルプ/FAQページ           |
| `/contact` | お問い合わせページ         |

## 6. コンポーネント設計

### フォーム関連コンポーネント

```typescript
// StoryForm - メインフォームコンポーネント
interface StoryFormProps {
  initialData?: Story;
  mode: "create" | "edit";
  onSubmit: (data: StoryFormData) => void;
  onCancel: () => void;
}

// ImageUploader - 画像アップロード管理
interface ImageUploaderProps {
  images: Image[];
  onImagesChange: (images: File[]) => void;
  onImageDelete: (imageId: string) => void;
  onImageReorder: (fromIndex: number, toIndex: number) => void;
  maxImages?: number;
}

// RichTextEditor - リッチテキスト編集
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

// TagSelector - ライフイベントタグ選択
interface TagSelectorProps {
  value: LifeEventTag | null;
  onChange: (tag: LifeEventTag | null) => void;
  options: LifeEventTag[];
}
```

### 表示関連コンポーネント

```typescript
// StoryCard - エピソード一覧表示
interface StoryCardProps {
  story: Story & { images: Image[] };
  onClick: () => void;
  showAuthor?: boolean;
  variant?: "default" | "compact";
}

// Timeline - 時系列表示
interface TimelineProps {
  stories: (Story & { images: Image[] })[];
  onStoryClick: (storyId: string) => void;
  groupBy?: "year" | "month";
}

// StoryDetail - エピソード詳細表示
interface StoryDetailProps {
  story: Story & { images: Image[]; author: User };
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
}
```

### レイアウト関連コンポーネント

```typescript
// AppLayout - アプリケーション共通レイアウト
interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
}

// Sidebar - サイドバーナビゲーション
interface SidebarProps {
  currentPath: string;
  familyMembers: FamilyMember[];
}

// Header - ヘッダーコンポーネント
interface HeaderProps {
  user: User;
  onProfileClick: () => void;
  onLogout: () => void;
}
```

### ユーティリティコンポーネント

```typescript
// LoadingSpinner - ローディング表示
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

// ErrorBoundary - エラーハンドリング
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error }>;
}

// ConfirmDialog - 確認ダイアログ
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
```

### データ型定義

```typescript
// フォームデータ型
interface StoryFormData {
  title: string;
  body: string;
  eventDate?: Date;
  lifeEventTag?: LifeEventTag;
  visibility: Visibility;
  images: File[];
}

// API レスポンス型
interface StoryWithDetails extends Story {
  images: Image[];
  author: Pick<User, "id" | "name" | "image">;
}

// 家族メンバー型
interface FamilyMember {
  id: string;
  name: string;
  image?: string;
  relationship: string;
  storiesCount: number;
}
```
