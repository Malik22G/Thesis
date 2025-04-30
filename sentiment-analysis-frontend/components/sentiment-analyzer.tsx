"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, Upload, Youtube } from "lucide-react";
import { SentimentSummary } from "@/components/sentiment-summary";
import { DetailedAnalysis } from "./detailedAnalysis";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextAnalysisLoading } from "@/components/text-analysis-loading";
import { AnalysisLoading } from "@/components/analysis-loading";
import { AnalysisComplete } from "@/components/analysis-complete";

type CommentAnalysis = {
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
};

type OverallSentiment = {
  positive: number;
  negative: number;
  neutral: number;
  overall: "positive" | "negative" | "neutral";
};

type AnalysisResult = {
  aspects: any[];
  overallSentiment: OverallSentiment;
  comments: CommentAnalysis[];
};

export function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [inputMethod, setInputMethod] = useState("text");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [commentCount, setCommentCount] = useState("50");
  const [showCompletion, setShowCompletion] = useState(false);
  const [analysisState, setAnalysisState] = useState<"idle" | "analyzing" | "success" | "error" | "complete">("idle");
  const [showResults, setShowResults] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setResult(null);
    setAnalysisState("idle");
    setShowCompletion(false);
    setShowResults(false);
  }, [inputMethod]);

  useEffect(() => {
    if (inputMethod === "text") {
      setActiveTab("summary");
    }
  }, [inputMethod]);

  useEffect(() => {
    if (analysisState === "success" && result) {
      if (inputMethod === "text") {
        // For text input, immediately show results without any animation
        setShowResults(true);
      } else {
        // For other input methods, show completion message first
        const completeTimer = setTimeout(() => {
          setShowCompletion(true);
          
          // Then hide it and show results after a delay
          const resultsTimer = setTimeout(() => {
            setShowCompletion(false);
            setShowResults(true);
          }, 2000); // How long the completion message shows
          
          return () => clearTimeout(resultsTimer);
        }, 1500); // Wait a bit after analysis is done before showing completion
        
        return () => clearTimeout(completeTimer);
      }
    }
  }, [analysisState, result, inputMethod]);

  const getYouTubeVideoId = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      if (urlObj.searchParams.get("v")) {
        return urlObj.searchParams.get("v");
      }
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.substring(1);
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const fetchYouTubeComments = async (
    videoId: string,
    maxResults: number
  ): Promise<string[]> => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    let comments: string[] = [];
    try {
      const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=${maxResults}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data?.items?.length) {
        data.items.forEach((item: any) => {
          const comment = item.snippet?.topLevelComment?.snippet?.textOriginal;
          if (comment) comments.push(comment);
        });
      }
    } catch (error) {
      console.error("Error fetching YouTube comments:", error);
    }
    return comments;
  };

  const parseCSV = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target?.result) {
          reject(new Error("Failed to read file"));
          return;
        }

        const text = event.target.result as string;
        const rows = text.split(/\r?\n/).filter(row => row.trim());
        
        const startIndex = rows[0].toLowerCase().includes("text") ? 1 : 0;
        const texts = rows.slice(startIndex).map(row => {
          if (row.includes(",")) {
            return row.split(",")[0].trim().replace(/^"|"$/g, "");
          }
          return row.trim();
        });
        
        resolve(texts);
      };
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsText(file);
    });
  };

  const analyzeText = async () => {
    if (inputMethod === "text" && !text.trim()) return;
    if (inputMethod === "youtube" && !youtubeUrl.trim()) return;
    if (inputMethod === "csv" && !selectedFile) return;

    setIsAnalyzing(true);
    setResult(null);
    setAnalysisState("analyzing");
    setShowCompletion(false);
    setShowResults(false);

    try {
      let bodyPayload: any = {};
      let originalTexts: string[] = [];

      if (inputMethod === "text") {
        originalTexts = [text];
        bodyPayload = { text };
      } else if (inputMethod === "youtube") {
        const videoId = getYouTubeVideoId(youtubeUrl);
        if (!videoId) throw new Error("Invalid video URL.");
        const maxComments = parseInt(commentCount);
        const comments = await fetchYouTubeComments(videoId, maxComments);
        originalTexts = comments;
        bodyPayload = { texts: comments };
      } else if (inputMethod === "csv" && selectedFile) {
        const texts = await parseCSV(selectedFile);
        originalTexts = texts;
        bodyPayload = { texts };
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const comments: CommentAnalysis[] = data.comments.map((entry: any) => ({
        text: entry.text.slice(0, 800),
        sentiment: entry.sentiment,
        confidence: entry.confidence,
      }));

      const overall: OverallSentiment = {
        positive: data.summary.positive,
        negative: data.summary.negative,
        neutral: data.summary.neutral,
        overall: data.summary.overall,
      };

      setResult({ aspects: [], overallSentiment: overall, comments });
      setAnalysisState("success");
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysisState("error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
          {/* Input Method Selection */}
          <Tabs value={inputMethod} onValueChange={setInputMethod}>
            <div className="border-b border-slate-200 dark:border-slate-800">
              <TabsList className="w-full rounded-none h-auto p-0 bg-transparent flex">
                <TabsTrigger
                  value="text"
                  className={`flex-1 rounded-none py-3 px-4 border-b-2 ${
                    inputMethod === "text"
                      ? "border-purple-600 text-purple-600 dark:text-purple-400"
                      : "border-transparent"
                  }`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Text Input
                </TabsTrigger>
                <TabsTrigger
                  value="csv"
                  className={`flex-1 rounded-none py-3 px-4 border-b-2 ${
                    inputMethod === "csv"
                      ? "border-purple-600 text-purple-600 dark:text-purple-400"
                      : "border-transparent"
                  }`}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  CSV Upload
                </TabsTrigger>
                <TabsTrigger
                  value="youtube"
                  className={`flex-1 rounded-none py-3 px-4 border-b-2 ${
                    inputMethod === "youtube"
                      ? "border-purple-600 text-purple-600 dark:text-purple-400"
                      : "border-transparent"
                  }`}
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube
                </TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {inputMethod === "text" && (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label className="block text-sm font-medium mb-2">
                      Enter text to analyze
                    </Label>
                    <Textarea
                      ref={textAreaRef}
                      placeholder="Enter your text here..."
                      className="min-h-[150px] mb-4"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </motion.div>
                )}
                {inputMethod === "csv" && (
                  <motion.div
                    key="csv"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label className="block text-sm font-medium mb-2">
                      Upload CSV file
                    </Label>
                    <div className="mb-4">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-slate-500" />
                          <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-slate-500">CSV only (MAX. 10MB)</p>
                        </div>
                        <Input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                      </label>
                      {selectedFile && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                          Selected file: {selectedFile.name}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mb-4">
                      Your CSV file should contain a column named "text" with the content to analyze.
                      If no header is provided, all rows will be analyzed.
                    </p>
                  </motion.div>
                )}
                {inputMethod === "youtube" && (
                  <motion.div
                    key="youtube"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label className="block text-sm font-medium mb-2">
                      Enter YouTube video URL
                    </Label>
                    <Input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="mb-4"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                    />
                    
                    <div className="mb-4">
                      <Label className="block text-sm font-medium mb-2">
                        Number of comments to analyze
                      </Label>
                      <Select
                        value={commentCount}
                        onValueChange={setCommentCount}
                      >
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="50" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 comments</SelectItem>
                          <SelectItem value="25">25 comments</SelectItem>
                          <SelectItem value="50">50 comments</SelectItem>
                          <SelectItem value="100">100 comments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <p className="text-sm text-slate-500 mb-4">
                      We'll analyze the sentiment of comments on this video.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={analyzeText}
                  disabled={
                    isAnalyzing ||
                    (inputMethod === "text" && !text.trim()) ||
                    (inputMethod === "csv" && !selectedFile) ||
                    (inputMethod === "youtube" && !youtubeUrl.trim())
                  }
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Sentiment"
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>
      
      {/* Loading Animations and Processing States - Only for non-text inputs */}
      <AnimatePresence>
        {analysisState === "analyzing" && inputMethod !== "text" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-6 border rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
          >
            <AnalysisLoading type={inputMethod as "youtube" | "csv"} />
          </motion.div>
        )}

        {showCompletion && inputMethod !== "text" && (
          <motion.div
            key="completion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-6 border rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
          >
            <AnalysisComplete />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Error State */}
      {analysisState === "error" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-4 border rounded-lg border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400"
        >
          Error during analysis. Please try again or check your input.
        </motion.div>
      )}

      {/* Results Display */}
      {result && showResults && (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Results Tabs: Only show "Detailed Analysis" if input method is not text */}
            <TabsList className={`w-full ${inputMethod === "text" ? "grid grid-cols-1" : "grid grid-cols-2"}`}>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              {inputMethod !== "text" && (
                <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
              )}
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="summary" className="mt-4">
                  <SentimentSummary 
                    result={result} 
                    hidePercentages={inputMethod === "text"} 
                    hideOverallSentiment={inputMethod !== "text"} 
                  />
                </TabsContent>
                {inputMethod !== "text" && (
                  <TabsContent value="details" className="mt-4">
                    <DetailedAnalysis result={result} />
                  </TabsContent>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      )}
    </motion.div>
  );
}