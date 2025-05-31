import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/appSidebar";
import { Suspense } from "react";
import DashboardSkelton from "@/components/skelton/dashboard/dashboardSkelton";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen flex-1 flex-col bg-gradient-to-b from-[var(--pick-buy-primary-light)] to-[var(--pick-buy-neutral-200)] p-6">
        <Suspense fallback={<DashboardSkelton />}>
          <div className="flex items-center justify-end">
            <SidebarTrigger />
          </div>
          {children}
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
