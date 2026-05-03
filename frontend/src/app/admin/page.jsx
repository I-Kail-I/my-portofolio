"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeClosed } from "lucide-react"

export default function MainAdminPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className="flex h-screen items-center justify-center bg-foreground">
      <Card className="w-full max-w-md px-10 py-4 bg-accent">
        {/* Card header */}
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-semibold">Sign in to admin</h1>
          </CardTitle>
        </CardHeader>

        <div className="flex w-full items-center">
          <div className="w-1/3 border-t border-accent-foreground" />
          <span className="px-2 text-sm text-muted-foreground">Not for public</span>
          <div className="w-1/3 border-t border-accent-foreground" />
        </div>

        <CardContent className="mt-5">
          {/* Card form inputs and submit button */}
          <form className="space-y-4">
            <div>
              <label className="font-semibold" htmlFor="username">
                Username
              </label>
              <Input
                className="mt-2 p-5"
                autoComplete="off"
               type="text"
                id="username"
              />
            </div>
            <div>
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <Input
                className="mt-2 p-5 pe-9"
                autoComplete="off"
                type={isPasswordVisible ? "text" : "password"}
                id="password"
              />
              <Button
                variant="ghost"
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute mt-3 -translate-x-10"
              >
                {isPasswordVisible ? <EyeClosed /> : <Eye />}
              </Button>
            </div>

            <Button
              className="mt-3 w-full cursor-pointer rounded-full py-6 hover:bg-gray-700 "
              type="submit"
              variant="default"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
