import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    // ユーザーが認証されていない場合
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "認証されていません" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    // ユーザーのチュートリアルフラグを更新
    await db.user.update({
      where: { id: userId },
      data: { has_seen_tutorial: true },
    });

    return NextResponse.json(
      { success: true, message: "チュートリアルを完了しました" },
      { status: 200 },
    );
  } catch (error) {
    console.error("チュートリアル更新エラー:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}
