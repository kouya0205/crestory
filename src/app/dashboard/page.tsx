import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if(!session?.user) {
        redirect("/auth/signin?callbackUrl=/dashboard");
    }

    return (
        <div>
            <h1>ダッシュボード</h1>
            <p>ようこそ、{session.user.name}さん</p>
        </div>
    )
}