import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BackButton({ href }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-white/10 p-1.5 transition-colors hover:border-amber-500/50 hover:text-amber-500"
    >
      <ArrowLeft className="h-4 w-4" />
    </Link>
  )
}

