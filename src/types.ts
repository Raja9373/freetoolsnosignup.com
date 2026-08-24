export type ToolCategory = 
  | 'pdf' 
  | 'image' 
  | 'calculator' 
  | 'ai-study' 
  | 'job-ats' 
  | 'dev-pro';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  categoryName: string;
  description: string;
  icon: string;
  isPopular?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  workingBadge: string; // e.g. "100% Client-Side", "Instant"
  runsCount: number;
  tags: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceIcon?: string;
  timeAgo: string;
  category: 'AI' | 'Tools' | 'Jobs' | 'Dev';
  readTime: string;
  content: string;
  url?: string;
}

export interface RecentTool {
  id: string;
  name: string;
  category: ToolCategory;
  icon: string;
  usedAt: number; // timestamp
}

export interface ATSAnalysisResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'Needs Work';
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingScore: number;
  actionVerbScore: number;
  measurableResultsScore: number;
  suggestions: string[];
  optimizedResumeText: string;
}

export interface AIDetectorResult {
  aiScore: number; // 0 to 100
  humanScore: number;
  verdict: 'Entirely Human' | 'Likely Human' | 'Mixed AI & Human' | 'Likely AI Generated' | 'Highly Confident AI';
  burstiness: number;
  perplexity: number;
  buzzwordsFound: string[];
  sentenceAnalysis: Array<{
    text: string;
    score: number; // 0 to 100
    isAiLikely: boolean;
  }>;
}

export interface FakePerson {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  company: string;
  jobTitle: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardType: 'Visa' | 'Mastercard' | 'Amex';
}
