"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, FileText, Youtube, Upload, PieChart, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Powerful Sentiment Analysis Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Analyze sentiment from multiple data sources with our advanced AI-powered platform.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <FileText className="h-6 w-6 text-white" />,
              title: "Text Analysis",
              description: "Analyze sentiment from any text input, from reviews to social media posts.",
              content:
                "Simply paste your text and our AI will break down sentiment by aspects, identifying positive and negative opinions about specific features.",
              gradient: "from-purple-500 to-indigo-500",
            },
            {
              icon: <Upload className="h-6 w-6 text-white" />,
              title: "CSV Upload",
              description: "Batch process large volumes of feedback from CSV files.",
              content:
                "Upload CSV files containing customer feedback, reviews, or survey responses for bulk sentiment analysis with detailed reporting.",
              gradient: "from-pink-500 to-rose-500",
            },
            {
              icon: <Youtube className="h-6 w-6 text-white" />,
              title: "YouTube Comments",
              description: "Analyze sentiment from YouTube video comments.",
              content:
                "Enter a YouTube video URL to analyze the sentiment of comments, helping content creators understand audience reception.",
              gradient: "from-red-500 to-orange-500",
            },
            {
              icon: <BarChart2 className="h-6 w-6 text-white" />,
              title: "Aspect-Based Analysis",
              description: "Break down sentiment by specific aspects of your product or service.",
              content:
                "Our AI identifies specific aspects mentioned in feedback and analyzes sentiment for each, giving you granular insights.",
              gradient: "from-amber-500 to-yellow-500",
            },
            {
              icon: <PieChart className="h-6 w-6 text-white" />,
              title: "Visual Reports",
              description: "Visualize sentiment data with interactive charts and graphs.",
              content:
                "Comprehensive visual reports make it easy to understand sentiment trends and identify areas for improvement at a glance.",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: <Zap className="h-6 w-6 text-white" />,
              title: "Real-time Analysis",
              description: "Get instant sentiment analysis results in seconds.",
              content:
                "Our high-performance AI delivers results in real-time, allowing you to quickly respond to customer feedback and market trends.",
              gradient: "from-blue-500 to-cyan-500",
            },
          ].map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">{feature.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

