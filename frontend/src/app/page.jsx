/* eslint-disable @next/next/no-img-element */
"use client"

import { ModeToggle } from "@/components/ui/mode-toggle"
import React from "react"
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
          <h2 className="text-lg font-bold text-gray-500 md:text-3xl dark:text-gray-400">
            Mikail Arianos
          </h2>
          <h1 className="text-foreground text-2xl font-semibold md:text-4xl">
            FULLSTACK & DEVOPS ENGINEER
          </h1>
          <p className="w-full max-w-sm font-serif text-base text-gray-500 md:text-lg">
            Specialist in creating scalable web products and robust
            infrastructure systems.
          </p>

          <article className="mt-4 max-w-2xl text-justify text-lg text-gray-700 dark:text-gray-400">
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
                className="blend truncate rounded border border-black/25 px-4 py-2 font-serif text-xs text-gray-700 hover:bg-black/5 md:text-sm lg:text-base dark:border-white/25 dark:text-gray-400 hover:dark:bg-white/15"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section className="mt-8">
        <h1 className="font-mono text-xl font-semibold tracking-tight">
          Tech skills
        </h1>
        <div className="mt-4 grid grid-cols-3 gap-2 px-5 font-normal md:grid-cols-5">
          {skillItems.map((skill, index) => (
            <div
              key={index}
              className="flex cursor-default items-center justify-center gap-2 rounded p-2 text-sm text-gray-600 outline transition-all duration-150 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
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
            Recent projects
          </h1>
          <Link
            href="/projects"
            className="text-foreground underline decoration-dotted decoration-2 underline-offset-4"
          >
            See all
          </Link>
        </div>

        <div className="mt-5">
          <Link href="/projects/example" passHref>
            <Card className="bg-background hover:bg-muted-foreground/20 rounded-sm outline duration-200">
              <CardHeader>
                <time className="text-muted-foreground font-mono text-base font-medium">
                  Date
                </time>
              </CardHeader>
              <CardContent>
                <CardTitle>
                  <h1 className="text-foreground font-mono text-base font-medium">
                    Project 1 - Quick summary
                  </h1>
                </CardTitle>

                <CardDescription>
                  <p className="text-muted-foreground">
                    This is a description of the project.
                  </p>
                </CardDescription>

                <div className="mt-2">
                  <Badge className="mx-1 rounded-sm" variant="outline">
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
            Recent posts
          </h1>
          <Link
            href="/posts"
            className="text-foreground underline decoration-dotted decoration-2 underline-offset-4"
          >
            See all
          </Link>
        </div>

        <div className="mt-5">
          <Link href="/posts/example" passHref>
            <Card className="bg-background hover:bg-muted-foreground/20 rounded-sm outline duration-200">
              <CardHeader>
                <time className="text-muted-foreground font-mono text-base font-medium">
                  Date
                </time>
              </CardHeader>
              <CardContent>
                <CardTitle>
                  <h1 className="text-foreground font-mono text-base font-medium">
                    POST 1 - Quick summary
                  </h1>
                </CardTitle>

                <CardDescription>
                  <p className="text-muted-foreground">
                    This is a description of the project.
                  </p>
                </CardDescription>

                <div className="mt-2">
                  <Badge className="mx-1 rounded-sm" variant="outline">
                    BACKEND
                  </Badge>
                  <Badge className="mx-1 rounded-sm" variant="outline">
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
          Let&apos;s connect
        </h1>
        <p className="text-muted-foreground">
          Reach out to me via email or social media.
        </p>

        <div className="mt-2 grid w-full max-w-xs grid-cols-2 md:text-lg text-gray-700 dark:text-gray-400 text-sm">
          <p>Email</p>
          <a
            href="mailto:arianosmikail5@gmail.com"
            className="hover:text-primary underline duration-100"
          >
            arianosmikail5@gmail.com
          </a>

          <p>Github</p>
          <a
            href="https://github.com/I-Kail-I"
            className="hover:text-primary underline duration-100"
          >
            I-Kail-I
          </a>

          <p>LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/mikail-arianos-30a268356"
            className="hover:text-primary underline duration-100"
          >
            Mikail Arianos
          </a>
        </div>
      </section>
    </motion.div>
  )
}
