"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { api } from "@/trpc/react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z.string().min(8, { message: "8文字以上入力する必要があります" }),
  confirmPassword: z.string().min(8, { message: "8文字以上入力する必要があります" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

// 入力データの型を定義
type InputType = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // フォームの状態
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);

    try {
      // tRPCを使用して新規登録APIを呼び出す
      const register = api.auth.register.useMutation();
      await register.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // 登録成功後、自動的にログイン
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        throw new Error("ログインに失敗しました");
      }

      toast.success("アカウント登録が完了しました！");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message || "登録中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white/10 p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">アカウント登録</h1>
          <p className="mt-2 text-sm text-gray-300">
            新しいアカウントを作成する
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">名前</FormLabel>
                  <FormControl>
                    <Input placeholder="名前" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">メールアドレス</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">パスワード</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">パスワード（確認）</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              アカウント登録
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/auth/signin"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              既にアカウントをお持ちの方はこちら
            </Link>
          </div>
        </div>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 flex-shrink text-gray-400">または</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <Button
          type="button"
          onClick={() => signIn("discord")}
          className="w-full bg-[#5865F2] hover:bg-[#4a54cc]"
        >
          <svg 
            className="mr-2 size-4"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="currentColor" />
          </svg>
          Discordで登録
        </Button>
      </div>
    </div>
  );
} 