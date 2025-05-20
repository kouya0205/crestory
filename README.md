# PickBuy（ピクバイ）

PickBuy（ピクバイ）は、地方の生産者・職人と全国の消費者を繋ぐライブコマースプラットフォームです。

## プロジェクト概要

このプロジェクトは以下の技術スタックを使用しています：

- [Next.js](https://nextjs.org) - Reactフレームワーク
- [NextAuth.js](https://next-auth.js.org) - 認証システム
- [Prisma](https://prisma.io) - データベースORM
- [Tailwind CSS](https://tailwindcss.com) - スタイリング
- [tRPC](https://trpc.io) - タイプセーフなAPI

## 開発環境のセットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/your-username/pickbuy.git
cd pickbuy
```

2. 依存関係のインストール

```bash
npm install
```

3. 環境変数の設定
   `.env`ファイルを作成し、必要な環境変数を設定してください。

4. データベースのセットアップ

```bash
npm run db:generate
npm run db:push
```

5. 開発サーバーの起動

```bash
npm run dev
```

## デプロイメント

このプロジェクトは以下のプラットフォームにデプロイ可能です：

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [Docker](https://docker.com)

詳細なデプロイメント手順については、各プラットフォームのドキュメントを参照してください。
