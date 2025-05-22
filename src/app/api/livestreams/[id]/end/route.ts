import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

// POST: ライブストリームを終了する
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "認証されていません" },
        { status: 401 },
      );
    }

    const { id } = params;

    // 対象のライブストリームを取得
    const livestream = await db.liveStream.findUnique({
      where: {
        id,
      },
    });

    if (!livestream) {
      return NextResponse.json(
        { error: "ライブストリームが見つかりません" },
        { status: 404 },
      );
    }

    // 権限チェック（自分のライブストリームかどうか）
    if (livestream.userId !== session.user.id) {
      return NextResponse.json(
        { error: "このライブストリームへのアクセス権がありません" },
        { status: 403 },
      );
    }

    // ライブ中でない場合はエラー
    if (livestream.status !== "live") {
      return NextResponse.json(
        { error: "ライブ配信中でないため終了できません" },
        { status: 400 },
      );
    }

    // ライブストリームを終了状態に更新
    const updatedLivestream = await db.liveStream.update({
      where: {
        id,
      },
      data: {
        status: "ended",
        endTime: new Date(),
      },
    });

    return NextResponse.json(updatedLivestream);
  } catch (error) {
    console.error("ライブストリーム終了エラー:", error);
    return NextResponse.json(
      { error: "ライブストリームの終了に失敗しました" },
      { status: 500 },
    );
  }
}
