import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, FileText, Youtube, Upload, PieChart, Zap } from "lucide-react"

export function Features() {
  return (
    <div className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Powerful Sentiment Analysis Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Analyze sentiment from multiple data sources with our advanced AI-powered platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Text Analysis</CardTitle>
              <CardDescription>
                Analyze sentiment from any text input, from reviews to social media posts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Simply paste your text and our AI will break down sentiment by aspects, identifying positive and
                negative opinions about specific features.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <CardTitle>CSV Upload</CardTitle>
              <CardDescription>Batch process large volumes of feedback from CSV files.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Upload CSV files containing customer feedback, reviews, or survey responses for bulk sentiment analysis
                with detailed reporting.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                <Youtube className="h-6 w-6 text-white" />
              </div>
              <CardTitle>YouTube Comments</CardTitle>
              <CardDescription>Analyze sentiment from YouTube video comments.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Enter a YouTube video URL to analyze the sentiment of comments, helping content creators understand
                audience reception.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Aspect-Based Analysis</CardTitle>
              <CardDescription>Break down sentiment by specific aspects of your product or service.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Our AI identifies specific aspects mentioned in feedback and analyzes sentiment for each, giving you
                granular insights.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Visual Reports</CardTitle>
              <CardDescription>Visualize sentiment data with interactive charts and graphs.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive visual reports make it easy to understand sentiment trends and identify areas for
                improvement at a glance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Real-time Analysis</CardTitle>
              <CardDescription>Get instant sentiment analysis results in seconds.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Our high-performance AI delivers results in real-time, allowing you to quickly respond to customer
                feedback and market trends.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

