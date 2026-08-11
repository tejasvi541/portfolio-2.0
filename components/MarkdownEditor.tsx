"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import "easymde/dist/easymde.min.css"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[500px] bg-dracula-bg text-dracula-foreground border border-border p-4 font-code text-xs resize-none focus:outline-none focus:border-primary"
        placeholder="Write your content in Markdown..."
      />
    )
  }

  return (
    <div className="markdown-editor-wrapper">
      <SimpleMDE
        value={value}
        onChange={onChange}
        options={{
          spellChecker: false,
          placeholder: "Write your content in Markdown...",
          status: ["lines", "words", "cursor"],
          autofocus: true,
          minHeight: "500px",
          toolbar: [
            "bold",
            "italic",
            "heading",
            "|",
            "quote",
            "unordered-list",
            "ordered-list",
            "|",
            "link",
            "image",
            "code",
            "table",
            "|",
            "preview",
            "side-by-side",
            "fullscreen",
            "|",
            "guide",
          ],
        }}
      />
    </div>
  )
}
