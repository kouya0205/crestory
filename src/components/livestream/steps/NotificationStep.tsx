import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FiBell, FiClock, FiTag, FiPlus, FiX } from "react-icons/fi";
import { useState } from "react";

export function NotificationStep() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const notifyFollowers = watch("notifyFollowers");
  const tags = watch("tags") || [];
  const [tagInput, setTagInput] = useState("");

  // タグ追加処理
  const addTag = () => {
    if (!tagInput.trim()) return;
    if (!tags.includes(tagInput)) {
      setValue("tags", [...tags, tagInput]);
    }
    setTagInput("");
  };

  // タグ削除処理
  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t: string) => t !== tag),
    );
  };

  return (
    <div className="space-y-6">
      {/* フォロワー通知 */}
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifyFollowers"
            {...register("notifyFollowers")}
            className="h-4 w-4 text-indigo-600"
          />
          <Label htmlFor="notifyFollowers" className="ml-2 flex items-center">
            <FiBell className="mr-2 h-4 w-4" />
            フォロワーに配信開始を通知する
          </Label>
        </div>

        {/* 通知タイミング */}
        {notifyFollowers && (
          <div className="ml-6 space-y-2">
            <Label htmlFor="notifyTiming" className="flex items-center">
              <FiClock className="mr-2 h-4 w-4" />
              通知タイミング
            </Label>
            <div className="flex items-center">
              <Input
                type="number"
                id="notifyTiming"
                min={0}
                max={60}
                {...register("notifyTiming", { valueAsNumber: true })}
                className="mr-2 w-20"
              />
              <span>分前</span>
            </div>
            <p className="text-xs text-gray-500">
              配信開始の何分前に通知を送信するか設定します
            </p>
          </div>
        )}
      </div>

      {/* タグ設定 */}
      <div className="space-y-3">
        <Label className="flex items-center">
          <FiTag className="mr-2 h-4 w-4" />
          配信タグ
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="タグを入力"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
          >
            <FiPlus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 rounded-full text-indigo-600 hover:text-indigo-800"
              >
                <FiX className="h-3 w-3" />
              </button>
            </span>
          ))}
          {tags.length === 0 && (
            <p className="text-sm text-gray-500">
              タグを追加して検索性を向上させましょう
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
