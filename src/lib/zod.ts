import { object, z } from "zod";

export const signUpSchema = object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z.string().email({ message: "メールアドレスの形式が不正です" }),
  password: z.string().min(8, { message: "8文字以上入力する必要があります" }),
  confirmPassword: z
    .string()
    .min(8, { message: "8文字以上入力する必要があります" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

export const credentialsSchema = object({
  email: z.string().email({ message: "メールアドレスの形式が不正です" }),
  password: z.string().min(8, { message: "8文字以上入力する必要があります" }),
});
