import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react"

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
  result: AnalysisResult
}

export function AspectResults({ result }: AspectResultsProps) {
  const getSentimentIcon = (sentiment: "positive" | "negative" | "neutral") => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-5 w-5 text-green-500" />
      case "negative":
        return <ThumbsDown className="h-5 w-5 text-red-500" />
      case "neutral":
        return <Minus className="h-5 w-5 text-yellow-500" />
    }
  }

  const getSentimentColor = (sentiment: "positive" | "negative" | "neutral") => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "neutral":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
    }
  }

  return (
    <div className="space-y-8">
      {result.aspects.map((aspect, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {aspect.aspect}
              {getSentimentIcon(aspect.sentiment.overall)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Positive</span>
                  <span className="text-sm font-medium">{Math.round(aspect.sentiment.positive * 100)}%</span>
                </div>
                <Progress
                  value={aspect.sentiment.positive * 100}
                  className="h-2 bg-slate-200 dark:bg-slate-700"
                  indicatorClassName="bg-green-500"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">Negative</span>
                  <span className="text-sm font-medium">{Math.round(aspect.sentiment.negative * 100)}%</span>
                </div>
                <Progress
                  value={aspect.sentiment.negative * 100}
                  className="h-2 bg-slate-200 dark:bg-slate-700"
                  indicatorClassName="bg-red-500"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Neutral</span>
                  <span className="text-sm font-medium">{Math.round(aspect.sentiment.neutral * 100)}%</span>
                </div>
                <Progress
                  value={aspect.sentiment.neutral * 100}
                  className="h-2 bg-slate-200 dark:bg-slate-700"
                  indicatorClassName="bg-yellow-500"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Example Phrases</h4>
              <ul className="space-y-2">
                {aspect.examples.map((example, i) => {
                  // Determine sentiment for this example (simplified for demo)
                  let sentiment: "positive" | "negative" | "neutral"
                  if (i === 0 && aspect.sentiment.positive > 0.4) sentiment = "positive"
                  else if (i === 1 && aspect.sentiment.negative > 0.4) sentiment = "negative"
                  else sentiment = "neutral"

                  return (
                    <li key={i} className={`text-sm p-2 rounded-md ${getSentimentColor(sentiment)}`}>
                      "{example}"
                    </li>
                  )
                })}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

