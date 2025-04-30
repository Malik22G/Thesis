import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { Users, Award, TrendingUp, Globe } from "lucide-react"

export default function AboutPage() {
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">About SentiScan</h1>
                <p className="text-xl text-purple-100 mb-8">
                  We're on a mission to help businesses understand customer sentiment at scale
                </p>
              </div>
            </div>
          </div>

          {/* Our Story Section */}
          <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Story</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                      SentiScan was founded in 2021 by a team of AI researchers and business analytics experts who
                      recognized a gap in the market for accurate, aspect-based sentiment analysis.
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                      Traditional sentiment analysis tools were providing overly simplistic positive/negative
                      classifications that failed to capture the nuanced feedback customers were providing.
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                      We built SentiScan to help businesses understand exactly what customers love and hate about
                      specific aspects of their products and services, enabling targeted improvements and better
                      decision-making.
                    </p>
                  </div>
                  <div className="md:w-1/2 rounded-xl overflow-hidden shadow-xl">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1661761895484-d249cf3eacf8?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="SentiScan team"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Values</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  These core principles guide everything we do at SentiScan
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Repeatable cards */}
                {/* Card 1 */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Customer Obsession</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    We're relentlessly focused on helping our customers succeed. Their feedback drives our product
                    roadmap and priorities.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Excellence in AI</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    We're committed to building AI systems that are accurate, ethical, and explainable. We continuously
                    benchmark and improve our models.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Continuous Innovation</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    We're never satisfied with the status quo. We're constantly exploring new techniques and
                    technologies to improve our platform.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Inclusive Design</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    We build our products to work for everyone, regardless of language, industry, or technical
                    expertise.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Meet Our Team</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">The passionate people behind SentiScan</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    name: "Alex Chen",
                    role: "CEO & Co-founder",
                    bio: "Former AI researcher at Stanford with 10+ years experience in NLP and machine learning.",
                    image:
                      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    name: "Sophia Rodriguez",
                    role: "CTO & Co-founder",
                    bio: "Previously led ML engineering teams at Google, specializing in sentiment analysis and language models.",
                    image:
                      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
                  },
                  {
                    name: "Marcus Johnson",
                    role: "Head of Product",
                    bio: "Product leader with experience at top SaaS companies, focused on building intuitive data products.",
                    image:
                      "https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=1244&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    name: "Priyam Patel",
                    role: "Lead Data Scientist",
                    bio: "PhD in Computational Linguistics with expertise in multilingual sentiment analysis.",
                    image:
                      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
                  },
                  {
                    name: "David Kim",
                    role: "Head of Customer Success",
                    bio: "Passionate about helping customers extract maximum value from data and AI solutions.",
                    image:
                      "https://images.unsplash.com/photo-1625504615927-c14f4f309b63?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    name: "Emma Wilson",
                    role: "VP of Engineering",
                    bio: "Experienced engineering leader focused on building scalable, reliable AI infrastructure.",
                    image:
                      "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                ].map((member, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105"
                  >
                    <div className="h-48">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                      <p className="text-purple-600 dark:text-purple-400 mb-3">{member.role}</p>
                      <p className="text-slate-600 dark:text-slate-400">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
