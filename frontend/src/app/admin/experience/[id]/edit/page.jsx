"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import MarkdownEditor from "@/components/markdown-editor"
import { Input } from "@/components/ui/input"
import { axiosInstance } from "@/lib/axios"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditExperiencePage() {
  const router = useRouter()
  const params = useParams()
  const [loadingData, setLoadingData] = useState(true)

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
      subheading: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  })

  const description = watch("description")

  useEffect(() => {
    async function fetchData() {
      try {
        const id = Number(params.id)
        const { data } = await axiosInstance.get(`/experiences/${id}`)
        const exp = data.data
        reset({
          title: exp.title,
          subheading: exp.subheading,
          startDate: exp.startDate,
          endDate: exp.endDate || "",
          description: exp.description,
        })
      } catch (error) {
        console.error("Failed to fetch experience:", error)
        router.push("/admin/experience")
      } finally {
        setLoadingData(false)
      }
    }
    fetchData()
  }, [params.id, reset, router])

  async function onSubmit(data) {
    try {
      const id = Number(params.id)
      await axiosInstance.put(`/experiences/${id}`, data)
      router.push("/admin/experience")
    } catch (error) {
      console.error("Failed to update experience:", error)
    }
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="font-mono text-sm text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/experience"
          className="rounded-lg border border-white/10 p-1.5 transition-colors hover:border-amber-500/50 hover:text-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-mono text-xl font-semibold tracking-tight">
            <span className="text-amber-500 dark:text-amber-400">// </span>
            EDIT EXPERIENCE
          </h1>
          <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-lg border border-white/10 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="font-mono text-xs font-medium text-amber-600 dark:text-amber-400">
              TITLE *
            </label>
            <Input
              placeholder="Full Stack Developer"
              {...register("title", { required: "Title is required" })}
              className="border-white/10 bg-transparent font-mono text-sm"
            />
            {errors.title && (
              <p className="font-mono text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs font-medium text-amber-600 dark:text-amber-400">
              SUBHEADING *
            </label>
            <Input
              placeholder="Tech Corp"
              {...register("subheading", { required: "Subheading is required" })}
              className="border-white/10 bg-transparent font-mono text-sm"
            />
            {errors.subheading && (
              <p className="font-mono text-xs text-red-500">{errors.subheading.message}</p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="font-mono text-xs font-medium text-amber-600 dark:text-amber-400">
              PERIOD *
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="month"
                placeholder="Start"
                {...register("startDate", { required: "Start date is required" })}
                className="border-white/10 bg-transparent font-mono text-sm"
              />
              <span className="text-muted-foreground font-mono text-xs">—</span>
              <Input
                type="month"
                placeholder="End"
                {...register("endDate")}
                className="border-white/10 bg-transparent font-mono text-sm"
              />
            </div>
            {errors.startDate && (
              <p className="font-mono text-xs text-red-500">{errors.startDate.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs font-medium text-amber-600 dark:text-amber-400">
            DESCRIPTION (MARKDOWN)
          </label>
          <MarkdownEditor
            value={description}
            onChange={(val) => setValue("description", val)}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/admin/experience")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
          >
            {isSubmitting ? "Updating..." : "Update Experience"}
          </Button>
        </div>
      </form>
    </div>
  )
}
