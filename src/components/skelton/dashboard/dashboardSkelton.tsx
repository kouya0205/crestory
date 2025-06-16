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
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="text-gray-600">読み込み中...</p>
      </div>
    </div>
  );
}
