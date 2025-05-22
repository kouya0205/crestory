import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { FiCalendar, FiClock, FiImage, FiUpload, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export function BasicInfoStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useFormContext();

  const thumbnailUrl = watch("thumbnailUrl");
  const [previewImage, setPreviewImage] = useState<string | null>(
    thumbnailUrl || null,
  );

  // 日時選択用のstate
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const scheduledStartTime = watch("scheduledStartTime");
  const endTime = watch("endTime");

  // 画像アップロード処理（実際の実装ではAPIとの連携が必要）
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 一時的なプレビュー表示用のURLを生成
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // TODO: 実際のAPIエンドポイントと連携して画像をアップロード
      // この例では仮のURLをセットしています
      setValue("thumbnailUrl", previewUrl);
    }
  };

  // プレビュー画像の削除
  const removeImage = () => {
    setPreviewImage(null);
    setValue("thumbnailUrl", "");
  };

  // 日付選択ハンドラー
  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // 現在の時刻情報を保持
    if (scheduledStartTime) {
      const newDate = new Date(date);
      newDate.setHours(scheduledStartTime.getHours());
      newDate.setMinutes(scheduledStartTime.getMinutes());
      setValue("scheduledStartTime", newDate);
    } else {
      setValue("scheduledStartTime", date);
    }
  };

  // 時間変更ハンドラー
  const handleStartTimeChange = (type: "hour" | "minute", value: number) => {
    const currentDate = scheduledStartTime
      ? new Date(scheduledStartTime)
      : new Date();

    if (type === "hour") {
      currentDate.setHours(value);
    } else {
      currentDate.setMinutes(value);
    }

    setValue("scheduledStartTime", currentDate);
  };

  // 終了日付選択ハンドラー
  const handleEndDateSelect = (date: Date | undefined) => {
    if (!date) {
      setValue("endTime", undefined);
      return;
    }

    // 現在の時刻情報を保持
    if (endTime) {
      const newDate = new Date(date);
      newDate.setHours(endTime.getHours());
      newDate.setMinutes(endTime.getMinutes());
      setValue("endTime", newDate);
    } else {
      setValue("endTime", date);
    }
  };

  // 時間変更ハンドラー
  const handleEndTimeChange = (type: "hour" | "minute", value: number) => {
    if (!endTime) {
      const newDate = new Date();
      if (type === "hour") {
        newDate.setHours(value);
      } else {
        newDate.setMinutes(value);
      }
      setValue("endTime", newDate);
      return;
    }

    const currentDate = new Date(endTime);

    if (type === "hour") {
      currentDate.setHours(value);
    } else {
      currentDate.setMinutes(value);
    }

    setValue("endTime", currentDate);
  };

  return (
    <div className="space-y-6">
      {/* タイトル */}
      <div className="space-y-2">
        <Label htmlFor="title">
          配信タイトル <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="例: 今が旬！信州産りんごの収穫ライブ"
          {...register("title")}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{String(errors.title.message)}</p>
        )}
      </div>

      {/* 説明 */}
      <div className="space-y-2">
        <Label htmlFor="description">
          配信の説明 <span className="text-red-500">*</span>
        </Label>
        <textarea
          id="description"
          placeholder="商品や配信内容の魅力を伝える説明を書きましょう"
          rows={5}
          className={`w-full rounded-md border p-2 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">
            {String(errors.description.message)}
          </p>
        )}
      </div>

      {/* サムネイル画像 */}
      <div className="space-y-2">
        <Label htmlFor="thumbnailImage">カバー画像</Label>
        <div className="flex items-start space-x-4">
          <div
            className={`flex h-32 w-48 items-center justify-center rounded-md border-2 border-dashed ${
              previewImage ? "border-indigo-300" : "border-gray-300"
            } bg-gray-50`}
          >
            {previewImage ? (
              <div className="relative h-full w-full">
                <img
                  src={previewImage}
                  alt="サムネイルプレビュー"
                  className="h-full w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white"
                >
                  <FiX size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">画像を選択</p>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="relative">
              <input
                id="thumbnailImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById("thumbnailImage")?.click()
                }
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <FiUpload className="mr-2 h-4 w-4" />
                画像をアップロード
              </button>
            </div>
            <p className="text-xs text-gray-500">
              推奨: 1280x720px (16:9) または 1080x1920px (9:16)、5MB以下
            </p>
            <p className="text-xs text-gray-500">
              魅力的なカバー画像を設定すると視聴者が増えます
            </p>
          </div>
        </div>
      </div>

      {/* 配信日時 */}
      <div className="space-y-2">
        <Label htmlFor="scheduledStartTime">
          配信予定日時 <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 gap-4">
          <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !scheduledStartTime ? "text-muted-foreground" : ""
                }`}
              >
                <FiCalendar className="mr-2 h-4 w-4" />
                {scheduledStartTime ? (
                  format(scheduledStartTime, "yyyy年M月d日(E) HH:mm", {
                    locale: ja,
                  })
                ) : (
                  <span>配信予定日時を選択</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="sm:flex">
                <Calendar
                  mode="single"
                  selected={scheduledStartTime}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  locale={ja}
                />
                <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex p-2 sm:flex-col">
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <Button
                          key={hour}
                          size="icon"
                          variant={
                            scheduledStartTime &&
                            scheduledStartTime.getHours() === hour
                              ? "default"
                              : "ghost"
                          }
                          className="aspect-square shrink-0 sm:w-full"
                          onClick={() => handleStartTimeChange("hour", hour)}
                        >
                          {hour.toString().padStart(2, "0")}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex p-2 sm:flex-col">
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <Button
                            key={minute}
                            size="icon"
                            variant={
                              scheduledStartTime &&
                              scheduledStartTime.getMinutes() === minute
                                ? "default"
                                : "ghost"
                            }
                            className="aspect-square shrink-0 sm:w-full"
                            onClick={() =>
                              handleStartTimeChange("minute", minute)
                            }
                          >
                            {minute.toString().padStart(2, "0")}
                          </Button>
                        ),
                      )}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {errors.scheduledStartTime && (
          <p className="text-sm text-red-500">
            {String(errors.scheduledStartTime.message)}
          </p>
        )}
      </div>

      {/* 配信終了予定時間（オプション） */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="endTime">配信終了予定時間 (オプション)</Label>
          <span className="text-xs text-gray-500">目安として設定できます</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !endTime ? "text-muted-foreground" : ""
                }`}
              >
                <FiCalendar className="mr-2 h-4 w-4" />
                {endTime ? (
                  format(endTime, "yyyy年M月d日(E) HH:mm", { locale: ja })
                ) : (
                  <span>終了予定時刻を選択</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="sm:flex">
                <Calendar
                  mode="single"
                  selected={endTime}
                  onSelect={handleEndDateSelect}
                  initialFocus
                  locale={ja}
                />
                <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex p-2 sm:flex-col">
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <Button
                          key={hour}
                          size="icon"
                          variant={
                            endTime && endTime.getHours() === hour
                              ? "default"
                              : "ghost"
                          }
                          className="aspect-square shrink-0 sm:w-full"
                          onClick={() => handleEndTimeChange("hour", hour)}
                        >
                          {hour.toString().padStart(2, "0")}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex p-2 sm:flex-col">
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <Button
                            key={minute}
                            size="icon"
                            variant={
                              endTime && endTime.getMinutes() === minute
                                ? "default"
                                : "ghost"
                            }
                            className="aspect-square shrink-0 sm:w-full"
                            onClick={() =>
                              handleEndTimeChange("minute", minute)
                            }
                          >
                            {minute.toString().padStart(2, "0")}
                          </Button>
                        ),
                      )}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
