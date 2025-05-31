import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

interface FamilyMemberStoriesPageProps {
  params: Promise<{
    familyMemberUserId: string;
  }>;
}

export default async function FamilyMemberStoriesPage({
  params,
}: FamilyMemberStoriesPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const { familyMemberUserId } = await params;

  // TODO: 実際のデータベースから家族メンバーとエピソードを取得
  const mockFamilyMember = {
    id: familyMemberUserId,
    name: "田中 太郎",
    email: "taro@example.com",
    joinedAt: "2023-12-15T09:00:00Z",
  };

  const mockStories = [
    {
      id: "1",
      title: "初めての一人暮らし",
      date: "2020-04-01",
      excerpt:
        "大学進学と同時に始まった一人暮らし。最初は不安だったけれど、自立への第一歩となった大切な経験。",
      tags: ["学生時代", "転機"],
      createdAt: "2024-01-10T10:30:00Z",
      imageCount: 3,
    },
    {
      id: "2",
      title: "家族旅行 in 沖縄",
      date: "2023-08-15",
      excerpt:
        "久しぶりの家族全員での旅行。美しい海と美味しい料理、そして家族との時間を満喫した3日間。",
      tags: ["旅行", "家族"],
      createdAt: "2024-01-08T15:45:00Z",
      imageCount: 8,
    },
    {
      id: "3",
      title: "新しい趣味との出会い",
      date: "2023-06-20",
      excerpt:
        "友人に誘われて始めた写真撮影。最初は難しく感じたが、今では週末の楽しみになっている。",
      tags: ["趣味", "友人"],
      createdAt: "2024-01-05T09:20:00Z",
      imageCount: 5,
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="mb-4 flex items-center space-x-4">
          <a
            href="/app/family"
            className="text-blue-600 transition-colors hover:text-blue-800"
          >
            ← 家族管理に戻る
          </a>
        </div>

        <div className="mb-4 flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mockFamilyMember.name}の自分史
            </h1>
            <p className="text-gray-600">
              {mockStories.length}件のエピソードが共有されています
            </p>
          </div>
        </div>
      </div>

      {/* フィルター・ソート */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <select className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
            <option value="">すべてのタグ</option>
            <option value="学生時代">学生時代</option>
            <option value="旅行">旅行</option>
            <option value="家族">家族</option>
            <option value="趣味">趣味</option>
            <option value="友人">友人</option>
          </select>

          <select className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
            <option value="date-newest">日付順（新しい）</option>
            <option value="date-oldest">日付順（古い）</option>
          </select>
        </div>
      </div>

      {/* エピソード一覧 */}
      <div className="space-y-6">
        {mockStories.map((story) => (
          <div
            key={story.id}
            className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <h2 className="mb-2 text-xl font-semibold text-gray-900">
                  <a
                    href={`/app/family/${familyMemberUserId}/stories/${story.id}`}
                    className="transition-colors hover:text-blue-600"
                  >
                    {story.title}
                  </a>
                </h2>

                <div className="mb-3 flex items-center space-x-4 text-sm text-gray-600">
                  <span>
                    {new Date(story.date).toLocaleDateString("ja-JP")}
                  </span>
                  {story.imageCount > 0 && (
                    <span className="flex items-center">
                      <svg
                        className="mr-1 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {story.imageCount}枚
                    </span>
                  )}
                  <span className="text-xs">
                    投稿日:{" "}
                    {new Date(story.createdAt).toLocaleDateString("ja-JP")}
                  </span>
                </div>

                <p className="mb-4 leading-relaxed text-gray-700">
                  {story.excerpt}
                </p>

                {/* タグ */}
                {story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-sm text-gray-500">
                {mockFamilyMember.name}が共有
              </div>
              <a
                href={`/app/family/${familyMemberUserId}/stories/${story.id}`}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                詳細を見る
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* エピソードがない場合 */}
      {mockStories.length === 0 && (
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            共有されたエピソードがありません
          </h3>
          <p className="text-gray-600">
            {mockFamilyMember.name}
            さんがエピソードを「家族のみ」で共有すると、ここに表示されます。
          </p>
        </div>
      )}

      {/* ページネーション（将来的に実装） */}
      {mockStories.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <button
              className="rounded-lg border border-gray-300 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              前へ
            </button>
            <button className="rounded-lg bg-blue-600 px-3 py-2 text-white">
              1
            </button>
            <button
              className="rounded-lg border border-gray-300 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              次へ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
