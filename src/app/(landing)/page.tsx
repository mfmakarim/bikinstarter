import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="max-w-3xl space-y-6 px-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Build Your SaaS Product Faster Than Ever
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          A modern, production-ready SaaS boilerplate. Start building your next big idea with our secure, scalable, and feature-rich foundation.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/auth/signup">
            <Button size="lg" className="font-medium">
              Get Started
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="font-medium">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
