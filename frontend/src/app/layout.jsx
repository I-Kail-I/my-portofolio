import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Layout from "@/components/layout/layout"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Mikail Arianos - Fullstack & DevOps Engineer",
  description: "Mikail Arianos portofolio web, learaning about Mikail skills, projects, experiences and more.",
}

export default function RootLayout({ children }) {
  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body>
          <Layout>
            {children}
          </Layout>
        </body>
      </html>
    </>
  )
}
