import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import EditStoryClient from "@/components/edit-story-client";

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

  const resolvedParams = await params;
  const storyId = resolvedParams.storyId;

  let story;
  try {
    story = await api.story.getById({ id: storyId });
  } catch (error) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            エラーが発生しました
          </h1>
          <p className="mb-4 text-gray-600">エピソードの取得に失敗しました</p>
          <Link
            href="/app"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            エピソード一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            エピソードが見つかりません
          </h1>
          <Link
            href="/app"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            エピソード一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  // 権限チェック：自分のエピソードのみ編集可能
  if (session.user.id !== story.authorId) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            アクセス権限がありません
          </h1>
          <p className="mb-4 text-gray-600">
            このエピソードを編集する権限がありません。
          </p>
          <Link
            href={`/app/stories/${story.id}`}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            エピソード詳細に戻る
          </Link>
        </div>
      </div>
    );
  }

  return <EditStoryClient story={story} />;
}
