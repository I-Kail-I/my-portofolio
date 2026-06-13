export default function SectionHeader({ title, href, linkLabel = "[ see all ]" }) {
  return (
    <div className="flex w-full justify-between">
      <h1 className="font-mono text-xl font-semibold tracking-tight">
        <span className="text-amber-500 dark:text-amber-400">{"// "}</span>
        {title}
      </h1>
      {href && (
        <a
          href={href}
          className="font-mono text-sm text-amber-600 underline decoration-dotted decoration-2 underline-offset-4 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
        >
          {linkLabel}
        </a>
      )}
    </div>
  )
}
