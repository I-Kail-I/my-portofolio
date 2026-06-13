"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeClosed, ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { axiosInstance } from "@/lib/axios"

export default function MainAdminPage() {
  const router = useRouter()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm()

  const submitHandler = async (data) => {
    try {
      await axiosInstance.post("/login", data)

      // Redirect to admin dashboard
      router.push("/admin/dashboard")
    } catch (error) {
      // Handle field-specific errors if your API returns them
      if (error.response?.data?.field === "email") {
        setError("email", {
          type: "manual",
          message: error.response.data.message,
        })
      } else if (error.response?.data?.field === "password") {
        setError("password", {
          type: "manual",
          message: error.response.data.message,
        })
      } else {
        // Handle general error
        setError("root", {
          type: "manual",
          message:
            error.response?.data?.message || "Login failed. Please try again.",
        })
      }
    }
  }

  return (
    <div className="bg-muted/50 flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Sign In</CardTitle>
          <p className="text-muted-foreground text-sm">
            Restricted access only
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="h-11"
              />
              {errors.email && (
                <span className="text-destructive mt-1 block text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="off"
                  className="h-11 pr-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 1,
                      message: "Password must be fill",
                    },
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 me-2 h-full px-3 hover:bg-transparent"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <EyeClosed className="text-muted-foreground h-4 w-4" />
                  ) : (
                    <Eye className="text-muted-foreground h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <span className="text-destructive mt-1 block text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {errors.root && (
              <p className="text-destructive mt-2 text-center text-sm">
                {errors.root.message}
              </p>
            )}

            <Button
              className="h-11 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
