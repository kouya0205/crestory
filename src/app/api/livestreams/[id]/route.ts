import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

// GET: 特定のライブストリームを取得
export async function GET(
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

    const livestream = await db.liveStream.findUnique({
      where: {
        id,
      },
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

    return NextResponse.json(livestream);
  } catch (error) {
    console.error("ライブストリーム取得エラー:", error);
    return NextResponse.json(
      { error: "ライブストリームの取得に失敗しました" },
      { status: 500 },
    );
  }
}

// PUT: ライブストリームを更新
export async function PUT(
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
    const body = await req.json();

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

    // 更新できるステータスを制限（liveやendedになった配信は予約状態に戻せない）
    if (livestream.status !== "scheduled" && body.status === "scheduled") {
      return NextResponse.json(
        {
          error: "すでに開始または終了した配信を予約状態に戻すことはできません",
        },
        { status: 400 },
      );
    }

    // ライブストリームを更新
    const updatedLivestream = await db.liveStream.update({
      where: {
        id,
      },
      data: {
        title: title ?? livestream.title,
        description: description ?? livestream.description,
        thumbnailUrl:
          thumbnailUrl !== undefined ? thumbnailUrl : livestream.thumbnailUrl,
        scheduledStartTime: scheduledStartTime
          ? new Date(scheduledStartTime)
          : livestream.scheduledStartTime,
        endTime: endTime ? new Date(endTime) : livestream.endTime,

        // 追加フィールド
        orientation: orientation ?? livestream.orientation,
        qualitySetting: qualitySetting ?? livestream.qualitySetting,
        visibility: visibility ?? livestream.visibility,
        commentEnabled: commentEnabled ?? livestream.commentEnabled,
        commentModeration: commentModeration ?? livestream.commentModeration,
        notifyFollowers: notifyFollowers ?? livestream.notifyFollowers,
        notifyTiming: notifyTiming ?? livestream.notifyTiming,
        tags: tags ?? livestream.tags,
        shopUrl: shopUrl !== undefined ? shopUrl : livestream.shopUrl,

        // productIdsのみを更新（productsとの関連は別途更新）
        productIds: productIds ?? livestream.productIds,
      },
    });

    // 関連商品との関連付けを更新
    if (productIds) {
      // 既存の関連をすべて削除
      await db.liveStream.update({
        where: { id },
        data: {
          products: {
            set: [], // 関連をクリア
          },
        },
      });

      // 新しい関連を設定
      if (productIds.length > 0) {
        await db.liveStream.update({
          where: { id },
          data: {
            products: {
              connect: productIds.map((prodId: string) => ({ id: prodId })),
            },
          },
        });
      }
    }

    return NextResponse.json(updatedLivestream);
  } catch (error) {
    console.error("ライブストリーム更新エラー:", error);
    return NextResponse.json(
      { error: "ライブストリームの更新に失敗しました" },
      { status: 500 },
    );
  }
}

// DELETE: ライブストリームを削除
export async function DELETE(
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

    // 関連データの削除（必要に応じて）
    // この例では、LiveStreamとProductの多対多関連はcascadeで自動的に削除される

    // ライブストリームを削除
    await db.liveStream.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "ライブストリームを削除しました" });
  } catch (error) {
    console.error("ライブストリーム削除エラー:", error);
    return NextResponse.json(
      { error: "ライブストリームの削除に失敗しました" },
      { status: 500 },
    );
  }
}
