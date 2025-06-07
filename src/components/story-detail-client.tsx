"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextViewer } from "@/components/ui/rich-text-viewer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface StoryDetailClientProps {
  story: {
    id: string;
    title: string;
    body: string;
    eventDate: Date | null;
    lifeEventTag: string | null;
    visibility: string;
    createdAt: Date;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
    images: Array<{
      id: string;
      order: number;
      image: {
        id: string;
        filename: string;
        url: string;
        alt: string | null;
        caption: string | null;
      };
    }>;
  };
  isOwner: boolean;
}

export default function StoryDetailClient({
  story,
  isOwner,
}: StoryDetailClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteStory = api.story.delete.useMutation({
    onSuccess: () => {
      toast.success("エピソードを削除しました", {
        description: "エピソードが正常に削除されました。",
      });

      // 1秒後にエピソード一覧にリダイレクト
      setTimeout(() => {
        router.push("/app");
      }, 1000);
    },
    onError: (error) => {
      console.error("エピソード削除エラー:", error);
      toast.error("削除に失敗しました", {
        description:
          error.message || "エピソードの削除中にエラーが発生しました。",
      });
      setIsDeleting(false);
    },
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteStory.mutateAsync({ id: story.id });
    } catch (error) {
      // エラーハンドリングはonErrorで処理される
    }
  };

  const handleShare = () => {
    // 将来の実装: 共有機能
    toast.info("共有機能", {
      description: "共有機能は今後実装予定です。",
    });
  };

  const handleDuplicate = () => {
    // 将来の実装: 複製機能
    router.push(`/app/stories/new?template=${story.id}`);
  };

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
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">メニューを開く</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => router.push(`/app/stories/${story.id}/edit`)}
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    編集
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDuplicate}>
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    複製
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    共有
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      variant="destructive"
                      disabled={isDeleting}
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      削除
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    エピソードを削除しますか？
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は取り消すことができません。エピソード「
                    {story.title}」とその関連データが完全に削除されます。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    {isDeleting ? "削除中..." : "削除"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
        <RichTextViewer content={story.body} />
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
