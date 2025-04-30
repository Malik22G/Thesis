"use client"

import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function AnalysisComplete() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="flex flex-col items-center justify-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.2,
        }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full scale-[1.6] z-0"
        />
<CheckCircle className="h-16 w-16 min-w-16 min-h-16 flex-shrink-0 text-green-500 dark:text-green-400 relative z-10" />
</motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-xl font-medium text-slate-900 dark:text-white mt-6"
      >
        Analysis Complete
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-slate-600 dark:text-slate-400 text-center mt-2"
      >
        Your results are ready to view
      </motion.p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100px" }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-4"
      />
    </motion.div>
  )
}
