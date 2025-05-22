import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

// POST: ライブストリームを開始する
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

    // 既に開始済みの場合はエラー
    if (livestream.status === "live") {
      return NextResponse.json(
        { error: "すでに配信が開始されています" },
        { status: 400 },
      );
    }

    // 終了済みの場合はエラー
    if (livestream.status === "ended") {
      return NextResponse.json(
        { error: "終了した配信を再開することはできません" },
        { status: 400 },
      );
    }

    // キャンセル済みの場合はエラー
    if (livestream.status === "cancelled") {
      return NextResponse.json(
        { error: "キャンセルされた配信を開始することはできません" },
        { status: 400 },
      );
    }

    // ライブストリームを開始状態に更新
    const updatedLivestream = await db.liveStream.update({
      where: {
        id,
      },
      data: {
        status: "live",
        actualStartTime: new Date(),
      },
    });

    return NextResponse.json(updatedLivestream);
  } catch (error) {
    console.error("ライブストリーム開始エラー:", error);
    return NextResponse.json(
      { error: "ライブストリームの開始に失敗しました" },
      { status: 500 },
    );
  }
}
