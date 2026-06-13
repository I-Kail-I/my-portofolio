"use client"

import React, { useEffect, useState } from "react"
import PageWrapper from "@/components/page-wrapper"
import SectionHeader from "@/components/section-header"
import ContentModal from "@/components/content-modal"
import MarkdownPreview from "@/components/markdown-preview"
import ExperienceCard from "@/components/experience-card"
import { axiosInstance } from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"

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
    <PageWrapper>
      <SectionHeader title="EXPERIENCES" />
      <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

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

      <ContentModal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
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
          </>
        )}
      </ContentModal>
    </PageWrapper>
  )
}
