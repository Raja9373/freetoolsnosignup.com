export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: 'GPT-5' | 'Gemini' | 'Claude' | 'AI Tools';
  source: string;
  sourceUrl: string;
  timeAgo: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    slug: 'openai-gpt-5-multimodal-reasoning-breakthrough',
    title: 'OpenAI Unveils GPT-5 Architectural Breakthrough with Native Real-Time Multimodal Reasoning',
    summary: 'OpenAI has officially previewed its next-generation flagship model, showcasing unprecedented zero-shot logic capabilities, real-time voice synthesis, and sub-50ms latency across complex coding benchmarks.',
    content: `OpenAI researchers have published comprehensive benchmarks for their upcoming flagship architecture, tentatively named GPT-5. Unlike previous iterations that stitched separate vision and text models together, GPT-5 features a native unified transformer backbone trained simultaneously on audio, high-definition video, deep-math formal proofs, and multi-file software repositories.

Key highlights from the technical release include:
• **Zero-Shot Reasoning**: Scoring 96.4% on complex SWE-bench verification tests without specialized agent loops.
• **Ultra-Low Latency Voice**: Direct speech-to-speech dialogue processing running at 45 milliseconds round-trip time.
• **Advanced Code Synthesis**: Capability to refactor entire monolithic legacy microservices into clean, tested Rust or TypeScript modules in a single prompt.

Industry analysts predict widespread enterprise rollout by Q4, with developer API preview access opening to tier-1 enterprise partners starting next month.`,
    category: 'GPT-5',
    source: 'AI News Global',
    sourceUrl: 'https://artificialintelligence-news.com',
    timeAgo: '23 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true
  },
  {
    id: '2',
    slug: 'google-gemini-2-5-ultra-autonomous-agents',
    title: 'Google DeepMind Launches Gemini 2.5 Ultra with 10M Token Context Window for Enterprise',
    summary: 'Google integrates advanced execution sandboxes directly into Gemini 2.5, enabling autonomous agents to execute Python scripts, query SQL databases, and deploy cloud infrastructure.',
    content: `Google DeepMind has announced the immediate availability of Gemini 2.5 Ultra. The standout feature is its massive 10-million-token context window paired with a native execution sandbox that allows the model to run code, verify unit tests, and troubleshoot compiler errors autonomously before returning answers to the user.

Developers can now ingest entire corporate codebases, legal libraries, or decades of financial statements into a single prompt session without loss of semantic retrieval accuracy.`,
    category: 'Gemini',
    source: 'DeepMind Tech Brief',
    sourceUrl: 'https://deepmind.google',
    timeAgo: '1 hour ago',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    slug: 'anthropic-claude-3-7-sonnet-extended-thinking',
    title: 'Anthropic Introduces Claude 3.7 Sonnet featuring Dynamic Extended Thinking Controls',
    summary: 'Anthropic gives developers explicit control over model reasoning depth, allowing real-time toggling between instant responses and deep architectural deliberations.',
    content: `Anthropic's newest release, Claude 3.7 Sonnet, introduces "Extended Thinking Mode." Users and developers can now allocate specific compute budgets for complex logical puzzles, scientific hypothesis testing, and cryptographic verification. 

Early benchmarks show remarkable gains in competitive programming and automated vulnerability discovery across legacy web frameworks.`,
    category: 'Claude',
    source: 'Anthropic Research',
    sourceUrl: 'https://anthropic.com',
    timeAgo: '3 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    slug: 'top-10-ai-coding-assistants-2026',
    title: 'Top 10 AI Coding Assistants Compared: Which LLM Wins for Full-Stack Engineering in 2026?',
    summary: 'An in-depth evaluation of Cursor, GitHub Copilot, Windsurf, and custom terminal agents across 500 real-world production bug fixes.',
    content: `Software engineering in 2026 has fundamentally shifted from manual boilerplate writing to agentic orchestration. We tested ten leading AI coding assistants on real GitHub issues ranging from React hydration bugs to distributed Go race conditions.

The results highlight that model autonomy combined with secure local terminal sandboxes yields a 4.2x productivity multiplier for senior developers.`,
    category: 'AI Tools',
    source: 'DevCode Weekly',
    sourceUrl: 'https://devcode.example.com',
    timeAgo: '5 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    slug: 'gpt-5-safety-evaluations-alignment',
    title: 'OpenAI Publishes Comprehensive Safety and Red-Teaming Report for GPT-5',
    summary: 'Independent safety auditors praise enhanced alignment protocols and automated guardrails against prompt injection and autonomous malware creation.',
    content: `As frontier models approach human-level expert performance across cybersecurity and biological research domains, OpenAI has released a 200-page system card detailing extensive red-teaming exercises conducted with national security labs.

The report highlights robust constitutional classifiers and real-time behavioral monitoring that prevent unauthorized payload generation.`,
    category: 'GPT-5',
    source: 'AI Policy Review',
    sourceUrl: 'https://aipolicy.example.com',
    timeAgo: '7 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    slug: 'gemini-flash-2-5-edge-devices',
    title: 'Google Brings Gemini Flash 2.5 to Smartwatches and Edge IoT Devices with 0.1W Power Draw',
    summary: 'On-device neural inference enables real-time offline translation and biometric health forecasting directly on wearable hardware.',
    content: `Google hardware engineers have successfully quantized Gemini Flash 2.5 to run on ultra-low-power ARM NPUs. Consuming less than 0.1 watts, the model delivers instant speech transcription, contextual reminders, and health diagnostics without requiring cloud connectivity.`,
    category: 'Gemini',
    source: 'Silicon Daily',
    sourceUrl: 'https://silicondaily.example.com',
    timeAgo: '9 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
  }
];
