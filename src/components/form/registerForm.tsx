"use client";

import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/zod";
import type { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput } from "@/components/form/formInput";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

type InputType = z.infer<typeof signUpSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const register = api.auth.register.useMutation({
    onSuccess: async (data, variables) => {
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.user.email,
        password: variables.password,
      });

      if (signInResult?.error) {
        throw new Error("ログインに失敗しました");
      }

      toast.success("アカウント登録が完了しました！");
      router.push("/app");
      router.refresh();
    },
    onError: (error) => {
      // メールアドレスの重複エラーの場合、フォームのエラーとして設定
      if (error.data?.code === "CONFLICT") {
        form.setError("email", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.error(error.message || "登録中にエラーが発生しました");
      }
    },
  });

  // フォームの状態
  const form = useForm<InputType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);
    try {
      await register.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    } catch (error) {
      // エラーはonErrorで処理される
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: "/app",
      });

      if (result?.error) {
        toast.error("Googleアカウントのログインに失敗しました");
      }
    } catch (error) {
      toast.error("Googleアカウントのログインに失敗しました");
      console.error(error);
    }
  };

  const handleDiscordLogin = async () => {
    try {
      const result = await signIn("discord", {
        callbackUrl: "/app",
      });

      if (result?.error) {
        toast.error("Discordアカウントのログインに失敗しました");
      }
    } catch (error) {
      toast.error("Discordアカウントのログインに失敗しました");
      console.error(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signIn("facebook", {
        callbackUrl: "/app",
      });

      if (result?.error) {
        toast.error("Facebookアカウントのログインに失敗しました");
      }
    } catch (error) {
      toast.error("Facebookアカウントのログインに失敗しました");
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-md rounded-xl bg-[var(--pick-buy-creative-purple)]/50 p-8 shadow-md backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-white">
          アカウント登録
        </CardTitle>
        <CardDescription className="text-sm text-white">
          新しいアカウントを作成する
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {form.formState.errors.root && (
              <div className="mb-2 rounded-md bg-red-500/10 p-2 text-sm text-red-500">
                {form.formState.errors.root.message}
              </div>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">名前</FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="名前"
                      {...field}
                      disabled={isLoading}
                      className="border-[var(--pick-buy-neutral-300)]/50 bg-[var(--pick-buy-neutral-200)]/10 text-white placeholder:text-white/50 hover:border-white focus:border-2 focus:border-white focus-visible:ring-white focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

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
                      className="items-center border-[var(--pick-buy-neutral-300)]/50 bg-[var(--pick-buy-neutral-200)]/10 text-white placeholder:text-white/50 hover:border-white focus:border-2 focus:border-white focus-visible:ring-white focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <div>
                    <FormMessage />
                  </div>
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
                    <div className="relative">
                      <FormInput
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••"
                        {...field}
                        disabled={isLoading}
                        className="items-center border-[var(--pick-buy-neutral-300)]/50 bg-[var(--pick-buy-neutral-200)]/10 text-white placeholder:text-white/50 hover:border-white focus:border-2 focus:border-white focus-visible:ring-white focus-visible:ring-offset-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    パスワード（確認）
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FormInput
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••"
                        {...field}
                        disabled={isLoading}
                        className="items-center border-[var(--pick-buy-neutral-300)]/50 bg-[var(--pick-buy-neutral-200)]/10 text-white placeholder:text-white/50 hover:border-white focus:border-2 focus:border-white focus-visible:ring-white focus-visible:ring-offset-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full cursor-pointer bg-[var(--pick-buy-neutral-200)] text-[var(--pick-buy-text)] hover:bg-[var(--pick-buy-neutral-300)]"
            >
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isLoading ? "登録中..." : "アカウント登録"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="flex items-center justify-center gap-2">
        <Separator className="flex-1 bg-white/20" />
        <p className="px-2 text-white/60">or</p>
        <Separator className="flex-1 bg-white/20" />
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-2">
        <Button
          variant="outline"
          className="flex-1 border-white/20 bg-white/10 text-white hover:bg-white/20"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <FcGoogle className="size-4" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-white/20 bg-white/10 text-white hover:bg-white/20"
          onClick={handleDiscordLogin}
          disabled={isLoading}
        >
          <FaDiscord className="size-4" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-white/20 bg-white/10 text-white hover:bg-white/20"
          onClick={handleFacebookLogin}
          disabled={isLoading}
        >
          <FaFacebook className="size-4" />
        </Button>
      </div>
      <div className="mt-2 text-center">
        <Link
          href="/auth/signin"
          className="text-sm text-white hover:text-white/80"
        >
          既にアカウントをお持ちの方はこちら
        </Link>
      </div>
    </Card>
  );
}
