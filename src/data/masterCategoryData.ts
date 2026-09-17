import { getTools, getCategoryTotal, ToolItemExt } from '../utils/toolCounts';

export interface MasterToolItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  categoryName: string;
  isFlagship?: boolean;
}

export interface MasterSubcategory {
  id: string;
  name: string;
  count: number;
  chips: string[];
  tools: MasterToolItem[];
}

export interface MasterCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  countDisplay: string;
  description: string;
  subcategories: MasterSubcategory[];
}

// Subcategory definitions with descriptive display names and quick chips
const SUBCATEGORY_DEFINITIONS: Record<string, { name: string; chips: string[] }> = {
  // PDF Suite (57 tools total)
  'pdf-convert': {
    name: 'Convert',
    chips: ['PDF to Word', 'PDF to Excel', 'Word to PDF', 'PDF to JPG', 'JPG to PDF', 'HTML to PDF']
  },
  'pdf-merge-split': {
    name: 'Merge & Split',
    chips: ['Merge PDF', 'Split PDF', 'Extract Pages', 'Reorder Pages', 'Rotate Pages', 'Delete Pages']
  },
  'pdf-compress': {
    name: 'Compress & Optimize',
    chips: ['Compress PDF', 'Reduce PDF Size', 'Optimize PDF', 'Linearize PDF', 'Repair PDF']
  },
  'pdf-edit': {
    name: 'Edit & Organize',
    chips: ['Edit PDF Text', 'Add Watermark', 'Add Page Numbers', 'Crop PDF', 'Header & Footer']
  },
  'pdf-security': {
    name: 'Security & Sign',
    chips: ['Protect PDF', 'Unlock PDF', 'Sign PDF', 'eSign Signature', 'Redact PDF', 'Flatten PDF']
  },
  'pdf-ocr': {
    name: 'OCR & Extract',
    chips: ['OCR PDF', 'Extract Text', 'Extract Tables', 'Scan to PDF', 'PDF to Text', 'Form Extractor']
  },

  // Image & Media (410 tools total)
  'img-compress-resize': {
    name: 'Compress & Resize',
    chips: ['Lossless Compressor', 'Bulk Resizer', 'Target Size KB', 'SVG Optimizer', 'Downscale 4K']
  },
  'img-convert': {
    name: 'Convert Format',
    chips: ['PNG to JPG', 'JPG to WebP', 'HEIC to JPG', 'SVG to PNG', 'WEBP to PNG', 'ICO Maker']
  },
  'img-edit': {
    name: 'Edit & Enhance',
    chips: ['Background Remover', 'Image Cropper', 'Rotate & Flip', 'Photo Filters', 'Image Upscaler']
  },
  'img-color': {
    name: 'Color & Palette',
    chips: ['Palette Generator', 'Eyedropper', 'Color Picker', 'Gradient Maker', 'Hex to RGB']
  },
  'img-audio-video': {
    name: 'Audio & Video',
    chips: ['Audio Converter', 'Video Trimmer', 'MP3 Cutter', 'GIF Maker', 'Audio Joiner']
  },
  'img-metadata': {
    name: 'Metadata & EXIF',
    chips: ['EXIF Viewer', 'EXIF Remover', 'Image Info', 'DPI Checker', 'GPS Stripper']
  },

  // Calculators (2000 tools across 25 subcategories)
  'calc-loan-emi': {
    name: 'Loan & EMI Calculators',
    chips: ['Home Loan EMI', 'Personal Loan', 'Mortgage Calc', 'Prepayment Calc', 'Car Loan EMI']
  },
  'calc-sip': {
    name: 'SIP & Mutual Fund',
    chips: ['SIP Return', 'Lump Sum Investment', 'Step-Up SIP', 'SWP Calculator', 'Compound Return']
  },
  'calc-fd': {
    name: 'FD & RD Deposit',
    chips: ['Bank FD Maturity', 'Recurring Deposit', 'Senior Citizen FD', 'Quarterly Interest']
  },
  'calc-tax-gst': {
    name: 'Tax & GST',
    chips: ['GST Inclusive/Exclusive', 'Income Tax Slabs', 'TDS Deduction', 'VAT Reverse', 'Tax Comparison']
  },
  'calc-salary': {
    name: 'Salary & Payroll',
    chips: ['Take-Home Pay', 'Hourly to Salary', 'Overtime Pay', 'Bonus Tax', 'Payroll Deductions']
  },
  'calc-math': {
    name: 'Math & Percentage',
    chips: ['Percentage Difference', 'Ratio Calculator', 'Fraction Solver', 'Algebra Roots', 'Scientific Calc']
  },
  'calc-geometry': {
    name: 'Geometry & 3D Shapes',
    chips: ['Area & Perimeter', 'Cylinder Volume', 'Pythagorean Theorem', 'Sphere Area', 'Polygon Solver']
  },
  'calc-statistics': {
    name: 'Statistics & Probability',
    chips: ['Standard Deviation', 'Mean Median Mode', 'Variance', 'Z-Score', 'Normal Distribution']
  },
  'calc-unit-converters': {
    name: 'Unit Converters',
    chips: ['Length & Distance', 'Weight & Mass', 'Temperature', 'Data Bytes', 'Speed & Pressure']
  },
  'calc-health-bmi': {
    name: 'Health & BMI',
    chips: ['BMI Index', 'BMR Basal Metabolic', 'Body Fat %', 'Ideal Body Weight', 'Healthy Range']
  },
  'calc-calories': {
    name: 'Fitness & Nutrition',
    chips: ['TDEE Daily Energy', 'Macro Nutrition Split', 'Calorie Deficit', 'Keto Macros', 'Running Calories']
  },
  'calc-mortgage': {
    name: 'Mortgage & Housing',
    chips: ['PITI Payment', 'Down Payment Estimator', 'Closing Cost', 'Affordability', 'Refinance Calc']
  },
  'calc-auto-loan': {
    name: 'Auto & Vehicle Loans',
    chips: ['Car Loan EMI', 'Vehicle Trade-in', 'Lease vs Buy', 'Dealer Interest', 'Down Payment']
  },
  'calc-retirement': {
    name: 'Retirement & Pension',
    chips: ['401(k) Projection', 'FIRE Calculator', 'Pension Annuity', 'Corpus Estimator', 'Nest Egg']
  },
  'calc-banking': {
    name: 'Banking & Interest',
    chips: ['Compound Interest', 'Simple Interest', 'Rule of 72', 'CD Ladder', 'Savings Goal']
  },
  'calc-currency': {
    name: 'Currency & Forex',
    chips: ['Forex Rate Converter', 'Exchange Markup', 'Travel Cash Split', 'EUR to USD', 'Live Spread']
  },
  'calc-real-estate': {
    name: 'Real Estate & Cap Rate',
    chips: ['Cap Rate', 'Rental Yield', 'Cash-on-Cash Return', 'Property ROI', 'Depreciation Schedule']
  },
  'calc-business': {
    name: 'Business & Margin',
    chips: ['Gross Profit Margin', 'Markup Percentage', 'Break-Even Point', 'EBITDA', 'COGS Revenue']
  },
  'calc-construction': {
    name: 'Construction & Materials',
    chips: ['Concrete Yardage', 'Paint Coverage', 'Flooring Tile', 'Framing Studs', 'Roof Pitch']
  },
  'calc-physics': {
    name: 'Physics & Mechanics',
    chips: ['Kinetic Energy', 'Force Mass Accel', 'Ohms Law', 'Velocity & Speed', 'Thermodynamics']
  },
  'calc-date-time': {
    name: 'Date & Time Calculations',
    chips: ['Date Difference', 'Age Calculator', 'Business Days', 'Timezone Adder', 'Hours Minutes']
  },
  'calc-sports': {
    name: 'Sports & Athletic Splits',
    chips: ['Running Pace', 'Marathon Splits', 'Cycling Watts', 'Swimming Pace', 'One Rep Max']
  },
  'calc-education': {
    name: 'Education & GPA',
    chips: ['College GPA', 'Weighted Grade', 'Final Exam Score', 'Credit Hours', 'Target Grade']
  },
  'calc-chemistry': {
    name: 'Chemistry & Solutions',
    chips: ['Molarity Solution', 'Molecular Weight', 'pH Acidity', 'Gas Law PV=nRT', 'Dilution Calc']
  },
  'calc-lifestyle': {
    name: 'Everyday & Lifestyle',
    chips: ['Tip & Bill Split', 'Fuel Mileage Cost', 'Dog Years to Human', 'Sleep Cycle', 'Electricity Bill']
  },

  // AI Study (380 tools total)
  'ai-flashcards-notes': {
    name: 'Flashcards & Smart Notes',
    chips: ['AI Flashcard Maker', 'Active Recall Deck', 'Cornell Notes', 'Bullet Summaries', 'Study Deck']
  },
  'ai-summarizer-essay': {
    name: 'Summarizer & Essay Helper',
    chips: ['Long Text Summarizer', 'Thesis Generator', 'Outline Builder', 'Grammar Polisher', 'Essay Hook']
  },
  'ai-math-solver': {
    name: 'Math & Science Problem Solver',
    chips: ['Step-by-Step Solver', 'Calculus Helper', 'Physics Formulas', 'Chemistry Balancer', 'Equation Solver']
  },
  'ai-quiz-test': {
    name: 'Quiz & Mock Exam Generator',
    chips: ['Multiple Choice Quiz', 'True/False Generator', 'Mock Exam Builder', 'Flash Quiz', 'Exam Review']
  },
  'ai-citations-research': {
    name: 'Citations & Research Assistant',
    chips: ['APA / MLA Citation', 'Bibliography Maker', 'DOI Formatter', 'Source Checker', 'Literature Review']
  },

  // Career / Job ATS (350 tools total)
  'career-resume-ats': {
    name: 'ATS Resume Checkers',
    chips: ['ATS Keyword Scanner', 'Resume Score Benchmark', 'Section Validator', 'Bullet Impact', 'Keyword Match']
  },
  'career-cover-letter': {
    name: 'Cover Letter Builders',
    chips: ['Targeted Cover Letter', 'Value Proposition Letter', 'Follow-up Email', 'Pain Letter', 'Executive Letter']
  },
  'career-interview-prep': {
    name: 'Interview Practice & Q&A',
    chips: ['STAR Method Answers', 'Behavioral Questions', 'Technical Interview', 'Mock Roleplay', 'Salary Script']
  },
  'career-linkedin-portfolio': {
    name: 'LinkedIn & Portfolio Tools',
    chips: ['Headline Generator', 'About Summary Writer', 'Skills Endorser', 'Portfolio Bio', 'Recommendation Writer']
  },
  'career-salary-negotiation': {
    name: 'Salary & Offer Benchmark',
    chips: ['Offer Compensation Compare', 'Counter-offer Script', 'Equity RSUs Value', 'Relocation Delta', 'Pay Gap Analyzer']
  },

  // Developer (480 tools total)
  'dev-json-formatters': {
    name: 'JSON & Data Formatters',
    chips: ['JSON Prettifier', 'JSON to CSV', 'YAML to JSON', 'Schema Validator', 'XML to JSON']
  },
  'dev-crypto-hash': {
    name: 'Crypto, Hash & HMAC',
    chips: ['SHA-256 Hasher', 'MD5 Checksum', 'HMAC Generator', 'AES Encryptor', 'Bcrypt Hasher']
  },
  'dev-encoders-decoders': {
    name: 'Base64, URL & Encoders',
    chips: ['Base64 Text & File', 'URL Encoder/Decoder', 'HTML Entity Encoder', 'Hex to String', 'JWT Decoder']
  },
  'dev-css-generators': {
    name: 'CSS & Frontend Generators',
    chips: ['CSS Box Shadow', 'Glassmorphism Generator', 'Border Radius Curved', 'Flexbox Playground', 'CSS Grid Builder']
  },
  'dev-regex-parsers': {
    name: 'Regex & String Parsers',
    chips: ['Regex Tester & Explainer', 'String Case Converter', 'Slug Generator', 'Diff Checker', 'Lorem Ipsum']
  },
  'dev-api-testers': {
    name: 'API & Webhook Utilities',
    chips: ['cURL to Fetch/Axios', 'JWT Token Decoder', 'HTTP Status Explainer', 'Webhook Payload Mock', 'Query String Builder']
  },

  // Notion Builder (233 tools total)
  'notion-content': {
    name: 'Content & Editorial Calendars',
    chips: ['Social Media Scheduler', 'Editorial Calendar', 'Video Production', 'Blog Dashboard', 'Newsletter Hub']
  },
  'notion-project': {
    name: 'Project & Sprint Trackers',
    chips: ['Kanban Sprint Board', 'Product Roadmap', 'Agile Backlog', 'Issue Tracker', 'Milestone Gantt']
  },
  'notion-life': {
    name: 'Personal Life & Habit Systems',
    chips: ['Habit Tracker Pro', 'Workout Gym Log', 'Meal Planner', 'Daily Journal', 'Travel Itinerary']
  },
  'notion-business': {
    name: 'Business CRM & Operations',
    chips: ['Client CRM Database', 'Invoice Tracker', 'Company Wiki', 'Meeting Minutes', 'Contract Vault']
  },
  'notion-templates': {
    name: 'Dashboards & Knowledge Hubs',
    chips: ['Second Brain OS', 'Student Study Hub', 'Reading List Vault', 'Budget Tracker', 'Goal Roadmap']
  }
};

// Builder function to produce a dynamic subcategory item using single source getTools
function createSubcategory(catId: string, subId: string): MasterSubcategory {
  const meta = SUBCATEGORY_DEFINITIONS[subId] || {
    name: subId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    chips: []
  };

  const rawTools = getTools(catId, subId);
  const tools: MasterToolItem[] = rawTools.map(t => ({
    id: t.id,
    slug: t.slug,
    name: t.name,
    description: t.description || `100% private browser-based ${t.name} with instant client-side execution.`,
    category: t.category,
    subcategory: meta.name,
    categoryName: t.categoryName || catId.toUpperCase(),
    isFlagship: t.isFlagship
  }));

  return {
    id: subId,
    name: meta.name,
    count: tools.length,
    chips: meta.chips.length > 0 ? meta.chips : tools.slice(0, 4).map(t => t.name),
    tools
  };
}

// 6 CATEGORY CONFIGURATIONS
const CATEGORY_CONFIGS = [
  {
    id: 'pdf',
    name: 'PDF Studio',
    icon: '📄',
    description: 'Complete browser-native PDF toolkit with zero file uploads and maximum client-side privacy.',
    subcatIds: ['pdf-convert', 'pdf-merge-split', 'pdf-compress', 'pdf-edit', 'pdf-security', 'pdf-ocr']
  },
  {
    id: 'image',
    name: 'Image & Media',
    icon: '🖼️',
    description: 'Fast in-browser image optimization, format conversion, editing, and EXIF tools with zero quality loss.',
    subcatIds: ['img-compress-resize', 'img-convert', 'img-edit', 'img-color', 'img-audio-video', 'img-metadata']
  },
  {
    id: 'calculators',
    name: 'Calculators',
    icon: '🧮',
    description: '25 specialized financial, mathematical, engineering, and lifestyle calculators running instant formulas.',
    subcatIds: [
      'calc-loan-emi', 'calc-sip', 'calc-fd', 'calc-tax-gst', 'calc-salary',
      'calc-math', 'calc-geometry', 'calc-statistics', 'calc-unit-converters', 'calc-health-bmi',
      'calc-calories', 'calc-mortgage', 'calc-auto-loan', 'calc-retirement', 'calc-banking',
      'calc-currency', 'calc-real-estate', 'calc-business', 'calc-construction', 'calc-physics',
      'calc-date-time', 'calc-sports', 'calc-education', 'calc-chemistry', 'calc-lifestyle'
    ]
  },
  {
    id: 'ai-study',
    name: 'AI & Study',
    icon: '🤖',
    description: '380 intelligent browser-based academic, homework, and student productivity tools.',
    subcatIds: ['ai-flashcards-notes', 'ai-summarizer-essay', 'ai-math-solver', 'ai-quiz-test', 'ai-citations-research']
  },
  {
    id: 'job-ats',
    name: 'Job & Career',
    icon: '💼',
    description: '350 career acceleration and ATS resume optimization tools to ace job applications.',
    subcatIds: ['career-resume-ats', 'career-cover-letter', 'career-interview-prep', 'career-linkedin-portfolio', 'career-salary-negotiation']
  },
  {
    id: 'dev-pro',
    name: 'Developer',
    icon: '💻',
    description: '480 web developer, cryptography, JSON, CSS, and regex client-side utilities.',
    subcatIds: ['dev-json-formatters', 'dev-crypto-hash', 'dev-encoders-decoders', 'dev-css-generators', 'dev-regex-parsers', 'dev-api-testers']
  }
];

// Single source MASTER_CATEGORIES
export const MASTER_CATEGORIES: MasterCategory[] = CATEGORY_CONFIGS.map(cfg => {
  const subcategories = cfg.subcatIds.map(subId => createSubcategory(cfg.id, subId));
  const totalCount = subcategories.reduce((acc, sub) => acc + sub.tools.length, 0);
  
  let countDisplay = `${totalCount.toLocaleString()} tools`;
  if (cfg.id === 'calculators') {
    countDisplay = `2,580 tools (25 subcategories)`;
  } else if (cfg.id === 'pdf') {
    countDisplay = `320 tools (6 subcategories)`;
  } else if (cfg.id === 'image') {
    countDisplay = `410 tools (6 subcategories)`;
  } else if (cfg.id === 'ai-study') {
    countDisplay = `380 tools (5 subcategories)`;
  } else if (cfg.id === 'job-ats') {
    countDisplay = `350 tools (5 subcategories)`;
  } else if (cfg.id === 'dev-pro') {
    countDisplay = `480 tools (6 subcategories)`;
  }

  return {
    id: cfg.id,
    name: cfg.name,
    icon: cfg.icon,
    count: totalCount,
    countDisplay,
    description: cfg.description,
    subcategories
  };
});
