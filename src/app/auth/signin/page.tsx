"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z.string().min(8, { message: "8文字以上入力する必要があります" }),
});

// 入力データの型を定義
type InputType = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // フォームの状態
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = async () => {
    try {
      console.log("Googleアカウントでサインアップ");
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        toast.error("Googleアカウントのログインに失敗しました");
      }
    } catch (error) {
      toast.error("Googleアカウントのログインに失敗しました");
      console.error(error);
    }
  };

  // 資格情報でログイン
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result || result.error) {
        throw new Error(result?.error || "ログインに失敗しました");
      }

      toast.success("ログインしました!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message || "ログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white/10 p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">ログイン</h1>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 size-4" />
          Googleアカウント
        </Button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background text-muted-foreground px-2">OR</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="fullstackchannelinfo@gmail.com"
                      {...field}
                    />
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
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              ログイン
            </Button>
          </form>
        </Form>

        <div className="mt-5 text-center">
          <Link href="/reset-password" className="text-sm text-blue-500">
            パスワードを忘れた方はこちら
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link href="/auth/register" className="text-sm text-blue-500">
            アカウントを作成する
          </Link>
        </div>
      </div>
    </div>
  );
}
