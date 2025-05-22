import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiBarChart2,
  FiDollarSign,
  FiEye,
  FiClock,
  FiVideo,
} from "react-icons/fi";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/dashboard/analytics");
  }

  // アナリティクスデータの取得（直近の30日間）
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const analytics = await db.analytics.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: thirtyDaysAgo,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  // 商品別の売上データを取得
  const productSalesData = await db.order.findMany({
    where: {
      userId: session.user.id,
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // ライブ配信データを取得
  const livestreamData = await db.liveStream.findMany({
    where: {
      userId: session.user.id,
      scheduledStartTime: {
        gte: thirtyDaysAgo,
      },
    },
    orderBy: {
      scheduledStartTime: "desc",
    },
  });

  // 集計データを計算
  const totalSales = productSalesData.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );

  const totalOrders = productSalesData.length;

  const totalViews = analytics.reduce((sum, day) => sum + day.pageViews, 0);

  const totalVisitors = analytics.reduce(
    (sum, day) => sum + day.uniqueVisitors,
    0,
  );

  // 商品別の売上金額を集計
  const productSales: { [key: string]: number } = {};
  productSalesData.forEach((order) => {
    order.orderItems.forEach((item) => {
      const productId = item.productId;
      if (!productSales[productId]) {
        productSales[productId] = 0;
      }
      productSales[productId] += item.totalPrice;
    });
  });

  // 商品別の売上トップ5を計算
  const topProducts = Object.entries(productSales)
    .map(([productId, total]) => {
      const product = productSalesData
        .flatMap((order) => order.orderItems)
        .find((item) => item.productId === productId)?.product;

      return {
        id: productId,
        name: product?.name || "不明な商品",
        total,
      };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  // 平均注文金額
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  // コンバージョン率（概算）
  const conversionRate =
    totalVisitors > 0 ? (totalOrders / totalVisitors) * 100 : 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">アナリティクス</h1>
        <p className="text-gray-600">過去30日間のデータ分析</p>
      </div>

      {/* 主要な指標 */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="売上合計"
          value={`¥${totalSales.toLocaleString()}`}
          icon={<FiDollarSign className="h-6 w-6 text-green-500" />}
          change="+12.5%"
          changeType="increase"
        />
        <StatCard
          title="注文数"
          value={totalOrders}
          icon={<FiShoppingBag className="h-6 w-6 text-blue-500" />}
          change="+4.3%"
          changeType="increase"
        />
        <StatCard
          title="訪問者数"
          value={totalVisitors.toLocaleString()}
          icon={<FiUsers className="h-6 w-6 text-purple-500" />}
          change="+18.2%"
          changeType="increase"
        />
        <StatCard
          title="コンバージョン率"
          value={`${conversionRate.toFixed(1)}%`}
          icon={<FiBarChart2 className="h-6 w-6 text-orange-500" />}
          change="-2.1%"
          changeType="decrease"
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 売上グラフ（ダミー） */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">売上推移</h2>
            <select className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm">
              <option>過去30日間</option>
              <option>過去3ヶ月</option>
              <option>過去6ヶ月</option>
            </select>
          </div>
          <div className="h-60 w-full">
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">
                グラフを表示するにはデータが不足しています
              </p>
            </div>
          </div>
        </div>

        {/* 売上トップ商品 */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-800">
            売上トップ商品
          </h2>
          {topProducts.length > 0 ? (
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-800">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{product.name}</div>
                    <div className="text-xs text-gray-500">
                      {`ID: ${product.id.substring(0, 8)}...`}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    ¥{product.total.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center">
              <p className="text-gray-500">データがありません</p>
            </div>
          )}
        </div>
      </div>

      {/* ライブ配信パフォーマンス */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium text-gray-800">
          ライブ配信パフォーマンス
        </h2>
        {livestreamData.length > 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      配信タイトル
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      日時
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      視聴数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      いいね
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      ステータス
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {livestreamData.map((stream) => (
                    <tr key={stream.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {stream.thumbnailUrl ? (
                            <img
                              src={stream.thumbnailUrl}
                              alt={stream.title}
                              className="mr-3 h-8 w-12 rounded object-cover"
                            />
                          ) : (
                            <div className="mr-3 flex h-8 w-12 items-center justify-center rounded bg-gray-100">
                              <FiVideo className="text-gray-400" />
                            </div>
                          )}
                          <span className="font-medium">{stream.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(stream.scheduledStartTime).toLocaleDateString(
                          "ja-JP",
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiEye className="mr-1 text-gray-400" />
                          {stream.viewCount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {stream.likeCount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            stream.status === "live"
                              ? "bg-red-100 text-red-800"
                              : stream.status === "scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : stream.status === "ended"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {stream.status === "live"
                            ? "ライブ中"
                            : stream.status === "scheduled"
                              ? "予定"
                              : stream.status === "ended"
                                ? "終了"
                                : "キャンセル"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center">
            <p className="text-gray-500">ライブ配信データがありません</p>
          </div>
        )}
      </div>

      {/* 補足データ */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="平均注文金額"
          value={`¥${averageOrderValue.toLocaleString()}`}
          icon={<FiDollarSign />}
          description="顧客1人あたりの購入金額"
        />
        <MetricCard
          title="平均視聴時間"
          value="8分32秒"
          icon={<FiClock />}
          description="ライブ配信の平均視聴時間"
        />
        <MetricCard
          title="ページビュー"
          value={totalViews.toLocaleString()}
          icon={<FiEye />}
          description="過去30日間の合計閲覧数"
        />
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
};

function StatCard({
  title,
  value,
  icon,
  change,
  changeType = "neutral",
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center">
        <div className="rounded-full bg-gray-100 p-3">{icon}</div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <p
                className={`ml-2 text-sm font-medium ${
                  changeType === "increase"
                    ? "text-green-600"
                    : changeType === "decrease"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
};

function MetricCard({ title, value, icon, description }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center text-gray-500">
        {icon}
        <span className="ml-2 text-sm font-medium">{title}</span>
      </div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
