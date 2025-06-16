# crestory（クレストリー） 👨‍👩‍👧‍👦

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/crestory)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <img src="docs/assets/logo.png" alt="crestory logo" width="200"/>
  <p><strong>デジタルで紡ぐ、あなたと家族の物語</strong></p>
</div>

## 📌 サービスURL

https://crestory.vercel.app

## 📖 サービス概要

crestoryは、個人の人生の出来事や大切なエピソードを記録し、家族と共有できるデジタル自分史作成プラットフォームです。

日常の小さな出来事から、人生の大きな転機まで、写真と共にエピソードを記録できます。作成した自分史は、あなただけの大切な記録として保管するだけでなく、家族と共有することで、世代を超えたコミュニケーションのきっかけを生み出します。

さらに、人生の岐路に立つ人々に向けて、自身の経験を共有することもできます。同じような状況で悩む人々への指針となったり、多様な人生経験との出会いを通じて、新たな可能性への気づきを得られる場としても機能します。

## 💡 開発背景

祖父母や両親から聞く昔話は、自分の知らない時代の風景や価値観に触れられる貴重な体験でした。しかし、そうした個人の記憶は時と共に薄れ、語られる機会がなければ失われてしまいます。

この「個人の歴史」というかけがえのない資産を、デジタルの力で未来へ繋ぎたい、そして家族の絆を深めるきっかけを作りたいという思いから crestory の開発を始めました。単なる記録ツールではなく、AIとの対話を通じて新たな気づきを得られたり、家族との会話が弾むような、温かみのあるプラットフォームを目指しています。

## ✨ 主な機能

### 1. 自分史作成・編集機能

直感的な操作で、人生の１ページを彩るエピソードを作成できます。

- **リッチテキストエディタ**: 太字や箇条書きなどを使い、読みやすく表現力豊かな文章を作成
- **ライフイベントタグ**: 「誕生」「学生時代」「結婚」などのタグで分類
- **画像アップロード**: 思い出の写真を複数枚アップロード可能
- **下書き保存**: 時間をかけてじっくりと執筆

<div align="center">
  <img src="docs/assets/editor-demo.png" alt="自分史作成画面" width="600"/>
</div>

### 2. AIアシスタント機能

AIがあなたの自分史作りをサポートし、より深い自己発見へと導きます。

- **AIインタビュアー**: 特定のテーマについてAIが質問を投げかけ
- **AI簡易キャプション提案**: アップロードした写真の内容をAIが解析

<div align="center">
  <img src="docs/assets/ai-demo.png" alt="AI機能" width="600"/>
</div>

### 3. 共有機能

プライバシーに配慮しながら、大切な家族と自分史を共有できます。

- **家族の登録**: 「家族ID」を使ったメンバー招待・承認
- **柔軟な公開設定**: エピソードごとの公開範囲設定
- **家族の自分史閲覧**: 共有された家族の自分史を時系列で閲覧

<div align="center">
  <img src="docs/assets/share-demo.png" alt="共有機能" width="600"/>
</div>

### 4. 一般公開機能

人生の岐路に立つ人々の選択と経験を共有し、互いに学び合える場を提供します。

- **選択エピソードの共有**: 人生の転機での決断や、その後の展開を共有
- **多様な経験との出会い**: さまざまな人生経験から、新たな視点や可能性を発見
- **ストーリー検索**: キーワードやライフイベントで、共感できるエピソードを探索

<div align="center">
  <img src="docs/assets/public-share-demo.png" alt="一般公開機能" width="600"/>
</div>

## 🛠️ 技術スタック

| カテゴリ         | 技術                                                  |
| ---------------- | ----------------------------------------------------- |
| フロントエンド   | Next.js (App Router), React, TypeScript, Tailwind CSS |
| バックエンド     | tRPC, Node.js                                         |
| データベース     | Vercel Postgres                                       |
| ORM              | Prisma                                                |
| 認証             | NextAuth.js                                           |
| UIコンポーネント | Radix UI, Framer Motion                               |
| ストレージ       | Vercel Blob (本番), Local File System (開発)          |
| インフラ         | Vercel                                                |

## 🤔 技術選定理由

### Next.js (App Router)

- フロントエンドとバックエンドの統合的な開発
- ファイルベースルーティングによる直感的な開発
- SSR/SSGを活用したパフォーマンス最適化

### tRPC

- フロントエンドとバックエンドの型定義共有
- エンドツーエンドの型安全性
- APIスキーマの定義と実装の一体化

### Prisma

- 直感的なスキーマ定義
- TypeScriptとの高い親和性
- 簡単なマイグレーション管理

### NextAuth.js

- シンプルな認証ロジック実装
- 主要プロバイダーへの標準対応
- 高い拡張性

### Tailwind CSS

- Utility-Firstアプローチによる迅速なUI構築
- デザインの一貫性維持
- 高いカスタマイズ性

## ☁️ インフラ構成

<div align="center">
  <img src="docs/assets/infrastructure.png" alt="インフラ構成図" width="700"/>
</div>

## 🗺️ データベース設計

<div align="center">
  <img src="docs/assets/er-diagram.png" alt="ER図" width="700"/>
</div>

## 🔀 ルーティング一覧

| パス                                                 | 説明                             |
| ---------------------------------------------------- | -------------------------------- |
| `/`                                                  | ランディングページ               |
| `/auth/signin`                                       | ログインページ                   |
| `/auth/signup`                                       | 新規登録ページ                   |
| `/app`                                               | ダッシュボード（マイ自分史一覧） |
| `/app/stories/new`                                   | 自分史エピソード新規作成         |
| `/app/stories/[storyId]`                             | 自分史エピソード詳細             |
| `/app/stories/[storyId]/edit`                        | 自分史エピソード編集             |
| `/app/family`                                        | 家族管理                         |
| `/app/family/[familyMemberUserId]/stories`           | 共有された家族の自分史一覧       |
| `/app/family/[familyMemberUserId]/stories/[storyId]` | 共有された家族の自分史詳細       |
| `/terms`                                             | 利用規約                         |
| `/privacy`                                           | プライバシーポリシー             |

## ⭐ こだわりポイント

### 1. エンドツーエンドの型安全性

- tRPCとPrismaによる一貫した型安全性
- コンパイル時のエラー検知
- 容易なリファクタリング

### 2. UX向上への工夫

- Framer Motionによる自然なアニメーション
- Radix UIベースのアクセシブルなコンポーネント
- 画像の遅延アップロードによるパフォーマンス最適化

### 3. プライバシー重視の設計

- エピソードごとの詳細な公開範囲設定
- 招待・承認ベースの家族登録
- セキュアな情報管理

## 📝 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルをご覧ください。
