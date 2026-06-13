/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import MarkdownPreview from "@/components/markdown-preview"
import { axiosInstance } from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blogs", {
          params: { pageSize: 100 },
        })
        setBlogs(response?.data?.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-20"
    >
      <div>
        <h1 className="font-mono text-xl font-semibold tracking-tight">
          <span className="text-amber-500 dark:text-amber-400">// </span>
          BLOGS
        </h1>
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />
      </div>

      <div className="mt-10 space-y-6">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-none" />
            ))
          : blogs.map((blog) => (
              <motion.button
                key={blog.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelected(blog)}
                className="bg-background hover:bg-muted-foreground/5 w-full cursor-pointer rounded-none border border-white/10 p-5 text-left outline-none duration-200 hover:border-amber-500/50 dark:border-white/5 dark:hover:border-amber-400/50"
              >
                {blog.coverImage && (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="mb-3 h-40 w-full rounded-none border border-white/10 object-cover"
                  />
                )}
                <time className="text-muted-foreground font-mono text-xs font-medium tracking-widest">
                  &gt; DATE: {blog.createdAt ? new Date(blog.createdAt).toISOString().split("T")[0] : "—"}
                </time>
                <h2 className="font-mono text-base font-medium text-amber-600 dark:text-amber-400">
                  {blog.title}
                </h2>
                {blog.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-none border-amber-500/40 font-mono text-xs text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.button>
            ))}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelected(null)}
          className="bg-background/70 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/10 p-6 shadow-lg"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 rounded-lg border border-white/10 p-1.5 transition-colors hover:border-amber-500/50 hover:text-amber-500"
            >
              <X className="h-4 w-4" />
            </button>

            {selected.coverImage && (
              <img
                src={selected.coverImage}
                alt={selected.title}
                className="mb-4 h-48 w-full rounded-none border border-white/10 object-cover"
              />
            )}

            <div className="mb-4 border-b border-white/10 pb-4">
              <h2 className="font-mono text-xl font-semibold text-amber-500">
                {selected.title}
              </h2>
              <span className="text-muted-foreground mt-1 block font-mono text-xs">
                {selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : ""}
              </span>
              {selected.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selected.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-none border-amber-500/40 font-mono text-[10px] text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <MarkdownPreview content={selected.content} />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
