import { UPLOAD_CONSTRAINTS } from "@/constants/upload";
import { z } from "zod";

export const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= UPLOAD_CONSTRAINTS.MAX_FILE_SIZE,
      "ファイルサイズは10MB以下にしてください",
    )
    .refine(
      (file) =>
        UPLOAD_CONSTRAINTS.ALLOWED_FILE_TYPES.includes(file.type as any),
      "サポートされていないファイル形式です",
    ),
});

// 型エクスポート
export type UploadInput = z.infer<typeof uploadSchema>;
