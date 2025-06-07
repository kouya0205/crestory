"use client";

import { cn } from "@/lib/utils";

interface RichTextViewerProps {
  content: string;
  className?: string;
}

export function RichTextViewer({ content, className }: RichTextViewerProps) {
  return (
    <div
      className={cn(
        // ProseMirrorのスタイルを適用
        "ProseMirror",
        // proseクラスも併用して基本的なタイポグラフィを適用
        "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none",
        // カスタムスタイル
        "prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
        "prose-p:text-gray-700 prose-p:leading-relaxed",
        "prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-li:my-1",
        "prose-strong:font-semibold prose-em:italic",
        "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
