'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log error to Sentry
        Sentry.captureException(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                        <CardTitle>Something went wrong!</CardTitle>
                    </div>
                    <CardDescription>
                        An unexpected error occurred. Our team has been notified.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {error.message || 'An unknown error occurred'}
                    </p>
                    {error.digest && (
                        <p className="text-xs text-muted-foreground mt-2">
                            Error ID: {error.digest}
                        </p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={reset}
                        className="w-full"
                    >
                        Try again
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
