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

interface SentimentSummaryProps {
  result: AnalysisResult
}

export function SentimentSummary({ result }: SentimentSummaryProps) {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Overall Sentiment
            {getSentimentIcon(result.overallSentiment.overall)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Positive</span>
                <span className="text-sm font-medium">{Math.round(result.overallSentiment.positive * 100)}%</span>
              </div>
              <Progress
                value={result.overallSentiment.positive * 100}
                className="h-2 bg-slate-200 dark:bg-slate-700"
                indicatorClassName="bg-green-500"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-red-600 dark:text-red-400">Negative</span>
                <span className="text-sm font-medium">{Math.round(result.overallSentiment.negative * 100)}%</span>
              </div>
              <Progress
                value={result.overallSentiment.negative * 100}
                className="h-2 bg-slate-200 dark:bg-slate-700"
                indicatorClassName="bg-red-500"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Neutral</span>
                <span className="text-sm font-medium">{Math.round(result.overallSentiment.neutral * 100)}%</span>
              </div>
              <Progress
                value={result.overallSentiment.neutral * 100}
                className="h-2 bg-slate-200 dark:bg-slate-700"
                indicatorClassName="bg-yellow-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.aspects.map((aspect, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                {aspect.aspect}
                {getSentimentIcon(aspect.sentiment.overall)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-green-600 dark:text-green-400">
                  Positive: {Math.round(aspect.sentiment.positive * 100)}%
                </span>
                <span className="text-red-600 dark:text-red-400">
                  Negative: {Math.round(aspect.sentiment.negative * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                  style={{
                    width: "100%",
                    background: `linear-gradient(to right, 
                      #22c55e 0%, 
                      #22c55e ${aspect.sentiment.positive * 100}%, 
                      #eab308 ${aspect.sentiment.positive * 100}%, 
                      #eab308 ${(aspect.sentiment.positive + aspect.sentiment.neutral) * 100}%, 
                      #ef4444 ${(aspect.sentiment.positive + aspect.sentiment.neutral) * 100}%, 
                      #ef4444 100%)`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

