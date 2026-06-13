/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import MarkdownPreview from "@/components/markdown-preview"
import ExperienceCard from "@/components/experience-card"
import { axiosInstance } from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"
import { X } from "lucide-react"

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axiosInstance.get("/experiences")
        setExperiences(response?.data?.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
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
          EXPERIENCES
        </h1>
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />
      </div>

      <div className="space-y-15 mt-10">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-none" />
            ))
          : experiences.map((data) => (
              <ExperienceCard
                key={data.id}
                period={`${data.startDate} - ${data.endDate}`}
                title={data.title}
                subheading={data.subheading}
                description={data.description}
                className="cursor-pointer"
                onClick={() => setSelected(data)}
              />
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

            <div className="mb-4 border-b border-white/10 pb-4">
              <h2 className="font-mono text-xl font-semibold text-amber-500">
                {selected.title}
              </h2>
              <p className="text-muted-foreground mt-1 font-mono text-sm">
                {selected.subheading}
              </p>
              <span className="text-muted-foreground mt-1 block font-mono text-xs">
                {selected.startDate} — {selected.endDate || "Present"}
              </span>
            </div>

            <MarkdownPreview content={selected.description} />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
