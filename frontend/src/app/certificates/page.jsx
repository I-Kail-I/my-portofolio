"use client"

import React from "react"
import { motion } from "motion/react"
import Image from "next/image"

export default function CertificatesPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div>
        <h1 className="font-mono text-xl font-semibold tracking-tight">
          Certificates
        </h1>
      </div>

      <div className="mt-10 space-y-15">
        <div>
          <div className="border-accent-foreground/30 mb-1 w-full border-t" />

          <time className="text-muted-foreground font-mono font-medium">
            Aug 2025 - Jan 2026
          </time>

          <div className="mt-2">
            <h1 className="text-foreground text-lg font-semibold">
              Lorem Ipsum
            </h1>
            <p className="text-muted-foreground font-semibold tracking-wide">
              Lorem ipsum dolor sit amet.
            </p>

            {/* TODO: Change this to Image component when you have the image in public folder */}
            <img
              src="https://albaporto.vercel.app/assets/certif4.png"
              alt="Certificate 1"
              className="mt-4 w-full rounded-lg"
              width={453}
              height={353}
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
