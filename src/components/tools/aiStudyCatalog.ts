export interface AIStudyToolItem {
  id: string;
  name: string;
  category: 'ai-detector' | 'humanizer-paraphrase' | 'academic-writing' | 'research-citations' | 'study-flashcards';
  description: string;
  tags: string[];
  icon: string;
  badge?: string;
  defaultInput?: string;
}

export const ALL_AI_STUDY_TOOLS: AIStudyToolItem[] = [
  // 1-10: AI CONTENT DETECTORS & PERPLEXITY AUDITORS
  {
    id: 'ai-detector',
    name: 'Real AI Content Detector & Heatmap',
    category: 'ai-detector',
    description: 'Calculate sentence burstiness, perplexity variance, and 35+ AI cliché buzzwords with color-coded heatmap.',
    tags: ['ai detector', 'burstiness', 'chatgpt', 'heatmap', 'perplexity'],
    icon: 'Sparkles',
    badge: 'Burstiness Math'
  },
  {
    id: 'chatgpt-detector-pro',
    name: 'ChatGPT & GPT-4 Detector',
    category: 'ai-detector',
    description: 'Spot GPT-4 characteristic structural repetition, transitions ("Furthermore", "In conclusion"), and low entropy.',
    tags: ['chatgpt', 'gpt4', 'detector', 'academic integrity'],
    icon: 'Bot'
  },
  {
    id: 'claude-detector-pro',
    name: 'Claude & Anthropomorphic Text Detector',
    category: 'ai-detector',
    description: 'Detect Claude stylometric markers: nuanced disclaimers, balanced multi-clauses, and neutral hedges.',
    tags: ['claude', 'anthropic', 'detector', 'style'],
    icon: 'Brain'
  },
  {
    id: 'gemini-detector-pro',
    name: 'Gemini & Google AI Style Analyzer',
    category: 'ai-detector',
    description: 'Analyze bullet-heavy formatting, synthesized list structures, and query summarization traits.',
    tags: ['gemini', 'google ai', 'detector', 'analyzer'],
    icon: 'Cpu'
  },
  {
    id: 'sentence-burstiness-auditor',
    name: 'Sentence Burstiness & Cadence Auditor',
    category: 'ai-detector',
    description: 'Mathematically graph standard deviation of sentence lengths against mean cadence.',
    tags: ['burstiness', 'cadence', 'statistics', 'sentence length'],
    icon: 'BarChart3'
  },
  {
    id: 'ai-buzzword-scanner',
    name: 'AI Cliché & Buzzword Scanner',
    category: 'ai-detector',
    description: 'Flag overused generative words: delve, embark, tapestry, testament, paramount, leverage.',
    tags: ['buzzwords', 'cliche', 'delve', 'tapestry', 'scanner'],
    icon: 'Search'
  },
  {
    id: 'vocabulary-entropy-checker',
    name: 'Vocabulary Richness & Entropy Meter',
    category: 'ai-detector',
    description: 'Measure Type-Token Ratio (TTR) and Hapax Legomena frequency to evaluate natural human vocabulary.',
    tags: ['entropy', 'ttr', 'type token ratio', 'vocabulary'],
    icon: 'Activity'
  },
  {
    id: 'ai-hallucination-spotter',
    name: 'AI Unsupported Claim & Date Spotter',
    category: 'ai-detector',
    description: 'Scan essay text for vague citations ("Studies show", "Recent reports indicate") lacking verifiable sources.',
    tags: ['hallucination', 'claims', 'fact-check', 'verification'],
    icon: 'AlertCircle'
  },
  {
    id: 'readability-flesch-kincaid-pro',
    name: 'Flesch-Kincaid & Gunning Fog Readability',
    category: 'ai-detector',
    description: 'Calculate real Flesch Reading Ease (0-100) and US school grade level needed to comprehend.',
    tags: ['flesch kincaid', 'gunning fog', 'grade level', 'readability'],
    icon: 'Eye'
  },
  {
    id: 'plagiarism-ngram-checker',
    name: 'Local N-Gram Plagiarism & Uniqueness Meter',
    category: 'ai-detector',
    description: 'Check 4-gram and 5-gram token overlap against reference academic corpora for instant uniqueness %.',
    tags: ['plagiarism', 'uniqueness', 'n-gram', 'checker'],
    icon: 'ShieldCheck',
    badge: 'Uniqueness %'
  },

  // 11-20: HUMANIZERS & PARAPHRASERS
  {
    id: 'ai-humanizer',
    name: 'Real AI Text Humanizer & Rewriter',
    category: 'humanizer-paraphrase',
    description: 'Replace 100+ AI buzzwords with natural human idioms, vary rhythm, and eliminate synthetic transitions.',
    tags: ['humanizer', 'bypass ai', 'rewrite', 'human tone', 'natural'],
    icon: 'Sparkles',
    badge: '100+ Synonyms'
  },
  {
    id: 'essay-paraphraser',
    name: 'Academic Paraphraser Pro',
    category: 'humanizer-paraphrase',
    description: 'Rephrase academic paragraphs while preserving formal citations, technical clarity, and core arguments.',
    tags: ['paraphraser', 'rephrase', 'academic', 'rewrite'],
    icon: 'RefreshCw',
    badge: 'Multi-Mode'
  },
  {
    id: 'active-voice-converter',
    name: 'Passive-to-Active Voice Converter',
    category: 'humanizer-paraphrase',
    description: 'Transform sluggish passive sentences ("The data was analyzed by...") into punchy active statements.',
    tags: ['active voice', 'grammar', 'clarity', 'style'],
    icon: 'Zap'
  },
  {
    id: 'sentence-shortener-trimmer',
    name: 'Concise Sentence Trimmer & Word Fluff Cutter',
    category: 'humanizer-paraphrase',
    description: 'Eliminate filler phrases ("in order to", "due to the fact that", "it is important to note").',
    tags: ['concise', 'trimmer', 'fluff cutter', 'word count'],
    icon: 'Scissors'
  },
  {
    id: 'tone-shifter-academic-casual',
    name: 'Multi-Tone Shifter (Academic / Casual / Formal)',
    category: 'humanizer-paraphrase',
    description: 'Instantly convert tone between rigorous peer-reviewed scholarship and accessible blog prose.',
    tags: ['tone', 'academic', 'casual', 'formal', 'shifter'],
    icon: 'Sliders'
  },
  {
    id: 'extractive-summarizer',
    name: 'Extractive Term-Frequency Summarizer',
    category: 'humanizer-paraphrase',
    description: 'Extract top 25-35% most salient sentences scored by TF-IDF weight and sentence positional rank.',
    tags: ['summarizer', 'extractive', 'tldr', 'bullet summary'],
    icon: 'ListFilter',
    badge: 'TF-IDF Rank'
  },
  {
    id: 'grammar-punctuation-checker',
    name: 'Grammar, Punctuation & Style Fixer',
    category: 'humanizer-paraphrase',
    description: 'Detect run-on comma splices, their/there homophones, dangling modifiers, and misplaced apostrophes.',
    tags: ['grammar', 'punctuation', 'spell checker', 'proofread'],
    icon: 'CheckCircle2'
  },
  {
    id: 'sentence-expander-elaborator',
    name: 'Sentence Expander & Evidence Elaborator',
    category: 'humanizer-paraphrase',
    description: 'Flesh out brief claims with scholarly scaffolding ("Specifically, evidence from...", "This implies that...").',
    tags: ['expander', 'elaborator', 'scaffolding', 'evidence'],
    icon: 'Maximize2'
  },
  {
    id: 'academic-vocabulary-enhancer',
    name: 'Academic Vocabulary & Synonym Enhancer',
    category: 'humanizer-paraphrase',
    description: 'Elevate colloquial language (big -> substantial, show -> demonstrate, good -> exemplary).',
    tags: ['vocabulary', 'academic words', 'synonyms', 'thesaurus'],
    icon: 'BookMarked'
  },
  {
    id: 'cliche-eliminator',
    name: 'Idiom & Cliché Eliminator',
    category: 'humanizer-paraphrase',
    description: 'Purge non-academic colloquialisms ("at the end of the day", "think outside the box", "double-edged sword").',
    tags: ['cliche', 'idiom', 'academic tone', 'cleaner'],
    icon: 'Trash2'
  },

  // 21-30: ACADEMIC ESSAYS & THESIS TOOLS
  {
    id: 'thesis-statement-builder',
    name: 'Thesis Statement Constructor',
    category: 'academic-writing',
    description: 'Generate rigorous argumentative, analytical, or expository thesis statements with claim + reason + counter.',
    tags: ['thesis', 'thesis statement', 'claim', 'argumentative'],
    icon: 'GraduationCap',
    badge: 'Claim+Reason'
  },
  {
    id: 'essay-outliner-pro',
    name: '5-Paragraph & Research Essay Outliner',
    category: 'academic-writing',
    description: 'Generate structured outlines: Intro hook, Thesis, Body Topic Sentences with Evidence slots & Conclusion.',
    tags: ['outline', 'essay outline', '5 paragraph', 'structure'],
    icon: 'ListTree'
  },
  {
    id: 'research-paper-title-generator',
    name: 'Academic Research Paper Title Generator',
    category: 'academic-writing',
    description: 'Construct formal IEEE/APA titles using [Method]: An Empirical Investigation into [Topic] in [Context].',
    tags: ['title generator', 'research paper', 'apa title', 'journal'],
    icon: 'FileCode'
  },
  {
    id: 'essay-hook-generator',
    name: 'Essay Hook & Opening Sentence Generator',
    category: 'academic-writing',
    description: 'Craft provocative statistical, philosophical, rhetorical, and narrative introductory hooks.',
    tags: ['essay hook', 'intro', 'opening line', 'attention grabber'],
    icon: 'Anchor'
  },
  {
    id: 'transition-words-matrix',
    name: 'Scholarly Transition Words & Flow Matrix',
    category: 'academic-writing',
    description: 'Categorized cohesive transition phrases for causality, contradiction, chronological order & emphasis.',
    tags: ['transitions', 'connectors', 'flow', 'cohesion'],
    icon: 'ArrowRightLeft'
  },
  {
    id: 'counterargument-rebuttal-builder',
    name: 'Counterargument & Rebuttal Builder',
    category: 'academic-writing',
    description: 'Strengthen essays by framing opposing viewpoints ("Critics contend that...") with data-backed refutations.',
    tags: ['counterargument', 'rebuttal', 'debate', 'argumentation'],
    icon: 'Scale'
  },
  {
    id: 'conclusion-paragraph-synthesizer',
    name: 'Conclusion Paragraph Synthesizer',
    category: 'academic-writing',
    description: 'Synthesize body arguments without lazy restatements, ending with forward-looking broader implications.',
    tags: ['conclusion', 'synthesis', 'summary', 'implications'],
    icon: 'Flag'
  },
  {
    id: 'literature-review-matrix-builder',
    name: 'Literature Review Synthesis Matrix',
    category: 'academic-writing',
    description: 'Structure scholarly paper comparisons by Author/Year, Methodology, Findings, and Identified Research Gaps.',
    tags: ['literature review', 'matrix', 'synthesis', 'research gap'],
    icon: 'Table'
  },
  {
    id: 'annotated-bibliography-formatter',
    name: 'Annotated Bibliography Formatter',
    category: 'academic-writing',
    description: 'Combine APA/MLA citations with 150-word summaries, source credibility evaluations, and research utility.',
    tags: ['annotated bibliography', 'summary', 'evaluation', 'sources'],
    icon: 'BookOpen'
  },
  {
    id: 'abstract-generator-formatter',
    name: 'Research Abstract Formatter (250 Words)',
    category: 'academic-writing',
    description: 'Format standard IMRaD structured abstracts: Background, Methods, Results, and Conclusions.',
    tags: ['abstract', 'imrad', '250 words', 'journal'],
    icon: 'FileSpreadsheet'
  },

  // 31-40: CITATIONS, RESEARCH & BIBLIOGRAPHY
  {
    id: 'citation-generator',
    name: 'APA 7th, MLA 9th & Chicago Citation Generator',
    category: 'research-citations',
    description: 'Generate accurate, publication-ready citations for Websites, Books, Journals, and YouTube videos.',
    tags: ['citation', 'apa', 'mla', 'chicago', 'bibliography'],
    icon: 'BookOpen',
    badge: 'APA7 / MLA9'
  },
  {
    id: 'in-text-citation-formatter',
    name: 'In-Text Parenthetical & Narrative Citation Tool',
    category: 'research-citations',
    description: 'Format narrative citations e.g. Smith (2024) vs parenthetical citations e.g. (Smith & Doe, 2024, p. 45).',
    tags: ['in-text', 'parenthetical', 'narrative', 'et al'],
    icon: 'Quote'
  },
  {
    id: 'doi-bibtex-converter',
    name: 'BibTeX & DOI Citation Converter',
    category: 'research-citations',
    description: 'Convert raw DOI strings or BibTeX entries into clean formatted academic references.',
    tags: ['bibtex', 'doi', 'latex', 'references'],
    icon: 'Code'
  },
  {
    id: 'source-credibility-craap-evaluator',
    name: 'CRAAP Source Credibility Evaluator',
    category: 'research-citations',
    description: 'Score sources on Currency, Relevance, Authority, Accuracy, and Purpose (0-100 scale).',
    tags: ['craap test', 'credibility', 'sources', 'evaluation'],
    icon: 'ShieldAlert'
  },
  {
    id: 'socratic-research-question-gen',
    name: 'Socratic Research Question Formulator',
    category: 'research-citations',
    description: 'Convert broad study topics into narrow, empirical, and hypothesis-testable research questions.',
    tags: ['socratic', 'research question', 'hypothesis', 'inquiry'],
    icon: 'HelpCircle'
  },
  {
    id: 'primary-secondary-source-classifier',
    name: 'Primary vs Secondary Source Classifier',
    category: 'research-citations',
    description: 'Distinguish raw historical data/interviews from peer-reviewed interpretations and reviews.',
    tags: ['primary source', 'secondary source', 'history', 'classification'],
    icon: 'Layers'
  },
  {
    id: 'case-study-analysis-framework',
    name: 'Business & Clinical Case Study Framework',
    category: 'research-citations',
    description: 'Breakdown: Executive Summary, SWOT Analysis, Key Problem, Alternative Solutions & Implementation.',
    tags: ['case study', 'swot', 'business', 'analysis'],
    icon: 'Briefcase'
  },
  {
    id: 'hypothesis-formulator-null-alt',
    name: 'Null & Alternative Hypothesis Formulator',
    category: 'research-citations',
    description: 'Construct rigorous $H_0$ and $H_1$ statements with independent and dependent variables.',
    tags: ['hypothesis', 'null hypothesis', 'statistics', 'variables'],
    icon: 'Percent'
  },
  {
    id: 'ieee-conference-citation-gen',
    name: 'IEEE Engineering Citation Generator',
    category: 'research-citations',
    description: 'Format IEEE numbered citations [1], [2] with standard conference proceedings syntax.',
    tags: ['ieee', 'engineering', 'numbered citation', 'conference'],
    icon: 'FileText'
  },
  {
    id: 'plagiarism-paraphrase-validator',
    name: 'Paraphrase Plagiarism Safety Auditor',
    category: 'research-citations',
    description: 'Ensure rewritten student work does not mimic patchwriting or original syntactic structures.',
    tags: ['patchwriting', 'safety', 'paraphrase', 'integrity'],
    icon: 'CheckSquare'
  },

  // 41-50: STUDY AIDS, FLASHCARDS & MEMORY
  {
    id: 'flashcard-generator',
    name: 'Automatic Q&A Flashcard Generator',
    category: 'study-flashcards',
    description: 'Extract key concepts, definitions, and formulas from lecture notes into interactive testable flashcards.',
    tags: ['flashcards', 'study cards', 'anki', 'quiz', 'revision'],
    icon: 'CreditCard',
    badge: 'Interactive Quiz'
  },
  {
    id: 'cornell-note-taking-builder',
    name: 'Cornell Note-Taking System Generator',
    category: 'study-flashcards',
    description: 'Structure notes into Cue Questions (Left), Main Lecture Notes (Right), and Bottom Summary.',
    tags: ['cornell notes', 'study technique', 'notes', 'summary'],
    icon: 'Columns'
  },
  {
    id: 'feynman-technique-explainer',
    name: 'Feynman Technique Concept Simplifier',
    category: 'study-flashcards',
    description: 'Explain complex quantum physics, calculus, or economic models as if teaching a 12-year-old.',
    tags: ['feynman technique', 'eli5', 'simplifier', 'conceptual'],
    icon: 'Smile'
  },
  {
    id: 'mind-map-markdown-generator',
    name: 'Hierarchical Mind Map & Markdown Outline',
    category: 'study-flashcards',
    description: 'Generate indented Markdown mind maps compatible with Obsidian, Mermaid, and Markmap.',
    tags: ['mind map', 'markdown', 'obsidian', 'mermaid', 'hierarchy'],
    icon: 'Network'
  },
  {
    id: 'pomodoro-study-schedule-planner',
    name: 'Pomodoro Study Schedule & Break Planner',
    category: 'study-flashcards',
    description: 'Calculate 25m/5m focus intervals with strategic cognitive breaks and daily target hours.',
    tags: ['pomodoro', 'study schedule', 'focus', 'time management'],
    icon: 'Timer'
  },
  {
    id: 'mnemonic-acronym-creator',
    name: 'Mnemonic Device & Acronym Creator',
    category: 'study-flashcards',
    description: 'Create memorable acronyms and rhyme associations for memorizing long lists and taxonomies.',
    tags: ['mnemonic', 'acronym', 'memory', 'study aid'],
    icon: 'Lightbulb'
  },
  {
    id: 'active-recall-quiz-builder',
    name: 'Active Recall Multiple-Choice Quiz Builder',
    category: 'study-flashcards',
    description: 'Turn study text into 4-option multiple choice questions with answer explanations.',
    tags: ['active recall', 'quiz', 'mcq', 'test prep'],
    icon: 'ListChecks'
  },
  {
    id: 'spaced-repetition-scheduler',
    name: 'Spaced Repetition Review Interval Calculator',
    category: 'study-flashcards',
    description: 'Calculate SM-2 review dates (Day 1, 3, 7, 14, 30, 90) for long-term memory retention.',
    tags: ['spaced repetition', 'sm2', 'retention', 'memory curve'],
    icon: 'Calendar'
  },
  {
    id: 'math-step-by-step-explainer',
    name: 'Math & Physics Step-by-Step Solver Template',
    category: 'study-flashcards',
    description: 'Structure equations: Given Values, Formula, Step-by-Step substitution, and Unit validation.',
    tags: ['math', 'physics', 'step by step', 'formula'],
    icon: 'Calculator'
  },
  {
    id: 'exam-cram-cheat-sheet-generator',
    name: '1-Page Exam Cram Cheat Sheet Generator',
    category: 'study-flashcards',
    description: 'Condense an entire subject module into high-yield formulas, core definitions, and key pitfalls.',
    tags: ['cheat sheet', 'cram', 'exam prep', 'high yield'],
    icon: 'FileSpreadsheet'
  }
];
