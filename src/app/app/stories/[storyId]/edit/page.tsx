import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

interface EditStoryPageProps {
  params: Promise<{
    storyId: string;
  }>;
}

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const { storyId } = await params;

  const lifeEventTags = [
    "誕生",
    "学生時代",
    "就職",
    "結婚",
    "出産",
    "趣味",
    "旅行",
    "転機",
    "家族",
    "友人",
    "仕事",
    "その他",
  ];

  // TODO: 実際のデータベースからエピソードを取得
  const mockStory = {
    id: storyId,
    title: "初めての海外旅行",
    date: "2023-08-15",
    content: `大学生の時に友人と一緒に行った初めての海外旅行。

**準備段階**
- パスポートの申請から始まり、約1ヶ月前から準備を開始
- 航空券やホテルの予約、現地での観光プランを立てるのがとても楽しかった

**現地での体験**
- 現地の食べ物は想像以上に美味しく、特に屋台料理が印象的だった
- 言葉の壁はあったものの、身振り手振りでコミュニケーションを取れた時の嬉しさは忘れられない

この旅行をきっかけに、異文化への興味が深まり、その後の人生に大きな影響を与えた。`,
    tags: ["旅行", "学生時代", "友人"],
    privacy: "family",
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          エピソードを編集
        </h1>
        <p className="text-gray-600">エピソードの内容を更新できます</p>
      </div>

      <form className="space-y-8">
        <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
          {/* タイトル */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              defaultValue={mockStory.title}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="エピソードのタイトルを入力してください"
            />
          </div>

          {/* 日付 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              日付 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              defaultValue={mockStory.date}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              出来事のあった日、または記録日を選択してください
            </p>
          </div>

          {/* ライフイベントタグ */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              ライフイベントタグ
            </label>
            <div className="flex flex-wrap gap-2">
              {lifeEventTags.map((tag) => (
                <label key={tag} className="flex items-center">
                  <input
                    type="checkbox"
                    value={tag}
                    defaultChecked={mockStory.tags.includes(tag)}
                    className="peer sr-only"
                  />
                  <div className="cursor-pointer rounded-full border border-gray-300 px-3 py-1 text-sm transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-100 peer-checked:text-blue-700 hover:bg-gray-50">
                    {tag}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 本文 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              本文 <span className="text-red-500">*</span>
            </label>
            <div className="rounded-lg border border-gray-300">
              {/* リッチテキストエディタのツールバー */}
              <div className="flex space-x-2 border-b border-gray-200 p-2">
                <button
                  type="button"
                  className="rounded p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  title="太字"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 5a1 1 0 011-1h5.5a2.5 2.5 0 010 5H4v2h4.5a2.5 2.5 0 010 5H4a1 1 0 01-1-1V5z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="rounded p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  title="斜体"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 5a1 1 0 000 2h1.5L7.5 13H6a1 1 0 000 2h4a1 1 0 000-2h-1.5L10.5 7H12a1 1 0 000-2H8z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="rounded p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  title="箇条書き"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                </button>
              </div>
              <textarea
                required
                rows={10}
                defaultValue={mockStory.content}
                className="w-full resize-none border-0 p-3 focus:ring-0 focus:outline-none"
                placeholder="エピソードの詳細を記述してください..."
              />
            </div>
          </div>

          {/* 既存画像の表示 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              現在の画像
            </label>
            <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="group relative">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-200">
                  <svg
                    className="h-8 w-8 text-gray-400"
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
                <button
                  type="button"
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  title="画像を削除"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="group relative">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-200">
                  <svg
                    className="h-8 w-8 text-gray-400"
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
                <button
                  type="button"
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  title="画像を削除"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 新しい画像アップロード */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              新しい画像を追加
            </label>
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-4">
                <label className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    画像をアップロード
                  </span>
                  <span className="mt-1 block text-sm text-gray-600">
                    PNG, JPG, GIF形式（最大10MB）
                  </span>
                  <input
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* 公開設定 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              公開設定
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  className="mr-3"
                  defaultChecked={mockStory.privacy === "private"}
                />
                <span className="text-sm text-gray-900">自分のみ</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  value="family"
                  className="mr-3"
                  defaultChecked={mockStory.privacy === "family"}
                />
                <span className="text-sm text-gray-900">家族のみ</span>
              </label>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-between">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            下書き保存
          </button>
          <div className="space-x-4">
            <a
              href={`/app/stories/${mockStory.id}`}
              className="inline-block rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              キャンセル
            </a>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
            >
              変更を保存
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
