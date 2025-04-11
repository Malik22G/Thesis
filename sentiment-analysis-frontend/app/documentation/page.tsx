import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ModelComparison } from "@/components/model-comparison"
import { ModelCard } from "@/components/model-card"
import { PageTransition } from "@/components/page-transition"

export default function DocumentationPage() {
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Technical Documentation</h1>
                <p className="text-xl text-purple-100 mb-8">
                  Explore the technology behind our sentiment analysis models and learn how they compare.
                </p>
              </div>
            </div>
          </div>

          {/* Model Comparison Section */}
          <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                  Model Performance Comparison
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 text-center">
                  We've benchmarked several state-of-the-art language models on a YouTube comments dataset to provide
                  the most accurate sentiment analysis.
                </p>
              </div>

              <div className="mb-16">
                <ModelComparison />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <ModelCard
                  name="BERT"
                  description="Bidirectional Encoder Representations from Transformers is a transformer-based machine learning technique for natural language processing pre-training developed by Google."
                  strengths={["Strong contextual understanding", "Robust performance across tasks", "Well-documented"]}
                  limitations={["Computationally expensive", "Slower inference time"]}
                  bestFor="General purpose sentiment analysis with high accuracy requirements."
                />

                <ModelCard
                  name="RoBERTa"
                  description="A Robustly Optimized BERT Pretraining Approach that modifies key hyperparameters in BERT, removing the next-sentence pretraining objective."
                  strengths={[
                    "Improved accuracy over BERT",
                    "Better handling of nuanced language",
                    "More robust training",
                  ]}
                  limitations={["Large model size", "Resource intensive"]}
                  bestFor="Applications requiring nuanced understanding of sentiment with subtle expressions."
                />

                <ModelCard
                  name="DistilBERT"
                  description="A distilled version of BERT that retains 97% of its language understanding capabilities while being 40% smaller and 60% faster."
                  strengths={["Faster inference", "Smaller model size", "Lower resource requirements"]}
                  limitations={["Slightly lower accuracy than full BERT", "Less nuanced understanding"]}
                  bestFor="Real-time applications where speed is critical but high accuracy is still needed."
                />

                <ModelCard
                  name="DeBERTa"
                  description="Decoding-enhanced BERT with disentangled attention, improving on BERT and RoBERTa by using disentangled attention mechanisms."
                  strengths={[
                    "State-of-the-art performance",
                    "Better handling of complex sentences",
                    "Enhanced contextual understanding",
                  ]}
                  limitations={["Very computationally expensive", "Complex implementation"]}
                  bestFor="Enterprise applications requiring the highest possible accuracy for sentiment analysis."
                />
              </div>
            </div>
          </section>

          {/* Technical Details Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  How Our Sentiment Analysis Works
                </h2>

                <div className="space-y-12">
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">1. Data Preprocessing</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Before analysis, text data undergoes cleaning, tokenization, and normalization. We remove
                      irrelevant characters, split text into tokens, and standardize formatting to ensure consistent
                      analysis.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">2. Aspect Extraction</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Our models identify specific aspects or features mentioned in the text using named entity
                      recognition and dependency parsing techniques. This allows us to categorize sentiment by specific
                      product or service aspects.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                      3. Sentiment Classification
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      For each identified aspect, our transformer-based models analyze the surrounding context to
                      determine sentiment polarity (positive, negative, or neutral) and intensity. This provides nuanced
                      understanding beyond simple positive/negative classification.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">4. Result Aggregation</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Results are aggregated to provide both aspect-specific and overall sentiment scores. Our
                      visualization tools make these insights accessible and actionable for business decision-making.
                    </p>
                  </div>
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

