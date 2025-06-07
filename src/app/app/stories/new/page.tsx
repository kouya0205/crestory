"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StoryForm, type StoryFormData } from "@/components/story-form";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function NewStoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // テンプレートパラメータの取得
  const templateId = searchParams.get("template");

  // テンプレートストーリーの取得（複製の場合）
  const {
    data: templateStory,
    isLoading: isLoadingTemplate,
    error: templateError,
  } = api.story.getById.useQuery(
    { id: templateId! },
    {
      enabled: !!templateId,
      retry: false,
    },
  );

  // tRPCミューテーション
  const createStory = api.story.create.useMutation({
    onSuccess: (data) => {
      const successMessage = templateId
        ? "エピソードを複製しました"
        : "エピソードを作成しました";

      toast.success(successMessage, {
        description: "新しいエピソードが正常に作成されました。",
      });

      // 成功時にエピソード詳細ページに遷移
      router.push(`/app/stories/${data.id}`);
    },
    onError: (error) => {
      console.error("エピソード作成エラー:", error);
      toast.error("作成に失敗しました", {
        description:
          error.message || "エピソードの作成中にエラーが発生しました。",
      });
    },
  });

  const handleSubmit = async (data: StoryFormData) => {
    setIsSubmitting(true);
    try {
      await createStory.mutateAsync({
        title: data.title,
        body: data.body,
        eventDate: data.eventDate,
        lifeEventTag: data.lifeEventTag,
        visibility: data.visibility,
      });
    } catch (error) {
      console.error("エピソード作成に失敗しました:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // テンプレートのロード中
  if (templateId && isLoadingTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-600">エピソードを読み込んでいます...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // テンプレートの取得エラー
  if (templateId && templateError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="mb-4 text-red-600">
                エピソードの読み込みに失敗しました
              </p>
              <button
                onClick={() => router.back()}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 初期データの準備（複製の場合）
  const initialData: Partial<StoryFormData> | undefined = templateStory
    ? {
        title: `${templateStory.title}（コピー）`,
        body: templateStory.body,
        eventDate: templateStory.eventDate || undefined,
        lifeEventTag:
          templateStory.lifeEventTag as StoryFormData["lifeEventTag"],
        visibility: templateStory.visibility as StoryFormData["visibility"],
      }
    : undefined;

  return (
    <StoryForm
      mode="create"
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting || createStory.isPending}
    />
  );
}
