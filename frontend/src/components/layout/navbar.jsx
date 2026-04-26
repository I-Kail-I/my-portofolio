"use client"

import React, { useState, useEffect } from "react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrolled(window.scrollY > 20)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Experiences", href: "/experiences" },
    { label: "Blogs", href: "/blogs" },
    { label: "Projects", href: "/projects" },
    { label: "Certificates", href: "/certificates" },
  ]

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ top: scrolled ? 12 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed z-50 flex h-15 w-full items-center justify-center"
      >
        <div
          className={`flex w-full max-w-2xl items-center justify-between px-5 transition-all duration-300 ${
            scrolled
              ? "bg-background/60 mx-4 rounded-2xl py-2 shadow-md backdrop-blur-md"
              : ""
          }`}
        >
          <Link href="/" passHref>
            <div className="font-mono text-sm">
              <span className="text-amber-600 dark:text-amber-400">~/portfolio $</span>
              <span className="ml-1 text-gray-700 dark:text-gray-400">home</span>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden gap-x-1 sm:flex">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`retro-nav-btn blend cursor-pointer border border-transparent px-3 py-1.5 font-mono text-sm transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 ${
                  pathname === item.href
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:border-amber-400/50 dark:text-amber-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                &gt; {item.label.toLowerCase()}
              </Link>
            ))}
          </div>

          <div className="hidden sm:flex">
            <ModeToggle className="ms-3" />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="default"
            className="flex cursor-pointer items-center justify-center rounded-none border-amber-600/40 p-2 font-mono text-amber-600 transition-all duration-200 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-600 dark:border-amber-400/40 dark:text-amber-400 dark:hover:bg-amber-400/10 sm:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-background fixed top-15 z-40 w-full sm:hidden"
          >
            <div className="flex flex-col gap-y-1 px-5 pb-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`retro-nav-btn block cursor-pointer border border-transparent px-4 py-2.5 font-mono text-sm transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 ${
                      pathname === item.href
                        ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:border-amber-400/50 dark:text-amber-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    &gt; {item.label.toLowerCase()}
                  </Link>
                </motion.div>
              ))}
              <div className="my-2 border-t border-gray-500/30" />
              <div className="px-4">
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}