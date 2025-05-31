import SignInForm from "@/components/form/signinForm";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    return redirect("/app");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[var(--pick-buy-primary-light)] to-[var(--pick-buy-neutral-200)]">
      <SignInForm />
    </div>
  );
}
