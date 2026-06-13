"use client"

import { useState, useCallback, useRef } from "react"
import { axiosInstance } from "@/lib/axios"
import {
  Bold,
  Italic,
  Heading,
  List,
  ListOrdered,
  Code,
  Link,
  Image,
  Eye,
  Edit3,
  Loader2,
} from "lucide-react"
import { usePathname } from "next/navigation"
import MarkdownPreview from "@/components/markdown-preview"

const toolbarItems = [
  {
    icon: Bold,
    label: "Bold",
    action: "**$SELECTION**",
  },
  {
    icon: Italic,
    label: "Italic",
    action: "*$SELECTION*",
  },
  {
    icon: Heading,
    label: "Heading",
    action: "## $SELECTION",
  },
  {
    icon: List,
    label: "Unordered List",
    action: "- $SELECTION",
  },
  {
    icon: ListOrdered,
    label: "Ordered List",
    action: "1. $SELECTION",
  },
  {
    icon: Code,
    label: "Code",
    action: "```\n$SELECTION\n```",
  },
  {
    icon: Link,
    label: "Link",
    action: "[$SELECTION](url)",
  },
  {
    icon: Image,
    label: "Insert Image",
    action: "__IMAGE__",
  },
]

function applyAction(textarea, action) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selected = textarea.value.substring(start, end) || "text"
  const wrapped = action.replace("$SELECTION", selected)
  return {
    text:
      textarea.value.substring(0, start) +
      wrapped +
      textarea.value.substring(end),
    cursor: start,
  }
}

export default function MarkdownEditor({ value = "", onChange }) {
  const pathname = usePathname()
  const [mode, setMode] = useState("edit")
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef(null)
  const textareaRef = useCallback((node) => {
    if (node) {
      // store ref
    }
  }, [])

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("image", file)
      const { data } = await axiosInstance.post("/upload", formData)
      const imageMarkdown = `![image](${data.url})`
      const textarea = document.querySelector(".markdown-textarea")
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newValue =
          value.substring(0, start) + imageMarkdown + value.substring(end)
        onChange(newValue)
        setTimeout(() => {
          textarea.focus()
          textarea.selectionStart = start + imageMarkdown.length
          textarea.selectionEnd = start + imageMarkdown.length
        }, 0)
      } else {
        onChange(value + "\n" + imageMarkdown)
      }
    } catch (error) {
      console.error("Failed to upload image:", error)
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  function handleToolbar(action) {
    if (action === "__IMAGE__") {
      fileInputRef.current?.click()
      return
    }

    const textarea =
      document.activeElement?.tagName === "TEXTAREA"
        ? document.activeElement
        : document.querySelector(".markdown-textarea")

    if (!textarea) {
      onChange(value + "\n" + action.replace("$SELECTION", "text"))
      return
    }

    const result = applyAction(textarea, action)
    onChange(result.text)

    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = result.cursor
      textarea.selectionEnd =
        result.cursor + (action.includes("$SELECTION") ? 0 : 0)
    }, 0)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border-b border-white/10 bg-white/5 px-2 py-1.5">
        {toolbarItems.map((item) => {
          if (
            item.label === "Insert Image" &&
            pathname.startsWith("/admin/experience")
          ) {
            return null
          }
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handleToolbar(item.action)}
              className="text-muted-foreground rounded-md p-1.5 transition-colors hover:bg-white/10 hover:text-amber-500"
              title={item.label}
            >
              <item.icon className="h-4 w-4" />
            </button>
          )
        })}
        {uploadingImage && (
          <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
        )}
        <div className="ml-auto flex items-center gap-0.5 rounded-md border border-white/10 p-0.5">
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={`rounded-md p-1 transition-colors ${
              mode === "edit"
                ? "bg-amber-500/10 text-amber-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Edit"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`rounded-md p-1 transition-colors ${
              mode === "preview"
                ? "bg-amber-500/10 text-amber-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Preview"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {mode === "preview" ? (
        <div className="markdown-preview min-h-50 overflow-y-auto p-4">
          <MarkdownPreview content={value} />
        </div>
      ) : (
        <textarea
          className="markdown-textarea min-h-50 text-foreground placeholder:text-muted-foreground w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed outline-none"
          placeholder="Write your markdown here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  )
}
