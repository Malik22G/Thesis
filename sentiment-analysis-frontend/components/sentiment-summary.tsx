"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

type SentimentScore = {
  positive: number
  negative: number
  neutral: number
  overall: "positive" | "negative" | "neutral"
}

type AspectSentiment = {
  aspect: string
  sentiment: SentimentScore
  examples: string[]
}

type AnalysisResult = {
  aspects: AspectSentiment[]
  overallSentiment: SentimentScore
}

interface SentimentSummaryProps {
  result: AnalysisResult | null
  hidePercentages?: boolean
  hideOverallSentiment?: boolean
}

export function SentimentSummary({ 
  result, 
  hidePercentages = false,
  hideOverallSentiment = false
}: SentimentSummaryProps) {
  // If no result yet, show placeholder
  if (!result) {
    return (
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400">Submit text to see sentiment analysis results</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { overallSentiment } = result

  const getSentimentColor = (sentiment: "positive" | "negative" | "neutral") => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 dark:text-green-400"
      case "negative":
        return "text-red-600 dark:text-red-400"
      case "neutral":
        return "text-amber-600 dark:text-amber-400"
      default:
        return "text-slate-600 dark:text-slate-400"
    }
  }

  // Only show sentiment label without percentages
  if (hidePercentages) {
    return (
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-6">
          <div className="space-y-6">
            {!hideOverallSentiment && (
              <>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg font-medium text-slate-900 dark:text-white mb-2"
                >
                  Overall Sentiment
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center justify-center"
                >
                  <span className={`text-2xl font-bold capitalize ${getSentimentColor(overallSentiment.overall)}`}>
                    {overallSentiment.overall}
                  </span>
                </motion.div>
              </>
            )}
            
            {hideOverallSentiment && (
              <div className="text-center py-4">
                <p className="text-slate-500 dark:text-slate-400">
                  Switch to Detailed Analysis tab to see comment-level sentiment
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show full breakdown with percentages
  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            {!hideOverallSentiment && (
              <>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg font-medium text-slate-900 dark:text-white mb-2"
                >
                  Overall Sentiment
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center mb-4"
                >
                  <span className={`text-2xl font-bold capitalize ${getSentimentColor(overallSentiment.overall)}`}>
                    {overallSentiment.overall}
                  </span>
                </motion.div>
              </>
            )}
            
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Positive</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {Math.round(overallSentiment.positive * 100)}%
                  </span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <Progress
                    value={overallSentiment.positive * 100}
                    className="h-2 bg-slate-200 dark:bg-slate-700"
                    indicatorClassName="bg-green-500"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">Negative</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {Math.round(overallSentiment.negative * 100)}%
                  </span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <Progress
                    value={overallSentiment.negative * 100}
                    className="h-2 bg-slate-200 dark:bg-slate-700"
                    indicatorClassName="bg-red-500"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Neutral</span>
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    {Math.round(overallSentiment.neutral * 100)}%
                  </span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <Progress
                    value={overallSentiment.neutral * 100}
                    className="h-2 bg-slate-200 dark:bg-slate-700"
                    indicatorClassName="bg-amber-500"
                  />
                </motion.div>
              </motion.div>
            </div>
            
            {hideOverallSentiment && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Switch to Detailed Analysis tab to see comment-level sentiment
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}