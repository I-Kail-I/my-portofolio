"use client"

import React, { useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import {
  Briefcase,
  FileText,
  FolderKanban,
  Award,
  Home,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { Skeleton } from "../ui/skeleton"

const mainNavItems = [{ title: "Home", href: "/", icon: Home }]

const portfolioItems = [
  { title: "Experience", href: "/admin/experience", icon: Briefcase },
  { title: "Blogs", href: "/admin/blogs", icon: FileText },
  { title: "Projects", href: "/admin/projects", icon: FolderKanban },
  { title: "Certificates", href: "/admin/certificates", icon: Award },
]

export default function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  // Logout handler
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout")
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile")
        setUser(response.data.user)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [])

  if (pathname === "/admin/login") {
    return null
  }

  return (
    <>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center gap-3 px-2">
            {loading ? (
              <>
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </>
            ) : (
              <>
                <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-lg font-semibold">{user?.name}</span>
              </>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="justify-start"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* Portfolio Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Portfolio</SidebarGroupLabel>
            <SidebarMenu>
              {portfolioItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                    className="justify-start"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer section */}
        <SidebarFooter className="border-t p-4">
          <SidebarMenuButton asChild className="justify-start">
            <Button
              variant="destructive"
              className="hover:bg-destructive/10 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </SidebarMenuButton>

          <div className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Mikail
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarTrigger className="fixed left-4 top-4 z-50 lg:hidden" />
    </>
  )
}
