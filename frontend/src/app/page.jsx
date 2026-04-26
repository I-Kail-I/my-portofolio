/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-img-element */
"use client"

import { ModeToggle } from "@/components/ui/mode-toggle"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const navigationItems = [
    { label: "Read my blogs", href: "/blogs" },
    { label: "View my projects", href: "/projects" },
    { label: "View my experiences", href: "/experiences" },
    { label: "View my CV", href: "/cv" },
    { label: "View my certificates", href: "/certificates" },
  ]

  const skillItems = [
    { name: "Javascript" },
    { name: "Typescript" },
    { name: "React" },
    { name: "Next.js" },
    { name: "Node.js" },
    { name: "Express" },
    { name: "PostgreSQL" },
    { name: "Mysql" },
    { name: "Tailwindcss" },
    { name: "Laravel" },
    { name: "Drizzle" },
    { name: "Prisma" },
    { name: "NestJS" },
    { name: "Docker" },
    { name: "Git" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-20"
    >
      {/* Bio section */}
      <section>
        {/* Introductions */}
        <div className="flex w-full flex-col py-10">
          <span className="mb-1 font-mono text-xs text-amber-500/70 dark:text-amber-400/70">
            ~/portfolio $
          </span>

          <h2 className="font-mono text-lg font-bold text-gray-500 md:text-3xl dark:text-gray-400">
            Mikail Arianos
            <span
              className="ml-1 inline-block font-mono text-amber-500 dark:text-amber-400"
              style={{ opacity: cursorVisible ? 1 : 0 }}
            >
              _
            </span>
          </h2>

          <h1 className="text-foreground font-mono text-2xl font-semibold tracking-widest md:text-4xl">
            FULLSTACK & DEVOPS ENGINEER
          </h1>

          <p className="mt-1 w-full max-w-sm font-mono text-sm text-amber-600/80 md:text-base dark:text-amber-400/80">
            Specialist in creating scalable web products and robust
            infrastructure systems.
          </p>

          <article className="mt-4 max-w-2xl text-justify font-mono text-sm leading-relaxed text-gray-700 md:text-base dark:text-gray-400">
            Full-stack engineer with specialized expertise in DevOps and data
            management. Experienced in building and maintaining scalable
            applications using modern technologies. I leverage Docker,
            Kubernetes, and CI/CD pipelines to ensure smooth deployment and
            efficient maintenance. Dedicated to bridging the gap between
            software development and actionable operational insights, with a
            strong passion for continuous learning and driving improvement in
            every project I undertake.
          </article>

          {/* Navigation links */}
          <div className="mt-8 flex w-full max-w-2xl shrink-0 flex-wrap justify-center gap-2">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="retro-nav-btn blend truncate border border-amber-600/40 px-4 py-2 font-mono text-xs text-gray-700 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-600 md:text-sm lg:text-base dark:border-amber-400/30 dark:text-gray-400 dark:hover:border-amber-400 dark:hover:bg-amber-400/10 dark:hover:text-amber-300"
              >
                &gt; {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section className="mt-8">
        {/* Retro section header style */}
        <h1 className="font-mono text-xl font-semibold tracking-tight">
          <span className="text-amber-500 dark:text-amber-400">// </span>
          TECH_SKILLS
        </h1>
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

        <div className="mt-4 grid grid-cols-3 gap-2 px-5 font-normal md:grid-cols-5">
          {skillItems.map((skill, index) => (
            <div
              key={index}
              className="retro-skill-card flex cursor-default items-center justify-center gap-2 border border-transparent p-2 font-mono text-sm text-gray-600 transition-all duration-150 hover:border-amber-500/40 hover:bg-amber-500/5 hover:text-amber-700 dark:text-gray-400 dark:hover:border-amber-400/40 dark:hover:bg-amber-400/5 dark:hover:text-amber-300"
            >
              <img
                src={`https://cdn.simpleicons.org/${skill.name.toLowerCase()}`}
                alt={skill.name}
                className="h-4 w-4"
              />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent projects section */}
      <section className="mt-20">
        <div className="flex w-full justify-between">
          <h1 className="font-mono text-xl font-semibold tracking-tight">
            <span className="text-amber-500 dark:text-amber-400">// </span>
            RECENT_PROJECTS
          </h1>
          <Link
            href="/projects"
            className="font-mono text-sm text-amber-600 underline decoration-dotted decoration-2 underline-offset-4 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
          >
            [ see all ]
          </Link>
        </div>
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

        <div className="mt-5">
          <Link href="/projects/example" passHref>
            <Card className="retro-card bg-background hover:bg-muted-foreground/5 rounded-none border border-white/10 outline-none duration-200 hover:border-amber-500/50 dark:border-white/5 dark:hover:border-amber-400/50">
              <CardHeader className="pb-2">
                <time className="text-muted-foreground font-mono text-xs font-medium tracking-widest">
                  &gt; DATE: 2024-01-01
                </time>
              </CardHeader>
              <CardContent>
                <CardTitle>
                  <h1 className="font-mono text-base font-medium text-amber-600 dark:text-amber-400">
                    Project 1 - Quick summary
                  </h1>
                </CardTitle>

                <CardDescription>
                  <p className="text-muted-foreground mt-1 font-mono text-sm">
                    This is a description of the project.
                  </p>
                </CardDescription>

                <div className="mt-2">
                  <Badge
                    className="mx-1 rounded-none border-amber-500/40 font-mono text-xs text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
                    variant="outline"
                  >
                    WEB DEVELOPMENT
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Recent posts section */}
      <section className="mt-20">
        <div className="flex w-full justify-between">
          <h1 className="font-mono text-xl font-semibold tracking-tight">
            <span className="text-amber-500 dark:text-amber-400">// </span>
            RECENT_POSTS
          </h1>
          <Link
            href="/posts"
            className="font-mono text-sm text-amber-600 underline decoration-dotted decoration-2 underline-offset-4 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
          >
            [ see all ]
          </Link>
        </div>
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

        <div className="mt-5">
          <Link href="/posts/example" passHref>
            <Card className="retro-card bg-background hover:bg-muted-foreground/5 rounded-none border border-white/10 outline-none duration-200 hover:border-amber-500/50 dark:border-white/5 dark:hover:border-amber-400/50">
              <CardHeader className="pb-2">
                <time className="text-muted-foreground font-mono text-xs font-medium tracking-widest">
                  &gt; DATE: 2024-01-01
                </time>
              </CardHeader>
              <CardContent>
                <CardTitle>
                  <h1 className="font-mono text-base font-medium text-amber-600 dark:text-amber-400">
                    POST 1 - Quick summary
                  </h1>
                </CardTitle>

                <CardDescription>
                  <p className="text-muted-foreground mt-1 font-mono text-sm">
                    This is a description of the project.
                  </p>
                </CardDescription>

                <div className="mt-2">
                  <Badge
                    className="mx-1 rounded-none border-amber-500/40 font-mono text-xs text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
                    variant="outline"
                  >
                    BACKEND
                  </Badge>
                  <Badge
                    className="mx-1 rounded-none border-amber-500/40 font-mono text-xs text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
                    variant="outline"
                  >
                    Drizzle
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Contact section */}
      <section className="mt-10">
        <h1 className="font-mono text-xl font-semibold tracking-tight">
          <span className="text-amber-500 dark:text-amber-400">// </span>
          LET&apos;S_CONNECT
        </h1>
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

        <p className="text-muted-foreground mt-2 font-mono text-sm">
          &gt; Reach out to me via email or social media.
        </p>

        <div className="mt-4 grid w-full max-w-xs grid-cols-2 gap-y-2 font-mono text-sm text-gray-700 md:text-base dark:text-gray-400">
          <p className="text-amber-600/70 dark:text-amber-400/70">EMAIL</p>
          <a
            href="mailto:arianosmikail5@gmail.com"
            className="hover:text-amber-500 underline decoration-dotted duration-100 dark:hover:text-amber-400"
          >
            arianosmikail5@gmail.com
          </a>

          <p className="text-amber-600/70 dark:text-amber-400/70">GITHUB</p>
          <a
            href="https://github.com/I-Kail-I"
            className="hover:text-amber-500 underline decoration-dotted duration-100 dark:hover:text-amber-400"
          >
            I-Kail-I
          </a>

          <p className="text-amber-600/70 dark:text-amber-400/70">LINKEDIN</p>
          <a
            href="https://www.linkedin.com/in/mikail-arianos-30a268356"
            className="hover:text-amber-500 underline decoration-dotted duration-100 dark:hover:text-amber-400"
          >
            Mikail Arianos
          </a>
        </div>
      </section>
    </motion.div>
  )
}