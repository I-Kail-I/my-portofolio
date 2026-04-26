/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import React from "react"
import { motion } from "framer-motion"

export default function MainAdminPage() {
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
          ADMIN_PANEL
        </h1>
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />
      </div>

      <div className="mt-10">
        <p className="text-muted-foreground font-mono text-sm">
          &gt; Admin dashboard content will be displayed here.
        </p>
      </div>
    </motion.div>
  )
}
