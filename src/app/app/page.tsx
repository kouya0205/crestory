import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { StoryList } from "@/components/story-list";

export default async function AppDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  // デフォルトの並び順でstory一覧を取得
  const data = await api.story.getByUser({ orderBy: "newest" });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">マイ自分史</h1>
        <p className="text-gray-600">
          あなたの人生のエピソードを記録・管理できます
        </p>
      </div>

      <StoryList initialData={data} />
    </div>
  );
}
