import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

interface StoryDetailPageProps {
  params: Promise<{
    storyId: string;
  }>;
}

export default async function StoryDetailPage({
  params,
}: StoryDetailPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const { storyId } = await params;

  // TODO: 実際のデータベースからエピソードを取得
  const mockStory = {
    id: storyId,
    title: "初めての海外旅行",
    date: "2023-08-15",
    content: `
      大学生の時に友人と一緒に行った初めての海外旅行。
      
      **準備段階**
      - パスポートの申請から始まり、約1ヶ月前から準備を開始
      - 航空券やホテルの予約、現地での観光プランを立てるのがとても楽しかった
      
      **現地での体験**
      - 現地の食べ物は想像以上に美味しく、特に屋台料理が印象的だった
      - 言葉の壁はあったものの、身振り手振りでコミュニケーションを取れた時の嬉しさは忘れられない
      
      この旅行をきっかけに、異文化への興味が深まり、その後の人生に大きな影響を与えた。
    `,
    tags: ["旅行", "学生時代", "友人"],
    images: ["/placeholder-image-1.jpg", "/placeholder-image-2.jpg"],
    privacy: "family",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {mockStory.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>
                {new Date(mockStory.date).toLocaleDateString("ja-JP")}
              </span>
              <span className="flex items-center">
                {mockStory.privacy === "private" ? (
                  <>
                    <svg
                      className="mr-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    自分のみ
                  </>
                ) : (
                  <>
                    <svg
                      className="mr-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    家族のみ
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <a
              href={`/app/stories/${mockStory.id}/edit`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              編集
            </a>
            <button className="rounded-lg border border-red-300 px-4 py-2 text-red-700 transition-colors hover:bg-red-50">
              削除
            </button>
          </div>
        </div>

        {/* タグ */}
        {mockStory.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {mockStory.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* メインコンテンツ */}
      <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        {/* 画像 */}
        {mockStory.images.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">画像</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {mockStory.images.map((image, index) => (
                <div key={index} className="relative">
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-200">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">画像 {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 本文 */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            エピソード
          </h2>
          <div className="prose max-w-none">
            {mockStory.content.split("\n").map((paragraph, index) => {
              if (paragraph.trim() === "") return <br key={index} />;

              // 簡単なマークダウン風の処理
              if (
                paragraph.trim().startsWith("**") &&
                paragraph.trim().endsWith("**")
              ) {
                const text = paragraph.trim().slice(2, -2);
                return (
                  <h3
                    key={index}
                    className="mt-6 mb-3 text-lg font-semibold text-gray-900"
                  >
                    {text}
                  </h3>
                );
              }

              if (paragraph.trim().startsWith("- ")) {
                return (
                  <li
                    key={index}
                    className="ml-4 leading-relaxed text-gray-700"
                  >
                    {paragraph.trim().slice(2)}
                  </li>
                );
              }

              return (
                <p key={index} className="mb-4 leading-relaxed text-gray-700">
                  {paragraph.trim()}
                </p>
              );
            })}
          </div>
        </div>

        {/* メタ情報 */}
        <div className="border-t pt-6 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>
              作成日:{" "}
              {new Date(mockStory.createdAt).toLocaleDateString("ja-JP")}
            </span>
            <span>
              最終更新:{" "}
              {new Date(mockStory.updatedAt).toLocaleDateString("ja-JP")}
            </span>
          </div>
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="mt-8 flex justify-between">
        <a
          href="/app"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
        >
          ← エピソード一覧に戻る
        </a>

        <div className="space-x-4">
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50">
            前のエピソード
          </button>
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50">
            次のエピソード
          </button>
        </div>
      </div>
    </div>
  );
}
