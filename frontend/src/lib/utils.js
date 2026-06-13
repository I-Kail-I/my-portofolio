import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(url) {
  if (!url) return null
  if (url.startsWith("http")) return url
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1/", "") ||
    "http://localhost:8000"
  return `${baseUrl}${url}`
}
