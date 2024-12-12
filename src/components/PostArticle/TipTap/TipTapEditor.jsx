import React from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg";

export default function BasicEditor({ setArticleContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setArticleContent(html);
    },
  });

  const buttonStyle = (isActive) =>
    `h-6 w-6 rounded bg-transparent cursor-pointer border-none ${
      isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
    }`;

  return (
    <div className="editor mx-auto mt-5 w-full rounded-md border border-gray-300 bg-white shadow-md">
      <div className="editor__toolbar flex space-x-2 p-2 border-b border-gray-300 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonStyle(editor.isActive("bold"))}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-bold`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonStyle(editor.isActive("italic"))}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-italic`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={buttonStyle(editor.isActive("underline"))}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-underline`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={buttonStyle(editor.isActive("heading", { level: 1 }))}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-h-1`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buttonStyle(editor.isActive("heading", { level: 2 }))}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-h-2`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={buttonStyle(editor.isActive("heading", { level: 3 }))}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-h-3`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonStyle(editor.isActive("bulletList"))}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-list-unordered`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonStyle(editor.isActive("orderedList"))}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-list-ordered`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonStyle(editor.isActive("blockquote"))}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-double-quotes-l`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={buttonStyle(false)}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-separator`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={buttonStyle(editor.can().undo())}
          disabled={!editor.can().undo()}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-arrow-go-back-line`} />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={buttonStyle(editor.can().redo())}
          disabled={!editor.can().redo()}
        >
          <svg className="h-full w-full">
            <use xlinkHref={`${remixiconUrl}#ri-arrow-go-forward-line`} />
          </svg>
        </button>
      </div>

      {editor && (
        <BubbleMenu
          editor={editor}
          className="bg-gray-100 rounded-md shadow-md p-2"
        >
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={buttonStyle(editor.isActive("bold"))}
            >
              <svg className="h-full w-full">
                <use xlinkHref={`${remixiconUrl}#ri-bold`} />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={buttonStyle(editor.isActive("italic"))}
            >
              <svg className="h-full w-full">
                <use xlinkHref={`${remixiconUrl}#ri-italic`} />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={buttonStyle(editor.isActive("underline"))}
            >
              <svg className="h-full w-full">
                <use xlinkHref={`${remixiconUrl}#ri-underline`} />
              </svg>
            </button>
          </div>
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        className="prose prose-lg focus:outline-none min-w-full min-h-[300px] border border-gray-300 p-3 rounded-b-md"
      />
    </div>
  );
}
