import RegisterForm from "@/components/form/registerForm";
import { auth } from "@/server/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "新規登録",
};

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    return redirect("/app");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[var(--pick-buy-primary-light)] to-[var(--pick-buy-neutral-200)]">
      <RegisterForm />
    </div>
  );
}
