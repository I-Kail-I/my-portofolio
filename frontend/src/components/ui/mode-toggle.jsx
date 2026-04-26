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
      <Button
        variant="outline"
        size="icon"
        className="rounded-none border-amber-600/40 bg-transparent"
        disabled
      />
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-none border-amber-600/40 bg-transparent font-mono text-amber-600 transition-all duration-200 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-600 dark:border-amber-400/40 dark:text-amber-400 dark:hover:bg-amber-400/10 dark:hover:text-amber-400 ${className}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
