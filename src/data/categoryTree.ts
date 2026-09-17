export interface SubCategoryNode {
  count: number;
  subs: string[];
}

export interface CategoryNode {
  label: string;
  icon: string;
  count: number;
  color?: string;
  highlight?: boolean;
  subcategories: Record<string, SubCategoryNode>;
}

export const CATEGORY_TREE: Record<string, CategoryNode> = {
  pdf: {
    label: 'PDF Suite', icon: '📄', count: 57, color: '#0A1931',
    subcategories: {
      'Convert': { count: 28, subs: ['PDF to Word/Excel/PPT', 'Word/Excel/PPT to PDF', 'PDF to JPG/PNG', 'JPG/PNG to PDF', 'ePub/Mobi to PDF'] },
      'Merge & Split': { count: 15, subs: ['Merge PDFs', 'Split PDF', 'Extract Pages', 'Reorder Pages', 'Rotate Pages'] },
      'Compress & Optimize': { count: 8, subs: ['Compress PDF', 'Reduce Size', 'Optimize for Web', 'Repair PDF'] },
      'Security & Sign': { count: 6, subs: ['Protect PDF', 'Unlock PDF', 'eSign PDF', 'Add Password', 'Remove Password'] }
    }
  },
  image: {
    label: 'Image & Media', icon: '🖼️', count: 410,
    subcategories: {
      'Compress & Resize': { count: 80, subs: ['Compress JPG/PNG', 'Resize Image', 'Reduce Size KB', 'HD to Small'] },
      'Convert Format': { count: 70, subs: ['JPG to PNG/WEBP', 'PNG to JPG/WEBP', 'WEBP to JPG/PNG', 'HEIC to JPG', 'SVG to PNG/JPG'] },
      'Edit & Enhance': { count: 100, subs: ['Background Remover', 'Crop Image', 'Upscale 4K', 'Blur Background', 'Remove Object', 'Filter Effects'] },
      'Color & Palette': { count: 40, subs: ['Color Picker', 'Palette Generator', 'Gradient Maker', 'Image Colorize'] },
      'Audio Tools': { count: 60, subs: ['MP3 Cutter', 'Audio Converter', 'Volume Changer', 'Audio Merger'] },
      'Video Tools': { count: 60, subs: ['Video to MP3', 'Video Compressor', 'Video Trimmer', 'GIF Maker', 'Video Converter'] }
    }
  },
  calculators: {
    label: 'Calculators', icon: '🧮', count: 2580, highlight: true,
    subcategories: {
      'Finance - EMI & Loan': { count: 1200, subs: ['EMI Calculator', 'Mortgage Calculator', 'SIP Calculator', 'Loan Eligibility', 'Interest Calculator', 'Compound Interest', 'PPF Calculator', 'FD Calculator'] },
      'Math - Algebra': { count: 500, subs: ['Percentage Calc', 'Fraction Calc', 'Algebra Solver', 'Geometry - Area Volume', 'Statistics - Mean Median', 'Probability', 'Matrix Calc'] },
      'Health & Fitness': { count: 350, subs: ['BMI Calculator', 'BMR Calculator', 'Calorie Calculator', 'Age Calculator', 'Pregnancy Due Date', 'Body Fat %', 'Ideal Weight'] },
      'Date & Time': { count: 180, subs: ['Age Calculator', 'Date Difference', 'Time Duration', 'Countdown Timer', 'Birthday Calculator', 'Working Days'] },
      'Unit Converters': { count: 250, subs: ['Length Converter', 'Weight Converter', 'Temperature', 'Currency Converter', 'Area Converter', 'Speed Converter', 'Data Storage'] },
      'Business & Tax': { count: 100, subs: ['GST Calculator', 'Discount Calculator', 'Profit Margin', 'Tip Calculator', 'Invoice Generator', 'Salary Calculator'] }
    }
  },
  'ai-writing': {
    label: 'AI Study & Writing', icon: '✍️', count: 380,
    subcategories: {
      'Writing Assistant': { count: 90, subs: ['Essay Writer', 'Email Writer', 'Story Generator', 'Paragraph Writer', 'Letter Writer'] },
      'Paraphraser & Rewriter': { count: 70, subs: ['Paraphrasing Tool', 'Article Rewriter', 'Sentence Rewriter', 'Text Spinner'] },
      'Grammar & Spell': { count: 60, subs: ['Grammar Checker', 'Spell Checker', 'Punctuation Checker', 'Sentence Corrector'] },
      'Summarizer': { count: 50, subs: ['Text Summarizer', 'Article Summarizer', 'TL;DR Generator', 'Notes Maker'] },
      'Study & Notes': { count: 60, subs: ['Notes Generator', 'Flashcards Maker', 'Quiz Generator', 'Citation Generator'] },
      'AI Detector': { count: 50, subs: ['AI Content Detector', 'Plagiarism Checker', 'Readability Checker', 'AI Humanizer'] }
    }
  },
  'career-ats': {
    label: 'Career & ATS Suite', icon: '💼', count: 350,
    subcategories: {
      'ATS Checker': { count: 70, subs: ['ATS Resume Checker', 'Resume Score', 'Keyword Matcher', 'ATS Optimizer'] },
      'Resume Builder': { count: 80, subs: ['Resume Builder', 'Resume Templates', 'Resume Formatter', 'One-Page Resume'] },
      'Cover Letter': { count: 50, subs: ['Cover Letter Builder', 'Cover Letter Checker', 'Cover Letter Templates'] },
      'JD Matcher': { count: 60, subs: ['JD to Resume Match', 'Skill Matcher', 'Job Description Analyzer'] },
      'Interview Prep': { count: 50, subs: ['Interview Q&A', 'Salary Negotiator', 'STAR Story Builder'] },
      'LinkedIn Tools': { count: 40, subs: ['LinkedIn Headline', 'LinkedIn Summary', 'LinkedIn Bio', 'Portfolio Builder'] }
    }
  },
  developer: {
    label: 'Developer Suite', icon: '💻', count: 480,
    subcategories: {
      'JSON & XML': { count: 90, subs: ['JSON Formatter', 'JSON Validator', 'XML Formatter', 'JSON to XML', 'CSV to JSON'] },
      'Encode & Decode': { count: 80, subs: ['Base64 Encode/Decode', 'URL Encode/Decode', 'HTML Encode/Decode', 'JWT Decoder'] },
      'Minify & Formatter': { count: 70, subs: ['JS Minifier', 'CSS Minifier', 'HTML Minifier', 'SQL Formatter', 'Code Beautifier'] },
      'Regex & Text': { count: 80, subs: ['Regex Tester', 'Regex Generator', 'Text Diff', 'Case Converter', 'Word Counter'] },
      'Hash & Security': { count: 70, subs: ['MD5 Hash', 'SHA256 Hash', 'Password Generator', 'JWT Signer'] },
      'Network & API': { count: 90, subs: ['IP Lookup', 'User Agent Parser', 'Curl to Fetch', 'Webhook Tester', 'DNS Lookup'] }
    }
  }
};
