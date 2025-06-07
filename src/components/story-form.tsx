import { useState, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Save, Eye, Calendar, Tag, FileText } from "lucide-react";

import { RichTextEditor, type RichTextEditorRef } from "./ui/rich-text-editor";
import { DatePicker } from "./ui/date-picker";
import { LifeEventSelector, type LifeEventTag } from "./ui/life-event-selector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

// フォームスキーマ定義
const storyFormSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
  body: z.string().min(1, "本文は必須です"),
  eventDate: z.date().optional(),
  lifeEventTag: z
    .enum([
      "BIRTH",
      "CHILDHOOD",
      "STUDENT_DAYS",
      "FIRST_JOB",
      "CAREER_CHANGE",
      "MARRIAGE",
      "CHILDBIRTH",
      "PARENTING",
      "HOBBY",
      "TRAVEL",
      "TURNING_POINT",
      "HEALTH",
      "OTHER",
    ])
    .optional(),
  visibility: z.enum(["PRIVATE", "FAMILY_ONLY"]),
});

type StoryFormData = z.infer<typeof storyFormSchema>;

export type { StoryFormData };

interface StoryFormProps {
  initialData?: Partial<StoryFormData>;
  onSubmit: (data: StoryFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  mode?: "create" | "edit";
}

export function StoryForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  mode = "create",
}: StoryFormProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isImageDeleting, setIsImageDeleting] = useState(false);
  const editorRef = useRef<RichTextEditorRef>(null);

  const form = useForm<StoryFormData>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
      eventDate: initialData?.eventDate,
      lifeEventTag: initialData?.lifeEventTag,
      visibility: initialData?.visibility || "PRIVATE",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = form;

  const watchedValues = watch();

  // RichTextEditorの内容変更を処理する関数
  const handleBodyChange = (content: string) => {
    // 画像削除の検出（blob:URLの削除を検出）
    const hasImages = content.includes("blob:") || content.includes("<img");
    const previousContent = watchedValues.body || "";
    const hadImages =
      previousContent.includes("blob:") || previousContent.includes("<img");
    const imageRemoved = hadImages && !hasImages;

    // 画像削除時の特別処理
    if (imageRemoved) {
      setIsImageDeleting(true);

      // 500ms後にフラグをリセット（画像削除処理の完了を待つ）
      setTimeout(() => {
        setIsImageDeleting(false);
      }, 500);
    }

    setValue("body", content, { shouldDirty: true });
  };

  const handleFormSubmit: SubmitHandler<StoryFormData> = async (data) => {
    // 画像削除中は保存処理をブロック
    if (isImageDeleting) {
      return;
    }

    try {
      // エディターに一時画像がある場合、アップロードしてURLを置換
      if (editorRef.current?.saveWithImages) {
        const updatedBody = await editorRef.current.saveWithImages(data.body);
        data.body = updatedBody;
      }

      onSubmit(data);
    } catch (error) {
      console.error("保存処理エラー:", error);
      // TODO: エラー通知の表示
    }
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const formatDisplayDate = (date: Date | undefined) => {
    if (!date) return "未設定";
    return format(date, "yyyy年MM月dd日", { locale: ja });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-4xl">
        {/* ヘッダー */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {mode === "create"
              ? "新しい自分史エピソード"
              : "自分史エピソードを編集"}
          </h1>
          <p className="text-gray-600">
            あなたの人生の大切な瞬間を記録しましょう
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* メインコンテンツエリア */}
            <div className="space-y-6 lg:col-span-2">
              {/* タイトル入力 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    エピソードタイトル
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    {...register("title")}
                    placeholder="例: 初めての一人旅で見つけた自分"
                    className="text-lg"
                    disabled={isSubmitting}
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* 本文エディタ */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="h-5 w-5" />
                      エピソードの詳細
                    </CardTitle>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={togglePreview}
                      disabled={isSubmitting}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {isPreviewMode ? "編集に戻る" : "プレビュー"}
                    </Button>
                  </div>
                  <CardDescription>
                    その時の気持ちや状況を詳しく書いてみましょう
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isPreviewMode ? (
                    <div
                      className="prose prose-sm min-h-[200px] max-w-none rounded-lg border bg-gray-50 p-4"
                      dangerouslySetInnerHTML={{
                        __html: watchedValues.body || "<p>内容がありません</p>",
                      }}
                    />
                  ) : (
                    <RichTextEditor
                      ref={editorRef}
                      value={watchedValues.body || ""}
                      onChange={handleBodyChange}
                      placeholder="あなたの体験を自由に書いてみてください..."
                      characterLimit={2000}
                    />
                  )}
                  {errors.body && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.body.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* サイドバー - メタデータ */}
            <div className="space-y-6">
              {/* 出来事の日付 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5" />
                    出来事の日付
                  </CardTitle>
                  <CardDescription>いつ頃の出来事ですか？</CardDescription>
                </CardHeader>
                <CardContent>
                  <DatePicker
                    date={watchedValues.eventDate}
                    onDateChange={(date) =>
                      setValue("eventDate", date, { shouldDirty: true })
                    }
                    placeholder="日付を選択（任意）"
                    disabled={isSubmitting}
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* ライフイベントタグ */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="h-5 w-5" />
                    ライフイベント
                  </CardTitle>
                  <CardDescription>どんな種類の出来事ですか？</CardDescription>
                </CardHeader>
                <CardContent>
                  <LifeEventSelector
                    value={watchedValues.lifeEventTag}
                    onValueChange={(value) =>
                      setValue("lifeEventTag", value, { shouldDirty: true })
                    }
                    placeholder="カテゴリを選択（任意）"
                    disabled={isSubmitting}
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* 公開設定 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">公開設定</CardTitle>
                  <CardDescription>誰と共有しますか？</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      {...register("visibility")}
                      value="PRIVATE"
                      disabled={isSubmitting}
                      className="h-4 w-4"
                    />
                    <span>自分のみ（プライベート）</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      {...register("visibility")}
                      value="FAMILY_ONLY"
                      disabled={isSubmitting}
                      className="h-4 w-4"
                    />
                    <span>家族と共有</span>
                  </Label>
                </CardContent>
              </Card>

              {/* プレビューサマリー */}
              {watchedValues.title ||
              watchedValues.eventDate ||
              watchedValues.lifeEventTag ? (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      エピソードサマリー
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {watchedValues.title && (
                      <div>
                        <span className="font-medium">タイトル:</span>
                        <p className="text-gray-600">{watchedValues.title}</p>
                      </div>
                    )}
                    <div>
                      <span className="font-medium">日付:</span>
                      <p className="text-gray-600">
                        {formatDisplayDate(watchedValues.eventDate)}
                      </p>
                    </div>
                    {watchedValues.lifeEventTag && (
                      <div>
                        <span className="font-medium">カテゴリ:</span>
                        <p className="text-gray-600">
                          {watchedValues.lifeEventTag}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>

          <Separator />

          {/* アクションボタン */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isSubmitting || !isDirty || isImageDeleting}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSubmitting
                  ? "保存中..."
                  : mode === "create"
                    ? "エピソードを作成"
                    : "変更を保存"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
