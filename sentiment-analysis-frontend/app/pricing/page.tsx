import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PricingTable } from "@/components/pricing-table"
import { PageTransition } from "@/components/page-transition"

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <PageTransition>
        <main className="flex-grow">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-purple-100 mb-8">
                  Choose the plan that's right for your business needs
                </p>
                <a
                  href="mailto:malik.basit3690@gmail.com"
                  className="inline-block px-6 py-3 bg-white text-purple-700 font-semibold rounded-md shadow hover:bg-purple-100 transition"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
              <PricingTable />

              <div className="mt-16 max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Enterprise Solutions
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                  Need a custom solution for your organization? Our enterprise plans offer dedicated support, custom
                  integrations, and tailored features.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="mailto:malik.basit3690@gmail.com"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    Contact Sales
                  </a>
                  <a
                    href="mailto:malik.basit3690@gmail.com"
                    className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-700 text-base font-medium rounded-md text-slate-900 dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Book a Demo
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-8">
                  {[
                    {
                      q: "Can I change plans later?",
                      a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
                    },
                    {
                      q: "What happens if I exceed my monthly analysis quota?",
                      a: "If you exceed your monthly quota, you can purchase additional analysis credits or upgrade to a higher tier plan. We'll notify you when you're approaching your limit.",
                    },
                    {
                      q: "Do you offer discounts for non-profits or educational institutions?",
                      a: "Yes, we offer special pricing for non-profits, educational institutions, and startups. Contact our sales team for more information.",
                    },
                    {
                      q: "Is there a free trial available?",
                      a: "Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial.",
                    },
                  ].map(({ q, a }, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{q}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{a}</p>
                      <a
                        href="mailto:malik.basit3690@gmail.com"
                        className="inline-block mt-4 text-purple-600 dark:text-purple-400 hover:underline font-medium"
                      >
                        Ask a question
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
