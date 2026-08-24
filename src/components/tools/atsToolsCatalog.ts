export interface ATSToolItem {
  id: string;
  name: string;
  category: 'resume-ats' | 'cover-letter' | 'interview-career' | 'compensation-negotiation' | 'networking-emails';
  description: string;
  tags: string[];
  icon: string;
  badge?: string;
  defaultInput?: string;
  defaultSecondaryInput?: string;
}

export const ALL_JOB_ATS_TOOLS: ATSToolItem[] = [
  // 1-12: RESUME & ATS CHECKERS
  {
    id: 'ats-checker',
    name: 'Real ATS Resume Score Checker',
    category: 'resume-ats',
    description: 'Score resume against JD with 30+ skill checks, 50 action verbs, metric counts & formatting breakdown.',
    tags: ['ats', 'score', 'resume', 'scanner', 'job-match'],
    icon: 'Briefcase',
    badge: 'Real Algorithm'
  },
  {
    id: 'resume-builder',
    name: 'Real ATS PDF Resume Builder',
    category: 'resume-ats',
    description: 'Interactive resume form that compiles into real, pixel-perfect ATS-compliant downloadable PDF.',
    tags: ['resume', 'builder', 'pdf', 'cv', 'download'],
    icon: 'FileText',
    badge: 'pdf-lib Export'
  },
  {
    id: 'jd-keyword-extractor',
    name: 'Job Description Keyword Extractor (TF-IDF)',
    category: 'resume-ats',
    description: 'Extract top hard skills, soft skills, and frequency-ranked keywords from any job posting.',
    tags: ['keywords', 'jd', 'tf-idf', 'skills', 'extractor'],
    icon: 'Search'
  },
  {
    id: 'resume-bullet-quantifier',
    name: 'Resume Bullet Point Quantifier & Enhancer',
    category: 'resume-ats',
    description: 'Transform weak, passive job descriptions into metric-backed, action-driven power bullets.',
    tags: ['bullet points', 'quantifier', 'metrics', 'action verbs'],
    icon: 'Zap'
  },
  {
    id: 'skill-gap-analyzer',
    name: 'Skill Gap & Match Matrix Analyzer',
    category: 'resume-ats',
    description: 'Compare candidate resume skills vs JD requirements with matched/missing matrix.',
    tags: ['skill gap', 'matching', 'matrix', 'skills'],
    icon: 'CheckSquare'
  },
  {
    id: 'action-verb-enhancer',
    name: 'Action Verb Replacer & Power Verbs',
    category: 'resume-ats',
    description: 'Upgrade overused verbs (worked, helped, handled) to 50+ executive leadership verbs.',
    tags: ['action verbs', 'vocabulary', 'impact', 'power verbs'],
    icon: 'Flame'
  },
  {
    id: 'resume-summary-generator',
    name: 'Professional Summary Generator',
    category: 'resume-ats',
    description: 'Generate high-impact 3-line executive summaries for engineering, product, marketing, or sales.',
    tags: ['summary', 'bio', 'executive', 'headline'],
    icon: 'Sparkles'
  },
  {
    id: 'experience-section-formatter',
    name: 'Chronological Experience Formatter',
    category: 'resume-ats',
    description: 'Format company titles, tenures, location, and achievements into standardized ATS block layout.',
    tags: ['experience', 'work history', 'format', 'ats'],
    icon: 'ListOrdered'
  },
  {
    id: 'education-cert-formatter',
    name: 'Degree & Certification ATS Formatter',
    category: 'resume-ats',
    description: 'Structure degrees, GPA honors, and professional credentials (AWS, PMP, Scrum) for ATS bots.',
    tags: ['education', 'certifications', 'degrees', 'aws'],
    icon: 'GraduationCap'
  },
  {
    id: 'resume-readability-checker',
    name: 'Resume Flesch-Kincaid Readability Auditor',
    category: 'resume-ats',
    description: 'Check syllable density, average sentence length, and reading ease for human recruiter scans.',
    tags: ['readability', 'flesch', 'sentence length', 'auditor'],
    icon: 'Eye'
  },
  {
    id: 'ats-formatting-sanitizer',
    name: 'ATS Formatting Sanitizer & Plaintext Cleaner',
    category: 'resume-ats',
    description: 'Strip unsupported unicode symbols, complex table tags, and invisible characters that break parsing.',
    tags: ['sanitizer', 'cleaner', 'plain text', 'unicode'],
    icon: 'ShieldCheck'
  },
  {
    id: 'career-pivot-resume-tailor',
    name: 'Career Pivot / Industry Switcher Tailor',
    category: 'resume-ats',
    description: 'Reframe transferable skills and bridge experiences from past industries to your target field.',
    tags: ['career pivot', 'transferable skills', 'industry switch'],
    icon: 'RefreshCw'
  },

  // 13-22: COVER LETTERS & APPLICATION ESSAYS
  {
    id: 'cover-letter-gen',
    name: 'Tailored Cover Letter Generator',
    category: 'cover-letter',
    description: 'Generate customized, compelling cover letters matching specific job postings and company cultures.',
    tags: ['cover letter', 'application', 'generator', 'custom'],
    icon: 'MailCheck',
    badge: '1-Click PDF'
  },
  {
    id: 'cold-outreach-cover-letter',
    name: 'Unadvertised Role / Cold Pitch Cover Letter',
    category: 'cover-letter',
    description: 'Generate high-response speculative letters to founders and hiring managers before a job is posted.',
    tags: ['cold pitch', 'speculative', 'outreach', 'hiring manager'],
    icon: 'Send'
  },
  {
    id: 'short-form-email-cover-letter',
    name: 'Short-Form Email Cover Letter (150 Words)',
    category: 'cover-letter',
    description: 'Snappy 3-paragraph email cover letter optimized for fast reading on mobile by busy recruiters.',
    tags: ['short cover letter', 'email', 'mobile', 'recruiter'],
    icon: 'Smartphone'
  },
  {
    id: 'referral-intro-cover-letter',
    name: 'Employee Referral Cover Letter Companion',
    category: 'cover-letter',
    description: 'Draft an application letter highlighting an internal employee endorsement and joint projects.',
    tags: ['referral', 'recommendation', 'internal', 'network'],
    icon: 'Users'
  },
  {
    id: 'internship-entry-cover-letter',
    name: 'New Graduate & Internship Cover Letter',
    category: 'cover-letter',
    description: 'Focus on coursework, academic honors, capstone projects, and fast learning speed.',
    tags: ['internship', 'graduate', 'entry level', 'college'],
    icon: 'BookOpen'
  },
  {
    id: 'executive-value-proposition-letter',
    name: 'Executive Value Proposition Letter (C-Level/VP)',
    category: 'cover-letter',
    description: 'Highlight P&L growth, strategic turnarounds, organizational scaling, and Board governance.',
    tags: ['executive', 'vp', 'c-suite', 'p&l', 'strategy'],
    icon: 'Award'
  },
  {
    id: 'freelance-pitch-proposal',
    name: 'Freelance & Agency Client Proposal Letter',
    category: 'cover-letter',
    description: 'Craft scope-of-work pitches with milestones, deliverables, client proof, and pricing terms.',
    tags: ['freelance', 'proposal', 'scope', 'client pitch'],
    icon: 'FileSpreadsheet'
  },
  {
    id: 'relocation-cover-letter',
    name: 'Relocation & Visa Sponsorship Request Letter',
    category: 'cover-letter',
    description: 'Politely state relocation timeline, self-funded moving options, or work authorization details.',
    tags: ['relocation', 'visa', 'sponsorship', 'remote'],
    icon: 'Globe'
  },
  {
    id: 'employment-gap-explainer',
    name: 'Employment Gap & Career Break Explainer',
    category: 'cover-letter',
    description: 'Frame sabbatical, family caregiving, upskilling, or health recovery positively and constructively.',
    tags: ['employment gap', 'career break', 'sabbatical', 'recovery'],
    icon: 'HeartHandshake'
  },
  {
    id: 'follow-up-post-application-letter',
    name: 'Post-Application Status Follow-up Letter',
    category: 'cover-letter',
    description: 'Polite 7-day post-submission follow-up reaffirming interest with an updated recent achievement.',
    tags: ['follow up', 'status', 'email', 'check-in'],
    icon: 'Clock'
  },

  // 23-34: INTERVIEW & CAREER PREPARATION
  {
    id: 'interview-prep-coach',
    name: 'STAR Method Behavioral Interview Prep',
    category: 'interview-career',
    description: 'Structure interview answers using Situation, Task, Action, and Result with quantifiable metrics.',
    tags: ['star method', 'interview', 'behavioral', 'answers'],
    icon: 'HelpCircle',
    badge: 'STAR Framework'
  },
  {
    id: 'role-interview-questions-gen',
    name: 'Role-Specific Technical Interview Q&A Generator',
    category: 'interview-career',
    description: 'Generate top technical questions, sample responses, and key terminology for any job title.',
    tags: ['interview questions', 'technical', 'qa', 'coding'],
    icon: 'Code2'
  },
  {
    id: 'reverse-interview-questions',
    name: 'Questions to Ask the Interviewer Generator',
    category: 'interview-career',
    description: 'Generate insightful reverse-interview questions assessing company runway, tech debt & culture.',
    tags: ['questions to ask', 'reverse interview', 'culture', 'tech debt'],
    icon: 'MessageSquare'
  },
  {
    id: '30-60-90-day-plan',
    name: '30-60-90 Day New Hire Plan Generator',
    category: 'interview-career',
    description: 'Build strategic milestone plans for interviews (Learn, Align, Execute) to impress hiring teams.',
    tags: ['30 60 90', 'milestones', 'new hire', 'strategy'],
    icon: 'Calendar'
  },
  {
    id: 'tell-me-about-yourself-pitch',
    name: '"Tell Me About Yourself" 90-Second Pitch',
    category: 'interview-career',
    description: 'Craft the perfect opening elevator pitch: Past foundation, Present impact, and Future alignment.',
    tags: ['elevator pitch', 'intro', 'tell me about yourself'],
    icon: 'Mic'
  },
  {
    id: 'weakness-strength-framer',
    name: '"Greatest Weakness & Strength" Framer',
    category: 'interview-career',
    description: 'Frame authentic professional growth areas without cliché false modesty ("I work too hard").',
    tags: ['weakness', 'strength', 'growth', 'interview'],
    icon: 'CheckCircle2'
  },
  {
    id: 'post-interview-thank-you-email',
    name: 'Post-Interview Thank You Email Generator',
    category: 'interview-career',
    description: 'Send high-impact thank you notes within 24 hours referencing specific discussion topics.',
    tags: ['thank you', 'email', 'post interview', 'recruiter'],
    icon: 'Heart'
  },
  {
    id: 'case-study-interview-framework',
    name: 'Consulting & Product Case Study Framework',
    category: 'interview-career',
    description: 'Structure problem breakdown: Market size, Root cause analysis, Solution branches & Risks.',
    tags: ['case study', 'consulting', 'product management', 'framework'],
    icon: 'Layers'
  },
  {
    id: 'system-design-interview-checklist',
    name: 'System Design Interview Architecture Checklist',
    category: 'interview-career',
    description: 'Step-by-step checklist: Requirements, Scale estimation, Data model, API, High-level & Deep dive.',
    tags: ['system design', 'architecture', 'scalability', 'backend'],
    icon: 'Cpu'
  },
  {
    id: 'career-progression-roadmap',
    name: 'Engineering / Career Level Progression Matrix',
    category: 'interview-career',
    description: 'Map skills from Junior -> Mid -> Senior -> Staff/Lead Engineer with expected impact scope.',
    tags: ['career ladder', 'progression', 'staff engineer', 'levels'],
    icon: 'TrendingUp'
  },
  {
    id: 'portfolio-project-storyteller',
    name: 'Portfolio Project Case Study Storyteller',
    category: 'interview-career',
    description: 'Structure technical GitHub / Dribbble projects into recruiter-friendly problem-solution-impact narratives.',
    tags: ['portfolio', 'case study', 'github', 'storyteller'],
    icon: 'FolderKanban'
  },
  {
    id: 'rejection-rebound-feedback-email',
    name: 'Graceful Rejection Rebound & Feedback Request',
    category: 'interview-career',
    description: 'Turn a job rejection into an opportunity for candid feedback and future talent-pool consideration.',
    tags: ['rejection', 'feedback', 'talent pool', 'graceful'],
    icon: 'MailQuestion'
  },

  // 35-42: COMPENSATION & NEGOTIATION
  {
    id: 'salary-estimator-formula',
    name: 'Role & Experience Salary Estimator (US/IN/UK/Remote)',
    category: 'compensation-negotiation',
    description: 'Calculate realistic market salary percentiles (25th, Median, 75th, 90th) based on location and tier.',
    tags: ['salary', 'compensation', 'calculator', 'market rate', 'estimator'],
    icon: 'DollarSign',
    badge: 'Real Formulas'
  },
  {
    id: 'salary-negotiator',
    name: 'Salary Negotiation Script Generator',
    category: 'compensation-negotiation',
    description: 'Get polite yet firm negotiation scripts for counter-offers, base salary jumps & sign-on bonuses.',
    tags: ['salary', 'negotiation', 'counter offer', 'scripts'],
    icon: 'HandCoins'
  },
  {
    id: 'total-comp-offer-comparator',
    name: 'Total Compensation (TC) Offer Comparator',
    category: 'compensation-negotiation',
    description: 'Compare multiple job offers across Base, Annual Bonus, Stock/RSU 4-yr vesting & Health 401k match.',
    tags: ['offer comparison', 'rsu', 'stock options', 'bonus', 'total comp'],
    icon: 'Scale'
  },
  {
    id: 'freelance-hourly-rate-calculator',
    name: 'Freelance & Contractor Rate Calculator',
    category: 'compensation-negotiation',
    description: 'Calculate your true target hourly/daily rate factoring taxes, healthcare, downtime & business costs.',
    tags: ['freelance', 'hourly rate', 'contractor', 'pricing'],
    icon: 'Calculator'
  },
  {
    id: 'annual-raise-pitch-builder',
    name: 'Annual Performance Appraisal Raise Pitch',
    category: 'compensation-negotiation',
    description: 'Build a data-backed promotion and compensation increase proposal for your annual review.',
    tags: ['raise', 'promotion', 'appraisal', 'performance review'],
    icon: 'LineChart'
  },
  {
    id: 'relocation-cost-of-living-calc',
    name: 'Relocation & Cost of Living Equalizer',
    category: 'compensation-negotiation',
    description: 'Calculate equivalent salary between San Francisco, New York, London, Bangalore, Berlin, and Austin.',
    tags: ['cost of living', 'relocation', 'purchasing power', 'col'],
    icon: 'Building2'
  },
  {
    id: 'startup-equity-vesting-modeler',
    name: 'Startup Equity & Stock Option Modeler (ISO/NSO)',
    category: 'compensation-negotiation',
    description: 'Model future payout scenarios based on strike price, company valuation, and dilution.',
    tags: ['equity', 'options', 'startup', 'valuation', 'vesting'],
    icon: 'PieChart'
  },
  {
    id: 'severance-exit-package-checker',
    name: 'Severance & Separation Package Reviewer',
    category: 'compensation-negotiation',
    description: 'Key checklist and talking points when evaluating layoff severance, COBRA, and non-competes.',
    tags: ['severance', 'layoff', 'separation', 'cobra'],
    icon: 'ShieldAlert'
  },

  // 43-50: NETWORKING & CAREER EMAILS
  {
    id: 'linkedin-optimizer',
    name: 'LinkedIn Headline & Bio Optimizer',
    category: 'networking-emails',
    description: 'Craft viral recruiter-attracting LinkedIn headlines and about sections using keywords.',
    tags: ['linkedin', 'headline', 'about', 'bio', 'recruiter'],
    icon: 'UserCheck',
    badge: 'Recruiter SEO'
  },
  {
    id: 'cold-email-recruiter-pitch',
    name: 'Cold Email to Tech Recruiter / Founder',
    category: 'networking-emails',
    description: 'High-converting 80-word cold email showing direct value and asking for a 10-minute chat.',
    tags: ['cold email', 'recruiter', 'networking', 'outreach'],
    icon: 'Mail'
  },
  {
    id: 'resignation-letter-builder',
    name: 'Professional Resignation Letter Builder',
    category: 'networking-emails',
    description: 'Generate standard 2-week, immediate, or executive transition resignation notices cleanly.',
    tags: ['resignation', 'notice', 'two weeks', 'quitting'],
    icon: 'LogOut'
  },
  {
    id: 'linkedin-connection-request-notes',
    name: 'LinkedIn 300-Char Connection Request Notes',
    category: 'networking-emails',
    description: 'Craft 5 personalized connection message variations that bypass the 300-character limit.',
    tags: ['linkedin', 'connection note', 'invite', 'networking'],
    icon: 'Link'
  },
  {
    id: 'reference-request-letter',
    name: 'Professional Reference Request Email',
    category: 'networking-emails',
    description: 'Ask former managers or colleagues to act as your reference with context packet and talking points.',
    tags: ['reference', 'recommendation', 'former boss', 'colleague'],
    icon: 'UserPlus'
  },
  {
    id: 'mentor-reach-out-pitch',
    name: 'Industry Mentor Reach-Out & Advisory Pitch',
    category: 'networking-emails',
    description: 'Reach out to senior leaders for structured mentorship with clear, respectful boundaries.',
    tags: ['mentor', 'advisory', 'guidance', 'career advice'],
    icon: 'Compass'
  },
  {
    id: 'job-acceptance-decline-emails',
    name: 'Job Offer Formal Acceptance / Decline Letters',
    category: 'networking-emails',
    description: 'Send professional written confirmation accepting an offer or gracefully declining with goodwill.',
    tags: ['offer acceptance', 'decline offer', 'formal letter'],
    icon: 'FileCheck'
  },
  {
    id: 'job-application-tracker-spreadsheet',
    name: 'Job Application Tracker & CRM Schema',
    category: 'networking-emails',
    description: 'Generate a structured CSV / Markdown tracker for active applications, dates, contacts & stages.',
    tags: ['tracker', 'crm', 'job search', 'pipeline', 'csv'],
    icon: 'Table'
  }
];
