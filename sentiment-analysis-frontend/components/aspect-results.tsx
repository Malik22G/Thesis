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

interface AspectResultsProps {
  result: AnalysisResult | null
}

export function AspectResults({ result }: AspectResultsProps) {
  // If no result yet, show placeholder
  if (!result) {
    return (
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400">Submit text to see detailed aspect analysis</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { aspects } = result

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

  return (
    <div className="space-y-6">
      {aspects.map((aspect, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">{aspect.aspect}</h3>
                  <span
                    className={`text-sm font-medium capitalize px-2 py-1 rounded-full ${
                      aspect.sentiment.overall === "positive"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : aspect.sentiment.overall === "negative"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                    }`}
                  >
                    {aspect.sentiment.overall}
                  </span>
                </div>

                <div className="space-y-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.7, delay: index * 0.1 + 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Positive</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {Math.round(aspect.sentiment.positive * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={aspect.sentiment.positive * 100}
                      className="h-2 bg-slate-200 dark:bg-slate-700"
                      indicatorClassName="bg-green-500"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">Negative</span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        {Math.round(aspect.sentiment.negative * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={aspect.sentiment.negative * 100}
                      className="h-2 bg-slate-200 dark:bg-slate-700"
                      indicatorClassName="bg-red-500"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.7, delay: index * 0.1 + 0.3 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Neutral</span>
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                        {Math.round(aspect.sentiment.neutral * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={aspect.sentiment.neutral * 100}
                      className="h-2 bg-slate-200 dark:bg-slate-700"
                      indicatorClassName="bg-amber-500"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="mt-4"
                >
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Example Comments</h4>
                  <ul className="space-y-2">
                    {aspect.examples.map((example, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.4 + i * 0.1 }}
                        className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-2 rounded-md"
                      >
                        "{example}"
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

