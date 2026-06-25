import Link from 'next/link'
import { Compass } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Container className="text-center">
        <Compass className="mx-auto mb-6 h-16 w-16 text-gold-500" />
        <h1 className="text-display font-display font-semibold text-foreground">
          404 — Page Not Found
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Button asChild className="mt-6 bg-crimson hover:bg-crimson-700">
          <Link href="/">Back to Home</Link>
        </Button>
      </Container>
    </div>
  )
}
