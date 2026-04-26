/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react"
import { motion } from "framer-motion"

export default function CertificatesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-20"
    >
      {/* Header */}
      <div>
        <h1 className="font-mono text-xl font-semibold tracking-tight">
          <span className="text-amber-500 dark:text-amber-400">// </span>
          CERTIFICATES
        </h1>
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />
      </div>

      <div className="mt-10 space-y-10">
        <div className="retro-card border border-white/10 p-4 transition-all duration-200 hover:border-amber-500/50 dark:border-white/5 dark:hover:border-amber-400/50">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-amber-600/70 dark:text-amber-400/70">&gt;</span>
            <time className="text-muted-foreground font-mono text-sm font-medium tracking-widest">
              DATE: 2025-08 — 2026-01
            </time>
          </div>

          <div>
            <h2 className="font-mono text-lg font-semibold text-amber-600 dark:text-amber-400">
              Lorem Ipsum
            </h2>
            <p className="text-muted-foreground mt-1 font-mono text-sm tracking-wide">
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
    </motion.div>
  )
}
