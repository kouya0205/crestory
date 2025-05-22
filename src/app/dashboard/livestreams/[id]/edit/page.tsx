"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LivestreamFormContainer } from "@/components/livestream/LivestreamFormContainer";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";

export default function EditLivestreamPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [livestream, setLivestream] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = params;

  // ライブストリームデータの取得
  useEffect(() => {
    const fetchLivestream = async () => {
      try {
        const response = await fetch(`/api/livestreams/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("ライブ配信が見つかりませんでした");
          }
          throw new Error("データの取得に失敗しました");
        }

        const data = await response.json();
        setLivestream(data);
      } catch (error: any) {
        console.error("データ取得エラー:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLivestream();
  }, [id]);

  // フォーム送信処理
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // APIエンドポイントにデータを送信
      const response = await fetch(`/api/livestreams/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("配信の更新に失敗しました");
      }

      // 成功時の処理
      toast.success("ライブ配信が更新されました");

      // 詳細ページにリダイレクト
      router.push(`/dashboard/livestreams/${id}`);
    } catch (error) {
      console.error("配信更新エラー:", error);
      toast.error("配信の更新に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ローディング中
  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <FiLoader className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="ml-2">読み込み中...</span>
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center">
        <div className="mb-4 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-medium text-gray-900">{error}</h2>
        <p className="mb-4 text-gray-600">
          ライブ配信の読み込み中にエラーが発生しました
        </p>
        <button
          onClick={() => router.push("/dashboard/livestreams")}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          一覧に戻る
        </button>
      </div>
    );
  }

  if (!livestream) {
    return null;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ライブ配信を編集</h1>
        <p className="text-gray-600">配信の詳細情報を更新してください</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <LivestreamFormContainer
          initialData={livestream}
          onSubmit={handleSubmit}
          isEditing={true}
        />
      </div>
    </div>
  );
}
