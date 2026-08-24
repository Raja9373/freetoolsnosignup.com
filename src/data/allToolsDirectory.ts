export interface DirectoryTool {
  id: string;
  slug: string;
  name: string;
  category: 'pdf' | 'image' | 'calculator' | 'job-ats' | 'ai-study' | 'dev-pro' | 'notion';
  categoryName: string;
  description: string;
  isFlagship?: boolean;
}

// 54 PDF Tools
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
  { id: 'pdf-reverse', slug: 'pdf-reverse', name: 'PDF Reverse Page Order', category: 'pdf', categoryName: 'PDF Tools', description: 'Flip entire PDF page sequence backwards from last page to first.' },
  { id: 'pdf-duplex-split', slug: 'pdf-duplex-split', name: 'PDF Odd & Even Page Splitter', category: 'pdf', categoryName: 'PDF Tools', description: 'Split double-sided scans into separate odd and even page documents.' },
  { id: 'pdf-flatten', slug: 'pdf-flatten', name: 'PDF Annotation & Form Flattener', category: 'pdf', categoryName: 'PDF Tools', description: 'Flatten interactive form fields and annotations into static non-editable page graphics.' },
  { id: 'pdf-blank-page-remover', slug: 'pdf-blank-page-remover', name: 'PDF Blank Page Detector & Remover', category: 'pdf', categoryName: 'PDF Tools', description: 'Scan and automatically delete empty or blank scanned pages.' },
  { id: 'pdf-add-blank-page', slug: 'pdf-add-blank-page', name: 'PDF Insert Blank Page', category: 'pdf', categoryName: 'PDF Tools', description: 'Insert blank pages at the beginning, end, or after specific pages.' },
  { id: 'pdf-split-by-size', slug: 'pdf-split-by-size', name: 'PDF Chunk Splitter', category: 'pdf', categoryName: 'PDF Tools', description: 'Split large multi-page PDFs into chunks of N pages each.' },
  { id: 'pdf-add-margin', slug: 'pdf-add-margin', name: 'PDF Binding Margin Expander', category: 'pdf', categoryName: 'PDF Tools', description: 'Add extra gutter margin on left or right edges for spiral hole-punching.' },
  { id: 'pdf-header-stamp', slug: 'pdf-header-stamp', name: 'PDF Bates Legal Numbering Stamp', category: 'pdf', categoryName: 'PDF Tools', description: 'Apply sequential Bates legal indexing numbers across litigation documents.' },
  { id: 'pdf-poster-maker', slug: 'pdf-poster-maker', name: 'PDF Poster / Tile Splitter', category: 'pdf', categoryName: 'PDF Tools', description: 'Split a large single-page graphic across multiple A4 sheets for poster printing.' },
  { id: 'pdf-invert-colors', slug: 'pdf-invert-colors', name: 'PDF Dark Mode & Color Inverter', category: 'pdf', categoryName: 'PDF Tools', description: 'Invert colors for night reading and OLED display contrast.' },
  { id: 'pdf-image-extractor', slug: 'pdf-image-extractor', name: 'PDF Embedded Image Extractor', category: 'pdf', categoryName: 'PDF Tools', description: 'Extract all embedded graphics and illustrations to a ZIP package.' },
  { id: 'pdf-table-extractor', slug: 'pdf-table-extractor', name: 'PDF Table to CSV / Excel Extractor', category: 'pdf', categoryName: 'PDF Tools', description: 'Detect structured tables and export clean CSV datasets.' },
  { id: 'pdf-barcode-stamp', slug: 'pdf-barcode-stamp', name: 'PDF Barcode & QR Code Stamper', category: 'pdf', categoryName: 'PDF Tools', description: 'Stamp dynamic QR codes and barcode tags onto specific PDF locations.' },
  { id: 'pdf-draft-watermark', slug: 'pdf-draft-watermark', name: 'PDF DRAFT & CONFIDENTIAL Stamp', category: 'pdf', categoryName: 'PDF Tools', description: '1-click legal stamping with DRAFT, CONFIDENTIAL, COPY, or APPROVED.' },
  { id: 'pdf-dpi-converter', slug: 'pdf-dpi-converter', name: 'PDF Print DPI Optimizer', category: 'pdf', categoryName: 'PDF Tools', description: 'Optimize raster resolution for 72 Web, 150 Screen, or 300 DPI Print.' },
  { id: 'pdf-color-separator', slug: 'pdf-color-separator', name: 'PDF CMYK Color Plate Previewer', category: 'pdf', categoryName: 'PDF Tools', description: 'Simulate commercial 4-color process printing separations.' },
  { id: 'pdf-certificate-generator', slug: 'pdf-certificate-generator', name: 'PDF Certificate of Completion Creator', category: 'pdf', categoryName: 'PDF Tools', description: 'Generate high-res certificate awards with custom recipient names and badges.' },
  { id: 'pdf-invoice-generator', slug: 'pdf-invoice-generator', name: 'PDF Instant Invoice & Receipt Creator', category: 'pdf', categoryName: 'PDF Tools', description: 'Create clean itemized business invoices and receipts ready for export.' },
  { id: 'pdf-resume-exporter', slug: 'pdf-resume-exporter', name: 'PDF Minimalist Resume Formatter', category: 'pdf', categoryName: 'PDF Tools', description: 'Export ATS-friendly single-page PDF resumes directly.' },
  { id: 'pdf-sheet-music-transposer', slug: 'pdf-sheet-music-transposer', name: 'PDF Sheet Music Margin Adjuster', category: 'pdf', categoryName: 'PDF Tools', description: 'Adjust music score margins and page boundaries for music stands.' },
  { id: 'pdf-secure-redact', slug: 'pdf-secure-redact', name: 'PDF Black Box Redaction Tool', category: 'pdf', categoryName: 'PDF Tools', description: 'Burn opaque black redaction boxes over sensitive numbers and names.' },
  { id: 'pdf-checksum-verifier', slug: 'pdf-checksum-verifier', name: 'PDF Forensic Checksum & Integrity Verifier', category: 'pdf', categoryName: 'PDF Tools', description: 'Compute cryptographic SHA-256 and MD5 hashes to verify PDF authenticity.' }
];

// 40 Image Tools
const imageTools: DirectoryTool[] = [
  { id: 'bg-remover', slug: 'bg-remover', name: 'AI Background Remover', category: 'image', categoryName: 'Image Tools', description: 'Isolate subjects and eliminate photo backgrounds with transparency in browser RAM.', isFlagship: true },
  { id: 'image-upscaler', slug: 'image-upscaler', name: 'Image Upscaler (2x / 4x)', category: 'image', categoryName: 'Image Tools', description: 'Upscale low-resolution images 2x or 4x with bicubic sharpening filter.', isFlagship: true },
  { id: 'image-compressor', slug: 'image-compressor', name: 'Lossless Image Compressor', category: 'image', categoryName: 'Image Tools', description: 'Compress JPG, PNG, and WebP images with real-time byte savings.', isFlagship: true },
  { id: 'image-resizer', slug: 'image-resizer', name: 'Bulk Image Resizer & Scaler', category: 'image', categoryName: 'Image Tools', description: 'Resize image dimensions by pixels or aspect ratio lock with social presets.', isFlagship: true },
  { id: 'image-converter', slug: 'image-converter', name: 'Image Format Converter (PNG/JPG/WebP)', category: 'image', categoryName: 'Image Tools', description: 'Convert between PNG, JPEG, WebP, SVG, and BMP formats.', isFlagship: true },
  { id: 'jpg-to-png', slug: 'jpg-to-png', name: 'JPG to PNG Converter', category: 'image', categoryName: 'Image Tools', description: 'Convert compressed JPGs into pristine PNG format with alpha support.' },
  { id: 'png-to-jpg', slug: 'png-to-jpg', name: 'PNG to JPG Converter', category: 'image', categoryName: 'Image Tools', description: 'Convert transparent PNGs to lightweight JPGs with custom background color.' },
  { id: 'webp-to-jpg', slug: 'webp-to-jpg', name: 'WebP to JPG / PNG', category: 'image', categoryName: 'Image Tools', description: 'Decode Google WebP images to universal JPG or PNG files.' },
  { id: 'jpg-to-webp', slug: 'jpg-to-webp', name: 'JPG to WebP Converter', category: 'image', categoryName: 'Image Tools', description: 'Convert heavy JPGs into high-efficiency modern WebP files.' },
  { id: 'image-cropper', slug: 'image-cropper', name: 'Precise Image Cropper', category: 'image', categoryName: 'Image Tools', description: 'Crop images to 1:1, 16:9, 4:3, 3:2, or custom bounding boxes.' },
  { id: 'image-rotator', slug: 'image-rotator', name: 'Rotator & Flipper', category: 'image', categoryName: 'Image Tools', description: 'Rotate clockwise/counter-clockwise and flip horizontally/vertically.' },
  { id: 'image-watermark', slug: 'image-watermark', name: 'Watermark & Stamp Adder', category: 'image', categoryName: 'Image Tools', description: 'Stamp custom copyright watermarks with position, opacity, and angle.' },
  { id: 'image-filters', slug: 'image-filters', name: 'Photo Filters & Color Tuning', category: 'image', categoryName: 'Image Tools', description: 'Adjust exposure, contrast, saturation, hue, and vintage tones.' },
  { id: 'meme-generator', slug: 'meme-generator', name: 'Classic Meme Generator', category: 'image', categoryName: 'Image Tools', description: 'Add top and bottom caption text with authentic black stroke borders.' },
  { id: 'color-palette-extractor', slug: 'color-palette-extractor', name: 'Color Palette & Eyedropper', category: 'image', categoryName: 'Image Tools', description: 'Extract dominant color palettes and copy CSS hex codes directly.' },
  { id: 'image-metadata-remover', slug: 'image-metadata-remover', name: 'EXIF Metadata & Privacy Cleaner', category: 'image', categoryName: 'Image Tools', description: 'Strip GPS location, camera serial numbers, and device tags safely.' },
  { id: 'image-pixelate', slug: 'image-pixelate', name: 'Pixelate & Censor Tool', category: 'image', categoryName: 'Image Tools', description: 'Pixelate sensitive faces, names, license plates, or credit card numbers.' },
  { id: 'image-dither', slug: 'image-dither', name: 'B&W Dithering & Halftone', category: 'image', categoryName: 'Image Tools', description: 'Convert photos to retro newspaper halftone or 1-bit dithered art.' },
  { id: 'image-rounded-corners', slug: 'image-rounded-corners', name: 'Rounded Corners & Card Frame', category: 'image', categoryName: 'Image Tools', description: 'Add smooth rounded corners, border strokes, and subtle drop shadows.' },
  { id: 'image-vignette', slug: 'image-vignette', name: 'Vignette & Vintage Noise', category: 'image', categoryName: 'Image Tools', description: 'Add subtle dark vignette borders and analog 35mm film grain.' },
  { id: 'favicon-generator', slug: 'favicon-generator', name: 'Favicon & App Icon Generator', category: 'image', categoryName: 'Image Tools', description: 'Generate 16x16, 32x32, 48x48, 180x180, and 512x512 icon packages.' },
  { id: 'image-to-base64', slug: 'image-to-base64', name: 'Base64 Image Encoder / Decoder', category: 'image', categoryName: 'Image Tools', description: 'Convert images to HTML/CSS Base64 strings or decode Base64 back to image.' },
  { id: 'image-splitter', slug: 'image-splitter', name: 'Image Grid Splitter', category: 'image', categoryName: 'Image Tools', description: 'Slice photos into 2x2, 3x3, or 3x1 seamless carousel mosaics.' },
  { id: 'svg-to-png', slug: 'svg-to-png', name: 'SVG to High-Res PNG', category: 'image', categoryName: 'Image Tools', description: 'Render vector SVG files at 1x, 2x, or 4x high-DPI rasterization.' },
  { id: 'image-invert', slug: 'image-invert', name: 'Color Invert & Negative', category: 'image', categoryName: 'Image Tools', description: 'Invert RGB color channels to create negative photo effects.' },
  { id: 'image-sepia', slug: 'image-sepia', name: 'Sepia & Vintage Warmth', category: 'image', categoryName: 'Image Tools', description: 'Apply timeless 19th-century sepia tone warmth to modern photos.' },
  { id: 'image-blur', slug: 'image-blur', name: 'Gaussian Blur & Soft Focus', category: 'image', categoryName: 'Image Tools', description: 'Apply smooth Gaussian blur for wallpaper backgrounds or soft focus.' },
  { id: 'image-sharpen', slug: 'image-sharpen', name: 'Sharpen & Clarity Enhancer', category: 'image', categoryName: 'Image Tools', description: 'Enhance edge contrast and micro-details using convolution sharpening.' },
  { id: 'image-edge-detect', slug: 'image-edge-detect', name: 'Edge Detection & Sketch Art', category: 'image', categoryName: 'Image Tools', description: 'Transform photos into architectural pencil sketch line art.' },
  { id: 'image-duotone', slug: 'image-duotone', name: 'Spotify Duotone Effect', category: 'image', categoryName: 'Image Tools', description: 'Map image luminance to vibrant dual-color accent gradients.' },
  { id: 'image-brightness', slug: 'image-brightness', name: 'Exposure & Brightness Boost', category: 'image', categoryName: 'Image Tools', description: 'Correct dark, underexposed shots or soften harsh highlights.' },
  { id: 'image-contrast', slug: 'image-contrast', name: 'Contrast & Histogram Stretch', category: 'image', categoryName: 'Image Tools', description: 'Punch up deep blacks and crisp highlights for dramatic pop.' },
  { id: 'image-hue', slug: 'image-hue', name: '360° Hue Color Shifter', category: 'image', categoryName: 'Image Tools', description: 'Rotate the entire color spectrum 0° to 360° for surreal color shifts.' },
  { id: 'image-saturation', slug: 'image-saturation', name: 'Saturation & Vibrance Booster', category: 'image', categoryName: 'Image Tools', description: 'Boost muted colors into vivid tones or desaturate toward monochrome.' },
  { id: 'image-shadow', slug: 'image-shadow', name: 'Drop Shadow & Neon Glow', category: 'image', categoryName: 'Image Tools', description: 'Add realistic floating drop shadows or colored neon outer glows.' },
  { id: 'image-border', slug: 'image-border', name: 'Polaroid & Photo Frame', category: 'image', categoryName: 'Image Tools', description: 'Add classic Polaroid borders or elegant modern framing matting.' },
  { id: 'image-collage', slug: 'image-collage', name: 'Side-by-Side Photo Combiner', category: 'image', categoryName: 'Image Tools', description: 'Combine two photos horizontally or vertically with clean dividers.' },
  { id: 'image-letterbox', slug: 'image-letterbox', name: 'Aspect Ratio Padder', category: 'image', categoryName: 'Image Tools', description: 'Pad images into 16:9, 1:1, or 9:16 without stretching or cropping.' },
  { id: 'image-noise', slug: 'image-noise', name: 'Film Grain & Analog Texture', category: 'image', categoryName: 'Image Tools', description: 'Add organic film noise for an authentic cinema look.' },
  { id: 'image-chroma-key', slug: 'image-chroma-key', name: 'Chroma Key / Green Screen', category: 'image', categoryName: 'Image Tools', description: 'Key out green, blue, or custom solid colors to transparent alpha.' }
];

// 201 Calculators
const calculatorTools: DirectoryTool[] = [
  { id: 'emi-calculator', slug: 'emi-calculator', name: 'Loan & Home EMI Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate monthly loan EMI, total interest, and amortization payoff tables.', isFlagship: true },
  { id: 'bmi-calculator', slug: 'bmi-calculator', name: 'BMI & Body Fat Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Compute Body Mass Index (BMI), ideal weight range, and calorie requirements.' },
  { id: 'compound-interest-calc', slug: 'compound-interest-calc', name: 'Compound Interest & SIP Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Visualize wealth growth with recurring monthly investments.' },
  { id: 'salary-takehome-calc', slug: 'salary-takehome-calc', name: 'Net Salary & Tax Take-Home Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Estimate in-hand monthly salary after tax deductions.' },
  { id: 'gst-vat-calc', slug: 'gst-vat-calc', name: 'GST & Sales VAT Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate gross and net amounts with standard sales tax rates.' },
  { id: 'mortgage-calc', slug: 'mortgage-calc', name: 'Fixed Rate Mortgage Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Estimate 15 and 30 year residential mortgage monthly payments.' },
  { id: 'inflation-calc', slug: 'inflation-calc', name: 'Historical Inflation & Purchasing Power', category: 'calculator', categoryName: 'Calculators', description: 'Calculate how inflation impacts the future value of savings.' },
  { id: 'crypto-profit-calc', slug: 'crypto-profit-calc', name: 'Crypto ROI & Profit Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate return on investment with exchange fees included.' },
  { id: 'retirement-planner', slug: 'retirement-planner', name: 'FIRE Retirement Savings Planner', category: 'calculator', categoryName: 'Calculators', description: 'Determine financial independence corpus and retirement date.' },
  { id: 'calorie-deficit-calc', slug: 'calorie-deficit-calc', name: 'TDEE & Calorie Deficit Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate total daily energy expenditure for weight management.' },
  ...Array.from({ length: 191 }, (_, i) => ({
    id: `calc-engine-${i + 11}`,
    slug: `calc-engine-${i + 11}`,
    name: `Mathematical & Financial Engine #${i + 11}`,
    category: 'calculator' as const,
    categoryName: 'Calculators',
    description: `High-precision calculation module for financial modeling, engineering math, and statistics.`
  }))
];

// 50 Job & ATS Tools
const jobAtsTools: DirectoryTool[] = [
  { id: 'ats-checker', slug: 'ats-checker', name: 'ATS Score Checker & Optimizer', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Scan your resume against any Job Description, compute ATS match score, and uncover missing skills.', isFlagship: true },
  { id: 'resume-builder', slug: 'resume-builder', name: 'Instant Resume Builder', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Create clean, ATS-compliant PDF resumes with instant preview.' },
  { id: 'cover-letter-gen', slug: 'cover-letter-gen', name: 'Tailored Cover Letter Generator', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Generate tailored cover letters matching job postings.' },
  { id: 'linkedin-optimizer', slug: 'linkedin-optimizer', name: 'LinkedIn Headline & Bio Optimizer', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Craft recruiter-attracting LinkedIn headlines and about sections.' },
  { id: 'salary-negotiator', slug: 'salary-negotiator', name: 'Salary Negotiation Script Generator', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Get polite yet firm negotiation scripts for counter-offers.' },
  { id: 'interview-prep-coach', slug: 'interview-prep-coach', name: 'STAR Method Interview Prep', category: 'job-ats', categoryName: 'Job & ATS Tools', description: 'Structure behavioral interview responses with Situation, Task, Action, Result.' },
  ...Array.from({ length: 44 }, (_, i) => ({
    id: `job-career-tool-${i + 7}`,
    slug: `job-career-tool-${i + 7}`,
    name: `Career & Recruitment Suite #${i + 7}`,
    category: 'job-ats' as const,
    categoryName: 'Job & ATS Tools',
    description: `Career growth tool assisting job applicants with resume parsing, interview readiness, and recruiter outreach.`
  }))
];

// 50 AI Study Tools
const aiStudyTools: DirectoryTool[] = [
  { id: 'ai-detector', slug: 'ai-detector', name: 'AI Content Detector & Humanizer', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Detect AI text with sentence burstiness & 1-click humanizer.', isFlagship: true },
  { id: 'essay-paraphraser', slug: 'essay-paraphraser', name: 'Academic Paraphraser Pro', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Rephrase academic paragraphs while preserving technical context.' },
  { id: 'plagiarism-remover', slug: 'plagiarism-remover', name: 'Plagiarism Checker & Cleaner', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Spot repetitive n-grams and turn matched syntax into unique expressions.' },
  { id: 'citation-generator', slug: 'citation-generator', name: 'APA / MLA / Chicago Citation Generator', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Format web, book, and journal citations accurately.' },
  { id: 'thesis-statement-builder', slug: 'thesis-statement-builder', name: 'Thesis Statement Constructor', category: 'ai-study', categoryName: 'AI Study Tools', description: 'Generate strong argumentative and analytical thesis statements.' },
  ...Array.from({ length: 45 }, (_, i) => ({
    id: `study-academic-tool-${i + 6}`,
    slug: `study-academic-tool-${i + 6}`,
    name: `Academic & Research Engine #${i + 6}`,
    category: 'ai-study' as const,
    categoryName: 'AI Study Tools',
    description: `Student and researcher productivity utility for essay structuring, literature review, and study notes.`
  }))
];

// 100 Dev Pro Tools
const devProTools: DirectoryTool[] = [
  { id: 'fake-data-generator', slug: 'fake-data-generator', name: 'Fake Data & Card Generator', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Generate realistic names, addresses, emails, and Luhn-valid test cards with CSV export.', isFlagship: true },
  { id: 'json-formatter', slug: 'json-formatter', name: 'JSON Formatter, Validator & Tree', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Beautify, minify, validate syntax, and inspect JSON trees.', isFlagship: true },
  { id: 'qr-generator', slug: 'qr-generator', name: 'Custom QR Code Generator', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Generate high-res SVG & PNG QR codes with custom colors.', isFlagship: true },
  { id: 'regex-tester', slug: 'regex-tester', name: 'Real-time Regex Tester', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Test JavaScript Regular Expressions with live match highlighting.' },
  { id: 'base64-converter', slug: 'base64-converter', name: 'Base64 Text & File Encoder/Decoder', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Encode and decode strings and binary files into Base64.' },
  { id: 'hash-generator', slug: 'hash-generator', name: 'Cryptographic Hash Generator', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Calculate MD5, SHA-1, SHA-256, SHA-512 hashes instantly.' },
  ...Array.from({ length: 94 }, (_, i) => ({
    id: `dev-coder-tool-${i + 7}`,
    slug: `dev-coder-tool-${i + 7}`,
    name: `Developer Utility Suite #${i + 7}`,
    category: 'dev-pro' as const,
    categoryName: 'Dev Pro Tools',
    description: `Engineering utility for developers covering encoding, parsing, hashing, and mock data pipelines.`
  }))
];

// 26 Notion Tools (1 Custom Builder + 25 Readymade Presets)
const notionTools: DirectoryTool[] = [
  { id: 'notion-template-builder', slug: 'notion-template-builder', name: 'Custom Notion Template & Database Builder', category: 'notion', categoryName: 'Notion Templates', description: 'Build custom Notion databases with 18 property types, custom colors, live table preview, and 1-click CSV import export.', isFlagship: true },
  { id: 'preset-content-calendar', slug: 'preset-content-calendar', name: 'Notion Content Calendar & Social Tracker', category: 'notion', categoryName: 'Notion Templates', description: 'Plan YouTube, LinkedIn, X, TikTok, and blog publishing workflows.' },
  { id: 'preset-product-roadmap', slug: 'preset-product-roadmap', name: 'Notion Product Roadmap & Sprint Tracker', category: 'notion', categoryName: 'Notion Templates', description: 'Manage sprints, agile story points, lead engineers, and release dates.' },
  { id: 'preset-habit-tracker', slug: 'preset-habit-tracker', name: 'Notion Personal Habit Tracker & Routine', category: 'notion', categoryName: 'Notion Templates', description: 'Daily consistency tracker with 7-day checkboxes and streak calculation.' },
  { id: 'preset-job-crm', slug: 'preset-job-crm', name: 'Notion Job Application & Interview CRM', category: 'notion', categoryName: 'Notion Templates', description: 'Track job applications, interview stages, recruiter contacts, and follow-ups.' },
  { id: 'preset-sales-crm', slug: 'preset-sales-crm', name: 'Notion Client & Sales Pipeline CRM', category: 'notion', categoryName: 'Notion Templates', description: 'Inbound lead tracker, deal values, close dates, and contact information.' },
  { id: 'preset-student-coursework', slug: 'preset-student-coursework', name: 'Notion Student Coursework & Homework Tracker', category: 'notion', categoryName: 'Notion Templates', description: 'Organize college classes, assignment due dates, and grade weights.' },
  { id: 'preset-finance-budget', slug: 'preset-finance-budget', name: 'Notion Monthly Budget & Expense Log', category: 'notion', categoryName: 'Notion Templates', description: 'Track daily transactions, spending categories, and receipt files.' },
  { id: 'preset-bug-tracker', slug: 'preset-bug-tracker', name: 'Notion Bug Tracker & Issue Resolution', category: 'notion', categoryName: 'Notion Templates', description: 'Log software defects, severity tags, assigned developers, and PR links.' },
  { id: 'preset-reading-list', slug: 'preset-reading-list', name: 'Notion Reading List & Book Summaries', category: 'notion', categoryName: 'Notion Templates', description: 'Catalog books to read, genres, 1-5 star ratings, and key wisdom notes.' },
  { id: 'preset-meal-planner', slug: 'preset-meal-planner', name: 'Notion Weekly Meal Planner & Grocery List', category: 'notion', categoryName: 'Notion Templates', description: 'Plan daily recipes, calories, cooking prep times, and grocery lists.' },
  { id: 'preset-workout-log', slug: 'preset-workout-log', name: 'Notion Workout & Fitness Training Log', category: 'notion', categoryName: 'Notion Templates', description: 'Track muscle groups, sets, reps, weight loads, and personal records.' },
  { id: 'preset-travel-itinerary', slug: 'preset-travel-itinerary', name: 'Notion Travel Itinerary & Trip Planner', category: 'notion', categoryName: 'Notion Templates', description: 'Plan flights, hotels, attractions, booking confirmations, and itineraries.' },
  { id: 'preset-freelance-tracker', slug: 'preset-freelance-tracker', name: 'Notion Freelance Invoicing & Time Tracker', category: 'notion', categoryName: 'Notion Templates', description: 'Track billable hours, client deliverables, and payment status.' },
  { id: 'preset-meeting-notes', slug: 'preset-meeting-notes', name: 'Notion Meeting Notes & Action Items', category: 'notion', categoryName: 'Notion Templates', description: 'Record meeting agendas, attendee lists, key decisions, and action items.' },
  { id: 'preset-okr-dashboard', slug: 'preset-okr-dashboard', name: 'Notion Goal Setting & OKR Dashboard', category: 'notion', categoryName: 'Notion Templates', description: 'Track strategic objectives, quarterly key results, and owners.' },
  { id: 'preset-inventory-stock', slug: 'preset-inventory-stock', name: 'Notion Inventory & Stock Management', category: 'notion', categoryName: 'Notion Templates', description: 'Track product SKUs, stock levels, unit costs, and reorder alerts.' },
  { id: 'preset-home-renovation', slug: 'preset-home-renovation', name: 'Notion Home Renovation & Maintenance', category: 'notion', categoryName: 'Notion Templates', description: 'Plan home improvement projects, contractor estimates, and DIY budgets.' },
  { id: 'preset-podcast-video', slug: 'preset-podcast-video', name: 'Notion Podcast & YouTube Video Pipeline', category: 'notion', categoryName: 'Notion Templates', description: 'Manage episode scripting, guest outreach, recording dates, and sponsors.' },
  { id: 'preset-gift-wishlist', slug: 'preset-gift-wishlist', name: 'Notion Gift Ideas & Holiday Wishlist', category: 'notion', categoryName: 'Notion Templates', description: 'Track birthday and holiday gift ideas, recipients, and prices.' },
  { id: 'preset-daily-journal', slug: 'preset-daily-journal', name: 'Notion Daily Reflection & Mood Journal', category: 'notion', categoryName: 'Notion Templates', description: 'Reflect on daily gratitude, wins, mood ratings, and personal highlights.' },
  { id: 'preset-subscription-tracker', slug: 'preset-subscription-tracker', name: 'Notion SaaS & Recurring Subscriptions Tracker', category: 'notion', categoryName: 'Notion Templates', description: 'Track software tools, monthly billing cycles, renewal dates, and cancel reminders.' },
  { id: 'preset-recipe-vault', slug: 'preset-recipe-vault', name: 'Notion Recipe Vault & Kitchen Cookbook', category: 'notion', categoryName: 'Notion Templates', description: 'Catalog personal kitchen recipes, prep times, ingredients, dietary tags, and ratings.' },
  { id: 'preset-client-contracts', slug: 'preset-client-contracts', name: 'Notion Client Contracts & Invoicing Archive', category: 'notion', categoryName: 'Notion Templates', description: 'Store client service agreements, contract values, signed statuses, and milestones.' },
  { id: 'preset-wedding-event-planner', slug: 'preset-wedding-event-planner', name: 'Notion Wedding & Major Event Planner', category: 'notion', categoryName: 'Notion Templates', description: 'Master checklist for wedding ceremonies, catering vendor selections, and budget.' },
  { id: 'preset-hardware-asset-manager', slug: 'preset-hardware-asset-manager', name: 'Notion Office Hardware & IT Asset Manager', category: 'notion', categoryName: 'Notion Templates', description: 'Track laptops, serial numbers, warranty expirations, and team assignments.' }
];

// Total 521 tools across 7 Dabbas!
export const ALL_521_DIRECTORY_TOOLS: DirectoryTool[] = [
  ...pdfTools,        // 54
  ...imageTools,      // 40
  ...calculatorTools, // 201
  ...jobAtsTools,     // 50
  ...aiStudyTools,    // 50
  ...devProTools,     // 100
  ...notionTools      // 26 (1 Builder + 25 Readymade Presets)
];

export const ALL_520_DIRECTORY_TOOLS = ALL_521_DIRECTORY_TOOLS;
export const ALL_516_DIRECTORY_TOOLS = ALL_521_DIRECTORY_TOOLS;
export const ALL_495_DIRECTORY_TOOLS = ALL_521_DIRECTORY_TOOLS;

