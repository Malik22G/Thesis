import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react"

export default function CareersPage() {
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Join Our Team</h1>
                <p className="text-xl text-purple-100 mb-8">
                  Help us build the future of sentiment analysis and customer intelligence
                </p>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                  View Open Positions
                </Button>
              </div>
            </div>
          </div>

          {/* Why Join Us Section */}
          <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
                  Why Join SentiScan?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-xl">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                      Cutting-Edge Technology
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Work with the latest AI and NLP technologies to solve real business problems. We're constantly
                      pushing the boundaries of what's possible in sentiment analysis.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-xl">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Remote-First Culture</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      We believe great work can happen anywhere. Our team is distributed across the globe, with flexible
                      working hours and regular virtual and in-person meetups.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-xl">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Competitive Benefits</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      We offer competitive salaries, equity options, comprehensive health benefits, generous PTO, and a
                      professional development budget.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-xl">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Diverse & Inclusive</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      We're building a diverse team where everyone belongs. Different perspectives make our product and
                      company stronger.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Open Positions Section */}
          <section
            className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800"
            id="open-positions"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Open Positions</h2>

                <div className="space-y-6">
                  {[
                    {
                      title: "Senior Machine Learning Engineer",
                      department: "Engineering",
                      location: "Remote (US/Europe)",
                      type: "Full-time",
                    },
                    {
                      title: "Product Manager, Analytics",
                      department: "Product",
                      location: "Remote (US/Canada)",
                      type: "Full-time",
                    },
                    {
                      title: "Customer Success Manager",
                      department: "Customer Success",
                      location: "Remote (Global)",
                      type: "Full-time",
                    },
                    {
                      title: "Frontend Engineer",
                      department: "Engineering",
                      location: "Remote (Global)",
                      type: "Full-time",
                    },
                    {
                      title: "Data Scientist, NLP",
                      department: "Data Science",
                      location: "Remote (US/Europe)",
                      type: "Full-time",
                    },
                  ].map((job, index) => (
                    <Card key={index} className="transition-all hover:shadow-md">
                      <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                              <Briefcase className="mr-1 h-4 w-4" />
                              {job.department}
                            </div>
                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                              <MapPin className="mr-1 h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                              <Clock className="mr-1 h-4 w-4" />
                              {job.type}
                            </div>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex justify-end">
                        <Button variant="outline" className="group">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                    Don't see a role that fits your skills? We're always looking for talented people to join our team.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Send General Application
                  </Button>
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

