import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function FamilyPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  // TODO: 実際のデータベースから家族データを取得
  const mockFamilyData = {
    familyId: `FAMILY-${session.user?.id?.slice(-8).toUpperCase()}`,
    pendingRequests: [
      {
        id: "1",
        requesterName: "田中 花子",
        requesterEmail: "hanako@example.com",
        requestedAt: "2024-01-10T10:30:00Z",
      },
    ],
    familyMembers: [
      {
        id: "2",
        name: "田中 太郎",
        email: "taro@example.com",
        joinedAt: "2023-12-15T09:00:00Z",
        storiesCount: 12,
      },
      {
        id: "3",
        name: "田中 次郎",
        email: "jiro@example.com",
        joinedAt: "2024-01-05T14:20:00Z",
        storiesCount: 5,
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">家族管理</h1>
        <p className="text-gray-600">
          家族メンバーとの自分史共有を管理できます
        </p>
      </div>

      <div className="space-y-8">
        {/* 自分の家族ID表示 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            あなたの家族ID
          </h2>
          <div className="rounded-lg bg-blue-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-2 font-mono text-2xl font-bold text-blue-900">
                  {mockFamilyData.familyId}
                </div>
                <p className="text-sm text-blue-700">
                  この家族IDを家族メンバーに共有して、家族申請を送ってもらってください
                </p>
              </div>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                コピー
              </button>
            </div>
          </div>
        </div>

        {/* 家族メンバー登録 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            家族メンバーを追加
          </h2>
          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                家族IDを入力
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="FAMILY-XXXXXXXX"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  申請を送る
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                追加したい家族メンバーの家族IDを入力してください
              </p>
            </div>
          </form>
        </div>

        {/* 家族申請の承認/拒否 */}
        {mockFamilyData.pendingRequests.length > 0 && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              家族申請 ({mockFamilyData.pendingRequests.length}件)
            </h2>
            <div className="space-y-4">
              {mockFamilyData.pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {request.requesterName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {request.requesterEmail}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        申請日:{" "}
                        {new Date(request.requestedAt).toLocaleDateString(
                          "ja-JP",
                        )}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
                        承認
                      </button>
                      <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50">
                        拒否
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 登録済み家族メンバー一覧 */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            家族メンバー ({mockFamilyData.familyMembers.length}人)
          </h2>

          {mockFamilyData.familyMembers.length > 0 ? (
            <div className="space-y-4">
              {mockFamilyData.familyMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
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
                        <h3 className="font-medium text-gray-900">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            参加日:{" "}
                            {new Date(member.joinedAt).toLocaleDateString(
                              "ja-JP",
                            )}
                          </span>
                          <span>エピソード数: {member.storiesCount}件</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`/app/family/${member.id}/stories`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                      >
                        エピソードを見る
                      </a>
                      <button className="rounded-lg border border-red-300 px-4 py-2 text-red-700 transition-colors hover:bg-red-50">
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                家族メンバーがいません
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                家族IDを共有して、家族メンバーを招待しましょう
              </p>
            </div>
          )}
        </div>

        {/* ヘルプセクション */}
        <div className="rounded-lg bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-medium text-blue-900">
            家族機能の使い方
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <strong>1. 家族を招待する:</strong>{" "}
              あなたの家族IDを家族メンバーに共有してください
            </p>
            <p>
              <strong>2. 家族に参加する:</strong>{" "}
              家族メンバーの家族IDを入力して申請を送ってください
            </p>
            <p>
              <strong>3. 申請を管理する:</strong>{" "}
              受信した家族申請を承認または拒否してください
            </p>
            <p>
              <strong>4. エピソードを共有する:</strong>{" "}
              エピソード作成時に「家族のみ」を選択すると、家族メンバーが閲覧できます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
