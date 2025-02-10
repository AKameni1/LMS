'use client'
import { Button } from "@/components/ui/button"

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  return (
    // global-error must include html and body tags
    <html lang="en">
      <body className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
        <h2 className="text-7xl text-light-100 font-light">Something went wrong!</h2>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  )
}