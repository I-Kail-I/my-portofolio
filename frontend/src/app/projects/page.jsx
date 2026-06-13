"use client"

import React from "react"
import PageWrapper from "@/components/page-wrapper"
import SectionHeader from "@/components/section-header"
import ItemCard from "@/components/item-card"

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <SectionHeader title="PROJECTS" />
      <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <ItemCard
          href="/projects/example"
          date="2024-01-01"
          title="Project Name"
          description="A brief description of the project and what technologies were used."
          tags={["REACT", "NODE.JS"]}
        />
      </div>
    </PageWrapper>
  )
}
