import ReactMarkdown from "react-markdown"

export const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mb-2 mt-4 font-mono text-lg font-semibold text-amber-500 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-2 mt-4 font-mono text-base font-semibold text-amber-500 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-3 font-mono text-sm font-semibold text-amber-500 first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 font-mono text-sm leading-relaxed last:mb-0">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-amber-500">{children}</strong>
  ),
  code: ({ children, className }) => {
    if (!className) {
      return (
        <code className="rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-sm text-amber-500">
          {children}
        </code>
      )
    }
    return <code className="block">{children}</code>
  },
  pre: ({ children }) => (
    <pre className="mb-3 overflow-x-auto rounded-lg border border-white/10 bg-black/20 p-3 font-mono text-sm last:mb-0">
      {children}
    </pre>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 list-disc space-y-1 pl-5 font-mono text-sm last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 list-decimal space-y-1 pl-5 font-mono text-sm last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-amber-500 underline underline-offset-2 hover:text-amber-400"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-3 border-l-2 border-amber-500/50 pl-4 text-muted-foreground last:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-4 border-amber-500/20" />,
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="my-3 max-h-96 w-full rounded-none border border-white/10 object-cover" />
  ),
}

export default function MarkdownPreview({ content }) {
  return <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
}
