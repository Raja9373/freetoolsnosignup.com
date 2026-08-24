import { NewsItem } from '../types';

export const NEWS_DATABASE: NewsItem[] = [
  {
    id: 'news-1',
    title: 'OpenAI & Google Unveil Next-Gen Agent Protocols for Browser-Native Workflows',
    summary: 'New WebAssembly runtimes allow multi-modal AI models to execute 100% on the client device without sending private data to cloud servers.',
    source: 'TechCrunch',
    timeAgo: '45m ago',
    category: 'AI',
    readTime: '3 min',
    content: 'Browser-based computation has taken a massive leap forward as engineers demonstrate client-side token evaluation and tokenization running over WebGPU. This milestone guarantees that sensitive documents such as resumes, tax statements, and proprietary codebases can be analyzed with zero data leakage.'
  },
  {
    id: 'news-2',
    title: 'Modern ATS Systems Shift Toward Semantic Skill Graphs in 2026 Hiring Trends',
    summary: 'Recruiters are abandoning simple exact-keyword filters in favor of context-aware job description mapping.',
    source: 'The Verge',
    timeAgo: '1h ago',
    category: 'Jobs',
    readTime: '4 min',
    content: 'Human resources departments at Fortune 500 companies have updated their applicant tracking systems (Workday, Greenhouse, Taleo) to evaluate project context and quantifiable outcomes over keyword stuffing. Candidates using ATS diagnostic tools that calculate density and action verb impact are seeing a 3.4x interview callback rate.'
  },
  {
    id: 'news-3',
    title: 'Client-Side PDF Engines Surpass Serverless Convert Speeds in Benchmark Tests',
    summary: 'WebAssembly-compiled PDF libraries execute document merging and splitting up to 12x faster than cloud round-trips.',
    source: 'GitHub Blog',
    timeAgo: '2h ago',
    category: 'Tools',
    readTime: '2 min',
    content: 'Testing across 10,000 PDF merge and compression operations revealed that local browser execution eliminates network transmission lag and server queue bottlenecks, offering instant gratification while safeguarding user privacy.'
  },
  {
    id: 'news-4',
    title: 'AI Detection Algorithms Update Heuristics for Burstiness & Perplexity Shifts',
    summary: 'Educational institutions adopt hybrid burstiness metrics to distinguish human creative cadence from synthetic text.',
    source: 'MIT Tech Review',
    timeAgo: '3h ago',
    category: 'AI',
    readTime: '5 min',
    content: 'Standard LLMs exhibit predictable sentence length distributions and recurring transition words (such as "delve", "tapestry", and "furthermore"). Modern detection platforms analyze standard deviation across sentence lengths to pinpoint algorithmic cadence.'
  },
  {
    id: 'news-5',
    title: 'Synthetic Test Data Generators Gain Momentum Among ISO & GDPR Compliance Teams',
    summary: 'Development teams switch away from production database dumps toward randomized deterministic fake data generators.',
    source: 'Dev.to',
    timeAgo: '4h ago',
    category: 'Dev',
    readTime: '3 min',
    content: 'With strict regulatory penalties for accidental PII leakage in staging environments, automated test data generators producing Luhn-valid credit cards, dummy UUIDs, and synthetic addresses have become mandatory dev tools.'
  },
  {
    id: 'news-6',
    title: 'Remote Job Market Sees 40% Surge in Technical Assessment Tool Usage',
    summary: 'Job seekers utilize real-time salary negotiation engines and STAR behavioral coaching to prepare for live rounds.',
    source: 'Forbes Tech',
    timeAgo: '6h ago',
    category: 'Jobs',
    readTime: '4 min',
    content: 'As tech hiring standardizes on structured rubric evaluations, tools that structure accomplishments into quantifiable bullet points have democratized career mobility across global applicants.'
  },
  {
    id: 'news-7',
    title: 'WebP and AVIF Adoption Hits 94% as Browser Image Compression Matures',
    summary: 'Next-gen raster encoders reduce web bandwidth consumption by 1.8 Petabytes daily.',
    source: 'Hacker News',
    timeAgo: '8h ago',
    category: 'Tools',
    readTime: '2 min',
    content: 'Browser Canvas 2D and WebCodecs APIs now allow high-fidelity lossy and lossless image re-compression directly within user browser memory, removing the need for third-party image upload subscriptions.'
  },
  {
    id: 'news-8',
    title: 'The Rise of "No-Signup" SaaS: How Utility Portals Are Winning Developer Trust',
    summary: 'Users increasingly reject forced login walls, paywalls, and email capture popups for everyday digital tasks.',
    source: 'VentureBeat',
    timeAgo: '10h ago',
    category: 'Tools',
    readTime: '3 min',
    content: 'Modern internet users have grown weary of providing credit cards or signing up for newsletters just to convert a PDF or format a JSON payload. Free, instant client-side utility platforms are winning massive organic adoption.'
  },
  {
    id: 'news-9',
    title: 'DeepSeek and Anthropic Release Open Weight Architectures for Local Reasoning',
    summary: 'Compact 7B and 8B parameter models enable sophisticated natural language rewriting on consumer hardware.',
    source: 'ArXiv Daily',
    timeAgo: '12h ago',
    category: 'AI',
    readTime: '4 min',
    content: 'Researchers have published quantized weights that bring academic paraphrasing, citation formatting, and style transfer directly to modern laptops without requiring dedicated server clusters.'
  },
  {
    id: 'news-10',
    title: 'Frontend Developers Adopt Strict Content Security Policies for Third-Party Code',
    summary: 'Local privacy standards demand zero telemetry and zero external script execution on sensitive developer payloads.',
    source: 'Smashing Magazine',
    timeAgo: '14h ago',
    category: 'Dev',
    readTime: '3 min',
    content: 'Best practice guides now highlight client-side sandbox architectures where all user inputs stay within browser localStorage and IndexedDB, completely isolated from remote tracking.'
  },
  {
    id: 'news-11',
    title: 'Interest Rate Volatility Drives Record Traffic to Financial EMI & Mortgage Calculators',
    summary: 'Homebuyers utilize interactive compound amortization curves to forecast loan payoff strategies.',
    source: 'Bloomberg Tech',
    timeAgo: '18h ago',
    category: 'Tools',
    readTime: '2 min',
    content: 'With central banks fine-tuning benchmark interest rates, interactive calculators with customizable prepayment scenarios have become indispensable for personal financial planning.'
  },
  {
    id: 'news-12',
    title: 'Global Cybersecurity Alerts Highlight Risks of Storing Plaintext Test Credentials',
    summary: 'Security audits recommend automated hash verification and cryptographic salt generators for local dev environments.',
    source: 'Wired',
    timeAgo: '1d ago',
    category: 'Dev',
    readTime: '3 min',
    content: 'Security teams emphasize using Web Crypto SHA-256 and Base64 tooling directly in sandboxed browsers rather than pasting sensitive API keys into unverified online converter websites.'
  }
];
