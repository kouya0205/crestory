"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/server/auth";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { StoryForm, type StoryFormData } from "@/components/story-form";

interface EditStoryPageProps {
  params: Promise<{
    storyId: string;
  }>;
}

export default function EditStoryPage({ params }: EditStoryPageProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [storyId, setStoryId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // paramsを展開
  useEffect(() => {
    params.then((resolvedParams) => {
      setStoryId(resolvedParams.storyId);
    });
  }, [params]);

  // tRPCクエリとミューテーション
  const {
    data: story,
    isLoading,
    error,
  } = api.story.getById.useQuery(
    { id: storyId },
    { enabled: !!storyId && status === "authenticated" },
  );

  const updateStory = api.story.update.useMutation({
    onSuccess: (data) => {
      // 成功時にエピソード詳細ページに遷移
      router.push(`/app/stories/${data.id}`);
    },
    onError: (error) => {
      console.error("エピソード更新エラー:", error);
      // TODO: エラー通知の表示（toastなど）
    },
  });

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

  // 権限チェック：自分のエピソードのみ編集可能
  if (session?.user?.id !== story.authorId) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            アクセス権限がありません
          </h1>
          <p className="mb-4 text-gray-600">
            このエピソードを編集する権限がありません。
          </p>
          <Link
            href={`/app/stories/${story.id}`}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            エピソード詳細に戻る
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: StoryFormData) => {
    setIsSubmitting(true);
    try {
      await updateStory.mutateAsync({
        id: story.id,
        title: data.title,
        body: data.body,
        eventDate: data.eventDate,
        lifeEventTag: data.lifeEventTag,
        visibility: data.visibility,
      });
    } catch (error) {
      console.error("エピソード更新に失敗しました:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/app/stories/${story.id}`);
  };

  // StoryFormに渡すためのデータ形式に変換
  const initialData: Partial<StoryFormData> = {
    title: story.title,
    body: story.body,
    eventDate: story.eventDate ? new Date(story.eventDate) : undefined,
    lifeEventTag: story.lifeEventTag || undefined,
    visibility: story.visibility,
  };

  return (
    <StoryForm
      mode="edit"
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting || updateStory.isPending}
    />
  );
}
