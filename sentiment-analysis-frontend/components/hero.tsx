"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-r from-blue-300/20 to-cyan-300/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-amber-300/20 to-orange-300/20 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
              Uncover Insights
            </span>{" "}
            from Your Customer Feedback
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto"
          >
            Our advanced AI-powered sentiment analysis breaks down feedback by specific aspects, giving you actionable
            insights to improve your product or service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg"
            >
              <Link href="/analyze">
                Try It Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/analyze">View Demo</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 z-10 h-16 bottom-0 top-auto" />
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="w-full h-[400px] bg-white dark:bg-slate-900 p-4 relative">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Dashboard Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 rounded-lg" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

