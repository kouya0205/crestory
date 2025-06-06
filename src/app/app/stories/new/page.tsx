"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StoryForm, type StoryFormData } from "@/components/story-form";
import { api } from "@/trpc/react";

export default function NewStoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // tRPCミューテーション
  const createStory = api.story.create.useMutation({
    onSuccess: (data) => {
      // 成功時にエピソード詳細ページに遷移
      router.push(`/app/stories/${data.id}`);
    },
    onError: (error) => {
      console.error("エピソード作成エラー:", error);
      // TODO: エラー通知の表示（toastなど）
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

  return (
    <StoryForm
      mode="create"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting || createStory.isPending}
    />
  );
}
