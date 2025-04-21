"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Overall performance on test set
const performanceData = {
  accuracy: [
    { name: "BERT",      value: 0.8300, color: "#8b5cf6" },
    { name: "RoBERTa",   value: 0.8408, color: "#ec4899" },
    { name: "DistilBERT",value: 0.8235, color: "#f59e0b" },
    { name: "DeBERTa",   value: 0.8418, color: "#3b82f6" },
  ],
  precision: [
    { name: "BERT",      value: 0.8244, color: "#8b5cf6" },
    { name: "RoBERTa",   value: 0.8353, color: "#ec4899" },
    { name: "DistilBERT",value: 0.8177, color: "#f59e0b" },
    { name: "DeBERTa",   value: 0.8370, color: "#3b82f6" },
  ],
  recall: [
    { name: "BERT",      value: 0.8300, color: "#8b5cf6" },
    { name: "RoBERTa",   value: 0.8408, color: "#ec4899" },
    { name: "DistilBERT",value: 0.8235, color: "#f59e0b" },
    { name: "DeBERTa",   value: 0.8418, color: "#3b82f6" },
  ],
  f1: [
    { name: "BERT",      value: 0.8265, color: "#8b5cf6" },
    { name: "RoBERTa",   value: 0.8373, color: "#ec4899" },
    { name: "DistilBERT",value: 0.8195, color: "#f59e0b" },
    { name: "DeBERTa",   value: 0.8386, color: "#3b82f6" },
  ],
}

const timeSeriesData = [
  { epoch: 1, BERT: 0.70, RoBERTa: 0.72, DistilBERT: 0.68, DeBERTa: 0.73 },
  { epoch: 2, BERT: 0.75, RoBERTa: 0.78, DistilBERT: 0.73, DeBERTa: 0.79 },
  { epoch: 3, BERT: 0.79, RoBERTa: 0.82, DistilBERT: 0.77, DeBERTa: 0.83 },
]

const radarData = [
  { subject: "Accuracy",  BERT: 0.8300, RoBERTa: 0.8408, DistilBERT: 0.8235, DeBERTa: 0.8418, fullMark: 1 },
  { subject: "Precision", BERT: 0.8244, RoBERTa: 0.8353, DistilBERT: 0.8177, DeBERTa: 0.8370, fullMark: 1 },
  { subject: "Recall",    BERT: 0.8300, RoBERTa: 0.8408, DistilBERT: 0.8235, DeBERTa: 0.8418, fullMark: 1 },
  { subject: "F1 Score",  BERT: 0.8265, RoBERTa: 0.8373, DistilBERT: 0.8195, DeBERTa: 0.8386, fullMark: 1 },
  // If you have speed/memory benchmarks, insert them here:
  { subject: "Speed",     BERT: 0.70,   RoBERTa: 0.65,   DistilBERT: 0.90,   DeBERTa: 0.60,   fullMark: 1 },
  { subject: "Memory",    BERT: 0.75,   RoBERTa: 0.70,   DistilBERT: 0.95,   DeBERTa: 0.65,   fullMark: 1 },
]


// Chart type options
type ChartType = "bar" | "line" | "radar"

export function ModelComparison() {
  const [activeMetric, setActiveMetric] = useState("accuracy")
  const [animatedData, setAnimatedData] = useState(
    performanceData[activeMetric as keyof typeof performanceData].map((item) => ({ ...item, value: 0 })),
  )
  const [chartType, setChartType] = useState<ChartType>("bar")
  const [isAnimating, setIsAnimating] = useState(false)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Reset animation when metric changes
    setIsAnimating(true)
    setAnimatedData(
      performanceData[activeMetric as keyof typeof performanceData].map((item) => ({ ...item, value: 0 })),
    )

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }

    // Animate the bars
    animationTimeoutRef.current = setTimeout(() => {
      setAnimatedData(performanceData[activeMetric as keyof typeof performanceData])
      setIsAnimating(false)
    }, 100)

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [activeMetric])

  const formatYAxis = (value: number) => {
    return value.toFixed(2)
  }

  const formatTooltip = (value: number) => {
    return [value.toFixed(3), activeMetric]
  }

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={animatedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" />
        <YAxis domain={[0.75, 1]} tickFormatter={formatYAxis} />
        <Tooltip formatter={formatTooltip} />
        <Legend />
        <Bar
          dataKey="value"
          name={activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)}
          fill="#8b5cf6"
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
          label={{ position: "top", formatter: (value: number) => value.toFixed(3) }}
        >
          {animatedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="epoch" label={{ value: "Training Epochs", position: "insideBottomRight", offset: -10 }} />
        <YAxis
          domain={[0.6, 1]}
          tickFormatter={formatYAxis}
          label={{
            value: activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1),
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip formatter={(value) => [3, ""]} />
        <Legend />
        <Line type="monotone" dataKey="BERT" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="RoBERTa" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line
          type="monotone"
          dataKey="DistilBERT"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line type="monotone" dataKey="DeBERTa" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )

  const renderRadarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart outerRadius={150} data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 1]} tickFormatter={formatYAxis} />
        <Radar name="BERT" dataKey="BERT" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
        <Radar name="RoBERTa" dataKey="RoBERTa" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
        <Radar name="DistilBERT" dataKey="DistilBERT" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
        <Radar name="DeBERTa" dataKey="DeBERTa" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
        <Legend />
        <Tooltip formatter={(value) => [3, ""]} />
      </RadarChart>
    </ResponsiveContainer>
  )

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return renderBarChart()
      case "line":
        return renderLineChart()
      case "radar":
        return renderRadarChart()
      default:
        return renderBarChart()
    }
  }

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <Tabs value={activeMetric} onValueChange={setActiveMetric} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
              <TabsTrigger value="precision">Precision</TabsTrigger>
              <TabsTrigger value="recall">Recall</TabsTrigger>
              <TabsTrigger value="f1">F1 Score</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex space-x-2">
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                chartType === "bar"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Bar
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                chartType === "line"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType("radar")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                chartType === "radar"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Radar
            </button>
          </div>
        </div>

        <div className="h-[400px] w-full">
          {isAnimating ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            renderChart()
          )}
        </div>

        <div className="mt-6 text-sm text-slate-600 dark:text-slate-400">
          <p className="mb-2">
            <strong>Chart Types:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Bar Chart:</strong> Direct comparison of model performance for the selected metric.
            </li>
            <li>
              <strong>Line Chart:</strong> Performance evolution over training epochs, showing how each model improves.
            </li>
            <li>
              <strong>Radar Chart:</strong> Multi-dimensional comparison across all metrics, including speed and memory
              efficiency.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

