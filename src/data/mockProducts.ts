export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'AI' | 'Productivity' | 'Marketing' | 'Developer' | 'Design';
  url: string;
  logo: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  upvotes: number;
  submittedDate: string;
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    slug: 'lumina-ai',
    name: 'Lumina AI',
    tagline: 'Lightning-fast AI writing assistant for modern creators',
    description: 'Lumina AI helps copywriters, bloggers, and marketers generate high-converting SEO articles, landing page copy, and social media threads in seconds with advanced LLM prompting.',
    category: 'AI',
    url: 'https://lumina-ai.example.com',
    logo: '✨',
    pricing: 'Freemium',
    upvotes: 342,
    submittedDate: '2026-09-01'
  },
  {
    id: '2',
    slug: 'taskflow-pro',
    name: 'TaskFlow Pro',
    tagline: 'Minimalist kanban board and time blocking for remote teams',
    description: 'Organize daily sprints, track milestone progress, and manage async team workflows without bloated enterprise bloatware. Built for speed and focus.',
    category: 'Productivity',
    url: 'https://taskflow.example.com',
    logo: '⚡',
    pricing: 'Free',
    upvotes: 289,
    submittedDate: '2026-09-03'
  },
  {
    id: '3',
    slug: 'growthmetrics',
    name: 'GrowthMetrics',
    tagline: 'Real-time Stripe and subscription analytics dashboard',
    description: 'Monitor MRR, churn rate, LTV, and customer acquisition cost instantly with secure API integrations and beautiful interactive charts.',
    category: 'Marketing',
    url: 'https://growthmetrics.example.com',
    logo: '📈',
    pricing: 'Paid',
    upvotes: 215,
    submittedDate: '2026-09-05'
  },
  {
    id: '4',
    slug: 'devpulse-api',
    name: 'DevPulse API',
    tagline: 'Instant uptime monitoring and webhook health checks',
    description: 'Get notified via Slack, Discord, or SMS the exact millisecond your API endpoint or database cluster experiences latency spikes or downtime.',
    category: 'Developer',
    url: 'https://devpulse.example.com',
    logo: '🔌',
    pricing: 'Freemium',
    upvotes: 198,
    submittedDate: '2026-09-06'
  },
  {
    id: '5',
    slug: 'pixelcraft-ui',
    name: 'PixelCraft UI',
    tagline: 'Tailwind CSS component library for SaaS startups',
    description: 'Copy-paste accessible, responsive UI blocks crafted with Tailwind CSS v4 and React. Dark mode included by default.',
    category: 'Design',
    url: 'https://pixelcraft.example.com',
    logo: '🎨',
    pricing: 'Open Source',
    upvotes: 412,
    submittedDate: '2026-08-28'
  },
  {
    id: '6',
    slug: 'promptgenius',
    name: 'PromptGenius AI',
    tagline: 'Curated prompt engineering library for GPT-4o & Claude 3.5',
    description: 'Discover and test 5,000+ battle-tested prompts for coding, creative writing, data extraction, and automated workflow agents.',
    category: 'AI',
    url: 'https://promptgenius.example.com',
    logo: '🧠',
    pricing: 'Freemium',
    upvotes: 356,
    submittedDate: '2026-09-07'
  },
  {
    id: '7',
    slug: 'focuslooper',
    name: 'FocusLooper',
    tagline: 'Binaural beats and ambient soundscapes for deep work',
    description: 'Block out office chatter and boost cognitive flow state with scientifically tuned ambient frequencies and coffee shop generators.',
    category: 'Productivity',
    url: 'https://focuslooper.example.com',
    logo: '🎧',
    pricing: 'Free',
    upvotes: 178,
    submittedDate: '2026-09-08'
  },
  {
    id: '8',
    slug: 'seochecker-bot',
    name: 'SEOChecker Bot',
    tagline: 'Automated on-page SEO audits and meta tag validator',
    description: 'Scan your entire website for broken links, missing alt tags, slow page speeds, and OpenGraph snippet errors in one click.',
    category: 'Marketing',
    url: 'https://seochecker.example.com',
    logo: '🔍',
    pricing: 'Freemium',
    upvotes: 245,
    submittedDate: '2026-09-02'
  },
  {
    id: '9',
    slug: 'cloudvault-storage',
    name: 'CloudVault S3',
    tagline: 'Zero-knowledge encrypted object storage for developers',
    description: 'Secure client-side encryption before uploading files to decentralized object storage. S3 compatible API.',
    category: 'Developer',
    url: 'https://cloudvault.example.com',
    logo: '🔒',
    pricing: 'Paid',
    upvotes: 164,
    submittedDate: '2026-08-30'
  },
  {
    id: '10',
    slug: 'figma-to-code',
    name: 'Figma2React Pro',
    tagline: 'Convert Figma frames into clean React & Tailwind code',
    description: 'Export production-ready component trees with correct autolayouts, semantic HTML, and responsive breakpoints instantly.',
    category: 'Design',
    url: 'https://figma2react.example.com',
    logo: '⚛️',
    pricing: 'Paid',
    upvotes: 389,
    submittedDate: '2026-09-04'
  },
  {
    id: '11',
    slug: 'copilot-notes',
    name: 'CopilotNotes',
    tagline: 'AI meeting assistant that transcribes and auto-summarizes Zoom calls',
    description: 'Never take manual meeting notes again. Automatically extracts action items, decisions, and follow-up emails.',
    category: 'AI',
    url: 'https://copilotnotes.example.com',
    logo: '📝',
    pricing: 'Freemium',
    upvotes: 310,
    submittedDate: '2026-09-09'
  },
  {
    id: '12',
    slug: 'mailflow-crm',
    name: 'MailFlow CRM',
    tagline: 'Lightweight cold email outreach and CRM for founders',
    description: 'Send personalized email sequences, track open rates automatically, and manage pipeline deals in a clean Kanban view.',
    category: 'Marketing',
    url: 'https://mailflow.example.com',
    logo: '✉️',
    pricing: 'Freemium',
    upvotes: 222,
    submittedDate: '2026-09-01'
  }
];
