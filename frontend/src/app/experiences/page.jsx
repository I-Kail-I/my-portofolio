"use client"

import React from "react"
import { motion } from "motion/react"

export default function ExperiencesPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div>
        <h1 className="font-mono text-xl font-semibold tracking-tight">
          Experiences
        </h1>
      </div>

      <div className="space-y-15 mt-10">
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

            <article className="text-foreground/80 mt-1 font-mono text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </article>
          </div>
        </div>

        <div>
          <div className="border-accent-foreground/30 mb-1 w-full border-t" />

          <time className="text-muted-foreground font-mono font-medium">
            Aug 2024 - Dec 2024
          </time>

          <div className="mt-2">
            <h1 className="text-foreground text-lg font-semibold">
              Lorem Ipsum
            </h1>
            <p className="text-muted-foreground font-semibold tracking-wide">
              Lorem ipsum dolor sit amet.
            </p>

            <article className="text-foreground/80 mt-1 font-mono text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </article>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
