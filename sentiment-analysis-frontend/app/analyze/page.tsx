import { SentimentAnalyzer } from "@/components/sentiment-analyzer"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AnalyzePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow p-4 md:p-8 lg:p-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800 dark:text-slate-100">
            Sentiment Analysis Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Analyze sentiment across different aspects of your content using multiple input methods.
          </p>
          <SentimentAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  )
}

