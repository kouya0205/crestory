import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FiArrowLeft, FiArrowRight, FiCheck, FiSave } from "react-icons/fi";
import { BasicInfoStep } from "@/components/livestream/steps/BasicInfoStep";
import { StreamSettingsStep } from "@/components/livestream/steps/StreamSettingsStep";
import { ProductLinkStep } from "@/components/livestream/steps/ProductLinkStep";
import { NotificationStep } from "@/components/livestream/steps/NotificationStep";
import { ConfirmationStep } from "@/components/livestream/steps/ConfirmationStep";
import type { LiveStream } from "@prisma/client";

// バリデーションスキーマの定義
const livestreamSchema = z.object({
  // 基本情報
  title: z.string().min(5, "タイトルは5文字以上で入力してください"),
  description: z.string().min(10, "説明は10文字以上で入力してください"),
  thumbnailUrl: z.string().optional(),
  scheduledStartTime: z.date(),
  endTime: z.date().optional(),

  // 配信設定
  orientation: z.enum(["vertical", "horizontal"]),
  qualitySetting: z.enum(["auto", "low", "medium", "high"]),
  visibility: z.enum(["public", "unlisted", "private"]),
  commentEnabled: z.boolean(),
  commentModeration: z.boolean(),

  // 商品連携
  productIds: z.array(z.string()),

  // 通知設定
  notifyFollowers: z.boolean(),
  notifyTiming: z.number().min(0),
  tags: z.array(z.string()).optional(),
  shopUrl: z.string().url().optional().or(z.literal("")),
});

type LivestreamFormValues = z.infer<typeof livestreamSchema>;

type LivestreamFormContainerProps = {
  initialData?: Partial<LiveStream>;
  onSubmit: (data: LivestreamFormValues) => Promise<void>;
  isEditing?: boolean;
};

export function LivestreamFormContainer({
  initialData,
  onSubmit,
  isEditing = false,
}: LivestreamFormContainerProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // useFormの初期化
  const methods = useForm<LivestreamFormValues>({
    resolver: zodResolver(livestreamSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      thumbnailUrl: initialData?.thumbnailUrl || "",
      scheduledStartTime: initialData?.scheduledStartTime
        ? new Date(initialData.scheduledStartTime)
        : new Date(),
      endTime: initialData?.endTime ? new Date(initialData.endTime) : undefined,
      orientation:
        (initialData?.orientation as "vertical" | "horizontal") || "vertical",
      qualitySetting:
        (initialData?.qualitySetting as "auto" | "low" | "medium" | "high") ||
        "auto",
      visibility:
        (initialData?.visibility as "public" | "unlisted" | "private") ||
        "public",
      commentEnabled: initialData?.commentEnabled ?? true,
      commentModeration: initialData?.commentModeration ?? false,
      productIds: initialData?.productIds || [],
      notifyFollowers: initialData?.notifyFollowers ?? true,
      notifyTiming: initialData?.notifyTiming ?? 15,
      tags: initialData?.tags || [],
      shopUrl: initialData?.shopUrl || "",
    },
  });

  // フォームの送信処理
  const handleSubmit = async (data: LivestreamFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // ステップの定義
  const steps = [
    { name: "基本情報", component: <BasicInfoStep /> },
    { name: "配信設定", component: <StreamSettingsStep /> },
    { name: "商品連携", component: <ProductLinkStep /> },
    { name: "通知設定", component: <NotificationStep /> },
    { name: "確認", component: <ConfirmationStep /> },
  ];

  // 次のステップへ進む
  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidateForStep(currentStep);

    const result = await methods.trigger(fieldsToValidate as any);
    if (result) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  // 前のステップへ戻る
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // 現在のステップに必要なフィールドのバリデーション対象を取得
  const getFieldsToValidateForStep = (
    step: number,
  ): (keyof LivestreamFormValues)[] => {
    switch (step) {
      case 0: // 基本情報
        return ["title", "description", "scheduledStartTime"];
      case 1: // 配信設定
        return [
          "orientation",
          "qualitySetting",
          "visibility",
          "commentEnabled",
        ];
      case 2: // 商品連携
        return ["productIds"];
      case 3: // 通知設定
        return ["notifyFollowers", "notifyTiming"];
      default:
        return [];
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        {/* ステッパー表示 */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  index <= currentStep ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    index <= currentStep
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-300"
                  } ${index < currentStep ? "bg-indigo-600 text-white" : ""}`}
                >
                  {index < currentStep ? (
                    <FiCheck className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="mt-2 text-xs font-medium">{step.name}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200"></div>
            <div
              className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-indigo-600 transition-all duration-300"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* 現在のステップのコンポーネント */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            {steps[currentStep]?.name}
          </h2>
          <div className="min-h-[400px]">{steps[currentStep]?.component}</div>
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            前へ
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center"
            >
              次へ
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={methods.handleSubmit(handleSubmit)}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              <FiSave className="mr-2 h-4 w-4" />
              {isEditing ? "更新する" : "配信を作成"}
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
