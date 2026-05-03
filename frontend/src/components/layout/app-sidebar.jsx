"use client"

import react, { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export default function AppSidebar() {
  const pathname = usePathname()

  if (pathname === "/admin") {
    return null
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>

      <SidebarTrigger />
    </>
  )
}
