import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "新規作成",
  description: "新規自分史を作成します。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
