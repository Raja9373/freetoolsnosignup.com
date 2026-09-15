import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, BookOpen, Clock, Calendar, Copy, Check, 
  ExternalLink, Sparkles, Share2, CheckCircle2, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';

interface BlogPageProps {
  articleSlug?: string;
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

interface ArticleData {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishDate: string;
  summary: string;
  content: string[];
  toolsList: { name: string; slug: string; desc: string; step: string }[];
  markdownSyndication: string;
}

const ARTICLES: Record<string, ArticleData> = {
  '10-free-pdf-tools-no-signup-2026': {
    slug: '10-free-pdf-tools-no-signup-2026',
    title: '10 Best Free PDF Tools No Signup in 2026 (100% In-Browser & Private)',
    category: 'PDF & Documents',
    readTime: '6 min read',
    publishDate: 'September 2026',
    summary: 'Discover the top 10 free PDF tools that require zero email signup, apply zero watermarks, and process contracts 100% locally in your browser memory via WebAssembly.',
    content: [
      'Managing PDF documents is an essential daily workflow for professionals, students, freelancers, and enterprise teams. Yet, navigating the modern online PDF landscape has become an exercise in frustration. Major commercial platforms advertise "free PDF tools" only to demand email signups, enforce 2-document daily caps, inject promotional watermarks, or upload your sensitive tax documents and contracts to remote cloud servers.',
      'In this comprehensive guide, we review the 10 best free PDF utilities built on a privacy-first, zero-knowledge architecture. Using client-side WebAssembly, these utilities manipulate documents directly inside your browser memory (RAM), guaranteeing that your confidential data never traverses the internet.',
      'Why does client-side execution matter? Traditional cloud PDF converters present severe compliance and privacy risks under GDPR, HIPAA, and corporate NDA agreements. By keeping processing inside your local device sandbox, FreeToolsNoSignup provides institutional-grade privacy with instantaneous speed.'
    ],
    toolsList: [
      { name: 'PDF Merge & Combine Pro', slug: 'pdf-merge', desc: 'Combine multiple PDF files into one clean, organized document with drag-and-drop ordering.', step: 'Drop multiple PDF files into the workspace, drag to arrange page sequences, and click Merge for instant local assembly.' },
      { name: 'PDF Page Splitter & Extractor', slug: 'pdf-split', desc: 'Split specific page ranges or extract single sheets into separate PDF files or a packaged ZIP.', step: 'Select your PDF, specify desired page numbers or ranges (e.g. 1-3, 5), and export your separated files.' },
      { name: 'PDF Compressor & Optimizer', slug: 'pdf-compress', desc: 'Reduce heavy PDF file sizes for email attachments and portal uploads without sacrificing text clarity.', step: 'Upload your large PDF, select your compression preset (Extreme, Recommended, or Light), and download the optimized output.' },
      { name: 'PDF Page Rotator & Layout Organizer', slug: 'pdf-rotate', desc: 'Rotate landscape and upside-down pages 90°, 180°, or 270° and save corrected orientations.', step: 'Inspect visual page thumbnails, click to rotate individual pages or all pages at once, and save your corrected PDF.' },
      { name: 'PDF to Text & OCR Extractor', slug: 'pdf-to-text', desc: 'Extract raw text strings and formatted paragraphs from digital PDFs with zero server uploads.', step: 'Open the document, allow the local parser to read text streams, and copy or save the clean plaintext.' },
      { name: 'Image to PDF Converter', slug: 'image-to-pdf', desc: 'Convert JPG, PNG, and WebP photos into a unified multi-page PDF presentation.', step: 'Add your image files, set page margins and orientations, and export your polished PDF document.' },
      { name: 'PDF Watermark Remover (Clean Viewer)', slug: 'pdf-watermark-remove', desc: 'Strip intrusive promotional watermarks and inspect clean document layers in RAM.', step: 'Load your watermarked document, preview clean layers, and export your unbranded document.' },
      { name: 'PDF Page Numberer & Header Inserter', slug: 'pdf-page-numbers', desc: 'Add clean Bates stamping or page numbers (Page X of Y) with custom positions and fonts.', step: 'Upload your document, choose header or footer placement, customize numbering format, and apply.' },
      { name: 'PDF Encrypt & Password Protector', slug: 'pdf-protect', desc: 'Apply 256-bit AES encryption to lock confidential files with custom user and owner passwords.', step: 'Set your secret passphrase, select encryption parameters, and save your secured PDF file.' },
      { name: 'PDF Metadata & Author Stripper', slug: 'pdf-metadata-cleaner', desc: 'Erase hidden author names, creation timestamps, and software signatures before public sharing.', step: 'Drop your PDF, click Strip Metadata to erase hidden tags, and export an anonymous clean file.' }
    ],
    markdownSyndication: `# 10 Best Free PDF Tools No Signup in 2026 (100% In-Browser & Private)

Managing PDFs without subscription paywalls or privacy leaks is now possible through client-side WebAssembly. Here are 10 verified tools from [FreeToolsNoSignup.com](https://www.freetoolsnosignup.com/):

1. **[PDF Merge & Combine Pro](https://www.freetoolsnosignup.com/tools/pdf-merge)** - Combine multiple PDFs locally in RAM.
2. **[PDF Page Splitter](https://www.freetoolsnosignup.com/tools/pdf-split)** - Extract page ranges into separate files.
3. **[PDF Compressor](https://www.freetoolsnosignup.com/tools/pdf-compress)** - Shrink document sizes without quality loss.
4. **[PDF Page Rotator](https://www.freetoolsnosignup.com/tools/pdf-rotate)** - Rotate landscape scans 90/180 degrees.
5. **[PDF to Text](https://www.freetoolsnosignup.com/tools/pdf-to-text)** - Extract clean text from digital PDFs.
6. **[Image to PDF](https://www.freetoolsnosignup.com/tools/image-to-pdf)** - Assemble JPG/PNG images into PDFs.
7. **[PDF Watermark Clean](https://www.freetoolsnosignup.com/tools/pdf-watermark-remove)** - Clean intrusive stamps.
8. **[PDF Page Numberer](https://www.freetoolsnosignup.com/tools/pdf-page-numbers)** - Insert header/footer Bates numbers.
9. **[PDF Password Protector](https://www.freetoolsnosignup.com/tools/pdf-protect)** - 256-bit client-side encryption.
10. **[PDF Metadata Stripper](https://www.freetoolsnosignup.com/tools/pdf-metadata-cleaner)** - Remove hidden author tags.

*Zero signups. Zero cloud uploads. Powered by [FreeToolsNoSignup.com](https://www.freetoolsnosignup.com/).*`
  },

  '10-free-image-tools-no-signup-2026': {
    slug: '10-free-image-tools-no-signup-2026',
    title: '10 Essential Free Image Tools No Signup for Creators in 2026',
    category: 'Media & Design',
    readTime: '5 min read',
    publishDate: 'September 2026',
    summary: 'Optimize photos, convert WebP, resize aspect ratios, and strip EXIF location tags without cloud uploads or subscriptions.',
    content: [
      'Visual content drives the modern web, but editing and converting media assets often involves bloated software or expensive cloud converters. Most free image compressors enforce file size caps, degrade image resolution, or append unwanted brand logos.',
      'Our collection of 10 browser-native image tools utilizes HTML5 Canvas and client-side binary quantization to deliver lossless compression, instant WebP conversions, and automated metadata stripping without uploading your private photography to external servers.',
      'Whether optimizing graphics for high Core Web Vitals scores or safeguarding personal privacy by stripping GPS EXIF tags, these utilities run immediately with zero login friction.'
    ],
    toolsList: [
      { name: 'Image Compressor & Optimizer', slug: 'image-compress', desc: 'Reduce PNG, JPG, and WebP file sizes by up to 80% without visible loss in sharpness.', step: 'Drop your images, adjust the quality slider, and download the compressed files in seconds.' },
      { name: 'Image Aspect Ratio & Canvas Resizer', slug: 'image-resizer', desc: 'Resize dimensions to exact pixels or standard social media aspect ratios (16:9, 1:1, 4:5).', step: 'Select your photo, pick a preset dimension or custom pixel width, and export.' },
      { name: 'WebP to JPG / PNG Converter', slug: 'webp-to-png', desc: 'Convert modern WebP images to universal JPG or transparent PNG formats instantly.', step: 'Upload WebP files, choose your desired target format, and save locally.' },
      { name: 'EXIF Metadata & GPS Stripper', slug: 'image-exif-stripper', desc: 'Erase hidden GPS coordinates, camera serial numbers, and shoot timestamps from photos.', step: 'Select camera photos, preview existing EXIF tags, and click Strip to generate privacy-safe files.' },
      { name: 'Favicon & App Icon Generator', slug: 'favicon-generator', desc: 'Generate complete favicon packages (16x16, 32x32, 192x192, Apple Touch Icons) in one click.', step: 'Upload your square logo, preview icon sizes, and download the complete ZIP.' },
      { name: 'SVG to PNG High-Res Rasterizer', slug: 'svg-to-png', desc: 'Render vector SVG illustrations into high-density 2x and 4x PNG files with transparency.', step: 'Drop your SVG markup or file, choose scale multiplier, and save clean PNG graphics.' },
      { name: 'Color Palette & Dominant Hex Extractor', slug: 'color-palette-extractor', desc: 'Extract harmonious 5-color palettes and dominant HEX/RGB codes from any photograph.', step: 'Load any photo to view auto-clustered color chips and copy color codes with 1 click.' },
      { name: 'Image Grayscale & Duotone Filter Studio', slug: 'image-filters', desc: 'Apply vintage monochrome, sepia, and modern duotone contrast filters directly in Canvas.', step: 'Select filter presets, adjust intensity sliders, and download stylized artwork.' },
      { name: 'Image Blur & Privacy Redactor', slug: 'image-redactor', desc: 'Blur sensitive license plates, faces, and credentials before posting screenshots publicly.', step: 'Drag a selection rectangle over sensitive areas to apply gaussian blur, and export.' },
      { name: 'Base64 Image Encoder & Data URI Studio', slug: 'image-to-base64', desc: 'Convert small icons and logos into inline Data URI strings for high-performance HTML/CSS.', step: 'Upload any graphic to instantly generate copyable HTML <img> and CSS background-image tags.' }
    ],
    markdownSyndication: `# 10 Essential Free Image Tools No Signup for Creators in 2026

Optimize, convert, and protect images without server uploads using [FreeToolsNoSignup.com](https://www.freetoolsnosignup.com/):

1. **[Image Compressor](https://www.freetoolsnosignup.com/tools/image-compress)** - Lossless compression in RAM.
2. **[Image Resizer](https://www.freetoolsnosignup.com/tools/image-resizer)** - Pixel-perfect dimensions & ratios.
3. **[WebP to PNG](https://www.freetoolsnosignup.com/tools/webp-to-png)** - Instant format conversions.
4. **[EXIF Stripper](https://www.freetoolsnosignup.com/tools/image-exif-stripper)** - Delete GPS and camera tags.
5. **[Favicon Generator](https://www.freetoolsnosignup.com/tools/favicon-generator)** - Complete multi-size icon packages.
6. **[SVG to PNG](https://www.freetoolsnosignup.com/tools/svg-to-png)** - High-res vector rasterization.
7. **[Color Palette Extractor](https://www.freetoolsnosignup.com/tools/color-palette-extractor)** - Dominant HEX codes.
8. **[Image Filter Studio](https://www.freetoolsnosignup.com/tools/image-filters)** - Canvas duotone & grayscale.
9. **[Privacy Redactor](https://www.freetoolsnosignup.com/tools/image-redactor)** - Blur faces & sensitive credentials.
10. **[Base64 Encoder](https://www.freetoolsnosignup.com/tools/image-to-base64)** - Inline Data URI generation.

*Free forever with zero signups on [FreeToolsNoSignup.com](https://www.freetoolsnosignup.com/).*`
  },

  '10-free-developer-tools-no-signup-2026': {
    slug: '10-free-developer-tools-no-signup-2026',
    title: '10 Free Developer Tools No Signup Every Software Engineer Needs',
    category: 'Engineering & QA',
    readTime: '6 min read',
    publishDate: 'September 2026',
    summary: 'Boost development speed with private JSON formatters, synthetic QA data generators, JWT debuggers, and regex visualizers.',
    content: [
      'Engineering productivity relies heavily on rapid scratchpad utilities. Yet pasting proprietary payloads, API responses, or authentication tokens into random third-party websites poses severe security risks.',
      'Every developer tool on FreeToolsNoSignup is engineered to run 100% client-side in your local browser sandbox. No telemetry, no backend logging, and no login forms to distract you from building software.',
      'Explore these 10 essential developer utilities designed to streamline QA testing, data formatting, and schema validation.'
    ],
    toolsList: [
      { name: 'JSON Formatter, Validator & Tree Visualizer', slug: 'json-formatter', desc: 'Format minified JSON payloads, inspect tree hierarchies, and repair syntax errors.', step: 'Paste raw JSON into the editor, click Format to auto-indent, and navigate the collapsible syntax tree.' },
      { name: 'Synthetic QA Mock Data Generator', slug: 'fake-data-generator', desc: 'Generate hundreds of realistic names, emails, addresses, and phone numbers in JSON or CSV.', step: 'Choose required fields and row quantity (10 to 1,000), and download synthetic QA test fixtures.' },
      { name: 'Regex Tester & Pattern Explainer', slug: 'regex-tester', desc: 'Test regular expressions against real-time text with match highlighting and regex explanations.', step: 'Enter your regex pattern and test string to view live captured groups and token breakdowns.' },
      { name: 'JWT Token Decoder & Inspector', slug: 'jwt-decoder', desc: 'Inspect JWT header and payload claims locally without sending credentials to remote servers.', step: 'Paste your Bearer token to inspect expiration dates, issuer tags, and token claims securely in memory.' },
      { name: 'Base64 Text & Binary Decoder', slug: 'base64-decoder', desc: 'Encode and decode UTF-8 text strings and binary buffers with full URL-safe base64 support.', step: 'Type or paste content to instantly view bi-directional base64 encoded and decoded outputs.' },
      { name: 'UUID v4 & NanoID Batch Generator', slug: 'uuid-generator', desc: 'Generate cryptographically secure UUID v4 identifiers and customizable NanoIDs in bulk.', step: 'Set batch count, select hyphenation and uppercase options, and copy generated IDs with 1 click.' },
      { name: 'Markdown to HTML & Live Preview', slug: 'markdown-preview', desc: 'Render GitHub-flavored Markdown with live syntax-highlighted HTML export.', step: 'Write markdown on the left pane and copy sanitized HTML markup on the right.' },
      { name: 'URL Encoder & Parameter Parser', slug: 'url-encoder', desc: 'Encode query parameters and decode complex nested URL strings with clear component breakdowns.', step: 'Paste complex query strings to inspect decoded URI components and key-value tables.' },
      { name: 'Hash & HMAC Generator (SHA-256, MD5)', slug: 'hash-generator', desc: 'Compute SHA-256, SHA-512, and HMAC checksums locally using the native Web Crypto API.', step: 'Input plaintext or drop a file to compute cryptographic hash digests in your browser.' },
      { name: 'Cron Expression Evaluator & Schedule Explainer', slug: 'cron-evaluator', desc: 'Translate complex 5-part cron syntax into human-readable English schedules with upcoming triggers.', step: 'Enter any cron string (e.g. */15 * * * *) to view next trigger dates and human-friendly explanations.' }
    ],
    markdownSyndication: `# 10 Free Developer Tools No Signup Every Software Engineer Needs

Run zero-telemetry developer utilities in your browser memory via [FreeToolsNoSignup.com](https://www.freetoolsnosignup.com/):

1. **[JSON Formatter & Validator](https://www.freetoolsnosignup.com/tools/json-formatter)** - Tree visualizer & syntax fixer.
2. **[Fake Mock Data Generator](https://www.freetoolsnosignup.com/tools/fake-data-generator)** - Generate synthetic QA data.
3. **[Regex Tester](https://www.freetoolsnosignup.com/tools/regex-tester)** - Live regex pattern matching.
4. **[JWT Decoder](https://www.freetoolsnosignup.com/tools/jwt-decoder)** - Client-side token header & payload inspection.
5. **[Base64 Studio](https://www.freetoolsnosignup.com/tools/base64-decoder)** - UTF-8 and URL-safe base64 converter.
6. **[UUID / NanoID Generator](https://www.freetoolsnosignup.com/tools/uuid-generator)** - Cryptographic bulk ID creation.
7. **[Markdown Preview](https://www.freetoolsnosignup.com/tools/markdown-preview)** - GitHub-flavored live renderer.
8. **[URL Encoder](https://www.freetoolsnosignup.com/tools/url-encoder)** - Query parameter parser.
9. **[Hash Generator](https://www.freetoolsnosignup.com/tools/hash-generator)** - SHA-256 & Web Crypto digests.
10. **[Cron Schedule Evaluator](https://www.freetoolsnosignup.com/tools/cron-evaluator)** - Human-readable cron schedule translator.

*Explore all ${TOTAL_TOOLS_COUNT} free tools at [FreeToolsNoSignup.com](https://www.freetoolsnosignup.com/).*`
  },

  '10-free-calculator-tools-no-signup-2026': {
    slug: '10-free-calculator-tools-no-signup-2026',
    title: '10 Accurate Financial & Health Calculators No Signup for 2026',
    category: 'Finance & Health',
    readTime: '5 min read',
    publishDate: 'September 2026',
    summary: 'Model compound interest, calculate mortgage EMI schedules, estimate take-home pay, and check WHO BMI classifications privately.',
    content: [
      'Financial decisions and health tracking demand accuracy and privacy. Entering your salary, mortgage loan balance, or medical metrics into websites that harvest data for marketing lists is unacceptable.',
      'Our collection of 10 financial, scientific, and health calculators executes all mathematical formulas locally in your browser memory. We never track your numbers, store your income, or sell your metrics to advertisers.',
      'Here are 10 indispensable calculators to help you plan wealth, understand loans, and track physical wellness.'
    ],
    toolsList: [
      { name: 'Compound Interest & SIP Wealth Calculator', slug: 'compound-interest-calc', desc: 'Visualize exponential wealth growth with recurring monthly contributions and annual returns.', step: 'Set initial principal, recurring monthly deposit, and annual return rate to inspect your future wealth curve.' },
      { name: 'Mortgage & Home Loan EMI Calculator', slug: 'mortgage-calc', desc: 'Calculate exact monthly repayments and complete amortization schedules with extra prepayment modeling.', step: 'Enter home price, down payment percentage, interest rate, and term to view principal vs interest breakdowns.' },
      { name: 'Salary Take-Home & Net Income Estimator', slug: 'salary-calc', desc: 'Estimate post-tax net pay after standard deductions, income tax brackets, and pension contributions.', step: 'Input gross salary, filing status, and deductions to view monthly and bi-weekly take-home income.' },
      { name: 'WHO-Compliant BMI & Ideal Weight Gauge', slug: 'bmi-calc', desc: 'Compute Body Mass Index with visual health classifications and target weight recommendations.', step: 'Enter height and weight in metric or imperial units to view your BMI score and healthy weight span.' },
      { name: 'Auto Loan & Car Financing Calculator', slug: 'auto-loan-calc', desc: 'Determine affordable vehicle financing payments with trade-in allowance and sales tax.', step: 'Input vehicle price, trade-in value, interest rate, and term length to plan car purchases.' },
      { name: 'Retirement Corpus & FIRE Planner', slug: 'retirement-calc', desc: 'Calculate the exact nest egg required to achieve financial independence based on annual expenses.', step: 'Input current age, target retirement age, and monthly spending to model your FIRE target.' },
      { name: 'Debt Snowball & Avalanche Payoff Planner', slug: 'debt-payoff-calc', desc: 'Compare debt payoff strategies to save thousands in interest and become debt-free faster.', step: 'List your loans and credit cards to compare Snowball (lowest balance) vs Avalanche (highest interest).' },
      { name: 'BMR & Daily Calorie Maintenance Calculator', slug: 'calorie-calc', desc: 'Calculate basal metabolic rate (Mifflin-St Jeor formula) and daily caloric targets for fitness goals.', step: 'Enter age, gender, height, weight, and activity level to view weight maintenance and deficit targets.' },
      { name: 'Tip & Bill Splitter with Tax Calculator', slug: 'tip-calculator', desc: 'Split dinner bills and bar tabs evenly across friends with custom tip percentages and sales tax.', step: 'Enter total check amount, tip percentage, and group size to view each person\'s exact share.' },
      { name: 'Currency & Foreign Exchange Converter', slug: 'currency-converter', desc: 'Convert major world currencies with real-time conversion rates and zero fees.', step: 'Select base and target currencies to instantly calculate converted amounts and exchange rates.' }
    ],
    markdownSyndication: `# 10 Accurate Financial & Health Calculators No Signup for 2026

Calculate loans, investments, and health metrics with complete privacy at [FreeToolsNoSignup.com](https://www.freetoolsnosignup.com/):

1. **[Compound Interest Calculator](https://www.freetoolsnosignup.com/tools/compound-interest-calc)** - Exponential wealth visualizer.
2. **[Mortgage EMI Calculator](https://www.freetoolsnosignup.com/tools/mortgage-calc)** - Amortization & prepayment models.
3. **[Salary Take-Home Estimator](https://www.freetoolsnosignup.com/tools/salary-calc)** - Net pay after taxes.
4. **[BMI & Health Gauge](https://www.freetoolsnosignup.com/tools/bmi-calc)** - WHO-compliant health scores.
5. **[Auto Loan Calculator](https://www.freetoolsnosignup.com/tools/auto-loan-calc)** - Vehicle financing estimates.
6. **[Retirement & FIRE Planner](https://www.freetoolsnosignup.com/tools/retirement-calc)** - Financial independence corpus.
7. **[Debt Payoff Planner](https://www.freetoolsnosignup.com/tools/debt-payoff-calc)** - Snowball vs Avalanche methods.
8. **[Calorie & BMR Calculator](https://www.freetoolsnosignup.com/tools/calorie-calc)** - Daily caloric maintenance.
9. **[Tip & Bill Splitter](https://www.freetoolsnosignup.com/tools/tip-calculator)** - Group dining bill splitting.
10. **[Currency Converter](https://www.freetoolsnosignup.com/tools/currency-converter)** - Fast currency conversions.

*Zero signups. 100% private calculations on [FreeToolsNoSignup.com](https://www.freetoolsnosignup.com/).*`
  }
};

export const BlogPage: React.FC<BlogPageProps> = ({ 
  articleSlug, 
  onNavigateHome, 
  onNavigateTo 
}) => {
  const [copiedMd, setCopiedMd] = useState(false);

  const activeArticle = articleSlug ? ARTICLES[articleSlug] : null;

  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} | FreeToolsNoSignup`;
    } else {
      document.title = `Free Tools & Privacy Blog | FreeToolsNoSignup`;
    }
    window.scrollTo(0, 0);
  }, [activeArticle]);

  const handleCopyMarkdown = () => {
    if (activeArticle && navigator.clipboard) {
      navigator.clipboard.writeText(activeArticle.markdownSyndication);
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2500);
    }
  };

  // If viewing a single article
  if (activeArticle) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col selection:bg-[#FF7A00] selection:text-white">
        {/* Header */}
        <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
          <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateTo('/blog')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7FC] hover:bg-[#EBF3FF] hover:text-[#126BFF] text-[#0B1F3A] font-bold text-xs border border-[#E2E8F0] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Articles</span>
              </button>
              <BrandLogo variant="header" onClick={onNavigateHome} />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 rounded-xl bg-[#0A1931] hover:bg-[#126BFF] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                title="Copy ready-to-publish Markdown with backlinks"
              >
                {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMd ? 'Markdown Copied!' : 'Copy as Markdown'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
          
          <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs space-y-6">
            
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
              <span className="px-2.5 py-0.5 rounded-md bg-[#EBF3FF] text-[#126BFF] font-bold">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticle.publishDate}
              </span>
            </div>

            <h1 className="font-serif-royal text-2xl sm:text-4xl font-bold text-[#0A1931] tracking-tight leading-tight">
              {activeArticle.title}
            </h1>

            <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed border-l-4 border-[#126BFF] pl-4 italic">
              {activeArticle.summary}
            </p>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-6">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* 10 Tools Detailed Breakdown */}
            <div className="space-y-4 border-t border-[#E2E8F0] pt-6">
              <h2 className="text-lg sm:text-xl font-black text-[#0B1F3A]">
                The 10 Top-Rated Free Tools (Step-by-Step)
              </h2>

              <div className="space-y-4">
                {activeArticle.toolsList.map((tool, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 hover:border-[#126BFF] transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-[#0B1F3A] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#EBF3FF] text-[#126BFF] font-mono text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{tool.name}</span>
                      </h3>
                      <a
                        href={`/tools/${tool.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigateTo(`/tools/${tool.slug}`);
                        }}
                        className="text-xs text-[#126BFF] font-bold hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>Open Tool</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <p className="text-xs text-[#64748B] pl-8">
                      {tool.desc}
                    </p>

                    <div className="text-[11px] text-[#475569] bg-white p-2.5 rounded-xl border border-[#E2E8F0] ml-8 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                      <span><strong>How to use:</strong> {tool.step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Syndication Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#F0FDF4] to-[#EBF3FF] border border-[#A7F3D0] space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#0B1F3A]">Syndicate this Article on Dev.to / Medium / Hashnode</h4>
                  <p className="text-xs text-[#475569]">
                    Feel free to republish this post on your own blog or engineering publication with attribution to FreeToolsNoSignup.
                  </p>
                </div>
                <button
                  onClick={handleCopyMarkdown}
                  className="px-4 py-2.5 rounded-xl bg-[#0A1931] hover:bg-[#126BFF] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMd ? 'Copied!' : 'Copy Markdown'}</span>
                </button>
              </div>
            </div>

          </article>

        </main>
      </div>
    );
  }

  // Blog Directory Index
  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col selection:bg-[#FF7A00] selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7FC] hover:bg-[#EBF3FF] hover:text-[#126BFF] text-[#0B1F3A] font-bold text-xs border border-[#E2E8F0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Knowledge &amp; Engineering Guides
            </span>
          </div>

          <h1 className="font-serif-royal text-2xl sm:text-4xl font-bold text-[#0A1931] tracking-tight">
            The FreeToolsNoSignup Engineering &amp; Productivity Blog
          </h1>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
            In-depth guides, technical comparisons, and step-by-step tutorials on privacy-first browser computing, client-side WebAssembly, and using {TOTAL_TOOLS_COUNT} free tools with zero signup friction.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(ARTICLES).map((article) => (
            <div 
              key={article.slug}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#126BFF] transition-all group cursor-pointer"
              onClick={() => onNavigateTo(`/blog/${article.slug}`)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#EBF3FF] text-[#126BFF] font-bold">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#0B1F3A] group-hover:text-[#126BFF] transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-bold text-[#126BFF]">
                <span>Read Full 10-Tool Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};
