"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { StoryForm, type StoryFormData } from "@/components/story-form";
import { toast } from "sonner";

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

  const updateStory = api.story.update.useMutation({
    onSuccess: (data) => {
      toast.success("エピソードを更新しました", {
        description: "変更が正常に保存されました。",
      });

      // 1秒後にページ遷移
      setTimeout(() => {
        router.push(`/app/stories/${data.id}`);
      }, 1000);
    },
    onError: (error) => {
      console.error("エピソード更新エラー:", error);
      toast.error("更新に失敗しました", {
        description:
          error.message || "エピソードの更新中にエラーが発生しました。",
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (data: StoryFormData) => {
    setIsSubmitting(true);

    try {
      // バリデーション
      if (!data.title.trim()) {
        toast.error("タイトルは必須です");
        setIsSubmitting(false);
        return;
      }

      if (!data.body.trim()) {
        toast.error("本文は必須です");
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

      // console.log("tRPCミューテーション送信データ:", updateData);

      await updateStory.mutateAsync(updateData);

      // console.log("=== 更新成功 ===");
    } catch (error) {
      // console.error("=== 更新エラー ===", error);
      if (!updateStory.isError) {
        toast.error("更新に失敗しました", {
          description:
            "予期しないエラーが発生しました。もう一度お試しください。",
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
    <StoryForm
      mode="edit"
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting || updateStory.isPending}
    />
  );
}
