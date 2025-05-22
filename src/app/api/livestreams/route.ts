import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

// GET: ライブストリーム一覧を取得
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "認証されていません" },
        { status: 401 },
      );
    }

    // クエリパラメータから検索条件を取得
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    // 検索条件に基づいてクエリを構築
    const where: any = {
      userId: session.user.id,
    };

    if (status) {
      where.status = status;
    }

    const livestreams = await db.liveStream.findMany({
      where,
      orderBy: [
        {
          status: "asc", // scheduled, live, ended, cancelled の順
        },
        {
          scheduledStartTime: "desc", // 日時が新しい順
        },
      ],
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
          },
        },
      },
    });

    return NextResponse.json(livestreams);
  } catch (error) {
    console.error("ライブストリーム取得エラー:", error);
    return NextResponse.json(
      { error: "ライブストリームの取得に失敗しました" },
      { status: 500 },
    );
  }
}

// POST: 新規ライブストリームを作成
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "認証されていません" },
        { status: 401 },
      );
    }

    const body = await req.json();
    console.log("受信したデータ:", body);

    // 必須フィールドの検証
    if (!body.title || !body.description || !body.scheduledStartTime) {
      return NextResponse.json(
        { error: "タイトル、説明、配信予定日時は必須です" },
        { status: 400 },
      );
    }

    // データの整形
    const {
      title,
      description,
      thumbnailUrl,
      scheduledStartTime,
      endTime,
      orientation,
      qualitySetting,
      visibility,
      commentEnabled,
      commentModeration,
      productIds,
      notifyFollowers,
      notifyTiming,
      tags,
      shopUrl,
    } = body;

    // 空文字列をnullに変換する関数
    const emptyToNull = (val: string | null | undefined) =>
      val === "" ? null : val || null;

    // 配列を適切に処理する関数
    const processArray = (arr: any[] | null | undefined) =>
      Array.isArray(arr) ? arr : [];

    // 新規ライブストリームのデータを準備
    const livestreamData = {
      title,
      description,
      thumbnailUrl: emptyToNull(thumbnailUrl),
      scheduledStartTime: new Date(scheduledStartTime),
      endTime: endTime ? new Date(endTime) : null,

      // 追加フィールド
      orientation: orientation || "vertical",
      qualitySetting: qualitySetting || "auto",
      visibility: visibility || "public",
      commentEnabled: commentEnabled ?? true,
      commentModeration: commentModeration ?? false,
      notifyFollowers: notifyFollowers ?? true,
      notifyTiming: notifyTiming ?? 15,
      tags: processArray(tags),
      shopUrl: emptyToNull(shopUrl),

      // 関連情報
      userId: session.user.id,
      productIds: processArray(productIds),

      // 初期ステータス
      status: "scheduled",
    };

    console.log("Prismaに送信するデータ:", livestreamData);

    // 新規ライブストリームを作成
    const newLivestream = await db.liveStream.create({
      data: livestreamData,
    });

    // 関連商品との関連付け
    if (livestreamData.productIds.length > 0) {
      try {
        await db.liveStream.update({
          where: { id: newLivestream.id },
          data: {
            products: {
              connect: livestreamData.productIds.map((id: string) => ({ id })),
            },
          },
        });
      } catch (connectError) {
        console.error("商品関連付けエラー:", connectError);
        // 関連付けに失敗しても、ライブストリーム自体は作成済みなのでエラーとはしない
      }
    }

    return NextResponse.json(newLivestream, { status: 201 });
  } catch (error) {
    console.error("ライブストリーム作成エラー:", error);
    return NextResponse.json(
      { error: "ライブストリームの作成に失敗しました", details: String(error) },
      { status: 500 },
    );
  }
}
