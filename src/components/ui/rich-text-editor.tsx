import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import { Button } from "./button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  ImageIcon,
  Type,
  Unlink,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useState, useCallback } from "react";
import { api } from "../../trpc/react";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  characterLimit?: number;
}

// 画像アップロード処理
function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "アップロードに失敗しました");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { uploadImage, isUploading };
}

// BubbleMenuコンポーネント
const EditorBubbleMenu = ({ editor }: { editor: any }) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const setLink = useCallback(() => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  }, [editor, linkUrl]);

  const unsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowLinkInput(false);
  }, [editor]);

  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex items-center gap-1 rounded-lg border bg-white p-2 shadow-lg"
    >
      {/* リンク入力フォーム */}
      {showLinkInput ? (
        <div className="flex items-center gap-2">
          <input
            type="url"
            placeholder="URLを入力"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setLink();
              }
              if (e.key === "Escape") {
                setShowLinkInput(false);
                setLinkUrl("");
              }
            }}
            className="rounded border px-2 py-1 text-sm"
            autoFocus
          />
          <Button size="sm" onClick={setLink} disabled={!linkUrl}>
            設定
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setShowLinkInput(false);
              setLinkUrl("");
            }}
          >
            キャンセル
          </Button>
        </div>
      ) : (
        <>
          {/* テキストフォーマット */}
          <Button
            size="sm"
            variant={editor.isActive("bold") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={editor.isActive("italic") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Button>

          <div className="mx-1 h-4 w-px bg-gray-300" />

          {/* リンク */}
          {editor.isActive("link") ? (
            <Button size="sm" variant="default" onClick={unsetLink}>
              <LinkIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowLinkInput(true)}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          )}

          {/* 見出し */}
          <Button
            size="sm"
            variant={
              editor.isActive("heading", { level: 2 }) ? "default" : "ghost"
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </BubbleMenu>
  );
};

// メインツールバー
const MenuBar = ({
  editor,
  onImageUpload,
  isUploading,
}: {
  editor: any;
  onImageUpload: () => void;
  isUploading: boolean;
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 rounded-t-lg border-b border-gray-200 bg-gray-50 p-2">
      {/* 見出し */}
      <Button
        type="button"
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        title="大見出し"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
        title="中見出し"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "outline"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
        }
        title="小見出し"
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-6 w-px bg-gray-300" />

      {/* フォーマット */}
      <Button
        type="button"
        variant={editor.isActive("bold") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        title="太字"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("italic") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        title="斜体"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-6 w-px bg-gray-300" />

      {/* リスト */}
      <Button
        type="button"
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="箇条書きリスト"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="番号付きリスト"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-6 w-px bg-gray-300" />

      {/* 引用 */}
      <Button
        type="button"
        variant={editor.isActive("blockquote") ? "default" : "outline"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="引用"
      >
        <Quote className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-6 w-px bg-gray-300" />

      {/* 画像 */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onImageUpload}
        disabled={isUploading}
        title="画像を挿入"
      >
        <ImageIcon className="h-4 w-4" />
        {isUploading && <span className="ml-1 text-xs">アップロード中...</span>}
      </Button>

      <div className="mx-1 h-6 w-px bg-gray-300" />

      {/* 履歴 */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        title="元に戻す"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        title="やり直し"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

// 文字数カウンター
const CharacterCounter = ({
  editor,
  limit,
}: {
  editor: any;
  limit?: number;
}) => {
  if (!editor) return null;

  const characterCount = editor.storage.characterCount || {};
  const characters = characterCount.characters?.() || 0;
  const words = characterCount.words?.() || 0;
  const percentage = limit ? Math.round((100 / limit) * characters) : 0;
  const isNearLimit = limit && percentage > 80;
  const isOverLimit = limit && percentage > 100;

  return (
    <div className="flex items-center gap-4 text-xs text-gray-500">
      <span>{words} 語</span>
      <span
        className={cn(
          isOverLimit && "text-red-500",
          isNearLimit && "text-yellow-500",
        )}
      >
        {characters}
        {limit && ` / ${limit}`} 文字
      </span>
      {limit && (
        <div className="h-2 w-16 rounded-full bg-gray-200">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isOverLimit
                ? "bg-red-500"
                : isNearLimit
                  ? "bg-yellow-500"
                  : "bg-blue-500",
            )}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = "内容を入力してください...",
  className,
  characterLimit,
}: RichTextEditorProps) => {
  const { uploadImage, isUploading } = useImageUpload();

  const handleImageUpload = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file);
          editor?.chain().focus().setImage({ src: imageUrl }).run();
        } catch (error) {
          console.error("画像アップロードエラー:", error);
          // TODO: エラー通知の表示
        }
      }
    };
    input.click();
  }, [uploadImage]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "tiptap-heading",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "tiptap-paragraph",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "tiptap-bullet-list",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "tiptap-ordered-list",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "tiptap-blockquote",
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "tiptap-link text-blue-600 underline hover:text-blue-800",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "tiptap-image max-w-full h-auto rounded-lg my-4",
        },
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
          "min-h-[300px] p-4 max-w-none",
          "prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
          "prose-p:text-gray-700 prose-p:leading-relaxed",
          "prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic",
          "prose-ul:list-disc prose-ol:list-decimal",
          "prose-li:my-1",
          "prose-strong:font-semibold prose-em:italic",
          "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
          "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
        ),
      },
      handleDrop: (view, event, slice, moved) => {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            // 非同期処理を別途実行（同期的にtrueを返す）
            uploadImage(file)
              .then((imageUrl) => {
                const { schema } = view.state;
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });
                if (coordinates && schema.nodes.image) {
                  const node = schema.nodes.image.create({ src: imageUrl });
                  const transaction = view.state.tr.insert(
                    coordinates.pos,
                    node,
                  );
                  view.dispatch(transaction);
                }
              })
              .catch((error) => {
                console.error(
                  "ドラッグ&ドロップ画像アップロードエラー:",
                  error,
                );
              });
            return true;
          }
        }
        return false;
      },
    },
  });

  return (
    <div
      className={cn("rounded-lg border border-gray-200 bg-white", className)}
    >
      <MenuBar
        editor={editor}
        onImageUpload={handleImageUpload}
        isUploading={isUploading}
      />
      <div className="relative">
        <EditorContent
          editor={editor}
          placeholder={placeholder}
          className="min-h-[300px]"
        />
        <EditorBubbleMenu editor={editor} />
      </div>
      <div className="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-gray-50 px-6 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Type className="h-3 w-3" />
          <span>選択してフォーマット、ドラッグで画像追加</span>
          {isUploading && (
            <span className="text-blue-600">画像アップロード中...</span>
          )}
        </div>
        <CharacterCounter editor={editor} limit={characterLimit} />
      </div>
    </div>
  );
};
