"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import BackButton from "@/components/back-button"
import FormLabel from "@/components/form-label"
import TagInput from "@/components/tag-input"
import { Button } from "@/components/ui/button"
import MarkdownEditor from "@/components/markdown-editor"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/image-upload"
import { axiosInstance } from "@/lib/axios"

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const [loadingData, setLoadingData] = useState(true)
  const [tagInput, setTagInput] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  useEffect(() => {
    async function fetchData() {
      try {
        const id = Number(params.id)
        const { data } = await axiosInstance.get(`/blogs/${id}`)
        const blog = data.data
        reset({
          title: blog.title,
          tags: blog.tags || [],
          content: blog.content,
          coverImage: blog.coverImage || null,
        })
      } catch (error) {
        console.error("Failed to fetch blog:", error)
        router.push("/admin/blogs")
      } finally {
        setLoadingData(false)
      }
    }
    fetchData()
  }, [params.id, reset, router])

  async function onSubmit(data) {
    try {
      const id = Number(params.id)
      await axiosInstance.put(`/blogs/${id}`, data)
      router.push("/admin/blogs")
    } catch (error) {
      console.error("Failed to update blog:", error)
    }
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground font-mono text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BackButton href="/admin/blogs" />
        <div>
          <h1 className="font-mono text-xl font-semibold tracking-tight">
            <span className="text-amber-500 dark:text-amber-400">{"// "}</span>
            EDIT BLOG
          </h1>
          <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg border border-white/10 p-6"
      >
        <div className="space-y-2">
          <FormLabel required>TITLE</FormLabel>
          <Input
            placeholder="Blog post title"
            {...register("title", { required: "Title is required" })}
            className="border-white/10 bg-transparent font-mono text-sm"
          />
          {errors.title && (
            <p className="font-mono text-xs text-red-500">
              {errors.title.message}
            </p>
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
            onChange={(val) => {
              setValue("content", val)
            }}
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
            {isSubmitting ? "Updating..." : "Update Blog"}
          </Button>
        </div>
      </form>
    </div>
  )
}
