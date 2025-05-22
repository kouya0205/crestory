import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import Link from "next/link";
import { FiPlus, FiVideo, FiClock, FiUsers, FiActivity } from "react-icons/fi";

export default async function LivestreamsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/dashboard/livestreams");
  }

  // ライブ配信データの取得
  const livestreams = await db.liveStream.findMany({
    where: { userId: session.user.id },
    orderBy: [
      {
        status: "asc", // scheduled, live, ended, cancelled の順
      },
      {
        scheduledStartTime: "asc",
      },
    ],
    include: {
      products: true,
    },
  });

  // 配信のステータスによるグループ分け
  const upcomingStreams = livestreams.filter(
    (stream) => stream.status === "scheduled",
  );
  const liveStreams = livestreams.filter((stream) => stream.status === "live");
  const pastStreams = livestreams.filter((stream) => stream.status === "ended");
  const cancelledStreams = livestreams.filter(
    (stream) => stream.status === "cancelled",
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">ライブ配信管理</h1>
        <Link
          href="/dashboard/livestreams/new"
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          新規配信
        </Link>
      </div>

      {/* 現在ライブ中の配信 */}
      {liveStreams.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 flex items-center text-lg font-medium text-red-600">
            <FiActivity className="mr-2" />
            現在ライブ中
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {liveStreams.map((stream) => (
              <LivestreamCard
                key={stream.id}
                stream={stream}
                isLive={true}
                href={`/dashboard/livestreams/${stream.id}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 予定されている配信 */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center text-lg font-medium text-gray-800">
          <FiClock className="mr-2" />
          予定されている配信
        </h2>
        {upcomingStreams.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingStreams.map((stream) => (
              <LivestreamCard
                key={stream.id}
                stream={stream}
                href={`/dashboard/livestreams/${stream.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center">
            <p className="mb-2 text-gray-500">予定されている配信はありません</p>
            <Link
              href="/dashboard/livestreams/new"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              新しい配信を予約する
            </Link>
          </div>
        )}
      </div>

      {/* 過去の配信 */}
      {pastStreams.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 flex items-center text-lg font-medium text-gray-800">
            <FiVideo className="mr-2" />
            過去の配信
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastStreams.slice(0, 6).map((stream) => (
              <LivestreamCard
                key={stream.id}
                stream={stream}
                isPast={true}
                href={`/dashboard/livestreams/${stream.id}`}
              />
            ))}
          </div>
          {pastStreams.length > 6 && (
            <div className="mt-4 text-center">
              <Link
                href="/dashboard/livestreams/history"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                すべての過去配信を見る ({pastStreams.length})
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type LivestreamCardProps = {
  stream: any;
  isLive?: boolean;
  isPast?: boolean;
  href: string;
};

function LivestreamCard({
  stream,
  isLive = false,
  isPast = false,
  href,
}: LivestreamCardProps) {
  return (
    <Link
      href={href}
      className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md bg-gray-100">
        {stream.thumbnailUrl ? (
          <img
            src={stream.thumbnailUrl}
            alt={stream.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FiVideo className="h-12 w-12 text-gray-400" />
          </div>
        )}
        {isLive && (
          <div className="absolute top-2 left-2 rounded-full bg-red-600 px-2 py-1 text-xs font-medium text-white">
            LIVE
          </div>
        )}
        {isPast && stream.recordingUrl && (
          <div className="absolute top-2 left-2 rounded-full bg-gray-800 px-2 py-1 text-xs font-medium text-white">
            録画あり
          </div>
        )}
      </div>
      <h3 className="mb-2 line-clamp-1 text-lg font-medium text-gray-900">
        {stream.title}
      </h3>
      <div className="mb-2 flex items-center text-sm text-gray-500">
        <FiClock className="mr-1" />
        {isLive
          ? "ライブ中"
          : new Date(stream.scheduledStartTime).toLocaleString("ja-JP", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
      </div>
      {stream.viewCount > 0 && (
        <div className="flex items-center text-sm text-gray-500">
          <FiUsers className="mr-1" />
          {stream.viewCount.toLocaleString()}回視聴
        </div>
      )}
      {stream.products && stream.products.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {stream.products.slice(0, 3).map((product: any) => (
            <span
              key={product.id}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
            >
              {product.name}
            </span>
          ))}
          {stream.products.length > 3 && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
              他{stream.products.length - 3}点
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
