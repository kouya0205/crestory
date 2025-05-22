"use client";

import { FiPackage, FiVideo, FiTrendingUp, FiUsers } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";

// スケルトン用のStatCardコンポーネント
function StatCardSkelton({
  icon,
  colorClass,
}: {
  icon: React.ReactNode;
  colorClass: string;
}) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-1 h-8 w-16" />
        </div>
        <div className={`rounded-full p-3 ${colorClass} bg-opacity-10`}>
          {icon}
        </div>
      </div>
      <Skeleton className="mt-4 h-4 w-40" />
    </div>
  );
}

export default function DashboardSkelton() {
  return (
    <div>
      <div className="mb-6">
        <Skeleton className="mb-2 h-8 w-48" />
        <Skeleton className="h-5 w-64" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCardSkelton
          icon={<FiPackage className="h-6 w-6 text-gray-500/50" />}
          colorClass="text-gray-500/50"
        />
        <StatCardSkelton
          icon={<FiVideo className="h-6 w-6 text-gray-500/50" />}
          colorClass="text-gray-500/50"
        />
        <StatCardSkelton
          icon={<FiTrendingUp className="h-6 w-6 text-gray-500/50" />}
          colorClass="text-gray-500/50"
        />
        <StatCardSkelton
          icon={<FiUsers className="h-6 w-6 text-gray-500/50" />}
          colorClass="text-gray-500/50"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 最近の注文スケルトン */}
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <Skeleton className="mb-4 h-6 w-32" />
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  <th className="px-4 py-2 text-left">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  <th className="px-4 py-2 text-left">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  <th className="px-4 py-2 text-left">
                    <Skeleton className="h-4 w-16" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 今後のライブ配信スケルトン */}
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg border border-gray-100 p-3"
                >
                  <Skeleton className="mr-4 h-12 w-16 rounded" />
                  <div>
                    <Skeleton className="mb-1 h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
