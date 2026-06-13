"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import BackButton from "@/components/back-button"
import FormLabel from "@/components/form-label"
import TagInput from "@/components/tag-input"
import { Button } from "@/components/ui/button"
import MarkdownEditor from "@/components/markdown-editor"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/image-upload"
import { axiosInstance } from "@/lib/axios"

export default function CreateBlogPage() {
  const router = useRouter()
  const [tagInput, setTagInput] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      tags: [],
      content: "",
      coverImage: null,
    },
  })

  const content = watch("content")
  const tags = watch("tags")
  const coverImage = watch("coverImage")

  function addTag() {
    const trimmed = tagInput.trim().toUpperCase()
    if (trimmed && !tags.includes(trimmed)) {
      setValue("tags", [...tags, trimmed])
    }
    setTagInput("")
  }

  function removeTag(tag) {
    setValue("tags", tags.filter((t) => t !== tag))
  }

  async function onSubmit(data) {
    try {
      await axiosInstance.post("/blogs", data)
      router.push("/admin/blogs")
    } catch (error) {
      console.error("Failed to create blog:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BackButton href="/admin/blogs" />
        <div>
          <h1 className="font-mono text-xl font-semibold tracking-tight">
            <span className="text-amber-500 dark:text-amber-400">{"// "}</span>
            CREATE BLOG
          </h1>
          <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-lg border border-white/10 p-6">
        <div className="space-y-2">
          <FormLabel required>TITLE</FormLabel>
          <Input
            placeholder="Blog post title"
            {...register("title", { required: "Title is required" })}
            className="border-white/10 bg-transparent font-mono text-sm"
          />
          {errors.title && (
            <p className="font-mono text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <FormLabel>COVER IMAGE</FormLabel>
          <ImageUpload
            value={coverImage}
            onChange={(url) => setValue("coverImage", url)}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>TAGS</FormLabel>
          <TagInput
            tags={tags}
            tagInput={tagInput}
            setTagInput={setTagInput}
            onAdd={addTag}
            onRemove={removeTag}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>CONTENT (MARKDOWN)</FormLabel>
          <MarkdownEditor
            value={content}
            onChange={(val) => setValue("content", val)}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/admin/blogs")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
          >
            {isSubmitting ? "Saving..." : "Save Blog"}
          </Button>
        </div>
      </form>
    </div>
  )
}
