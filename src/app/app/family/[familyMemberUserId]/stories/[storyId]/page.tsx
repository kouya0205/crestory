import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import type { Metadata, ResolvingMetadata } from "next";

interface FamilyMemberStoryDetailPageProps {
  params: Promise<{
    familyMemberUserId: string;
    storyId: string;
  }>;
}

export async function generateMetadata(
  { params }: FamilyMemberStoryDetailPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { storyId } = await params;
  return {
    title: storyId + " | Crestory",
  };
}

export default async function FamilyMemberStoryDetailPage({
  params,
}: FamilyMemberStoryDetailPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const { familyMemberUserId, storyId } = await params;

  // TODO: 実際のデータベースから家族メンバーとエピソードを取得
  const mockFamilyMember = {
    id: familyMemberUserId,
    name: "田中 太郎",
    email: "taro@example.com",
  };

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
    images: [
      "/placeholder-image-1.jpg",
      "/placeholder-image-2.jpg",
      "/placeholder-image-3.jpg",
    ],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* ナビゲーション */}
      <div className="mb-8">
        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
          <a
            href="/app/family"
            className="transition-colors hover:text-blue-600"
          >
            家族管理
          </a>
          <span>›</span>
          <a
            href={`/app/family/${familyMemberUserId}/stories`}
            className="transition-colors hover:text-blue-600"
          >
            {mockFamilyMember.name}の自分史
          </a>
          <span>›</span>
          <span className="text-gray-900">{mockStory.title}</span>
        </div>
      </div>

      {/* ヘッダー */}
      <div className="mb-8">
        <div className="mb-4 flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <svg
              className="h-6 w-6 text-gray-400"
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
            <p className="text-sm text-gray-600">
              {mockFamilyMember.name}が共有
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              {mockStory.title}
            </h1>
          </div>
        </div>

        <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
          <span>{new Date(mockStory.date).toLocaleDateString("ja-JP")}</span>
          <span className="flex items-center">
            <svg
              className="mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            家族のみ
          </span>
          <span className="text-xs">
            投稿日: {new Date(mockStory.createdAt).toLocaleDateString("ja-JP")}
          </span>
        </div>

        {/* タグ */}
        {mockStory.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  <p className="mt-2 text-center text-sm text-gray-600">
                    画像 {index + 1}
                  </p>
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

        {/* 共有者情報 */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <svg
                className="h-5 w-5 text-gray-400"
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
              <p className="font-medium text-gray-900">
                {mockFamilyMember.name}
              </p>
              <p className="text-sm text-gray-600">
                最終更新:{" "}
                {new Date(mockStory.updatedAt).toLocaleDateString("ja-JP")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="mt-8 flex justify-between">
        <a
          href={`/app/family/${familyMemberUserId}/stories`}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
        >
          ← {mockFamilyMember.name}の自分史一覧に戻る
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

      {/* 関連エピソード（将来的に実装） */}
      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          {mockFamilyMember.name}の他のエピソード
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-4">
            <h4 className="mb-2 font-medium text-gray-900">
              初めての一人暮らし
            </h4>
            <p className="mb-2 text-sm text-gray-600">2020年4月1日</p>
            <p className="text-sm text-gray-700">
              大学進学と同時に始まった一人暮らし...
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <h4 className="mb-2 font-medium text-gray-900">
              新しい趣味との出会い
            </h4>
            <p className="mb-2 text-sm text-gray-600">2023年6月20日</p>
            <p className="text-sm text-gray-700">
              友人に誘われて始めた写真撮影...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
