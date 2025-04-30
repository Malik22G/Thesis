"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function TextAnalysisLoading() {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("Analyzing text...")

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress < 20) {
      setMessage("Analyzing text...")
    } else if (progress < 40) {
      setMessage("Identifying sentiment...")
    } else if (progress < 60) {
      setMessage("Extracting aspects...")
    } else if (progress < 80) {
      setMessage("Categorizing feedback...")
    } else {
      setMessage("Finalizing results...")
    }
  }, [progress])

  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-medium text-slate-900 dark:text-white mb-4"
          >
            {message}
          </motion.p>
        </AnimatePresence>

        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">{progress}% complete</p>
      </div>
    </div>
  )
}
