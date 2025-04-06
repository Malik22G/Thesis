"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

type CommentAnalysis = {
  text: string
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
}

type OverallSentiment = {
  positive: number
  negative: number
  neutral: number
  overall: "positive" | "negative" | "neutral"
}

type AnalysisResult = {
  overallSentiment: OverallSentiment
  comments: CommentAnalysis[]
}

interface DetailedAnalysisProps {
  result: AnalysisResult
}

// Utility: sort and take top 5
function getTop5Comments(
  comments: CommentAnalysis[],
  sentiment: "positive" | "negative"
) {
  return comments
    .filter((c) => c.sentiment === sentiment)
    .sort((a, b) => b.confidence - a.confidence) 
    .slice(0, 5)
}

export function DetailedAnalysis({ result }: DetailedAnalysisProps) {
  const { overallSentiment, comments } = result

  const barData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Sentiment (%)",
        data: [
          (overallSentiment.positive * 100).toFixed(2),
          (overallSentiment.negative * 100).toFixed(2),
          (overallSentiment.neutral * 100).toFixed(2),
        ],
        backgroundColor: ["#22c55e", "#ef4444", "#eab308"], 
      },
    ],
  }

  const pieData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Sentiment (%)",
        data: [
          overallSentiment.positive,
          overallSentiment.negative,
          overallSentiment.neutral,
        ],
        backgroundColor: ["#22c55e", "#ef4444", "#eab308"],
      },
    ],
  }

  const top5Positive = getTop5Comments(comments, "positive")
  const top5Negative = getTop5Comments(comments, "negative")

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" as const },
                    title: { display: false, text: "Bar Chart" },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "bottom" as const },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Positive Comments</CardTitle>
          </CardHeader>
          <CardContent>
            {top5Positive.length === 0 && <p>No positive comments found.</p>}
            <ul className="space-y-2">
              {top5Positive.map((c, i) => (
                <li key={i} className="rounded-md bg-green-50 p-2 text-sm">
                  {c.text} <em>({Math.round(c.confidence * 100)}% confidence)</em>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Negative Comments</CardTitle>
          </CardHeader>
          <CardContent>
            {top5Negative.length === 0 && <p>No negative comments found.</p>}
            <ul className="space-y-2">
              {top5Negative.map((c, i) => (
                <li key={i} className="rounded-md bg-red-50 p-2 text-sm">
                  {c.text} <em>({Math.round(c.confidence * 100)}% confidence)</em>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
