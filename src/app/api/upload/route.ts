import { auth } from "@/server/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { uploadEditorImage } from "@/lib/blob";
import { uploadSchema } from "@/lib/validations/upload";
import { db } from "@/server/db";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const userId = session.user.id;

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "ファイルが選択されていません" },
        { status: 400 },
      );
    }

    // ファイル検証（zodスキーマを使用）
    try {
      uploadSchema.parse({ file });
      console.log("✅ File validation passed");
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const errorMessage =
          validationError.errors[0]?.message || "ファイル検証に失敗しました";
        console.log(`❌ File validation failed: ${errorMessage}`);
        return NextResponse.json({ error: errorMessage }, { status: 400 });
      }
      throw validationError;
    }

    // 画像アップロード
    const imageUrl = await uploadEditorImage(file);

    // データベースにImageレコードを作成
    const imageRecord = await db.image.create({
      data: {
        url: imageUrl,
        filename: file.name,
        fileSize: file.size,
        mimeType: file.type,
        uploaderId: userId,
      },
    });

    return NextResponse.json({
      success: true,
      url: imageUrl,
      filename: file.name,
      size: file.size,
      mimeType: file.type,
      imageId: imageRecord.id, // データベースのImageレコードIDも返す
    });
  } catch (error) {
    console.error("Image upload error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "画像のアップロードに失敗しました";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// 画像メタデータ取得（簡易版）
async function getImageMetadata(buffer: Buffer, mimeType: string) {
  // 本番環境では sharp や jimp などのライブラリを使用
  try {
    // 簡易的な画像サイズ取得
    // TODO: 実際のライブラリを使って正確な情報を取得
    if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
      // JPEG Exif情報から取得
      return await getJpegDimensions(buffer);
    }

    // デフォルト値
    return {
      width: 800,
      height: 600,
    };
  } catch (error) {
    console.error("画像メタデータ取得エラー:", error);
    return {
      width: undefined,
      height: undefined,
    };
  }
}

// JPEG画像の寸法取得（簡易版）
async function getJpegDimensions(buffer: Buffer) {
  // TODO: 実際のライブラリ実装
  // 現在は固定値を返す
  return {
    width: 800,
    height: 600,
  };
}
