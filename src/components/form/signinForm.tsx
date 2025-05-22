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
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { credentialsSchema } from "@/lib/zod";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/form/formInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaDiscord } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

type InputType = z.infer<typeof credentialsSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleDiscordLogin = async () => {
    try {
      const result = await signIn("discord", {
        callbackUrl: "/dashboard",
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
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        toast.error("Facebookアカウントのログインに失敗しました");
      }
    } catch (error) {
      toast.error("Facebookアカウントのログインに失敗しました");
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
    <Card className="w-full max-w-md rounded-xl bg-[var(--pick-buy-creative-purple)]/50 p-8 shadow-md backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-white">
          サインイン
        </CardTitle>
        <CardDescription className="text-sm text-white">
          Sign in to continue to pick-buy
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">メールアドレス</FormLabel>
                  <FormControl>
                    <FormInput
                      placeholder="example@example.com"
                      type="email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">パスワード</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FormInput
                        placeholder="･･････"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        disabled={isLoading}
                        className="items-center border-[var(--pick-buy-neutral-300)]/50 bg-[var(--pick-buy-neutral-200)]/10 text-white placeholder:text-white/50 hover:border-white focus:border-2 focus:border-white focus-visible:ring-white focus-visible:ring-offset-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <div className="flex items-center justify-between">
                    <FormMessage />
                    <Link
                      href="/reset-password"
                      className="text-sm text-white hover:text-white/80"
                    >
                      Forgot Password?
                    </Link>
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
              {isLoading ? "loading..." : "Sign in"}
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
          href="/auth/register"
          className="text-sm text-white hover:text-white/80"
        >
          アカウントを作成する
        </Link>
      </div>
    </Card>
  );
}
