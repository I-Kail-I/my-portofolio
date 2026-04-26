/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogsPage() {
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
          BLOGS
        </h1>
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />
      </div>

      <div className="mt-10 space-y-6">
        <Link href="/blogs/example" passHref>
          <Card className="retro-card bg-background hover:bg-muted-foreground/5 rounded-none border border-white/10 outline-none duration-200 hover:border-amber-500/50 dark:border-white/5 dark:hover:border-amber-400/50">
            <CardHeader className="pb-2">
              <time className="text-muted-foreground font-mono text-xs font-medium tracking-widest">
                &gt; DATE: 2024-01-01
              </time>
            </CardHeader>
            <CardContent>
              <CardTitle>
                <h2 className="font-mono text-base font-medium text-amber-600 dark:text-amber-400">
                  Blog Post Title
                </h2>
              </CardTitle>

              <CardDescription>
                <p className="text-muted-foreground mt-1 font-mono text-sm">
                  A brief summary of the blog post content goes here.
                </p>
              </CardDescription>

              <div className="mt-2 flex flex-wrap gap-2">
                <Badge
                  className="mx-1 rounded-none border-amber-500/40 font-mono text-xs text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
                  variant="outline"
                >
                  TECHNOLOGY
                </Badge>
                <Badge
                  className="mx-1 rounded-none border-amber-500/40 font-mono text-xs text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
                  variant="outline"
                >
                  TUTORIAL
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </motion.div>
  )
}