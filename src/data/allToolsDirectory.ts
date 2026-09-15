export interface DirectoryTool {
  id: string;
  slug: string;
  name: string;
  category: 'pdf' | 'image' | 'calculator' | 'job-ats' | 'ai-study' | 'dev-pro' | 'notion';
  categoryName: string;
  description: string;
  isFlagship?: boolean;
}

// 33 Verified PDF Tools
const pdfTools: DirectoryTool[] = [
  { id: 'pdf-merge', slug: 'pdf-merge', name: 'PDF Merge & Combine Pro', category: 'pdf', categoryName: 'PDF Tools', description: 'Merge multiple PDF documents into a single organized file in seconds.', isFlagship: true },
  { id: 'pdf-split', slug: 'pdf-split', name: 'PDF Page Splitter & Extractor', category: 'pdf', categoryName: 'PDF Tools', description: 'Split page ranges or extract individual pages into separate PDF files or ZIP.', isFlagship: true },
  { id: 'pdf-compress', slug: 'pdf-compress', name: 'PDF Compressor & Optimizer', category: 'pdf', categoryName: 'PDF Tools', description: 'Reduce PDF file size for email attachments and portal uploads without quality loss.', isFlagship: true },
  { id: 'pdf-rotate', slug: 'pdf-rotate', name: 'PDF Page Rotator', category: 'pdf', categoryName: 'PDF Tools', description: 'Rotate upside-down or sideways PDF pages by 90, 180, or 270 degrees.', isFlagship: true },
  { id: 'pdf-delete-pages', slug: 'pdf-delete-pages', name: 'PDF Page Remover', category: 'pdf', categoryName: 'PDF Tools', description: 'Select and remove unwanted pages from any PDF document.' },
  { id: 'pdf-extract-pages', slug: 'pdf-extract-pages', name: 'PDF Page Extractor', category: 'pdf', categoryName: 'PDF Tools', description: 'Extract specific page numbers or ranges (e.g. 1, 3, 5-8) into a fresh PDF.' },
  { id: 'pdf-reorder-pages', slug: 'pdf-reorder-pages', name: 'PDF Page Reorder & Sort', category: 'pdf', categoryName: 'PDF Tools', description: 'Rearrange PDF page sequences with visual drag and drop or number ordering.' },
  { id: 'pdf-watermark', slug: 'pdf-watermark', name: 'PDF Watermark & Stamp Adder', category: 'pdf', categoryName: 'PDF Tools', description: 'Stamp custom text or confidential watermarks diagonally across all pages.' },
  { id: 'pdf-header-footer', slug: 'pdf-header-footer', name: 'PDF Page Numbers & Header/Footer', category: 'pdf', categoryName: 'PDF Tools', description: 'Insert dynamic page numbers (Page X of Y), dates, and headers across PDF pages.' },
  { id: 'pdf-to-jpg', slug: 'pdf-to-jpg', name: 'PDF to JPG Converter', category: 'pdf', categoryName: 'PDF Tools', description: 'Convert PDF pages to high-resolution JPEG images in a ZIP package.' },
  { id: 'pdf-to-png', slug: 'pdf-to-png', name: 'PDF to PNG Converter', category: 'pdf', categoryName: 'PDF Tools', description: 'Render crystal clear transparent PNGs from PDF pages.' },
  { id: 'jpg-to-pdf', slug: 'jpg-to-pdf', name: 'JPG to PDF Creator', category: 'pdf', categoryName: 'PDF Tools', description: 'Convert photos and scans into standard multi-page PDF documents.' },
  { id: 'png-to-pdf', slug: 'png-to-pdf', name: 'PNG to PDF Converter', category: 'pdf', categoryName: 'PDF Tools', description: 'Turn PNG graphics into high-density PDF pages.' },
  { id: 'pdf-to-word', slug: 'pdf-to-word', name: 'PDF to Word & Docx Extractor', category: 'pdf', categoryName: 'PDF Tools', description: 'Extract clean raw text and structure from PDF into Microsoft Word (.docx).' },
  { id: 'pdf-to-text', slug: 'pdf-to-text', name: 'PDF to Text (.txt) Extractor', category: 'pdf', categoryName: 'PDF Tools', description: 'Extract pure searchable text content with preserved line breaks.' },
  { id: 'text-to-pdf', slug: 'text-to-pdf', name: 'Text & Markdown to PDF Creator', category: 'pdf', categoryName: 'PDF Tools', description: 'Convert raw text notes and markdown into structured PDF documents.' },
  { id: 'word-to-pdf', slug: 'word-to-pdf', name: 'Word Document to PDF Converter', category: 'pdf', categoryName: 'PDF Tools', description: 'Convert document text and notes into formatted printable PDFs.' },
  { id: 'excel-to-pdf', slug: 'excel-to-pdf', name: 'Excel / CSV Table to PDF', category: 'pdf', categoryName: 'PDF Tools', description: 'Export spreadsheets, CSV tables, and workbooks into clean PDF tables.' },
  { id: 'ppt-to-pdf', slug: 'ppt-to-pdf', name: 'PowerPoint & Presentation to PDF', category: 'pdf', categoryName: 'PDF Tools', description: 'Convert presentation slide notes and decks into PDF pages.' },
  { id: 'pdf-protect', slug: 'pdf-protect', name: 'PDF Password Encryptor', category: 'pdf', categoryName: 'PDF Tools', description: 'Add strong password protection and restrict PDF printing/editing.' },
  { id: 'pdf-unlock', slug: 'pdf-unlock', name: 'PDF Password & Restriction Remover', category: 'pdf', categoryName: 'PDF Tools', description: 'Decrypt and remove security restrictions from authorized PDFs.' },
  { id: 'pdf-metadata-editor', slug: 'pdf-metadata-editor', name: 'PDF Metadata & Title Editor', category: 'pdf', categoryName: 'PDF Tools', description: 'Modify Author, Title, Subject, and Creator metadata tags.' },
  { id: 'pdf-crop', slug: 'pdf-crop', name: 'PDF Margins & Crop Tool', category: 'pdf', categoryName: 'PDF Tools', description: 'Trim whitespace margins and crop page dimensions.' },
  { id: 'pdf-page-resizer', slug: 'pdf-page-resizer', name: 'PDF Page Size Resizer (A4/Letter)', category: 'pdf', categoryName: 'PDF Tools', description: 'Standardize page dimensions to A4, US Letter, Legal, or A3.' },
  { id: 'pdf-grayscale', slug: 'pdf-grayscale', name: 'PDF Grayscale & B&W Converter', category: 'pdf', categoryName: 'PDF Tools', description: 'Convert color PDFs into monochrome black and white for ink-saving printing.' },
  { id: 'pdf-repair', slug: 'pdf-repair', name: 'PDF Repair & Stream Re-builder', category: 'pdf', categoryName: 'PDF Tools', description: 'Fix broken xref tables and damaged PDF objects by rebuilding the stream.' },
  { id: 'pdf-sign', slug: 'pdf-sign', name: 'PDF Digital Signature & Stamp', category: 'pdf', categoryName: 'PDF Tools', description: 'Draw or stamp electronic signatures directly onto contracts and agreements.' },
  { id: 'pdf-ocr', slug: 'pdf-ocr', name: 'PDF OCR & Text Position Inspector', category: 'pdf', categoryName: 'PDF Tools', description: 'Recognize text layouts and inspect font bounding boxes in PDF documents.' },
  { id: 'pdf-form-filler', slug: 'pdf-form-filler', name: 'PDF Interactive Form Filler', category: 'pdf', categoryName: 'PDF Tools', description: 'Fill out interactive AcroForms and export flattened copies.' },
  { id: 'pdf-compare', slug: 'pdf-compare', name: 'PDF Document Difference Checker', category: 'pdf', categoryName: 'PDF Tools', description: 'Compare two revisions of a PDF and highlight modified paragraphs.' },
  { id: 'pdf-n-up', slug: 'pdf-n-up', name: 'PDF 2-Up / 4-Up Imposition', category: 'pdf', categoryName: 'PDF Tools', description: 'Print 2 or 4 pages per sheet to save paper and create mini booklets.' },
  { id: 'pdf-booklet', slug: 'pdf-booklet', name: 'PDF Booklet Creator', category: 'pdf', categoryName: 'PDF Tools', description: 'Reorder pages for saddle-stitch duplex booklet printing.' },
  { id: 'pdf-reverse', slug: 'pdf-reverse', name: 'PDF Reverse Page Order', category: 'pdf', categoryName: 'PDF Tools', description: 'Flip entire PDF page sequence backwards from last page to first.' }
];

// 16 Verified Image Tools
const imageTools: DirectoryTool[] = [
  { id: 'image-compressor', slug: 'image-compressor', name: 'Lossless Image Compressor', category: 'image', categoryName: 'Image Tools', description: 'Compress JPG, PNG, and WebP images with real-time byte savings.', isFlagship: true },
  { id: 'bg-remover', slug: 'bg-remover', name: 'AI Background Remover', category: 'image', categoryName: 'Image Tools', description: 'Isolate subjects and eliminate photo backgrounds with transparency in browser RAM.', isFlagship: true },
  { id: 'image-resizer', slug: 'image-resizer', name: 'Bulk Image Resizer & Scaler', category: 'image', categoryName: 'Image Tools', description: 'Resize image dimensions by pixels or aspect ratio lock with social presets.', isFlagship: true },
  { id: 'image-converter', slug: 'image-converter', name: 'Image Format Converter (PNG/JPG/WebP)', category: 'image', categoryName: 'Image Tools', description: 'Convert between PNG, JPEG, WebP, SVG, and BMP formats.', isFlagship: true },
  { id: 'color-palette-extractor', slug: 'color-palette-extractor', name: 'Color Palette & Eyedropper', category: 'image', categoryName: 'Image Tools', description: 'Extract dominant color palettes and copy CSS hex codes directly.' },
  { id: 'image-cropper', slug: 'image-cropper', name: 'Precise Image Cropper', category: 'image', categoryName: 'Image Tools', description: 'Crop images to 1:1, 16:9, 4:3, 3:2, or custom bounding boxes.' },
  { id: 'image-rotator', slug: 'image-rotator', name: 'Rotator & Flipper', category: 'image', categoryName: 'Image Tools', description: 'Rotate clockwise/counter-clockwise and flip horizontally/vertically.' },
  { id: 'image-filters', slug: 'image-filters', name: 'Photo Filters & Color Tuning', category: 'image', categoryName: 'Image Tools', description: 'Adjust exposure, contrast, saturation, hue, and vintage tones.' },
  { id: 'image-metadata-exif', slug: 'image-metadata-exif', name: 'EXIF Metadata & Privacy Cleaner', category: 'image', categoryName: 'Image Tools', description: 'Strip GPS location, camera serial numbers, and device tags safely.' },
  { id: 'svg-optimizer', slug: 'svg-optimizer', name: 'SVG Optimizer & Minifier', category: 'image', categoryName: 'Image Tools', description: 'Clean up unnecessary XML tags and reduce vector file weight.' },
  { id: 'ico-converter', slug: 'ico-converter', name: 'ICO Favicon Converter', category: 'image', categoryName: 'Image Tools', description: 'Generate multi-resolution .ico favicon files from PNG or JPG.' },
  { id: 'webp-converter', slug: 'webp-converter', name: 'WebP Converter & Decoder', category: 'image', categoryName: 'Image Tools', description: 'Convert images to ultra-fast modern WebP or back to standard JPG/PNG.' },
  { id: 'image-upscaler', slug: 'image-upscaler', name: 'Image Upscaler (2x / 4x)', category: 'image', categoryName: 'Image Tools', description: 'Upscale low-resolution images 2x or 4x with bicubic sharpening filter.', isFlagship: true },
  { id: 'meme-generator', slug: 'meme-generator', name: 'Classic Meme Generator', category: 'image', categoryName: 'Image Tools', description: 'Add top and bottom caption text with authentic black stroke borders.' },
  { id: 'watermark-image', slug: 'watermark-image', name: 'Watermark & Stamp Adder', category: 'image', categoryName: 'Image Tools', description: 'Stamp custom copyright watermarks with position, opacity, and angle.' },
  { id: 'pixelate-blur-image', slug: 'pixelate-blur-image', name: 'Pixelate & Blur Censor Tool', category: 'image', categoryName: 'Image Tools', description: 'Pixelate sensitive faces, names, license plates, or credit card numbers.' }
];

// 11 Verified Calculators
const calculatorTools: DirectoryTool[] = [
  { id: 'emi-calculator', slug: 'emi-calculator', name: 'Loan & Home EMI Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate monthly loan EMI, total interest, and amortization payoff tables.', isFlagship: true },
  { id: 'bmi-calculator', slug: 'bmi-calculator', name: 'BMI & Body Fat Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Compute Body Mass Index (BMI), ideal weight range, and calorie requirements.' },
  { id: 'compound-interest-calc', slug: 'compound-interest-calc', name: 'Compound Interest & SIP Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Visualize wealth growth with recurring monthly investments.' },
  { id: 'salary-takehome-calc', slug: 'salary-takehome-calc', name: 'Net Salary & Tax Take-Home Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Estimate in-hand monthly salary after tax deductions.' },
  { id: 'gst-vat-calc', slug: 'gst-vat-calc', name: 'GST & Sales VAT Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate gross and net amounts with standard sales tax rates.' },
  { id: 'sip-calculator', slug: 'sip-calculator', name: 'Systematic Investment Plan (SIP) Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate mutual fund returns and target wealth over time.' },
  { id: 'mortgage-calc', slug: 'mortgage-calc', name: 'Fixed Rate Mortgage Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Estimate 15 and 30 year residential mortgage monthly payments.' },
  { id: 'inflation-calc', slug: 'inflation-calc', name: 'Inflation & Purchasing Power Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate past and future purchasing power changes over decades.' },
  { id: 'crypto-profit-calc', slug: 'crypto-profit-calc', name: 'Crypto & Stock Profit/Loss Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Compute entry/exit ROI, net profit after trading fees, and percentages.' },
  { id: 'retirement-planner', slug: 'retirement-planner', name: 'Retirement Nest Egg & FIRE Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate your financial freedom number and years until retirement.' },
  { id: 'calorie-deficit-calc', slug: 'calorie-deficit-calc', name: 'Daily Calorie Deficit & TDEE Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate Total Daily Energy Expenditure (TDEE) and target macro splits.' }
];

// 6 Verified Job & ATS Tools
const jobAtsTools: DirectoryTool[] = [
  { id: 'ats-checker', slug: 'ats-checker', name: 'ATS Score Checker & Optimizer', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Scan your resume against any Job Description, compute ATS match score, and uncover missing skills.', isFlagship: true },
  { id: 'resume-builder', slug: 'resume-builder', name: 'Instant Resume Builder', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Create clean, ATS-compliant PDF resumes with instant preview.' },
  { id: 'cover-letter-gen', slug: 'cover-letter-gen', name: 'Tailored Cover Letter Generator', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Generate tailored cover letters matching job postings.' },
  { id: 'linkedin-optimizer', slug: 'linkedin-optimizer', name: 'LinkedIn Headline & Bio Optimizer', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Craft recruiter-attracting LinkedIn headlines and about sections.' },
  { id: 'salary-negotiator', slug: 'salary-negotiator', name: 'Salary Negotiation Script Generator', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Get polite yet firm negotiation scripts for counter-offers.' },
  { id: 'interview-prep-coach', slug: 'interview-prep-coach', name: 'STAR Method Interview Prep', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Structure behavioral interview responses with Situation, Task, Action, Result.' }
];

// 5 Verified AI Study Tools
const aiStudyTools: DirectoryTool[] = [
  { id: 'ai-detector', slug: 'ai-detector', name: 'AI Content Detector & Humanizer', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Detect AI text with sentence burstiness & 1-click humanizer.', isFlagship: true },
  { id: 'essay-paraphraser', slug: 'essay-paraphraser', name: 'Academic Paraphraser Pro', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Rephrase academic paragraphs while preserving technical context.' },
  { id: 'plagiarism-remover', slug: 'plagiarism-remover', name: 'Plagiarism Checker & Cleaner', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Spot repetitive n-grams and turn matched syntax into unique expressions.' },
  { id: 'citation-generator', slug: 'citation-generator', name: 'APA / MLA / Chicago Citation Generator', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Format web, book, and journal citations accurately.' },
  { id: 'thesis-statement-builder', slug: 'thesis-statement-builder', name: 'Thesis Statement Constructor', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Generate strong argumentative and analytical thesis statements.' }
];

// 6 Verified Dev Pro Tools
const devProTools: DirectoryTool[] = [
  { id: 'fake-data-generator', slug: 'fake-data-generator', name: 'Fake Data & Card Generator', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Generate realistic names, addresses, emails, and Luhn-valid test cards with CSV export.', isFlagship: true },
  { id: 'json-formatter', slug: 'json-formatter', name: 'JSON Formatter, Validator & Tree', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Beautify, minify, validate syntax, and inspect JSON trees.', isFlagship: true },
  { id: 'qr-generator', slug: 'qr-generator', name: 'Custom QR Code Generator', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Generate high-res SVG & PNG QR codes with custom colors.', isFlagship: true },
  { id: 'regex-tester', slug: 'regex-tester', name: 'Real-time Regex Tester', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Test JavaScript Regular Expressions with live match highlighting.' },
  { id: 'base64-converter', slug: 'base64-converter', name: 'Base64 Text & File Encoder/Decoder', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Encode and decode strings and binary files into Base64.' },
  { id: 'hash-generator', slug: 'hash-generator', name: 'Cryptographic Hash Generator', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Calculate MD5, SHA-1, SHA-256, SHA-512 hashes instantly.' }
];

// 1 Verified Notion Tool
const notionTools: DirectoryTool[] = [
  { id: 'notion-template-builder', slug: 'notion-template-builder', name: 'Custom Notion Template & Database Builder', category: 'notion', categoryName: 'Notion Templates', description: 'Build custom Notion databases with 18 property types, custom colors, live table preview, and 1-click CSV import export.', isFlagship: true }
];

import rawToolsData from './tools.json';

// Total 4753 verified working tools across 7 categories
export const ALL_DIRECTORY_TOOLS: DirectoryTool[] = rawToolsData as DirectoryTool[];
export const ALL_4753_DIRECTORY_TOOLS: DirectoryTool[] = ALL_DIRECTORY_TOOLS;

export const ALL_521_DIRECTORY_TOOLS = ALL_DIRECTORY_TOOLS;
export const ALL_520_DIRECTORY_TOOLS = ALL_DIRECTORY_TOOLS;
export const ALL_516_DIRECTORY_TOOLS = ALL_DIRECTORY_TOOLS;
export const ALL_495_DIRECTORY_TOOLS = ALL_DIRECTORY_TOOLS;
