"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, Upload, Youtube } from "lucide-react";
import { SentimentSummary } from "@/components/sentiment-summary";
import { DetailedAnalysis } from "./detailedAnalysis";

type SentimentScore = {
  positive: number;
  negative: number;
  neutral: number;
  overall: "positive" | "negative" | "neutral";
};

type AspectSentiment = {
  aspect: string;
  sentiment: SentimentScore;
  examples: string[];
};
type CommentAnalysis = {
  text: string
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
}

type OverallSentiment = {
  positive: number
  negative: number
  neutral: number
  overall: "positive" | "negative" | "neutral"
}

type AnalysisResult = {
  aspects: any[]  // keep this empty if not used
  overallSentiment: OverallSentiment
  comments: CommentAnalysis[]
}




export function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [inputMethod, setInputMethod] = useState("text");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const fetchYouTubeComments = async (videoId: string): Promise<string[]> => {
    const apiKey =
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const maxResults = 30;

    let comments: string[] = [];
    let pageToken = "";

    try {
      const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=${maxResults}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data?.items?.length) {
        data.items.forEach((item: any) => {
          const topLevelComment = item.snippet?.topLevelComment?.snippet;
          if (topLevelComment?.textOriginal) {
            comments.push(topLevelComment.textOriginal);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching YouTube comments:", error);
    }
    console.log(comments);
    return comments;
  };

  const analyzeText = async () => {
    if (inputMethod === "text" && !text.trim()) return;
    if (inputMethod === "youtube" && !youtubeUrl.trim()) return;
    if (inputMethod === "csv" && !selectedFile) return;
  
    setIsAnalyzing(true);
    setResult(null);
  
    try {
      let bodyPayload: any = {};
      let originalTexts: string[] = [];
  
      if (inputMethod === "text") {
        originalTexts = [text];
        bodyPayload = { text };
      } else if (inputMethod === "youtube") {
        const videoId = getYouTubeVideoId(youtubeUrl);
        if (!videoId) throw new Error("Could not parse a valid video ID from the URL.");
        const comments = await fetchYouTubeComments(videoId);
        originalTexts = comments;
        bodyPayload = { texts: comments };
      } else if (inputMethod === "csv") {
        originalTexts = ["CSV row 1 content", "CSV row 2 content"];
        bodyPayload = { texts: originalTexts };
      }
  
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
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
  
      const analysisResult: AnalysisResult = {
        aspects: [],
        overallSentiment: overall,
        comments,
      };
  
      setResult(analysisResult);
    } catch (error) {
      console.error("Error analyzing:", error);
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
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
        <Tabs value={inputMethod} onValueChange={setInputMethod}>
          <div className="border-b border-slate-200 dark:border-slate-800">
            <TabsList className="w-full rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="text"
                className={`flex-1 rounded-none py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${
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
                className={`flex-1 rounded-none py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${
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
                className={`flex-1 rounded-none py-3 px-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${
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
            <TabsContent value="text">
              <div>
                <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Enter text to analyze
                </Label>
                <Textarea
                  placeholder="Enter your text here..."
                  className="min-h-[150px] mb-4"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="csv">
              <div>
                <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Upload CSV file
                </Label>
                <div className="mb-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-slate-500" />
                        <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          CSV files only (MAX. 10MB)
                        </p>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="youtube">
              <div>
                <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Enter YouTube video URL
                </Label>
                <Input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="mb-4"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
                <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
                  We'll analyze the sentiment of comments on this video.
                </p>
              </div>
            </TabsContent>

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
          </CardContent>
        </Tabs>
      </Card>

      {result && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-4">
            <SentimentSummary result={result} />
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            <DetailedAnalysis result={result} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
