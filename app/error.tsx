'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Container className="text-center">
        <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-crimson" />
        <h1 className="text-display font-display font-semibold text-foreground">
          Something Went Wrong
        </h1>
        <p className="mt-3 text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={reset} className="mt-6 bg-crimson hover:bg-crimson-700">
          Try Again
        </Button>
      </Container>
    </div>
  )
}
