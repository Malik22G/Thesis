"use client"

import { CheckCircle } from "lucide-react"

export function AnalysisComplete() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full scale-[1.6] z-0" />
        <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 relative z-10" />
      </div>

      <h3 className="text-xl font-medium text-slate-900 dark:text-white mt-6">
        Analysis Complete
      </h3>

      <p className="text-slate-600 dark:text-slate-400 text-center mt-2">
        Your results are ready to view
      </p>

      <div className="w-[100px] h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-4" />
    </div>
  )
}
