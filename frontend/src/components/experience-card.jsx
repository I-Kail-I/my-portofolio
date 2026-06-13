import React from "react"

export default function ExperiencesPage({
  period,
  title,
  subheading,
  description,
  className,
  ...props
}) {
  return (
    <div
      className={`${className} retro-card border border-white/10 p-4 transition-all duration-200 hover:border-amber-500/50 dark:border-white/5 dark:hover:border-amber-400/50`}
      {...props}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="text-amber-600/70 dark:text-amber-400/70">&gt;</span>
        <time className="text-muted-foreground font-mono text-sm font-medium tracking-widest">
          DATE: {period}
        </time>
      </div>

      <div>
        <h2 className="font-mono text-lg font-semibold text-amber-600 dark:text-amber-400">
          {title}
        </h2>
        <p className="text-muted-foreground mt-1 font-mono text-sm tracking-wide">
          {subheading}
        </p>

        <article className="text-foreground/80 mt-3 font-mono text-sm leading-relaxed">
          {description}
        </article>
      </div>
    </div>
  )
}
