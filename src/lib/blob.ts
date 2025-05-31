import { put, del } from "@vercel/blob";

/**
 * ストーリー用画像をVercel Blobにアップロード
 */
export async function uploadStoryImage(file: File, storyId: string) {
  const filename = `stories/${storyId}/${Date.now()}-${file.name}`;

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
    throw new Error("画像のアップロードに失敗しました");
  }
}

/**
 * Vercel Blobから画像を削除
 */
export async function deleteStoryImage(url: string) {
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
    throw new Error("エディタ画像のアップロードに失敗しました");
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
