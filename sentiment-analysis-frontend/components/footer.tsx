import Link from "next/link"
import { BarChart2, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <BarChart2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">SentiMeter</span>
            </Link>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Advanced aspect-based sentiment analysis powered by AI.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-center text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} SentiScan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

