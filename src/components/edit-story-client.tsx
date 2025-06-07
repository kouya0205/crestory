"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { StoryForm, type StoryFormData } from "@/components/story-form";

interface EditStoryClientProps {
  story: {
    id: string;
    title: string;
    body: string;
    eventDate: Date | null;
    lifeEventTag: string | null;
    visibility: string;
  };
}

export default function EditStoryClient({ story }: EditStoryClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const updateStory = api.story.update.useMutation({
    onSuccess: (data) => {
      setMessage({
        type: "success",
        text: "エピソードを更新しました。詳細ページに移動します...",
      });

      // 2秒後にページ遷移
      setTimeout(() => {
        router.push(`/app/stories/${data.id}`);
      }, 2000);
    },
    onError: (error) => {
      console.error("エピソード更新エラー:", error);
      setMessage({
        type: "error",
        text: error.message || "エピソードの更新中にエラーが発生しました。",
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (data: StoryFormData) => {
    console.log("=== 編集フォーム送信開始 ===");
    console.log("送信データ:", data);
    console.log("ストーリーID:", story.id);

    setIsSubmitting(true);
    setMessage({ type: null, text: "" });

    try {
      // バリデーション
      if (!data.title.trim()) {
        setMessage({ type: "error", text: "タイトルは必須です" });
        setIsSubmitting(false);
        return;
      }

      if (!data.body.trim()) {
        setMessage({ type: "error", text: "本文は必須です" });
        setIsSubmitting(false);
        return;
      }

      const updateData = {
        id: story.id,
        title: data.title.trim(),
        body: data.body,
        eventDate: data.eventDate || null,
        lifeEventTag: data.lifeEventTag || null,
        visibility: data.visibility,
      };

      console.log("tRPCミューテーション送信データ:", updateData);

      await updateStory.mutateAsync(updateData);

      console.log("=== 更新成功 ===");
    } catch (error) {
      console.error("=== 更新エラー ===", error);
      if (!updateStory.isError) {
        setMessage({
          type: "error",
          text: "予期しないエラーが発生しました。もう一度お試しください。",
        });
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    // 変更がある場合は確認
    if (window.confirm("編集内容が失われますが、よろしいですか？")) {
      router.push(`/app/stories/${story.id}`);
    }
  };

  // StoryFormに渡すためのデータ形式に変換
  const initialData: Partial<StoryFormData> = {
    title: story.title,
    body: story.body,
    eventDate: story.eventDate ? new Date(story.eventDate) : undefined,
    lifeEventTag: story.lifeEventTag as
      | StoryFormData["lifeEventTag"]
      | undefined,
    visibility: story.visibility as StoryFormData["visibility"] | undefined,
  };

  return (
    <div>
      {/* メッセージ表示エリア */}
      {message.type && (
        <div
          className={`mb-4 rounded-lg p-4 ${
            message.type === "success"
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {message.type === "success" ? (
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </div>
        </div>
      )}

      <StoryForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting || updateStory.isPending}
      />
    </div>
  );
}
