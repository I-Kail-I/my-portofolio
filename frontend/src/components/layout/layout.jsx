"use client"

import React from "react"
import { ThemeProvider } from "@/components/ui/theme-provider"
import Navbar from "@/components/layout/navbar"
import ClickSpark from "@/components/ui/click-spark"
import Footer from "@/components/layout/footer"
import { usePathname } from "next/navigation"
import AppSidebar from "@/components/layout/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }) {
  const pathname = usePathname()

  if (pathname.startsWith("/admin")) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="min-h-screen w-full">
            <ClickSpark>{children}</ClickSpark>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <main className="mx-auto mt-15 min-h-screen w-full max-w-xl px-8 pb-10 sm:px-0">
          <ClickSpark>{children}</ClickSpark>
        </main>
        <Footer />
      </ThemeProvider>
    )
  }
}
