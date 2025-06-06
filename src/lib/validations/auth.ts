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
