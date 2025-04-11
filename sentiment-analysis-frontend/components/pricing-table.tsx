"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check, X } from "lucide-react"

export function PricingTable() {
  const [billingAnnually, setBillingAnnually] = useState(true)

  const plans = [
    {
      name: "Free",
      description: "For individuals and small projects",
      price: {
        monthly: 0,
        annually: 0,
      },
      features: [
        { name: "1,000 analyses per month", included: true },
        { name: "Basic sentiment analysis", included: true },
        { name: "Text input only", included: true },
        { name: "Community support", included: true },
        { name: "CSV upload", included: false },
        { name: "YouTube comments analysis", included: false },
        { name: "API access", included: false },
        { name: "Priority support", included: false },
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      description: "For professionals and growing businesses",
      price: {
        monthly: 49,
        annually: 39,
      },
      features: [
        { name: "25,000 analyses per month", included: true },
        { name: "Advanced sentiment analysis", included: true },
        { name: "Text, CSV, and YouTube inputs", included: true },
        { name: "Email support", included: true },
        { name: "API access", included: true },
        { name: "Custom aspect categories", included: true },
        { name: "Data export", included: true },
        { name: "Priority support", included: false },
      ],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      price: {
        monthly: 199,
        annually: 159,
      },
      features: [
        { name: "Unlimited analyses", included: true },
        { name: "State-of-the-art models", included: true },
        { name: "All input methods", included: true },
        { name: "Dedicated support", included: true },
        { name: "Advanced API access", included: true },
        { name: "Custom model training", included: true },
        { name: "Data retention controls", included: true },
        { name: "SLA guarantees", included: true },
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center space-x-2">
        <span
          className={`text-sm ${!billingAnnually ? "font-medium text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
        >
          Monthly
        </span>
        <Switch
          checked={billingAnnually}
          onCheckedChange={setBillingAnnually}
          className="data-[state=checked]:bg-purple-600"
        />
        <span
          className={`text-sm ${billingAnnually ? "font-medium text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
        >
          Annually
          <span className="inline-block ml-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Save 20%
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden ${plan.highlight ? "border-purple-400 dark:border-purple-600 shadow-lg" : "border-slate-200 dark:border-slate-800"}`}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32">
                <div className="absolute inset-0 rotate-45 bg-gradient-to-r from-purple-600 to-pink-600 shadow-md"></div>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-4 text-xs font-bold text-white">
                  POPULAR
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold">{plan.name}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">{plan.description}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${billingAnnually ? plan.price.annually : plan.price.monthly}
                </span>
                <span className="text-slate-500 dark:text-slate-400">/month</span>
                {billingAnnually && (
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Billed annually</div>
                )}
              </div>

              <ul className="space-y-3 text-left">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-slate-300 dark:text-slate-600 mr-2 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.included ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-600"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.highlight ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : ""}`}
                variant={plan.highlight ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

