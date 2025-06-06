import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";
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
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

// 一時的な画像データの型定義
interface PendingImage {
  id: string;
  file: File;
  tempUrl: string;
  position?: number;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  characterLimit?: number;
  onSave?: (content: string, pendingImages: PendingImage[]) => Promise<string>;
}

// エディターのrefで公開するメソッドの型定義
export interface RichTextEditorRef {
  saveWithImages: (content: string) => Promise<string>;
  editor: any;
}

// 画像アップロード処理（保存時用）
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

// 画像ファイルの検証
function validateImageFile(file: File): boolean {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (file.size > maxSize) {
    throw new Error("ファイルサイズは10MB以下にしてください");
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error("JPEG、PNG、WebP、GIF形式の画像のみ対応しています");
  }

  return true;
}

// 一時的な画像管理フック
function usePendingImages() {
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);

  const addPendingImage = useCallback((file: File): string => {
    validateImageFile(file);

    const id = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tempUrl = URL.createObjectURL(file);

    const pendingImage: PendingImage = {
      id,
      file,
      tempUrl,
    };

    setPendingImages((prev) => [...prev, pendingImage]);
    return tempUrl;
  }, []);

  const removePendingImage = useCallback((tempUrl: string) => {
    setPendingImages((prev) => {
      const image = prev.find((img) => img.tempUrl === tempUrl);
      if (image) {
        URL.revokeObjectURL(image.tempUrl);
      }
      return prev.filter((img) => img.tempUrl !== tempUrl);
    });
  }, []);

  const clearPendingImages = useCallback(() => {
    pendingImages.forEach((img) => URL.revokeObjectURL(img.tempUrl));
    setPendingImages([]);
  }, [pendingImages]);

  return {
    pendingImages,
    addPendingImage,
    removePendingImage,
    clearPendingImages,
  };
}

// 画像専用BubbleMenuコンポーネント
const ImageBubbleMenu = ({
  editor,
  removePendingImage,
}: {
  editor: any;
  removePendingImage: (tempUrl: string) => void;
}) => {
  const [imageWidth, setImageWidth] = useState<string>("");
  const [imageHeight, setImageHeight] = useState<string>("");
  const [showSizeInput, setShowSizeInput] = useState(false);

  // 選択された画像の現在のサイズを取得
  const getSelectedImageSize = useCallback(() => {
    if (!editor) return { width: "", height: "" };

    const { selection } = editor.state;

    // NodeSelectionの場合のみ処理
    if (selection instanceof NodeSelection) {
      const node = selection.node;
      if (node && node.type.name === "image") {
        const attrs = node.attrs;
        return {
          width: attrs.width || "",
          height: attrs.height || "",
        };
      }
    }
    return { width: "", height: "" };
  }, [editor]);

  // 選択された画像のURLを取得
  const getSelectedImageUrl = useCallback(() => {
    if (!editor) return "";

    const { selection } = editor.state;

    if (selection instanceof NodeSelection) {
      const node = selection.node;
      if (node && node.type.name === "image") {
        return node.attrs.src || "";
      }
    }
    return "";
  }, [editor]);

  // 画像サイズを更新
  const updateImageSize = useCallback(
    (width?: string, height?: string) => {
      if (!editor) return;

      const { selection } = editor.state;
      if (
        !(selection instanceof NodeSelection) ||
        selection.node.type.name !== "image"
      ) {
        return;
      }

      const attrs: any = { ...selection.node.attrs };

      // 数値のみの場合はpxを追加
      if (width && width.trim() !== "") {
        attrs.width = width.includes("px") ? width : `${width}px`;
      }
      if (height && height.trim() !== "") {
        attrs.height = height.includes("px") ? height : `${height}px`;
      }

      // 一方の値だけが指定された場合、もう一方を削除
      if (width && !height) {
        delete attrs.height;
      }
      if (height && !width) {
        delete attrs.width;
      }

      editor.chain().focus().updateAttributes("image", attrs).run();
      setShowSizeInput(false);
      setImageWidth("");
      setImageHeight("");
    },
    [editor],
  );

  // 画像を削除
  const deleteImage = useCallback(() => {
    if (!editor) return;

    // 削除する画像のURLを取得
    const imageUrl = getSelectedImageUrl();

    // エディターから画像を削除
    editor.chain().focus().deleteSelection().run();

    // 一時画像（Blob URL）の場合、pendingImagesからも削除
    if (imageUrl && imageUrl.startsWith("blob:")) {
      removePendingImage(imageUrl);
    }
  }, [editor, getSelectedImageUrl, removePendingImage]);

  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex items-center gap-1 rounded-lg border bg-white p-2 shadow-lg"
      shouldShow={({ state, from, to }) => {
        const { selection } = state;
        // NodeSelectionかつ画像ノードの場合に表示
        if (selection instanceof NodeSelection) {
          return selection.node.type.name === "image";
        }
        return false;
      }}
    >
      {showSizeInput ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">幅:</span>
            <input
              type="number"
              placeholder="幅"
              value={imageWidth.replace("px", "")}
              onChange={(e) => setImageWidth(e.target.value)}
              className="w-16 rounded border px-1 py-1 text-xs"
              min="1"
            />
            <span className="text-xs text-gray-500">px</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">高:</span>
            <input
              type="number"
              placeholder="高さ"
              value={imageHeight.replace("px", "")}
              onChange={(e) => setImageHeight(e.target.value)}
              className="w-16 rounded border px-1 py-1 text-xs"
              min="1"
            />
            <span className="text-xs text-gray-500">px</span>
          </div>
          <Button
            size="sm"
            onClick={() => updateImageSize(imageWidth, imageHeight)}
            disabled={!imageWidth && !imageHeight}
          >
            適用
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setShowSizeInput(false);
              setImageWidth("");
              setImageHeight("");
            }}
          >
            キャンセル
          </Button>
        </div>
      ) : (
        <>
          {/* サイズ編集ボタン */}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              const currentSize = getSelectedImageSize();
              setImageWidth(currentSize.width.replace("px", ""));
              setImageHeight(currentSize.height.replace("px", ""));
              setShowSizeInput(true);
            }}
            title="サイズを編集"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          <div className="mx-1 h-4 w-px bg-gray-300" />

          {/* 画像削除ボタン */}
          <Button
            size="sm"
            variant="ghost"
            onClick={deleteImage}
            title="画像を削除"
            className="text-red-600 hover:bg-red-50"
          >
            <span className="text-xs">削除</span>
          </Button>
        </>
      )}
    </BubbleMenu>
  );
};

// テキスト用BubbleMenuコンポーネント（既存のものを分離）
const TextBubbleMenu = ({ editor }: { editor: any }) => {
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
      shouldShow={({ state, from, to }) => {
        const { selection } = state;
        // テキストが選択されている、かつNodeSelectionではない場合に表示
        return !selection.empty && !(selection instanceof NodeSelection);
      }}
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

// カスタムリサイズ可能なImage拡張
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute("height"),
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return { height: attributes.height };
        },
      },
    };
  },

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const container = document.createElement("div");
      container.style.cssText = `
        position: relative;
        display: inline-block;
        max-width: 100%;
      `;

      const img = document.createElement("img");
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        img.setAttribute(key, value);
      });

      // 基本スタイルを適用
      img.style.cssText = `
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        display: block;
      `;

      // 属性からサイズを適用
      if (node.attrs.width) {
        img.style.width = node.attrs.width.includes("px")
          ? node.attrs.width
          : `${node.attrs.width}px`;
      }
      if (node.attrs.height) {
        img.style.height = node.attrs.height.includes("px")
          ? node.attrs.height
          : `${node.attrs.height}px`;
      }

      // リサイズハンドルを作成
      const resizeHandle = document.createElement("div");
      resizeHandle.style.cssText = `
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        background: #3b82f6;
        border: 2px solid white;
        border-radius: 50%;
        cursor: se-resize;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 10;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      `;

      // ホバー時の表示制御
      container.addEventListener("mouseenter", () => {
        resizeHandle.style.opacity = "1";
      });

      container.addEventListener("mouseleave", () => {
        resizeHandle.style.opacity = "0";
      });

      // リサイズ機能
      let isResizing = false;
      let startX = 0;
      let startWidth = 0;

      resizeHandle.addEventListener("mousedown", (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = img.getBoundingClientRect().width;

        e.preventDefault();
        e.stopPropagation();

        const handleMouseMove = (e: MouseEvent) => {
          if (!isResizing) return;

          const deltaX = e.clientX - startX;
          const newWidth = Math.max(50, Math.min(800, startWidth + deltaX));

          img.style.width = `${newWidth}px`;
          img.style.height = "auto";
        };

        const handleMouseUp = () => {
          if (!isResizing) return;
          isResizing = false;

          const rect = img.getBoundingClientRect();
          const newWidth = Math.round(rect.width);

          // エディターの属性を更新
          if (typeof getPos === "function") {
            const pos = getPos();
            editor.view.dispatch(
              editor.view.state.tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                width: `${newWidth}px`,
                height: null, // heightは自動調整
              }),
            );
          }

          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      });

      container.appendChild(img);
      container.appendChild(resizeHandle);

      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type !== node.type) return false;

          // 属性が更新された場合、要素を更新
          if (updatedNode.attrs.width) {
            img.style.width = updatedNode.attrs.width.includes("px")
              ? updatedNode.attrs.width
              : `${updatedNode.attrs.width}px`;
          } else {
            img.style.width = "";
          }

          if (updatedNode.attrs.height) {
            img.style.height = updatedNode.attrs.height.includes("px")
              ? updatedNode.attrs.height
              : `${updatedNode.attrs.height}px`;
          } else {
            img.style.height = "auto";
          }

          return true;
        },
      };
    };
  },
});

// メインツールバー
const MenuBar = ({
  editor,
  onImageUpload,
  isProcessing,
}: {
  editor: any;
  onImageUpload: () => void;
  isProcessing: boolean;
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
        disabled={isProcessing}
        title="画像を挿入"
      >
        <ImageIcon className="h-4 w-4" />
        {isProcessing && <span className="ml-1 text-xs">処理中...</span>}
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

export const RichTextEditor = forwardRef<
  RichTextEditorRef,
  RichTextEditorProps
>(
  (
    {
      value,
      onChange,
      placeholder = "内容を入力してください...",
      className,
      characterLimit,
      onSave,
    },
    ref,
  ) => {
    const { uploadImage, isUploading } = useImageUpload();
    const {
      pendingImages,
      addPendingImage,
      removePendingImage,
      clearPendingImages,
    } = usePendingImages();
    const [isProcessing, setIsProcessing] = useState(false);

    // 保存時に一時画像をアップロードしてURLを置換する関数
    const uploadPendingImagesAndUpdateContent = useCallback(
      async (content: string): Promise<string> => {
        if (pendingImages.length === 0) return content;

        let updatedContent = content;

        for (const pendingImage of pendingImages) {
          try {
            const uploadedUrl = await uploadImage(pendingImage.file);
            updatedContent = updatedContent.replace(
              pendingImage.tempUrl,
              uploadedUrl,
            );
          } catch (error) {
            console.error(
              `画像アップロードエラー (${pendingImage.file.name}):`,
              error,
            );
            throw error;
          }
        }

        clearPendingImages();
        return updatedContent;
      },
      [pendingImages, uploadImage, clearPendingImages],
    );

    // エディター内容から一時画像をクリーンアップする関数
    const cleanupPendingImages = useCallback(
      (editorContent: string) => {
        if (pendingImages.length === 0) return;

        // 現在のエディター内容に存在しない一時画像をpendingImagesから削除
        pendingImages.forEach((pendingImage) => {
          if (!editorContent.includes(pendingImage.tempUrl)) {
            removePendingImage(pendingImage.tempUrl);
          }
        });
      },
      [pendingImages, removePendingImage],
    );

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
        ResizableImage.configure({
          HTMLAttributes: {
            class: "tiptap-image max-w-full h-auto rounded-lg",
          },
        }),
        CharacterCount.configure({
          limit: characterLimit,
        }),
      ],
      content: value,
      onUpdate: ({ editor }) => {
        const content = editor.getHTML();
        onChange(content);
        // エディター内容変更時に一時画像をクリーンアップ
        cleanupPendingImages(content);
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
              try {
                setIsProcessing(true);
                const tempUrl = addPendingImage(file);
                const { schema } = view.state;
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });
                if (coordinates && schema.nodes.image) {
                  const node = schema.nodes.image.create({ src: tempUrl });
                  const transaction = view.state.tr.insert(
                    coordinates.pos,
                    node,
                  );
                  view.dispatch(transaction);
                }
              } catch (error) {
                console.error("ドラッグ&ドロップ画像処理エラー:", error);
              } finally {
                setIsProcessing(false);
              }
              return true;
            }
          }
          return false;
        },
      },
    });

    // editorが定義された後にhandleImageUploadを定義
    const handleImageUpload = useCallback(async () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          try {
            setIsProcessing(true);
            const tempUrl = addPendingImage(file);
            editor?.chain().focus().setImage({ src: tempUrl }).run();
          } catch (error) {
            console.error("画像処理エラー:", error);
            // TODO: エラー通知の表示
          } finally {
            setIsProcessing(false);
          }
        }
      };
      input.click();
    }, [addPendingImage, editor]);

    // refで外部に公開するメソッドを定義
    useImperativeHandle(
      ref,
      () => ({
        saveWithImages: uploadPendingImagesAndUpdateContent,
        editor,
      }),
      [uploadPendingImagesAndUpdateContent, editor],
    );

    return (
      <div
        className={cn("rounded-lg border border-gray-200 bg-white", className)}
      >
        {/* 画像選択とリサイズハンドルのスタイル */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .ProseMirror .ProseMirror-selectednode {
              outline: 2px solid #3b82f6;
              outline-offset: 2px;
              border-radius: 0.5rem;
            }
          `,
          }}
        />
        <MenuBar
          editor={editor}
          onImageUpload={handleImageUpload}
          isProcessing={isProcessing || isUploading}
        />
        <div className="relative">
          <EditorContent
            editor={editor}
            placeholder={placeholder}
            className="min-h-[300px]"
          />
          <TextBubbleMenu editor={editor} />
          <ImageBubbleMenu
            editor={editor}
            removePendingImage={removePendingImage}
          />
        </div>
        <div className="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-gray-50 px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Type className="h-3 w-3" />
            <span>選択してフォーマット、ドラッグで画像追加</span>
            {(isProcessing || isUploading) && (
              <span className="text-blue-600">
                {isUploading ? "画像アップロード中..." : "画像処理中..."}
              </span>
            )}
            {pendingImages.length > 0 && (
              <span className="text-orange-600">
                {pendingImages.length}個の画像が保存待ち
              </span>
            )}
          </div>
          <CharacterCounter editor={editor} limit={characterLimit} />
        </div>
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";
