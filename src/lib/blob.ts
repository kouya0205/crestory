import { put, del } from "@vercel/blob";
import path from "path";
import fs from "fs/promises";
import { env } from "@/env";

/**
 * 開発環境用のローカルファイルアップロード
 */
async function uploadToLocal(file: File, filename: string): Promise<string> {
  try {
    // publicディレクトリ内にuploadsフォルダを作成
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // ファイルを保存
    const filePath = path.join(uploadDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    // 公開URLを返す（開発環境用）
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Failed to upload to local filesystem:", error);
    throw new Error("ローカルファイルアップロードに失敗しました");
  }
}

/**
 * 開発環境用のローカルファイル削除
 */
async function deleteFromLocal(url: string): Promise<void> {
  try {
    if (url.startsWith("/uploads/")) {
      const filename = path.basename(url);
      const filePath = path.join(process.cwd(), "public", "uploads", filename);
      await fs.unlink(filePath);
    }
  } catch (error) {
    console.error("Failed to delete from local filesystem:", error);
    // ローカルファイル削除は失敗してもエラーを投げない
  }
}

/**
 * ストーリー用画像をVercel Blobにアップロード
 */
export async function uploadStoryImage(file: File, storyId: string) {
  const filename = `stories/${storyId}/${Date.now()}-${file.name}`;

  // 開発環境または Vercel Blob が利用できない場合はローカルファイルシステムを使用
  if (
    env.NODE_ENV === "development" ||
    env.BLOB_READ_WRITE_TOKEN === "your_vercel_blob_token"
  ) {
    const localFilename = `${Date.now()}-${file.name}`;
    const url = await uploadToLocal(file, localFilename);

    return {
      url,
      filename: file.name,
      size: file.size,
      mimeType: file.type,
    };
  }

  try {
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return {
      url: blob.url,
      filename: file.name,
      size: file.size,
      mimeType: file.type,
    };
  } catch (error) {
    console.error("Failed to upload image to Vercel Blob:", error);

    // Vercel Blob が失敗した場合、フォールバックとしてローカルアップロードを試す
    try {
      const localFilename = `${Date.now()}-${file.name}`;
      const url = await uploadToLocal(file, localFilename);

      console.warn("Vercel Blob failed, using local filesystem as fallback");

      return {
        url,
        filename: file.name,
        size: file.size,
        mimeType: file.type,
      };
    } catch (fallbackError) {
      console.error("Both Vercel Blob and local upload failed:", fallbackError);
      throw new Error("画像のアップロードに失敗しました");
    }
  }
}

/**
 * Vercel Blobから画像を削除
 */
export async function deleteStoryImage(url: string) {
  // ローカルファイルの場合
  if (url.startsWith("/uploads/")) {
    await deleteFromLocal(url);
    return;
  }

  try {
    await del(url);
  } catch (error) {
    console.error("Failed to delete image from Vercel Blob:", error);
    throw new Error("画像の削除に失敗しました");
  }
}

/**
 * リッチテキストエディタ用の画像アップロード
 */
export async function uploadEditorImage(file: File) {
  const filename = `editor/${Date.now()}-${file.name}`;

  try {
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return blob.url;
  } catch (error) {
    console.error("Failed to upload editor image to Vercel Blob:", error);

    // Vercel Blob が失敗した場合、フォールバックとしてローカルアップロードを試す
    try {
      const localFilename = `editor-${Date.now()}-${file.name}`;
      const url = await uploadToLocal(file, localFilename);

      console.warn(
        "Vercel Blob failed for editor image, using local filesystem as fallback",
      );

      return url;
    } catch (fallbackError) {
      console.error(
        "Both Vercel Blob and local upload failed for editor image:",
        fallbackError,
      );
      throw new Error("エディタ画像のアップロードに失敗しました");
    }
  }
}

/**
 * ファイルサイズとタイプの検証
 */
export function validateImageFile(file: File) {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (file.size > maxSize) {
    throw new Error("ファイルサイズは10MB以下にしてください");
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error("JPEG、PNG、WebP、GIF形式の画像のみアップロード可能です");
  }

  return true;
}
