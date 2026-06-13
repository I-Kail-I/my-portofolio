"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import PageWrapper from "@/components/page-wrapper"
import SectionHeader from "@/components/section-header"
import ItemCard from "@/components/item-card"

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
    <PageWrapper>
      {/* Bio section */}
      <section>
        <div className="flex w-full flex-col py-10">
          <span className="mb-1 font-mono text-xs text-amber-500/70 dark:text-amber-400/70">
            ~/portfolio $
          </span>

          <h2 className="font-mono text-lg font-bold text-gray-500 dark:text-gray-400 md:text-3xl">
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

          <p className="mt-1 w-full max-w-sm font-mono text-sm text-amber-600/80 dark:text-amber-400/80 md:text-base">
            Specialist in creating scalable web products and robust
            infrastructure systems.
          </p>

          <article className="mt-4 max-w-2xl text-justify font-mono text-sm leading-relaxed text-gray-700 dark:text-gray-400 md:text-base">
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
                className="retro-nav-btn blend truncate border border-amber-600/40 px-4 py-2 font-mono text-xs text-gray-700 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-600 dark:border-amber-400/30 dark:text-gray-400 dark:hover:border-amber-400 dark:hover:bg-amber-400/10 dark:hover:text-amber-300 md:text-sm lg:text-base"
              >
                &gt; {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section className="mt-8">
        <SectionHeader title="TECH_SKILLS" />
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
        <SectionHeader title="RECENT_PROJECTS" href="/projects" />
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

        <div className="mt-5">
          <ItemCard
            href="/projects/example"
            date="2024-01-01"
            title="Project 1 - Quick summary"
            description="This is a description of the project."
            tags={["WEB DEVELOPMENT"]}
          />
        </div>
      </section>

      {/* Recent posts section */}
      <section className="mt-20">
        <SectionHeader title="RECENT_POSTS" href="/posts" />
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

        <div className="mt-5">
          <ItemCard
            href="/posts/example"
            date="2024-01-01"
            title="POST 1 - Quick summary"
            description="This is a description of the project."
            tags={["BACKEND", "Drizzle"]}
          />
        </div>
      </section>

      {/* Contact section */}
      <section className="mt-10">
        <SectionHeader title="LET'S_CONNECT" />
        <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />

        <p className="text-muted-foreground mt-2 font-mono text-sm">
          &gt; Reach out to me via email or social media.
        </p>

        <div className="mt-4 grid w-full max-w-xs grid-cols-2 gap-y-2 font-mono text-sm text-gray-700 dark:text-gray-400 md:text-base">
          <p className="text-amber-600/70 dark:text-amber-400/70">EMAIL</p>
          <a
            href="mailto:arianosmikail5@gmail.com"
            className="underline decoration-dotted duration-100 hover:text-amber-500 dark:hover:text-amber-400"
          >
            arianosmikail5@gmail.com
          </a>

          <p className="text-amber-600/70 dark:text-amber-400/70">GITHUB</p>
          <a
            href="https://github.com/I-Kail-I"
            className="underline decoration-dotted duration-100 hover:text-amber-500 dark:hover:text-amber-400"
          >
            I-Kail-I
          </a>

          <p className="text-amber-600/70 dark:text-amber-400/70">LINKEDIN</p>
          <a
            href="https://www.linkedin.com/in/mikail-arianos-30a268356"
            className="underline decoration-dotted duration-100 hover:text-amber-500 dark:hover:text-amber-400"
          >
            Mikail Arianos
          </a>
        </div>
      </section>
    </PageWrapper>
  )
}
