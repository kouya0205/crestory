import { auth } from "@/server/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { uploadEditorImage, validateImageFile } from "../../../lib/blob";

// アップロード可能なファイル設定
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// 入力バリデーション
const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "ファイルサイズは10MB以下にしてください",
    )
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      "サポートされていないファイル形式です",
    ),
});

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

    // ファイル検証
    validateImageFile(file);

    // Vercel Blobにアップロード
    const imageUrl = await uploadEditorImage(file);

    return NextResponse.json({
      success: true,
      url: imageUrl,
      filename: file.name,
      size: file.size,
      mimeType: file.type,
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
