"use client"

import { useState, useRef } from "react"
import { axiosInstance } from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { ImagePlus, X, Loader2 } from "lucide-react"
import Image from "next/image"

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)
      const { data } = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      onChange(data.url)
    } catch (error) {
      console.error("Failed to upload image:", error)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  function handleRemove() {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="group relative overflow-hidden rounded-lg border border-white/10">
          <Image
            src={value}
            alt="Cover"
            width={1000}
            height={500}
            className="h-48 w-full object-cover"
          />
          <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={handleRemove}
              className="h-7 w-7"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-white/20 transition-colors hover:border-amber-500/50 hover:bg-white/5"
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
          ) : (
            <div className="text-muted-foreground flex flex-col items-center gap-2">
              <ImagePlus className="h-6 w-6" />
              <span className="font-mono text-xs">
                Click to upload cover image
              </span>
            </div>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}
