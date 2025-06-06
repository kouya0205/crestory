export const UPLOAD_CONSTRAINTS = {
  ALLOWED_FILE_TYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ] as const,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

export type AllowedFileType =
  (typeof UPLOAD_CONSTRAINTS.ALLOWED_FILE_TYPES)[number];
