import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

