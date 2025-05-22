import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  FiSmartphone,
  FiMonitor,
  FiGlobe,
  FiLock,
  FiUsers,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";

export function StreamSettingsStep() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const orientation = watch("orientation");
  const visibility = watch("visibility");
  const commentEnabled = watch("commentEnabled");
  const commentModeration = watch("commentModeration");

  return (
    <div className="space-y-8">
      {/* 配信形式 */}
      <div className="space-y-3">
        <Label className="text-base">配信形式</Label>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div
            className={`flex flex-1 cursor-pointer items-center rounded-lg border p-4 ${
              orientation === "vertical"
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200"
            }`}
            onClick={() => setValue("orientation", "vertical")}
          >
            <div
              className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${
                orientation === "vertical"
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <FiSmartphone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">縦型配信</h3>
              <p className="text-sm text-gray-500">
                スマホ向け縦長フォーマット (9:16)
              </p>
            </div>
            <input
              type="radio"
              {...register("orientation")}
              value="vertical"
              className="ml-auto h-4 w-4 text-indigo-600"
              checked={orientation === "vertical"}
              onChange={() => {}}
            />
          </div>

          <div
            className={`flex flex-1 cursor-pointer items-center rounded-lg border p-4 ${
              orientation === "horizontal"
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200"
            }`}
            onClick={() => setValue("orientation", "horizontal")}
          >
            <div
              className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${
                orientation === "horizontal"
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <FiMonitor className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">横型配信</h3>
              <p className="text-sm text-gray-500">
                PC・テレビ向け横長フォーマット (16:9)
              </p>
            </div>
            <input
              type="radio"
              {...register("orientation")}
              value="horizontal"
              className="ml-auto h-4 w-4 text-indigo-600"
              checked={orientation === "horizontal"}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>

      {/* 配信品質 */}
      <div className="space-y-3">
        <Label htmlFor="qualitySetting">配信品質</Label>
        <select
          id="qualitySetting"
          {...register("qualitySetting")}
          className="w-full rounded-md border border-gray-300 p-2"
        >
          <option value="auto">自動 (ネット環境に応じて最適化)</option>
          <option value="low">低画質 (データ使用量を節約)</option>
          <option value="medium">中画質 (バランス重視)</option>
          <option value="high">高画質 (高速回線推奨)</option>
        </select>
        <p className="text-xs text-gray-500">
          視聴者のネット環境に合わせて自動調整される場合があります
        </p>
      </div>

      {/* 公開範囲 */}
      <div className="space-y-3">
        <Label className="text-base">公開範囲</Label>
        <div className="grid gap-3 md:grid-cols-3">
          <div
            className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 ${
              visibility === "public"
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200"
            }`}
            onClick={() => setValue("visibility", "public")}
          >
            <FiGlobe
              className={`mb-2 h-8 w-8 ${
                visibility === "public" ? "text-indigo-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-center font-medium">公開</h3>
            <p className="mt-1 text-center text-xs text-gray-500">
              誰でも視聴可能
            </p>
            <input
              type="radio"
              {...register("visibility")}
              value="public"
              className="mt-2 h-4 w-4 text-indigo-600"
              checked={visibility === "public"}
              onChange={() => {}}
            />
          </div>

          <div
            className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 ${
              visibility === "unlisted"
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200"
            }`}
            onClick={() => setValue("visibility", "unlisted")}
          >
            <FiUsers
              className={`mb-2 h-8 w-8 ${
                visibility === "unlisted" ? "text-indigo-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-center font-medium">限定公開</h3>
            <p className="mt-1 text-center text-xs text-gray-500">
              URLを知っている人のみ
            </p>
            <input
              type="radio"
              {...register("visibility")}
              value="unlisted"
              className="mt-2 h-4 w-4 text-indigo-600"
              checked={visibility === "unlisted"}
              onChange={() => {}}
            />
          </div>

          <div
            className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 ${
              visibility === "private"
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200"
            }`}
            onClick={() => setValue("visibility", "private")}
          >
            <FiLock
              className={`mb-2 h-8 w-8 ${
                visibility === "private" ? "text-indigo-600" : "text-gray-400"
              }`}
            />
            <h3 className="text-center font-medium">非公開</h3>
            <p className="mt-1 text-center text-xs text-gray-500">
              自分だけ視聴可能
            </p>
            <input
              type="radio"
              {...register("visibility")}
              value="private"
              className="mt-2 h-4 w-4 text-indigo-600"
              checked={visibility === "private"}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>

      {/* コメント設定 */}
      <div className="space-y-4">
        <Label className="text-base">コメント設定</Label>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="commentEnabled"
            {...register("commentEnabled")}
            className="h-4 w-4 text-indigo-600"
          />
          <label
            htmlFor="commentEnabled"
            className="ml-2 flex items-center text-sm font-medium"
          >
            <FiMessageCircle className="mr-1 h-4 w-4" />
            視聴者コメントを許可する
          </label>
        </div>

        {commentEnabled && (
          <div className="mt-2 ml-6 flex items-center">
            <input
              type="checkbox"
              id="commentModeration"
              {...register("commentModeration")}
              className="h-4 w-4 text-indigo-600"
            />
            <label
              htmlFor="commentModeration"
              className="ml-2 flex items-center text-sm font-medium"
            >
              <FiShield className="mr-1 h-4 w-4" />
              コメントモデレーション（事前確認）を有効にする
            </label>
          </div>
        )}

        <p className="text-xs text-gray-500">
          コメントモデレーションを有効にすると、コメントは一度確認されてから公開されます
        </p>
      </div>

      {/* 外部ECサイトリンク */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="shopUrl">外部ECサイトURL (オプション)</Label>
          <span className="text-xs text-gray-500">販売ページがある場合</span>
        </div>
        <input
          type="url"
          id="shopUrl"
          placeholder="https://example.com/your-shop"
          {...register("shopUrl")}
          className="w-full rounded-md border border-gray-300 p-2"
        />
        {errors.shopUrl && (
          <p className="text-sm text-red-500">
            {String(errors.shopUrl.message)}
          </p>
        )}
        <p className="text-xs text-gray-500">
          外部ECサイトと連携する場合はURLを入力してください
        </p>
      </div>
    </div>
  );
}
