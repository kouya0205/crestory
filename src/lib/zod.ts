import { object, z } from "zod";

export const signUpSchema = object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z.string().email({ message: "メールアドレスの形式が不正です" }),
  password: z
    .string()
    .min(6, { message: "6文字以上入力してください" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
      message: "半角英数字で入力してください",
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "6文字以上入力してください" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
      message: "半角英数字で入力してください",
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

export const credentialsSchema = object({
  email: z.string().email({ message: "メールアドレスの形式が不正です" }),
  password: z
    .string()
    .min(6, { message: "6文字以上で入力してください" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
      message: "半角英数字で入力してください",
    }),
});
export const livestreamSchema = object({
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
