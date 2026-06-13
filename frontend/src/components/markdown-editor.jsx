"use client"

import { useState, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import {
  Bold,
  Italic,
  Heading,
  List,
  ListOrdered,
  Code,
  Link,
  Eye,
  Edit3,
} from "lucide-react"

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
]

function wrapSelection(textarea, before, after) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selected = textarea.value.substring(start, end) || "text"
  return {
    text: before + selected + after,
    cursor: start + before.length,
  }
}

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
  const [mode, setMode] = useState("edit")
  const textareaRef = useCallback((node) => {
    if (node) {
      // store ref
    }
  }, [])

  function handleToolbar(action) {
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
        {toolbarItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleToolbar(item.action)}
            className="text-muted-foreground rounded-md p-1.5 transition-colors hover:bg-white/10 hover:text-amber-500"
            title={item.label}
          >
            <item.icon className="h-4 w-4" />
          </button>
        ))}
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
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="mb-2 mt-4 font-mono text-lg font-semibold text-amber-500 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-2 mt-4 font-mono text-base font-semibold text-amber-500 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-2 mt-3 font-mono text-sm font-semibold text-amber-500 first:mt-0">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-3 font-mono text-sm leading-relaxed last:mb-0">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-amber-500">
                  {children}
                </strong>
              ),
              code: ({ children, className }) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code className="rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-sm text-amber-500">
                      {children}
                    </code>
                  )
                }
                return <code className="block">{children}</code>
              },
              pre: ({ children }) => (
                <pre className="mb-3 overflow-x-auto rounded-lg border border-white/10 bg-black/20 p-3 font-mono text-sm last:mb-0">
                  {children}
                </pre>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 list-disc space-y-1 pl-5 font-mono text-sm last:mb-0">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 list-decimal space-y-1 pl-5 font-mono text-sm last:mb-0">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li>{children}</li>,
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-amber-500 underline underline-offset-2 hover:text-amber-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="text-muted-foreground mb-3 border-l-2 border-amber-500/50 pl-4 last:mb-0">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="my-4 border-amber-500/20" />,
            }}
          >
            {value || "*No content yet*"}
          </ReactMarkdown>
        </div>
      ) : (
        <textarea
          className="markdown-textarea min-h-50 text-foreground placeholder:text-muted-foreground w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed outline-none"
          placeholder="Write your markdown here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}
