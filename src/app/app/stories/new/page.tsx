"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StoryForm } from "../../../../components/story-form";

type StoryFormData = {
  title: string;
  body: string;
  eventDate?: Date;
  lifeEventTag?:
    | "BIRTH"
    | "CHILDHOOD"
    | "STUDENT_DAYS"
    | "FIRST_JOB"
    | "CAREER_CHANGE"
    | "MARRIAGE"
    | "CHILDBIRTH"
    | "PARENTING"
    | "HOBBY"
    | "TRAVEL"
    | "TURNING_POINT"
    | "HEALTH"
    | "OTHER";
  visibility: "PRIVATE" | "FAMILY_ONLY";
};

export default function NewStoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: StoryFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: tRPCでAPIを呼び出す実装
      console.log("Submitting story:", data);

      // 仮の遅延を追加（実際のAPI呼び出しをシミュレート）
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 成功後の処理
      router.push("/app");
    } catch (error) {
      console.error("Failed to create story:", error);
      // TODO: エラーハンドリング（toastなど）
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
      isSubmitting={isSubmitting}
    />
  );
}
