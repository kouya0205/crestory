"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "@/server/auth";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";

interface StoryDetailPageProps {
  params: Promise<{
    storyId: string;
  }>;
}

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { data: session, status } = useSession();
  const [storyId, setStoryId] = useState<string>("");

  // paramsを展開
  useEffect(() => {
    params.then((resolvedParams) => {
      setStoryId(resolvedParams.storyId);
    });
  }, [params]);

  // tRPCクエリ
  const {
    data: story,
    isLoading,
    error,
  } = api.story.getById.useQuery(
    { id: storyId },
    { enabled: !!storyId && status === "authenticated" },
  );

  if (status === "loading" || isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600">エピソードを読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            エラーが発生しました
          </h1>
          <p className="mb-4 text-gray-600">{error.message}</p>
          <Link
            href="/app"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            エピソード一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            エピソードが見つかりません
          </h1>
          <Link
            href="/app"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            エピソード一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = session?.user?.id === story.authorId;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {story.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>作成者: {story.author.name}</span>
              {story.eventDate && (
                <span>
                  日付:{" "}
                  {format(new Date(story.eventDate), "yyyy年MM月dd日", {
                    locale: ja,
                  })}
                </span>
              )}
              <span>
                作成:{" "}
                {format(new Date(story.createdAt), "yyyy年MM月dd日", {
                  locale: ja,
                })}
              </span>
            </div>
          </div>
          {isOwner && (
            <div className="flex gap-2">
              <Link
                href={`/app/stories/${story.id}/edit`}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                編集
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* メタ情報 */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {story.lifeEventTag && (
            <div>
              <h3 className="font-medium text-gray-900">カテゴリ</h3>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                {story.lifeEventTag}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-900">公開設定</h3>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm ${
                story.visibility === "PRIVATE"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {story.visibility === "PRIVATE" ? "自分のみ" : "家族と共有"}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">画像</h3>
            <span className="text-gray-600">{story.images.length}枚</span>
          </div>
        </div>
      </div>

      {/* エピソード本文 */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">エピソード</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: story.body }}
        />
      </div>

      {/* 画像一覧 */}
      {story.images.length > 0 && (
        <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">関連画像</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {story.images.map((storyImage) => (
              <div
                key={storyImage.id}
                className="overflow-hidden rounded-lg border"
              >
                <img
                  src={storyImage.image.url}
                  alt={storyImage.image.alt || storyImage.image.filename}
                  className="h-48 w-full object-cover"
                />
                {storyImage.image.caption && (
                  <div className="p-3">
                    <p className="text-sm text-gray-600">
                      {storyImage.image.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ナビゲーション */}
      <div className="flex justify-between">
        <Link
          href="/app"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
        >
          ← エピソード一覧に戻る
        </Link>
      </div>
    </div>
  );
}
