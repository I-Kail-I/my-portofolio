"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full flex-col items-center justify-center space-y-6 py-20"
    >
      <div className="text-center">
        <span className="retro-prompt mb-2 block font-mono text-xs text-amber-500/70 dark:text-amber-400/70">
          ~/portfolio $ cat 404.txt
        </span>

        <h1 className="retro-glitch font-mono text-6xl font-bold tracking-widest text-amber-600 dark:text-amber-400">
          404
        </h1>

        <p className="text-muted-foreground mt-4 font-mono text-sm">
          &gt; ERROR: Page not found in filesystem.
        </p>
        <p className="text-muted-foreground mt-1 font-mono text-xs">
          The resource you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <div className="mt-1 h-px w-32 bg-amber-500/20 dark:bg-amber-400/20" />

      <Link
        href="/"
        className="retro-nav-btn blend border border-amber-600/40 px-6 py-2 font-mono text-sm text-gray-700 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-600 dark:border-amber-400/30 dark:text-gray-400 dark:hover:border-amber-400 dark:hover:bg-amber-400/10 dark:hover:text-amber-300"
      >
        &gt; RETURN_HOME
      </Link>
    </motion.div>
  )
}
