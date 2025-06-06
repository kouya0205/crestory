import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          プロフィール設定
        </h1>
        <p className="text-gray-600">
          アカウント情報と自分史の公開設定を管理できます
        </p>
      </div>

      <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        {/* 基本情報セクション */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">基本情報</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                表示名
              </label>
              <input
                type="text"
                defaultValue={session.user?.name || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="表示名を入力してください"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                defaultValue={session.user?.email || ""}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                disabled
              />
              <p className="mt-1 text-xs text-gray-500">
                メールアドレスは変更できません
              </p>
            </div>
          </div>
        </div>

        {/* 公開設定セクション */}
        <div className="border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            デフォルト公開設定
          </h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="defaultPrivacy"
                value="private"
                className="mr-3"
                defaultChecked
              />
              <div>
                <div className="font-medium text-gray-900">自分のみ</div>
                <div className="text-sm text-gray-600">
                  新しく作成するエピソードは自分だけが閲覧できます
                </div>
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="defaultPrivacy"
                value="family"
                className="mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">家族のみ</div>
                <div className="text-sm text-gray-600">
                  新しく作成するエピソードは家族メンバーも閲覧できます
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* 家族ID表示セクション */}
        <div className="border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">家族ID</h2>
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-lg font-semibold text-gray-900">
                  {/* 実際の家族IDをここに表示 */}
                  FAMILY-{session.user?.id?.slice(-8).toUpperCase()}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  この家族IDを家族メンバーに共有してください
                </div>
              </div>
              <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700">
                コピー
              </button>
            </div>
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="border-t pt-6">
          <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            設定を保存
          </button>
        </div>
      </div>
    </div>
  );
}
