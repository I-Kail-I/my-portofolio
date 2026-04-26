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

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true)

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

      <SidebarTrigger
        className={`absolute top-4 left-4 z-10 transition-transform duration-350 cursor-pointer ${isOpen ? "translate-x-61" : "translate-x-0"}`}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      />
    </>
  )
}
