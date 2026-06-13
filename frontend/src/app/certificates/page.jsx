"use client"

import React from "react"
import PageWrapper from "@/components/page-wrapper"
import SectionHeader from "@/components/section-header"
import CertificateCard from "@/components/certificate-card"

export default function CertificatesPage() {
  return (
    <PageWrapper>
      <SectionHeader title="CERTIFICATES" />
      <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

      <div className="mt-10 space-y-10">
        <CertificateCard
          date="2025-08 — 2026-01"
          title="Lorem Ipsum"
          description="Lorem ipsum dolor sit amet."
          imageUrl="https://albaporto.vercel.app/assets/certif4.png"
          imageAlt="Certificate 1"
        />
      </div>
    </PageWrapper>
  )
}
