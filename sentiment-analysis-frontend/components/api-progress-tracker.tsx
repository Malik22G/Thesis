"use client"

import { useState, useEffect } from "react"

interface ApiProgressTrackerProps {
  onProgress: (progress: number) => void
  apiEndpoint: string
  requestId: string
  onComplete: () => void
}

export function ApiProgressTracker({ onProgress, apiEndpoint, requestId, onComplete }: ApiProgressTrackerProps) {
  const [isPolling, setIsPolling] = useState(true)

  useEffect(() => {
    if (!requestId || !isPolling) return

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${apiEndpoint}/progress/${requestId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Update progress
        onProgress(data.progress)

        // If complete, stop polling
        if (data.progress >= 100 || data.status === "complete") {
          clearInterval(pollInterval)
          setIsPolling(false)
          onComplete()
        }
      } catch (error) {
        console.error("Error polling progress:", error)
        clearInterval(pollInterval)
        setIsPolling(false)
      }
    }, 500) // Poll every 500ms

    return () => clearInterval(pollInterval)
  }, [apiEndpoint, requestId, isPolling, onProgress, onComplete])

  return null // This is a non-visual component
}
