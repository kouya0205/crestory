"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { api as serverApi } from "@/trpc/server";

// tRPCサーバーAPIの型を正しく推論
type StoryData = Awaited<ReturnType<typeof serverApi.story.getByUser>>;

interface StoryListProps {
  initialData: StoryData;
}

// 人生の段階定義
const lifeStages = [
  {
    key: "birth",
    label: "誕生・幼少期",
    icon: "👶",
    ageRange: "0-6歳",
    tags: ["BIRTH", "CHILDHOOD"],
    color: "bg-pink-50 border-pink-200",
    iconBg: "bg-pink-100",
  },
  {
    key: "student",
    label: "学生時代",
    icon: "🎓",
    ageRange: "7-22歳",
    tags: ["STUDENT_DAYS"],
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    key: "career",
    label: "社会人・キャリア",
    icon: "💼",
    ageRange: "23-65歳",
    tags: ["FIRST_JOB", "CAREER_CHANGE"],
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
  },
  {
    key: "family",
    label: "結婚・家族",
    icon: "💕",
    ageRange: "全年代",
    tags: ["MARRIAGE", "CHILDBIRTH", "PARENTING"],
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
  },
  {
    key: "personal",
    label: "趣味・旅行",
    icon: "🎨",
    ageRange: "全年代",
    tags: ["HOBBY", "TRAVEL"],
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
  },
  {
    key: "turning",
    label: "人生の転機",
    icon: "⭐",
    ageRange: "全年代",
    tags: ["TURNING_POINT", "HEALTH"],
    color: "bg-yellow-50 border-yellow-200",
    iconBg: "bg-yellow-100",
  },
  {
    key: "other",
    label: "その他",
    icon: "📖",
    ageRange: "全年代",
    tags: ["OTHER"],
    color: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-100",
  },
];

// 年代による分類関数
function categorizeStoryByAge(eventDate: Date | null): string {
  if (!eventDate) return "other";

  const now = new Date();
  const age = now.getFullYear() - eventDate.getFullYear();

  if (age >= 0 && age <= 6) return "birth";
  if (age >= 7 && age <= 22) return "student";
  if (age >= 23 && age <= 65) return "career";

  return "other";
}

// ストーリーを年代・タグで分類
function categorizeStories(stories: any[]) {
  const categorized: Record<string, any[]> = {};

  // カテゴリを初期化
  lifeStages.forEach((stage) => {
    categorized[stage.key] = [];
  });

  stories.forEach((story) => {
    let assigned = false;

    // まずタグで分類を試みる
    if (story?.lifeEventTag) {
      const matchingStage = lifeStages.find((stage) =>
        stage.tags.includes(story.lifeEventTag),
      );
      if (matchingStage) {
        categorized[matchingStage.key]?.push(story);
        assigned = true;
      }
    }

    // タグで分類できない場合は年代で分類
    if (!assigned) {
      const ageCategory = categorizeStoryByAge(story?.eventDate);
      categorized[ageCategory]?.push(story);
    }
  });

  return categorized;
}

export function StoryList({ initialData }: StoryListProps) {
  const [orderBy, setOrderBy] = useState<"newest" | "oldest" | "eventDate">(
    "eventDate", // タイムライン表示では時系列順をデフォルトに
  );

  // 並び順が変更された時のクエリ
  const { data, isLoading, error } = api.story.getByUser.useQuery(
    { orderBy },
    {
      initialData: orderBy === "newest" ? initialData : undefined,
    },
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          エラーが発生しました
        </h1>
        <p className="mb-4 text-gray-600">{error.message}</p>
      </div>
    );
  }

  const stories = data?.stories || [];
  const categorizedStories = categorizeStories(stories);

  return (
    <>
      {/* ヘッダー部分 */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Link
          href="/app/stories/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          新しいエピソードを作成
        </Link>

        {stories.length > 0 && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="sortOrder"
              className="text-sm font-medium text-gray-700"
            >
              並び順:
            </label>
            <select
              id="sortOrder"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value as typeof orderBy)}
              className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="eventDate">時系列順</option>
              <option value="newest">作成日（新しい順）</option>
              <option value="oldest">作成日（古い順）</option>
            </select>
          </div>
        )}
      </div>

      {/* タイムライン表示 */}
      {stories.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            まだエピソードがありません
          </h3>
          <p className="mb-4 text-gray-600">
            最初のエピソードを作成して、あなたの自分史を始めましょう。
          </p>
          <Link
            href="/app/stories/new"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            エピソードを作成
          </Link>
        </div>
      ) : (
        <div className="relative">
          {/* タイムライン軸 */}
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"></div>

          {/* 年代セクション */}
          {lifeStages.map((stage, stageIndex) => {
            const stageStories = categorizedStories[stage.key];

            if (!stageStories || stageStories.length === 0) return null;

            return (
              <div key={stage.key} className="relative mb-12 last:mb-0">
                {/* 年代ヘッダー */}
                <div className="relative mb-6 flex items-center">
                  {/* タイムライン上のアイコン */}
                  <div
                    className={`absolute left-0 z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white ${stage.iconBg} shadow-lg`}
                  >
                    <span className="text-2xl">{stage.icon}</span>
                  </div>

                  {/* 年代タイトル */}
                  <div className="ml-24">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {stage.label}
                    </h2>
                    <p className="text-sm text-gray-600">{stage.ageRange}</p>
                  </div>
                </div>

                {/* エピソードカード群 */}
                <div className="ml-24 space-y-4">
                  {stageStories.map((story, index) => (
                    <div
                      key={story.id}
                      className={`relative rounded-lg border p-6 shadow-sm transition-all hover:shadow-md ${stage.color}`}
                    >
                      {/* ストーリーカードへの接続線 */}
                      <div className="absolute top-8 -left-20 h-0.5 w-16 bg-gray-300"></div>
                      <div className="absolute top-7 -left-4 h-2 w-2 rounded-full bg-gray-400"></div>

                      <div className="mb-4">
                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                          {story.title}
                        </h3>

                        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                          {story.eventDate && (
                            <span className="flex items-center gap-1">
                              📅{" "}
                              {format(
                                new Date(story.eventDate),
                                "yyyy年MM月dd日",
                                { locale: ja },
                              )}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            作成:{" "}
                            {format(new Date(story.createdAt), "MM/dd", {
                              locale: ja,
                            })}
                          </span>
                        </div>

                        {/* 本文の抜粋 */}
                        <div
                          className="mb-3 line-clamp-3 text-sm text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html:
                              story.body
                                .replace(/<[^>]*>/g, "")
                                .substring(0, 120) + "...",
                          }}
                        />

                        {/* タグと画像情報 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {story.lifeEventTag && (
                              <span className="inline-block rounded-full bg-white/60 px-2 py-1 text-xs font-medium text-gray-700">
                                {story.lifeEventTag}
                              </span>
                            )}
                            <span
                              className={`inline-block rounded-full px-2 py-1 text-xs ${
                                story.visibility === "PRIVATE"
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                            >
                              {story.visibility === "PRIVATE"
                                ? "🔒 自分のみ"
                                : "👥 家族共有"}
                            </span>
                          </div>

                          {story.images.length > 0 && (
                            <span className="text-xs text-gray-500">
                              📷 {story.images.length}枚
                            </span>
                          )}
                        </div>
                      </div>

                      {/* アクションボタン */}
                      <div className="flex items-center justify-between border-t border-white/50 pt-4">
                        <Link
                          href={`/app/stories/${story.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          詳細を見る
                        </Link>

                        <div className="flex gap-2">
                          <Link
                            href={`/app/stories/${story.id}/edit`}
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            編集
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ページネーション（将来的に実装） */}
      {data?.nextCursor && (
        <div className="mt-8 text-center">
          <button className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50">
            さらに読み込む
          </button>
        </div>
      )}
    </>
  );
}
