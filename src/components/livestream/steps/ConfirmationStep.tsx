import { useFormContext } from "react-hook-form";
import {
  FiCalendar,
  FiClock,
  FiSmartphone,
  FiMonitor,
  FiGlobe,
  FiLock,
  FiUsers,
  FiMessageCircle,
  FiShield,
  FiBell,
  FiTag,
  FiShoppingBag,
} from "react-icons/fi";

export function ConfirmationStep() {
  const { watch } = useFormContext();

  // フォームの値を取得
  const values = watch();
  const {
    title,
    description,
    thumbnailUrl,
    scheduledStartTime,
    endTime,
    orientation,
    qualitySetting,
    visibility,
    commentEnabled,
    commentModeration,
    productIds,
    notifyFollowers,
    notifyTiming,
    tags,
    shopUrl,
  } = values;

  // 日付フォーマット用
  const formatDate = (date: Date) => {
    if (!date) return "未設定";
    return new Date(date).toLocaleString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 公開範囲の日本語表示
  const visibilityText = {
    public: "公開",
    unlisted: "限定公開",
    private: "非公開",
  }[visibility];

  // 配信品質の日本語表示
  const qualityText = {
    auto: "自動（推奨）",
    low: "低画質",
    medium: "中画質",
    high: "高画質",
  }[qualitySetting];

  return (
    <div className="space-y-8">
      <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
        <p>内容を確認してください。この情報で配信を作成します。</p>
      </div>

      {/* 基本情報 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">基本情報</h3>
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <div className="flex flex-col md:flex-row">
            {thumbnailUrl && (
              <div className="mb-4 md:mr-4 md:mb-0 md:w-1/3">
                <img
                  src={thumbnailUrl}
                  alt="サムネイル"
                  className="h-40 w-full rounded-md object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h4 className="text-base font-semibold">{title}</h4>
              <p className="mt-2 text-sm whitespace-pre-line text-gray-700">
                {description}
              </p>
              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex items-center text-sm">
                  <FiCalendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span>配信開始: {formatDate(scheduledStartTime)}</span>
                </div>
                {endTime && (
                  <div className="flex items-center text-sm">
                    <FiClock className="mr-2 h-4 w-4 text-gray-500" />
                    <span>配信終了予定: {formatDate(endTime)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 配信設定 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">配信設定</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <div className="flex items-center">
              {orientation === "vertical" ? (
                <FiSmartphone className="mr-2 h-5 w-5 text-indigo-600" />
              ) : (
                <FiMonitor className="mr-2 h-5 w-5 text-indigo-600" />
              )}
              <span className="font-medium">
                {orientation === "vertical" ? "縦型配信" : "横型配信"}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              配信品質: {qualityText}
            </p>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-4">
            <div className="flex items-center">
              {visibility === "public" && (
                <FiGlobe className="mr-2 h-5 w-5 text-green-600" />
              )}
              {visibility === "unlisted" && (
                <FiUsers className="mr-2 h-5 w-5 text-yellow-600" />
              )}
              {visibility === "private" && (
                <FiLock className="mr-2 h-5 w-5 text-red-600" />
              )}
              <span className="font-medium">{visibilityText}</span>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <FiMessageCircle className="mr-2 h-4 w-4 text-gray-500" />
              <span>
                コメント: {commentEnabled ? "許可" : "無効"}
                {commentEnabled && commentModeration && " (モデレーションあり)"}
              </span>
            </div>
            {shopUrl && (
              <div className="mt-2 flex items-center text-sm">
                <FiShoppingBag className="mr-2 h-4 w-4 text-gray-500" />
                <span className="truncate">外部ECサイト: {shopUrl}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 商品連携 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">商品連携</h3>
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <p className="mb-2 text-sm">
            紹介商品数: <span className="font-medium">{productIds.length}</span>
          </p>
          {productIds.length > 0 ? (
            <p className="text-sm text-green-600">商品を連携しています</p>
          ) : (
            <p className="text-sm text-yellow-600">商品は連携されていません</p>
          )}
        </div>
      </div>

      {/* 通知設定 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">通知設定</h3>
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <div className="flex items-center">
            <FiBell className="mr-2 h-5 w-5 text-gray-500" />
            <span>
              フォロワー通知:{" "}
              {notifyFollowers ? `有効 (${notifyTiming}分前)` : "無効"}
            </span>
          </div>

          {tags && tags.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center">
                <FiTag className="mr-2 h-5 w-5 text-gray-500" />
                <span>配信タグ:</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
