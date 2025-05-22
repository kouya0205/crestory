import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import {
  FiPackage,
  FiVideo,
  FiUsers,
  FiShoppingCart,
  FiTrendingUp,
} from "react-icons/fi";
import { db } from "@/server/db";
import type { LiveStream, Order } from "@prisma/client";
import TutorialWrapper from "@/components/tutorial/TutorialWrapper";

// 統計カードコンポーネント
function StatCard({
  title,
  value,
  icon,
  description,
  colorClass,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
  colorClass: string;
}) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${colorClass} bg-opacity-10`}>
          {icon}
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }

  // ユーザー情報を取得（チュートリアル表示フラグを含む）
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      has_seen_tutorial: true,
    },
  });

  console.log("user", user);

  if (!user) {
    redirect("/auth/signin");
  }

  // デフォルト値を設定
  let totalProducts = 0;
  let totalLivestreams = 0;
  let livestreams: LiveStream[] = [];
  let recentOrders: (Order & { orderItems: any[] })[] = [];
  let customerCount = 0;

  try {
    // データ取得を試みる
    const productCount = await db.product.count({
      where: { userId: session.user.id },
    });

    totalProducts = productCount;

    const livestreamCount = await db.liveStream.count({
      where: { userId: session.user.id },
    });

    totalLivestreams = livestreamCount;

    // 予定されているライブ配信を取得
    if (totalLivestreams > 0) {
      livestreams = await db.liveStream.findMany({
        where: {
          userId: session.user.id,
          scheduledStartTime: {
            gt: new Date(),
          },
        },
        orderBy: {
          scheduledStartTime: "asc",
        },
        take: 3,
      });
    }

    // 過去30日間の注文を取得
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    recentOrders = await db.order.findMany({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // 購入者・視聴者の概算
    customerCount = await db.user.count({
      where: {
        OR: [
          {
            orders: {
              some: {
                userId: session.user.id,
              },
            },
          },
          {
            chatMessages: {
              some: {
                livestream: {
                  userId: session.user.id,
                },
              },
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error("データ取得エラー:", error);
    // エラーが出ても最低限UIは表示する
  }

  // 月間売上の計算
  const monthlyRevenue = recentOrders.reduce(
    (sum: number, order) => sum + order.totalAmount,
    0,
  );

  return (
    <div>
      {/* チュートリアルコンポーネント */}
      <TutorialWrapper userId={user.id} hasSeen={user.has_seen_tutorial} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>
        <p className="text-gray-600">ようこそ、{user.name || "ゲスト"}さん</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="商品数"
          value={totalProducts}
          icon={<FiPackage className="h-6 w-6 text-blue-500" />}
          description="登録済みの商品総数"
          colorClass="text-blue-500"
        />
        <StatCard
          title="ライブ配信数"
          value={totalLivestreams}
          icon={<FiVideo className="h-6 w-6 text-purple-500" />}
          description="これまでのライブ配信総数"
          colorClass="text-purple-500"
        />
        <StatCard
          title="月間売上"
          value={`¥${monthlyRevenue.toLocaleString()}`}
          icon={<FiTrendingUp className="h-6 w-6 text-green-500" />}
          description="過去30日間の売上合計"
          colorClass="text-green-500"
        />
        <StatCard
          title="お客様数"
          value={customerCount}
          icon={<FiUsers className="h-6 w-6 text-orange-500" />}
          description="購入者・視聴者の総数"
          colorClass="text-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-800">最近の注文</h2>
          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      注文番号
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      日付
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      金額
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      ステータス
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm">{order.orderNumber}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(order.createdAt).toLocaleDateString("ja-JP")}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        ¥{order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status === "delivered"
                            ? "配送済み"
                            : order.status === "shipped"
                              ? "発送済み"
                              : order.status === "processing"
                                ? "処理中"
                                : order.status === "cancelled"
                                  ? "キャンセル"
                                  : "保留中"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500">最近の注文はありません</p>
          )}
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-800">
            今後のライブ配信
          </h2>
          {livestreams.length > 0 ? (
            <div className="space-y-4">
              {livestreams.map((stream) => (
                <div
                  key={stream.id}
                  className="flex items-center rounded-lg border border-gray-100 p-3"
                >
                  {stream.thumbnailUrl ? (
                    <img
                      src={stream.thumbnailUrl}
                      alt={stream.title}
                      className="mr-4 h-12 w-16 rounded object-cover"
                    />
                  ) : (
                    <div className="mr-4 flex h-12 w-16 items-center justify-center rounded bg-gray-200">
                      <FiVideo className="text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{stream.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(stream.scheduledStartTime).toLocaleDateString(
                        "ja-JP",
                      )}{" "}
                      {new Date(stream.scheduledStartTime).toLocaleTimeString(
                        "ja-JP",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              予定されているライブ配信はありません
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
