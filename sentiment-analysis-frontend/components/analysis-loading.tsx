"use client"

import { useEffect, useState, useRef } from "react"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AnalysisLoadingProps {
  type: "youtube" | "csv"
}

export function AnalysisLoading({ type }: AnalysisLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const stepTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const youtubeSteps = [
    { message: "Fetching YouTube comments...", duration: [0, 30] },
    { message: "Processing comment data...", duration: [30, 50] },
    { message: "Analyzing sentiment...", duration: [50, 75] },
    { message: "Identifying key aspects...", duration: [75, 90] },
    { message: "Aggregating results...", duration: [90, 100] },
  ]

  const csvSteps = [
    { message: "Processing CSV data...", duration: [0, 20] },
    { message: "Extracting feedback entries...", duration: [20, 40] },
    { message: "Analyzing sentiment patterns...", duration: [40, 70] },
    { message: "Categorizing by aspects...", duration: [70, 90] },
    { message: "Generating comprehensive report...", duration: [90, 100] },
  ]

  const steps = type === "youtube" ? youtubeSteps : csvSteps

  useEffect(() => {
    // Simulate progress based on typical API response times
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        // Slow down progress as we approach 100%
        const increment = prev < 50 ? 1.5 : prev < 80 ? 0.8 : 0.3
        const newProgress = Math.min(prev + increment, 99)
        return newProgress
      })
    }, 150)

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current)
    }
  }, [])

  // Update step based on progress
  useEffect(() => {
    for (let i = 0; i < steps.length; i++) {
      const [min, max] = steps[i].duration
      if (progress >= min && progress <= max) {
        if (step !== i) {
          setStep(i)
        }
        break
      }
    }
  }, [progress, steps, step])

  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-4"
          >
            <Loader2 className="h-10 w-10 text-purple-600 animate-spin mx-auto mb-4" />
            <p className="text-lg font-medium text-slate-900 dark:text-white">{steps[step].message}</p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">{Math.round(progress)}% complete</p>

        <div className="mt-4 flex space-x-1 justify-center">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 w-8 rounded-full ${i <= step ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-700"}`}
              animate={i === step ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
