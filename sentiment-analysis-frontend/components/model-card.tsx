import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ModelCardProps {
  name: string
  description: string
  strengths: string[]
  limitations: string[]
  bestFor: string
}

export function ModelCard({ name, description, strengths, limitations, bestFor }: ModelCardProps) {
  return (
    <Card className="transition-all hover:shadow-md border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-600 dark:text-slate-400">{description}</p>

        <div>
          <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Strengths</h4>
          <ul className="space-y-1">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-400">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Limitations</h4>
          <ul className="space-y-1">
            {limitations.map((limitation, index) => (
              <li key={index} className="flex items-start">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-400">{limitation}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">Best For</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">{bestFor}</p>
        </div>
      </CardContent>
    </Card>
  )
}

