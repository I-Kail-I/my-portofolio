"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle({ className }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Set mounted to true after the component mounts on the client
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Prevent rendering the button until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full" disabled />
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full scale-120 dark:text-gray-400 dark:hover:text-gray-200 text-gray-600 ${className}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  )
}
