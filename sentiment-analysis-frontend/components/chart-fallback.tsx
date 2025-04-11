export function ChartFallback() {
    return (
      <div className="h-[400px] w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="text-slate-500 dark:text-slate-400 mb-4">Chart visualization could not be loaded</div>
        <div className="grid grid-cols-4 gap-4 w-full max-w-2xl px-4">
          {["BERT", "RoBERTa", "DistilBERT", "DeBERTa"].map((model, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-full h-32 rounded-t-md"
                style={{
                  backgroundColor:
                    index === 0 ? "#8b5cf6" : index === 1 ? "#ec4899" : index === 2 ? "#f59e0b" : "#3b82f6",
                  height: `${index === 0 ? 87 : index === 1 ? 89 : index === 2 ? 85 : 91}%`,
                }}
              />
              <div className="w-full text-center text-sm mt-2 font-medium text-slate-700 dark:text-slate-300">
                {model}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  