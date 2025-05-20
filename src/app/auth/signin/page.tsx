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
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { credentialsSchema } from "@/lib/zod";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/form/formInput";

// 入力データの型を定義
type InputType = z.infer<typeof credentialsSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // フォームの状態
  const form = useForm<InputType>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = async () => {
    try {
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
        // エラーの種類に応じて適切なメッセージを表示
        if (result?.error === "CredentialsSignin") {
          form.setError("root", {
            type: "manual",
            message: "メールアドレスまたはパスワードが正しくありません",
          });
        } else {
          throw new Error(result?.error || "ログインに失敗しました");
        }
        return;
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[var(--pick-buy-primary-light)] to-[var(--pick-buy-neutral-200)]">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-[var(--pick-buy-creative-purple)]/50 p-8 shadow-md backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">サインイン</h1>
          <p className="text-sm text-white">Sign in to continue to pick-buy</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {form.formState.errors.root && (
              <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                {form.formState.errors.root.message}
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">メールアドレス</FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="example@example.com"
                      {...field}
                      disabled={isLoading}
                      className="border-[var(--pick-buy-neutral-300)]/50 bg-[var(--pick-buy-neutral-200)]/10 text-white placeholder:text-white/50 hover:border-white focus:border-2 focus:border-white focus-visible:ring-white focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[var(--pick-buy-error)]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">パスワード</FormLabel>
                  <FormControl>
                    <FormInput
                      type="password"
                      {...field}
                      disabled={isLoading}
                      className="border-[var(--pick-buy-neutral-300)]/50 bg-[var(--pick-buy-neutral-200)]/10 text-white placeholder:text-white/50 hover:border-white focus:border-2 focus:border-white focus-visible:ring-white focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[var(--pick-buy-error)]" />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full cursor-pointer bg-[var(--pick-buy-primary-light)] text-[var(--pick-buy-text)] hover:bg-[var(--pick-buy-primary-light-hover)]"
            >
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </Form>

        <div className="mt-5 text-center">
          <Link
            href="/reset-password"
            className="text-sm text-white hover:text-white/80"
          >
            パスワードを忘れた方はこちら
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Separator className="flex-1 bg-white/20" />
          <p className="px-2 text-white/60">or</p>
          <Separator className="flex-1 bg-white/20" />
        </div>

        <Button
          variant="outline"
          className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 size-4" />
          Googleアカウント
        </Button>

        <div className="mt-2 text-center">
          <Link
            href="/auth/register"
            className="text-sm text-white hover:text-white/80"
          >
            アカウントを作成する
          </Link>
        </div>
      </div>
    </div>
  );
}
