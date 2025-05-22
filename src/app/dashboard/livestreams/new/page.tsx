"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LivestreamFormContainer } from "@/components/livestream/LivestreamFormContainer";
import { toast } from "sonner";

export default function NewLivestreamPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // フォーム送信処理
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // APIエンドポイントにデータを送信
      const response = await fetch("/api/livestreams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("配信の作成に失敗しました");
      }

      const result = await response.json();

      // 成功時の処理
      toast.success("ライブ配信が作成されました");

      // 作成されたライブストリームの詳細ページにリダイレクト
      router.push(`/dashboard/livestreams/${result.id}`);
    } catch (error) {
      console.error("配信作成エラー:", error);
      toast.error("配信の作成に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ライブ配信を作成</h1>
        <p className="text-gray-600">
          新しいライブ配信の詳細を入力してください
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <LivestreamFormContainer onSubmit={handleSubmit} isEditing={false} />
      </div>
    </div>
  );
}
