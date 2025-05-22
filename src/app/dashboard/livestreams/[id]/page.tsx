"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  FiEdit2,
  FiTrash2,
  FiPlay,
  FiClock,
  FiCalendar,
  FiEye,
  FiUsers,
  FiTag,
  FiShoppingBag,
  FiLoader,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function LivestreamDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [livestream, setLivestream] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

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

        // 関連商品の取得
        if (data.productIds && data.productIds.length > 0) {
          try {
            const productsResponse = await fetch(
              `/api/products?ids=${data.productIds.join(",")}`,
            );
            if (productsResponse.ok) {
              const productsData = await productsResponse.json();
              // productIdsの順序に合わせて商品を並べ替え
              const orderedProducts = data.productIds
                .map((prodId: string) =>
                  productsData.find((prod: any) => prod.id === prodId),
                )
                .filter(Boolean);
              setRelatedProducts(orderedProducts);
            }
          } catch (error) {
            console.error("関連商品の取得に失敗しました:", error);
          }
        }
      } catch (error: any) {
        console.error("データ取得エラー:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLivestream();
  }, [id]);

  // 配信開始処理
  const startLivestream = async () => {
    try {
      const response = await fetch(`/api/livestreams/${id}/start`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("配信の開始に失敗しました");
      }

      const updatedData = await response.json();
      setLivestream(updatedData);
      toast.success("ライブ配信を開始しました");
    } catch (error) {
      console.error("配信開始エラー:", error);
      toast.error("配信の開始に失敗しました");
    }
  };

  // 配信終了処理
  const endLivestream = async () => {
    try {
      const response = await fetch(`/api/livestreams/${id}/end`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("配信の終了に失敗しました");
      }

      const updatedData = await response.json();
      setLivestream(updatedData);
      toast.success("ライブ配信を終了しました");
    } catch (error) {
      console.error("配信終了エラー:", error);
      toast.error("配信の終了に失敗しました");
    }
  };

  // 配信削除処理
  const deleteLivestream = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/livestreams/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("配信の削除に失敗しました");
      }

      toast.success("ライブ配信を削除しました");
      router.push("/dashboard/livestreams");
    } catch (error) {
      console.error("配信削除エラー:", error);
      toast.error("配信の削除に失敗しました");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  // フォーマット関数
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy年MM月dd日(E) HH:mm", {
        locale: ja,
      });
    } catch (e) {
      return "日時不明";
    }
  };

  // ステータスに応じたバッジの色とテキスト
  const getStatusBadge = () => {
    const status = livestream?.status;

    if (!status) return null;

    const statusMap: Record<string, { color: string; text: string }> = {
      scheduled: { color: "bg-blue-100 text-blue-800", text: "予約済み" },
      live: { color: "bg-red-100 text-red-800", text: "ライブ中" },
      ended: { color: "bg-gray-100 text-gray-800", text: "終了" },
      cancelled: { color: "bg-yellow-100 text-yellow-800", text: "キャンセル" },
    };

    const { color, text } = statusMap[status] || {
      color: "bg-gray-100 text-gray-800",
      text: "不明",
    };

    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${color}`}>
        {text}
      </span>
    );
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
      {/* ヘッダー */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {livestream.title}
            </h1>
            {getStatusBadge()}
          </div>
          <p className="mt-1 text-gray-600">
            {formatDate(livestream.scheduledStartTime)}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
          {/* 配信ステータスに応じたアクションボタン */}
          {livestream.status === "scheduled" && (
            <>
              <button
                onClick={startLivestream}
                className="flex items-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                <FiPlay className="mr-2 h-4 w-4" />
                配信開始
              </button>
              <Link
                href={`/dashboard/livestreams/${id}/edit`}
                className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                <FiEdit2 className="mr-2 h-4 w-4" />
                編集
              </Link>
            </>
          )}

          {livestream.status === "live" && (
            <button
              onClick={endLivestream}
              className="flex items-center rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              <FiX className="mr-2 h-4 w-4" />
              配信終了
            </button>
          )}

          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center rounded-md border border-red-600 bg-white px-4 py-2 text-red-600 hover:bg-red-50"
          >
            <FiTrash2 className="mr-2 h-4 w-4" />
            削除
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 左側: 配信情報 */}
        <div className="space-y-6 lg:col-span-2">
          {/* サムネイル */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-gray-800">配信情報</h2>

            {livestream.thumbnailUrl ? (
              <div className="mb-6 overflow-hidden rounded-lg">
                <img
                  src={livestream.thumbnailUrl}
                  alt={livestream.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : (
              <div className="mb-6 flex h-48 items-center justify-center rounded-lg bg-gray-100">
                <p className="text-gray-500">サムネイルなし</p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-medium">{livestream.title}</h3>
              <p className="whitespace-pre-line text-gray-700">
                {livestream.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FiCalendar className="mr-2 h-4 w-4" />
                  <span>
                    予定日時: {formatDate(livestream.scheduledStartTime)}
                  </span>
                </div>

                {livestream.endTime && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FiClock className="mr-2 h-4 w-4" />
                    <span>終了予定: {formatDate(livestream.endTime)}</span>
                  </div>
                )}

                {livestream.actualStartTime && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FiPlay className="mr-2 h-4 w-4" />
                    <span>
                      開始時間: {formatDate(livestream.actualStartTime)}
                    </span>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <FiEye className="mr-2 h-4 w-4" />
                  <span>視聴数: {livestream.viewCount || 0}</span>
                </div>
              </div>

              {/* タグ */}
              {livestream.tags && livestream.tags.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-gray-700">タグ</p>
                  <div className="flex flex-wrap gap-2">
                    {livestream.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 配信設定 */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-gray-800">配信設定</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  配信形式
                </h3>
                <p className="text-gray-800">
                  {livestream.orientation === "vertical"
                    ? "縦型配信"
                    : "横型配信"}
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  配信品質
                </h3>
                <p className="text-gray-800">
                  {(() => {
                    switch (livestream.qualitySetting) {
                      case "auto":
                        return "自動 (推奨)";
                      case "low":
                        return "低画質";
                      case "medium":
                        return "中画質";
                      case "high":
                        return "高画質";
                      default:
                        return "自動";
                    }
                  })()}
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  公開範囲
                </h3>
                <p className="text-gray-800">
                  {(() => {
                    switch (livestream.visibility) {
                      case "public":
                        return "公開";
                      case "unlisted":
                        return "限定公開";
                      case "private":
                        return "非公開";
                      default:
                        return "公開";
                    }
                  })()}
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  コメント設定
                </h3>
                <p className="text-gray-800">
                  {livestream.commentEnabled ? "許可" : "無効"}
                  {livestream.commentEnabled &&
                    livestream.commentModeration &&
                    " (モデレーションあり)"}
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  通知設定
                </h3>
                <p className="text-gray-800">
                  {livestream.notifyFollowers
                    ? `${livestream.notifyTiming}分前に通知`
                    : "通知なし"}
                </p>
              </div>

              {livestream.shopUrl && (
                <div className="rounded-md border border-gray-200 p-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    外部ECサイト
                  </h3>
                  <a
                    href={livestream.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-indigo-600 hover:underline"
                  >
                    {livestream.shopUrl}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右側: 関連商品 */}
        <div className="space-y-6">
          {/* 関連商品 */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-800">関連商品</h2>
              <span className="text-sm text-gray-500">
                {relatedProducts.length}件
              </span>
            </div>

            {relatedProducts.length > 0 ? (
              <div className="space-y-4">
                {relatedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center rounded-md border border-gray-200 p-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-800">
                      {index + 1}
                    </div>
                    <div className="mx-3 h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <FiShoppingBag className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        ¥{product.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
                <p className="text-sm text-gray-500">関連商品はありません</p>
              </div>
            )}
          </div>

          {/* 配信統計情報 */}
          {(livestream.status === "live" || livestream.status === "ended") && (
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium text-gray-800">
                配信統計
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-600">総視聴者数</span>
                  <span className="font-medium">
                    {livestream.viewCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-600">いいね数</span>
                  <span className="font-medium">
                    {livestream.likeCount || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">コメント数</span>
                  <span className="font-medium">
                    {livestream.chatMessages?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 削除確認ダイアログ */}
      {isDeleteDialogOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              ライブ配信を削除しますか？
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              この操作は取り消せません。本当にこのライブ配信を削除しますか？
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled={isDeleting}
              >
                キャンセル
              </button>
              <button
                onClick={deleteLivestream}
                className="flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                    削除中...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="mr-2 h-4 w-4" />
                    削除する
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
