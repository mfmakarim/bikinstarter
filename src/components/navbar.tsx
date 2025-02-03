"use client"

import Link from "next/link"
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export function Navbar() {
  const routes = [
    {
      href: "/todos",
      label: "Todos",
    },
    {
      href: "/todos-with-api",
      label: "Todos (Using API Route)",
    },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <SignedIn>
            <div className="flex items-center space-x-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary"
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <UserButton signInUrl="/sign-in" />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="ml-auto">
              <SignInButton mode="modal" forceRedirectUrl={"/welcome"} fallbackRedirectUrl={"/welcome"}>
                <Button>
                  Masuk
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}
