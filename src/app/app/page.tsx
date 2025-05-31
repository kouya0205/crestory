import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function AppDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">マイ自分史</h1>
        <p className="text-gray-600">
          あなたの人生のエピソードを記録・管理できます
        </p>
      </div>

      <div className="mb-6">
        <a
          href="/app/stories/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          新しいエピソードを作成
        </a>
      </div>

      <div className="grid gap-6">
        {/* エピソード一覧コンポーネントをここに配置予定 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-center text-gray-500">
            まだエピソードが作成されていません。
            <br />
            最初のエピソードを作成して、あなたの自分史を始めましょう。
          </p>
        </div>
      </div>
    </div>
  );
}
