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

// 1. PDF SUITE - 57 TOOLS EXACT
const PDF_CONVERT_TOOLS: MasterToolItem[] = [
  { id: 'pdf-to-word', slug: 'pdf-to-word', name: 'PDF to Word & DOCX Converter', description: 'Convert PDF files to editable Microsoft Word documents with preserved typography.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-to-excel', slug: 'pdf-to-excel', name: 'PDF to Excel Spreadsheet', description: 'Extract tables and structured data from PDF into clean XLSX spreadsheets.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-to-ppt', slug: 'pdf-to-ppt', name: 'PDF to PowerPoint Presentation', description: 'Transform PDF slides into editable PPTX presentation decks.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'pdf-to-jpg', slug: 'pdf-to-jpg', name: 'PDF to JPG Image Converter', description: 'Convert PDF pages into high-resolution JPG images packaged in a zip.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-to-png', slug: 'pdf-to-png', name: 'PDF to PNG Transparent Converter', description: 'Extract transparent crystal-clear PNG images from any PDF pages.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'pdf-to-html', slug: 'pdf-to-html', name: 'PDF to HTML Webpage Converter', description: 'Convert PDF documents into responsive HTML5 web layouts.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'word-to-pdf', slug: 'word-to-pdf', name: 'Word to PDF Document Converter', description: 'Convert DOC and DOCX documents into standard formatted PDF files.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'excel-to-pdf', slug: 'excel-to-pdf', name: 'Excel to PDF Table Converter', description: 'Convert Excel workbooks and sheets into printable PDF documents.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'ppt-to-pdf', slug: 'ppt-to-pdf', name: 'PowerPoint to PDF Converter', description: 'Convert presentation slides into high-fidelity PDF slides.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'jpg-to-pdf', slug: 'jpg-to-pdf', name: 'JPG to PDF Creator', description: 'Combine JPG photographs and camera scans into a multi-page PDF.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'png-to-pdf', slug: 'png-to-pdf', name: 'PNG to PDF Document Converter', description: 'Convert lossless PNG graphics and illustrations into PDF files.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'text-to-pdf', slug: 'text-to-pdf', name: 'Text & Markdown to PDF', description: 'Render clean markdown, plain text, or code into formatted PDF documents.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'pdf-to-text', slug: 'pdf-to-text', name: 'PDF to Plain Text (.TXT) Extractor', description: 'Strip document layout and extract pure searchable text.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'epub-to-pdf', slug: 'epub-to-pdf', name: 'ePub eBook to PDF Converter', description: 'Convert digital book ePub files into standard printable PDF format.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'mobi-to-pdf', slug: 'mobi-to-pdf', name: 'MOBI Kindle to PDF Converter', description: 'Convert Kindle MOBI books into universal PDF documents.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'csv-to-pdf', slug: 'csv-to-pdf', name: 'CSV Data to PDF Table', description: 'Convert CSV data tables into nicely styled PDF reports.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'xml-to-pdf', slug: 'xml-to-pdf', name: 'XML Data to PDF Converter', description: 'Render structured XML schemas into formatted PDF pages.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'svg-to-pdf', slug: 'svg-to-pdf', name: 'SVG Vector to PDF Document', description: 'Convert scalable vector graphics into vector-preserved PDF pages.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'bmp-to-pdf', slug: 'bmp-to-pdf', name: 'BMP to PDF Converter', description: 'Convert bitmap images into compact standardized PDF files.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'tiff-to-pdf', slug: 'tiff-to-pdf', name: 'TIFF Scanner to PDF Converter', description: 'Convert multi-page TIFF scanner outputs into single unified PDFs.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'pdf-to-epub', slug: 'pdf-to-epub', name: 'PDF to ePub eBook Converter', description: 'Convert formatted PDF files into reflowable ePub digital book format.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'pdf-to-csv', slug: 'pdf-to-csv', name: 'PDF Table to CSV Extractor', description: 'Extract numerical tables from PDF statements into raw CSV records.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'pdf-to-json', slug: 'pdf-to-json', name: 'PDF Text & Data to JSON', description: 'Parse text sections, headers, and metadata from PDF into JSON objects.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'pdf-to-svg', slug: 'pdf-to-svg', name: 'PDF Page to SVG Vector', description: 'Convert single PDF pages into scalable vector SVG artwork.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'rtf-to-pdf', slug: 'rtf-to-pdf', name: 'Rich Text RTF to PDF Converter', description: 'Convert Rich Text Format files into locked PDF documents.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'odt-to-pdf', slug: 'odt-to-pdf', name: 'OpenOffice ODT to PDF Converter', description: 'Convert LibreOffice / OpenOffice ODT documents into PDF files.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'webp-to-pdf', slug: 'webp-to-pdf', name: 'WebP to PDF Converter', description: 'Convert Google WebP web photos into PDF document pages.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
  { id: 'pdf-to-bmp', slug: 'pdf-to-bmp', name: 'PDF to BMP Image Converter', description: 'Convert PDF pages into uncompressed BMP raster images.', category: 'pdf', subcategory: 'Convert', categoryName: 'PDF Suite' },
];

const PDF_MERGE_SPLIT_TOOLS: MasterToolItem[] = [
  { id: 'pdf-merge', slug: 'pdf-merge', name: 'PDF Merge & Combine Pro', description: 'Combine multiple PDF documents into a single organized file in seconds.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-split', slug: 'pdf-split', name: 'PDF Page Splitter & Extractor', description: 'Split page ranges or extract individual pages into separate PDF files.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-extract-pages', slug: 'pdf-extract-pages', name: 'Extract Specific PDF Pages', description: 'Extract custom page numbers (e.g. 1, 3, 5-8) into a fresh PDF file.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-reorder-pages', slug: 'pdf-reorder-pages', name: 'Reorder & Rearrange PDF Pages', description: 'Sort and rearrange PDF pages with visual drag-and-drop ordering.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-rotate', slug: 'pdf-rotate', name: 'Rotate PDF Pages (90°/180°/270°)', description: 'Permanently rotate upside down or sideways PDF pages.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-booklet', slug: 'pdf-booklet', name: 'PDF Booklet Creator (Saddle-Stitch)', description: 'Impose and reorder pages for 2-up saddle-stitch duplex booklet printing.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-reverse', slug: 'pdf-reverse', name: 'Reverse PDF Page Sequence', description: 'Flip entire PDF page sequence backwards from last page to first.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-n-up', slug: 'pdf-n-up', name: 'PDF N-Up (2-Up / 4-Up Imposition)', description: 'Print 2 or 4 pages per sheet to save paper and create mini handouts.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-delete-pages', slug: 'pdf-delete-pages', name: 'Delete & Remove PDF Pages', description: 'Select and permanently remove unwanted pages from any PDF document.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-split-by-size', slug: 'pdf-split-by-size', name: 'Split PDF by Target File Size', description: 'Split large documents into chunks smaller than 10MB or 25MB for email.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-split-by-bookmarks', slug: 'pdf-split-by-bookmarks', name: 'Split PDF by Bookmarks / Chapters', description: 'Automatically split book chapters based on table of contents bookmarks.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-alternate-merge', slug: 'pdf-alternate-merge', name: 'Alternate PDF Mix & Merge', description: 'Merge two documents by alternating odd and even scanned sheets.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-split-in-half', slug: 'pdf-split-in-half', name: 'Split PDF in Half', description: 'Split document into two equal halves with one click.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-extract-odd-even', slug: 'pdf-extract-odd-even', name: 'Extract Odd / Even Pages', description: 'Separate odd and even pages for manual duplex printing scanners.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
  { id: 'pdf-batch-combine', slug: 'pdf-batch-combine', name: 'Batch Folder PDF Combiner', description: 'Combine dozens of PDF files in batch mode into an indexed binder.', category: 'pdf', subcategory: 'Merge & Split', categoryName: 'PDF Suite' },
];

const PDF_COMPRESS_TOOLS: MasterToolItem[] = [
  { id: 'pdf-compress', slug: 'pdf-compress', name: 'PDF Compressor & Optimizer', description: 'Reduce PDF file size for email attachments and portal uploads without quality loss.', category: 'pdf', subcategory: 'Compress & Optimize', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-reduce-size-kb', slug: 'pdf-reduce-size-kb', name: 'Reduce PDF Size to 100KB / 200KB', description: 'Target specific government portal upload limits (100KB, 200KB, 500KB).', category: 'pdf', subcategory: 'Compress & Optimize', categoryName: 'PDF Suite' },
  { id: 'pdf-optimize-web', slug: 'pdf-optimize-web', name: 'Linearize PDF for Fast Web View', description: 'Optimize PDF structure for byte-serving fast instant web streaming.', category: 'pdf', subcategory: 'Compress & Optimize', categoryName: 'PDF Suite' },
  { id: 'pdf-repair', slug: 'pdf-repair', name: 'Repair Corrupted PDF & Stream Rebuilder', description: 'Fix broken xref tables and damaged stream objects in unreadable PDFs.', category: 'pdf', subcategory: 'Compress & Optimize', categoryName: 'PDF Suite' },
  { id: 'pdf-remove-embedded-fonts', slug: 'pdf-remove-embedded-fonts', name: 'Subset & Compress Embedded Fonts', description: 'Strip redundant font glyphs to shrink document overhead.', category: 'pdf', subcategory: 'Compress & Optimize', categoryName: 'PDF Suite' },
  { id: 'pdf-downsample-images', slug: 'pdf-downsample-images', name: 'Downsample High-Res PDF Images', description: 'Compress embedded 300 DPI photographs to 150 or 72 DPI.', category: 'pdf', subcategory: 'Compress & Optimize', categoryName: 'PDF Suite' },
  { id: 'pdf-grayscale-compress', slug: 'pdf-grayscale-compress', name: 'Monochrome Grayscale PDF Compressor', description: 'Convert color raster images inside PDF to high-contrast monochrome.', category: 'pdf', subcategory: 'Compress & Optimize', categoryName: 'PDF Suite' },
  { id: 'pdf-flatten-annotations', slug: 'pdf-flatten-annotations', name: 'Flatten PDF Form Fields & Annotations', description: 'Flatten interactive form fields into static vector canvas to save size.', category: 'pdf', subcategory: 'Compress & Optimize', categoryName: 'PDF Suite' },
];

const PDF_EDIT_TOOLS: MasterToolItem[] = [
  { id: 'pdf-edit-text', slug: 'pdf-edit-text', name: 'PDF Direct Text Editor & Annotator', description: 'Add, modify, and style text paragraphs directly on PDF pages.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-watermark', slug: 'pdf-watermark', name: 'Watermark & Stamp Adder', description: 'Stamp custom text, dates, or confidential watermarks across all pages.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-header-footer', slug: 'pdf-header-footer', name: 'Page Numbers & Header / Footer', description: 'Insert dynamic page numbers (Page X of Y), dates, and headers.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite' },
  { id: 'pdf-crop', slug: 'pdf-crop', name: 'PDF Margin Trimmer & Cropper', description: 'Trim whitespace margins and crop page dimensions cleanly.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite' },
  { id: 'pdf-page-resizer', slug: 'pdf-page-resizer', name: 'PDF Page Size Resizer (A4/Letter)', description: 'Standardize non-standard documents to uniform A4 or US Letter.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite' },
  { id: 'pdf-grayscale', slug: 'pdf-grayscale', name: 'PDF Grayscale & B&W Converter', description: 'Convert color PDFs into monochrome black and white for ink-saving printing.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite' },
  { id: 'pdf-metadata-editor', slug: 'pdf-metadata-editor', name: 'PDF Metadata & Title Editor', description: 'Modify Author, Title, Subject, Keywords, and Creator metadata tags.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite' },
  { id: 'pdf-redact', slug: 'pdf-redact', name: 'PDF Blackout & Redaction Tool', description: 'Permanently censor confidential numbers, SSNs, and names from PDF.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite' },
  { id: 'pdf-draw-annotate', slug: 'pdf-draw-annotate', name: 'PDF Freehand Pen & Highlighter', description: 'Highlight text, draw freehand annotations, and add callout shapes.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite' },
  { id: 'pdf-add-image', slug: 'pdf-add-image', name: 'Insert Image or Stamp into PDF', description: 'Paste logos, verified badges, and stamps onto existing PDF pages.', category: 'pdf', subcategory: 'Edit & Organize', categoryName: 'PDF Suite' },
];

const PDF_SECURITY_TOOLS: MasterToolItem[] = [
  { id: 'pdf-protect', slug: 'pdf-protect', name: 'PDF Password Encryptor (AES-256)', description: 'Lock sensitive documents with strong password protection and encryption.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-unlock', slug: 'pdf-unlock', name: 'PDF Password & Restriction Remover', description: 'Decrypt and remove security restrictions from authorized PDFs.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-sign', slug: 'pdf-sign', name: 'eSign Digital Signature & Signature Pad', description: 'Draw or stamp electronic signatures directly onto contracts and agreements.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-restrict-printing', slug: 'pdf-restrict-printing', name: 'Restrict PDF Printing & Copying', description: 'Prevent unauthorized users from printing or selecting text from PDF.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite' },
  { id: 'pdf-certificate-sign', slug: 'pdf-certificate-sign', name: 'Cryptographic Certificate Signer', description: 'Sign PDF documents using PKCS#12 (.p12 / .pfx) cryptographic keys.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite' },
  { id: 'pdf-verify-signature', slug: 'pdf-verify-signature', name: 'Verify PDF Digital Signatures', description: 'Inspect validity of existing digital signatures and timestamp integrity.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite' },
  { id: 'pdf-sanitize', slug: 'pdf-sanitize', name: 'Sanitize PDF & Remove Hidden Data', description: 'Wipe JavaScript actions, embedded thumbnails, and invisible attachments.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite' },
  { id: 'pdf-flatten-security', slug: 'pdf-flatten-security', name: 'Flatten Security Layers', description: 'Convert interactive layers to raster images to prevent content inspection.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite' },
  { id: 'pdf-watermark-secure', slug: 'pdf-watermark-secure', name: 'Copy-Protected Guilloche Watermark', description: 'Apply anti-copying patterned security guilloche stamps.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite' },
  { id: 'pdf-expiry-stamp', slug: 'pdf-expiry-stamp', name: 'Document Expiration Notice Stamp', description: 'Stamp expiration dates and non-valid notice tags on agreements.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite' },
  { id: 'pdf-audit-trail', slug: 'pdf-audit-trail', name: 'Generate PDF Signature Audit Log', description: 'Create certificate-ready signing audit receipt pages.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite' },
  { id: 'pdf-hash-verifier', slug: 'pdf-hash-verifier', name: 'PDF SHA-256 Hash Integrity Verifier', description: 'Compute and verify SHA-256 fingerprint of any PDF file.', category: 'pdf', subcategory: 'Security & Sign', categoryName: 'PDF Suite' },
];

const PDF_OCR_TOOLS: MasterToolItem[] = [
  { id: 'pdf-ocr', slug: 'pdf-ocr', name: 'PDF OCR Text Recognition', description: 'Recognize scanned document text into searchable, selectable text.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-extract-text-ocr', slug: 'pdf-extract-text-ocr', name: 'Extract OCR Text to TXT / Word', description: 'Optical character recognition engine for scanned books and receipts.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite' },
  { id: 'pdf-extract-images', slug: 'pdf-extract-images', name: 'Extract All Embedded Images', description: 'Extract all embedded photos and figures from PDF into original resolution.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite', isFlagship: true },
  { id: 'pdf-extract-tables', slug: 'pdf-extract-tables', name: 'Extract Tables to CSV & Sheets', description: 'Auto-detect table borders and extract structured cells to CSV.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite' },
  { id: 'pdf-form-filler', slug: 'pdf-form-filler', name: 'Interactive PDF Form Filler', description: 'Fill out interactive AcroForms and export flattened completed copies.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite' },
  { id: 'pdf-compare', slug: 'pdf-compare', name: 'Compare Two PDF Documents', description: 'Compare two revisions of a PDF and highlight modified sentences.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite' },
  { id: 'pdf-font-inspector', slug: 'pdf-font-inspector', name: 'PDF Font & Glyph Inspector', description: 'Analyze embedded TrueType/Type1 font names and encoding tables.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite' },
  { id: 'pdf-extract-attachments', slug: 'pdf-extract-attachments', name: 'Extract Embedded File Attachments', description: 'Unpack attached XML, ZIP, or audio files embedded inside PDF.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite' },
  { id: 'pdf-extract-links', slug: 'pdf-extract-links', name: 'Extract Hyperlinks & URLs', description: 'Scrape all embedded external hyperlinks and email addresses.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite' },
  { id: 'pdf-ocr-multilingual', slug: 'pdf-ocr-multilingual', name: 'Multilingual OCR (Spanish/French/German/Hindi)', description: 'Multi-language optical character recognition for international receipts.', category: 'pdf', subcategory: 'OCR & Extract', categoryName: 'PDF Suite' },
];

export const MASTER_CATEGORIES: MasterCategory[] = [
  {
    id: 'pdf',
    name: 'PDF Suite',
    icon: '📄',
    count: 57,
    countDisplay: '57 tools',
    description: 'Merge, split, compress, and convert documents locally with zero watermark.',
    subcategories: [
      { id: 'convert', name: 'Convert', count: 28, chips: ['PDF to Word', 'PDF to Excel', 'PDF to JPG', 'Word to PDF'], tools: PDF_CONVERT_TOOLS },
      { id: 'merge-split', name: 'Merge & Split', count: 15, chips: ['PDF Merge', 'PDF Split', 'Extract Pages', 'Reorder Pages'], tools: PDF_MERGE_SPLIT_TOOLS },
      { id: 'compress', name: 'Compress & Optimize', count: 8, chips: ['Compress PDF', 'Reduce Size', 'Optimize for Web', 'Repair PDF'], tools: PDF_COMPRESS_TOOLS },
      { id: 'edit', name: 'Edit & Organize', count: 10, chips: ['Edit Text', 'Add Watermark', 'Add Page Numbers', 'Crop Pages'], tools: PDF_EDIT_TOOLS },
      { id: 'security', name: 'Security & Sign', count: 12, chips: ['Protect PDF', 'Unlock PDF', 'eSign PDF', 'Add Password'], tools: PDF_SECURITY_TOOLS },
      { id: 'ocr', name: 'OCR & Extract', count: 10, chips: ['OCR PDF', 'Extract Text', 'Extract Images', 'Extract Tables'], tools: PDF_OCR_TOOLS }
    ]
  },
  {
    id: 'image',
    name: 'Image & Media',
    icon: '🖼️',
    count: 410,
    countDisplay: '410 tools',
    description: 'Compress, resize, remove backgrounds, convert formats, and edit photos in browser.',
    subcategories: [
      {
        id: 'img-compress-resize',
        name: 'Compress & Resize',
        count: 90,
        chips: ['Lossless Compressor', 'Bulk Resizer', 'Target Size KB', 'Scale Down 4K'],
        tools: [
          { id: 'image-compressor', slug: 'image-compressor', name: 'Lossless Image Compressor', description: 'Compress JPG, PNG, and WebP images with real-time byte savings.', category: 'image', subcategory: 'Compress & Resize', categoryName: 'Image & Media', isFlagship: true },
          { id: 'image-resizer', slug: 'image-resizer', name: 'Bulk Image Resizer & Scaler', description: 'Resize image dimensions by pixels or aspect ratio lock with social presets.', category: 'image', subcategory: 'Compress & Resize', categoryName: 'Image & Media', isFlagship: true },
          { id: 'image-reduce-kb', slug: 'image-reduce-kb', name: 'Target Size KB Reducer (20KB-500KB)', description: 'Compress photos to meet passport and government portal upload thresholds.', category: 'image', subcategory: 'Compress & Resize', categoryName: 'Image & Media' },
          { id: 'svg-optimizer', slug: 'svg-optimizer', name: 'SVG Optimizer & Minifier', description: 'Clean up unnecessary XML tags and reduce vector file weight.', category: 'image', subcategory: 'Compress & Resize', categoryName: 'Image & Media' }
        ]
      },
      {
        id: 'img-convert',
        name: 'Convert Format',
        count: 80,
        chips: ['PNG to JPG', 'JPG to WebP', 'HEIC to JPG', 'ICO Favicon'],
        tools: [
          { id: 'image-converter', slug: 'image-converter', name: 'Image Format Converter (PNG/JPG/WebP)', description: 'Convert between PNG, JPEG, WebP, SVG, and BMP formats in browser memory.', category: 'image', subcategory: 'Convert Format', categoryName: 'Image & Media', isFlagship: true },
          { id: 'heic-to-jpg', slug: 'heic-to-jpg', name: 'Apple HEIC to JPG Converter', description: 'Convert iPhone HEIC photos to compatible JPG files with EXIF tags.', category: 'image', subcategory: 'Convert Format', categoryName: 'Image & Media', isFlagship: true },
          { id: 'ico-converter', slug: 'ico-converter', name: 'ICO Favicon Generator', description: 'Generate multi-resolution .ico favicon files from PNG or JPG.', category: 'image', subcategory: 'Convert Format', categoryName: 'Image & Media' },
          { id: 'svg-to-png', slug: 'svg-to-png', name: 'SVG to High-Res PNG Converter', description: 'Render crystal-clear transparent raster PNGs from vector SVG sources.', category: 'image', subcategory: 'Convert Format', categoryName: 'Image & Media' }
        ]
      },
      {
        id: 'img-edit-enhance',
        name: 'Edit & Enhance',
        count: 120,
        chips: ['AI Background Remover', 'Image Cropper', 'Rotator & Flipper', 'Photo Filters'],
        tools: [
          { id: 'bg-remover', slug: 'bg-remover', name: 'AI Background Remover', description: 'Isolate subjects and eliminate photo backgrounds with transparency in browser RAM.', category: 'image', subcategory: 'Edit & Enhance', categoryName: 'Image & Media', isFlagship: true },
          { id: 'image-cropper', slug: 'image-cropper', name: 'Precise Image Cropper', description: 'Crop images to 1:1, 16:9, 4:3, 3:2, or custom bounding boxes.', category: 'image', subcategory: 'Edit & Enhance', categoryName: 'Image & Media', isFlagship: true },
          { id: 'image-rotator', slug: 'image-rotator', name: 'Rotator & Flipper', description: 'Rotate clockwise/counter-clockwise and flip horizontally/vertically.', category: 'image', subcategory: 'Edit & Enhance', categoryName: 'Image & Media' },
          { id: 'image-filters', slug: 'image-filters', name: 'Photo Filters & Color Tuning', description: 'Adjust exposure, contrast, saturation, hue, and vintage tones.', category: 'image', subcategory: 'Edit & Enhance', categoryName: 'Image & Media' }
        ]
      },
      {
        id: 'img-color-palette',
        name: 'Color & Palette',
        count: 40,
        chips: ['Palette Generator', 'Eyedropper Tool', 'Hex Code Picker', 'Gradient Maker'],
        tools: [
          { id: 'color-palette-extractor', slug: 'color-palette-extractor', name: 'Color Palette & Eyedropper', description: 'Extract dominant color palettes and copy CSS hex codes directly.', category: 'image', subcategory: 'Color & Palette', categoryName: 'Image & Media', isFlagship: true },
          { id: 'gradient-generator', slug: 'gradient-generator', name: 'CSS Gradient Maker', description: 'Generate CSS linear and radial gradients with instant code export.', category: 'image', subcategory: 'Color & Palette', categoryName: 'Image & Media' }
        ]
      },
      {
        id: 'img-audio-video',
        name: 'Audio & Video Tools',
        count: 80,
        chips: ['Audio Converter', 'Video Trimmer', 'MP3 Cutter', 'GIF Maker'],
        tools: [
          { id: 'audio-cutter', slug: 'audio-cutter', name: 'Audio Trimmer & Ringtone Maker', description: 'Cut and trim MP3, WAV, and AAC audio tracks directly in browser memory.', category: 'image', subcategory: 'Audio & Video Tools', categoryName: 'Image & Media' },
          { id: 'gif-maker', slug: 'gif-maker', name: 'Animated GIF Creator', description: 'Convert video clips or multiple photos into animated lightweight GIFs.', category: 'image', subcategory: 'Audio & Video Tools', categoryName: 'Image & Media' }
        ]
      }
    ]
  },
  {
    id: 'calculators',
    name: 'Calculators',
    icon: '🧮',
    count: 2000,
    countDisplay: '2000 tools (25 subcategories)',
    description: '25 subcategories covering Loan, EMI, SIP, Tax, Health, Math, and Unit converters.',
    subcategories: [
      {
        id: 'loan-emi',
        name: 'Loan & EMI Calculators',
        count: 200,
        chips: ['Home Loan EMI', 'Car Loan EMI', 'Personal Loan', 'Prepayment Calc'],
        tools: [
          { id: 'emi-calculator', slug: 'emi-calculator', name: 'Standard Loan EMI Calculator', description: 'Calculate monthly loan installments, total interest, and complete amortization schedule.', category: 'calculator', subcategory: 'Loan & EMI Calculators', categoryName: 'Calculators', isFlagship: true },
          { id: 'home-loan-calc', slug: 'home-loan-calc', name: 'Home Loan Eligibility & EMI', description: 'Compute maximum borrowing capacity based on monthly take-home salary.', category: 'calculator', subcategory: 'Loan & EMI Calculators', categoryName: 'Calculators', isFlagship: true },
          { id: 'car-loan-calc', slug: 'car-loan-calc', name: 'Auto & Car Loan EMI Calculator', description: 'Estimate monthly automobile payments including down payment and taxes.', category: 'calculator', subcategory: 'Loan & EMI Calculators', categoryName: 'Calculators' },
          { id: 'loan-prepayment-calc', slug: 'loan-prepayment-calc', name: 'Loan Prepayment & Tenor Reducer', description: 'Calculate interest savings when making lumpsum loan prepayments.', category: 'calculator', subcategory: 'Loan & EMI Calculators', categoryName: 'Calculators' }
        ]
      },
      {
        id: 'sip-mutual-fund',
        name: 'SIP & Mutual Fund',
        count: 200,
        chips: ['SIP Return', 'Lump Sum Investment', 'Step-Up SIP', 'SWP Calculator'],
        tools: [
          { id: 'sip-calculator', slug: 'sip-calculator', name: 'Systematic Investment Plan (SIP) Calculator', description: 'Project future wealth creation from monthly mutual fund compounding.', category: 'calculator', subcategory: 'SIP & Mutual Fund', categoryName: 'Calculators', isFlagship: true },
          { id: 'lumpsum-mutual-fund', slug: 'lumpsum-mutual-fund', name: 'Lump Sum Investment Growth', description: 'Calculate long-term maturity of one-time mutual fund investments.', category: 'calculator', subcategory: 'SIP & Mutual Fund', categoryName: 'Calculators' },
          { id: 'step-up-sip', slug: 'step-up-sip', name: 'Step-Up Annual SIP Calculator', description: 'Project compounding returns when increasing monthly contribution by 5-15% annually.', category: 'calculator', subcategory: 'SIP & Mutual Fund', categoryName: 'Calculators' }
        ]
      },
      {
        id: 'tax-gst',
        name: 'Tax & GST',
        count: 140,
        chips: ['GST Inclusive/Exclusive', 'Income Tax Slab', 'VAT Calculator', 'Capital Gains'],
        tools: [
          { id: 'gst-vat-calc', slug: 'gst-vat-calc', name: 'GST & VAT Reverse Calculator', description: 'Add or extract 5%, 12%, 18%, or 28% GST tax from gross price.', category: 'calculator', subcategory: 'Tax & GST', categoryName: 'Calculators', isFlagship: true },
          { id: 'income-tax-calc', slug: 'income-tax-calc', name: 'Income Tax Regime Comparison', description: 'Compare tax liability between Old vs New tax regimes.', category: 'calculator', subcategory: 'Tax & GST', categoryName: 'Calculators' }
        ]
      },
      {
        id: 'fd-rd-savings',
        name: 'FD & RD & Savings',
        count: 80,
        chips: ['Fixed Deposit (FD)', 'Recurring Deposit (RD)', 'Compound Interest', 'Simple Interest'],
        tools: [
          { id: 'compound-interest-calc', slug: 'compound-interest-calc', name: 'Compound Interest Calculator', description: 'Calculate daily, monthly, or quarterly compounding interest growth.', category: 'calculator', subcategory: 'FD & RD & Savings', categoryName: 'Calculators', isFlagship: true },
          { id: 'fd-calculator', slug: 'fd-calculator', name: 'Fixed Deposit (FD) Maturity Calculator', description: 'Calculate quarterly compounding interest on bank fixed deposits.', category: 'calculator', subcategory: 'FD & RD & Savings', categoryName: 'Calculators' }
        ]
      },
      {
        id: 'math-percentage',
        name: 'Math & Percentage',
        count: 160,
        chips: ['Percentage Increase', 'Fraction Solver', 'Algebra Solver', 'Discount Calc'],
        tools: [
          { id: 'percentage-calculator', slug: 'percentage-calculator', name: 'Percentage Difference & Change', description: 'Quickly find what percentage X is of Y, percentage increase, and discount.', category: 'calculator', subcategory: 'Math & Percentage', categoryName: 'Calculators', isFlagship: true },
          { id: 'discount-calculator', slug: 'discount-calculator', name: 'Discount & Sale Price Calculator', description: 'Calculate final price after double discounts and clearance tags.', category: 'calculator', subcategory: 'Math & Percentage', categoryName: 'Calculators' }
        ]
      },
      {
        id: 'health-bmi',
        name: 'Health & BMI',
        count: 80,
        chips: ['BMI Index', 'BMR Basal Metabolic', 'Body Fat %', 'Ideal Body Weight'],
        tools: [
          { id: 'bmi-calculator', slug: 'bmi-calculator', name: 'Body Mass Index (BMI) Calculator', description: 'Classify body mass category with healthy weight range guidance.', category: 'calculator', subcategory: 'Health & BMI', categoryName: 'Calculators', isFlagship: true },
          { id: 'bmr-calorie-calc', slug: 'bmr-calorie-calc', name: 'BMR & Daily Caloric Needs', description: 'Determine maintenance calories based on Harris-Benedict formula.', category: 'calculator', subcategory: 'Health & BMI', categoryName: 'Calculators' }
        ]
      },
      {
        id: 'date-age',
        name: 'Date & Age',
        count: 120,
        chips: ['Exact Age Calculator', 'Date Difference Days', 'Working Days Counter', 'Add/Subtract Days'],
        tools: [
          { id: 'age-calculator', slug: 'age-calculator', name: 'Exact Chronological Age Calculator', description: 'Calculate exact age in years, months, days, hours, and next birthday.', category: 'calculator', subcategory: 'Date & Age', categoryName: 'Calculators', isFlagship: true },
          { id: 'date-difference-calc', slug: 'date-difference-calc', name: 'Date Difference & Duration', description: 'Calculate business days and calendar days between two dates.', category: 'calculator', subcategory: 'Date & Age', categoryName: 'Calculators' }
        ]
      },
      {
        id: 'unit-length',
        name: 'Unit & Length',
        count: 70,
        chips: ['Length & Distance', 'Weight & Mass', 'Temperature', 'Area & Volume'],
        tools: [
          { id: 'unit-converter', slug: 'unit-converter', name: 'Universal Metric & Imperial Unit Converter', description: 'Convert length, weight, volume, speed, and temperature.', category: 'calculator', subcategory: 'Unit & Length', categoryName: 'Calculators', isFlagship: true }
        ]
      },
      {
        id: 'salary-hr',
        name: 'Salary & HR',
        count: 60,
        chips: ['Take-Home Pay', 'Hourly to Salary', 'Overtime Pay', 'Bonus Tax'],
        tools: [
          { id: 'salary-takehome-calc', slug: 'salary-takehome-calc', name: 'Net Take-Home Salary Calculator', description: 'Calculate monthly in-hand paycheck after standard deductions and tax.', category: 'calculator', subcategory: 'Salary & HR', categoryName: 'Calculators', isFlagship: true }
        ]
      },
      {
        id: 'credit-debt',
        name: 'Credit Card & Debt',
        count: 60,
        chips: ['Credit Card Payoff', 'Debt Snowball', 'Balance Transfer', 'Minimum Payment Trap'],
        tools: [
          { id: 'credit-card-payoff', slug: 'credit-card-payoff', name: 'Credit Card Payoff & Interest Calculator', description: 'See how long it takes to clear card balance with fixed monthly repayments.', category: 'calculator', subcategory: 'Credit Card & Debt', categoryName: 'Calculators' }
        ]
      }
    ]
  },
  {
    id: 'ai-writing',
    name: 'AI Study & Writing',
    icon: '✍️',
    count: 380,
    countDisplay: '380 tools',
    description: 'Browser-native writing assistants, paraphrasers, grammar checkers, and summarizers.',
    subcategories: [
      {
        id: 'ai-detector',
        name: 'AI Detection & Humanizer',
        count: 70,
        chips: ['AI Content Detector', 'AI Humanizer', 'Perplexity Checker', 'Burstiness Score'],
        tools: [
          { id: 'ai-detector', slug: 'ai-detector', name: 'AI Content & Plagiarism Detector', description: 'Analyze text perplexity, burstiness, and probability distribution in browser.', category: 'ai-study', subcategory: 'AI Detection & Humanizer', categoryName: 'AI Study & Writing', isFlagship: true },
          { id: 'ai-humanizer', slug: 'ai-humanizer', name: 'AI Text Humanizer & Rewriter', description: 'Rewrite robotic syntax into natural conversational sentence flow.', category: 'ai-study', subcategory: 'AI Detection & Humanizer', categoryName: 'AI Study & Writing', isFlagship: true }
        ]
      },
      {
        id: 'writing-assistant',
        name: 'Writing Assistants',
        count: 90,
        chips: ['Essay Outliner', 'Email Draftsman', 'Paragraph Expander', 'Story Hook'],
        tools: [
          { id: 'essay-paraphraser', slug: 'essay-paraphraser', name: 'Academic Essay Paraphraser', description: 'Rewrite academic essays and paragraphs with preserved source meaning.', category: 'ai-study', subcategory: 'Writing Assistants', categoryName: 'AI Study & Writing', isFlagship: true },
          { id: 'thesis-statement-builder', slug: 'thesis-statement-builder', name: 'Thesis Statement Generator', description: 'Generate strong, defensible thesis statements for analytical or argumentative essays.', category: 'ai-study', subcategory: 'Writing Assistants', categoryName: 'AI Study & Writing' }
        ]
      },
      {
        id: 'study-notes',
        name: 'Study & Citation Tools',
        count: 80,
        chips: ['APA/MLA Citation', 'Flashcard Generator', 'Quiz Maker', 'Text Summarizer'],
        tools: [
          { id: 'citation-generator', slug: 'citation-generator', name: 'APA, MLA & Chicago Citation Generator', description: 'Format citations for websites, journals, books, and interviews.', category: 'ai-study', subcategory: 'Study & Citation Tools', categoryName: 'AI Study & Writing', isFlagship: true }
        ]
      }
    ]
  },
  {
    id: 'career-ats',
    name: 'Career & ATS Suite',
    icon: '💼',
    count: 350,
    countDisplay: '350 tools',
    description: 'ATS resume score checker, JD matcher, cover letters, and interview preparation.',
    subcategories: [
      {
        id: 'ats-checker',
        name: 'ATS Resume Scorer',
        count: 90,
        chips: ['ATS Score Check', 'Hard Skills Extractor', 'Action Verb Booster', 'Section Validator'],
        tools: [
          { id: 'ats-checker', slug: 'ats-checker', name: 'ATS Resume Score & Compatibility Checker', description: 'Scan resume text against Applicant Tracking System parsing algorithms.', category: 'job-ats', subcategory: 'ATS Resume Scorer', categoryName: 'Career & ATS Suite', isFlagship: true },
          { id: 'resume-builder', slug: 'resume-builder', name: 'Clean 1-Page ATS Resume Builder', description: 'Create clean, ATS-compliant single-page resumes ready for PDF export.', category: 'job-ats', subcategory: 'ATS Resume Scorer', categoryName: 'Career & ATS Suite', isFlagship: true }
        ]
      },
      {
        id: 'cover-letter-jd',
        name: 'Cover Letter & JD Matcher',
        count: 80,
        chips: ['Job Description Match', 'Cover Letter Generator', 'Skill Gap Analyzer', 'Salary Estimator'],
        tools: [
          { id: 'cover-letter-gen', slug: 'cover-letter-gen', name: 'Targeted Cover Letter Generator', description: 'Draft tailored cover letters aligned with specific job postings.', category: 'job-ats', subcategory: 'Cover Letter & JD Matcher', categoryName: 'Career & ATS Suite', isFlagship: true },
          { id: 'interview-prep-coach', slug: 'interview-prep-coach', name: 'Behavioral STAR Interview Coach', description: 'Prepare structured Situation, Task, Action, and Result interview stories.', category: 'job-ats', subcategory: 'Cover Letter & JD Matcher', categoryName: 'Career & ATS Suite' }
        ]
      }
    ]
  },
  {
    id: 'developer',
    name: 'Developer Suite',
    icon: '💻',
    count: 480,
    countDisplay: '480 tools',
    description: 'JSON/XML formatters, Base64/JWT encoders, minifiers, regex, and API debuggers.',
    subcategories: [
      {
        id: 'json-format',
        name: 'JSON & Data Converters',
        count: 100,
        chips: ['JSON Formatter', 'XML to JSON', 'CSV to JSON', 'YAML Converter'],
        tools: [
          { id: 'json-formatter', slug: 'json-formatter', name: 'JSON Formatter & Tree Validator', description: 'Beautify, validate, and inspect JSON payloads with interactive tree view.', category: 'dev-pro', subcategory: 'JSON & Data Converters', categoryName: 'Developer Suite', isFlagship: true },
          { id: 'fake-data-generator', slug: 'fake-data-generator', name: 'Fake User Profile & Mock Data Generator', description: 'Generate mock user profiles, addresses, credit cards, and JSON datasets.', category: 'dev-pro', subcategory: 'JSON & Data Converters', categoryName: 'Developer Suite', isFlagship: true }
        ]
      },
      {
        id: 'encode-decode',
        name: 'Encode, Decode & Crypto',
        count: 110,
        chips: ['Base64 Encode', 'JWT Debugger', 'URL Encode', 'SHA-256 Hash'],
        tools: [
          { id: 'base64-converter', slug: 'base64-converter', name: 'Base64 Text & File Converter', description: 'Encode and decode Base64 strings and file data streams locally.', category: 'dev-pro', subcategory: 'Encode, Decode & Crypto', categoryName: 'Developer Suite', isFlagship: true },
          { id: 'hash-generator', slug: 'hash-generator', name: 'MD5, SHA-1, SHA-256 Hash Generator', description: 'Generate cryptographic hash digests locally in browser RAM.', category: 'dev-pro', subcategory: 'Encode, Decode & Crypto', categoryName: 'Developer Suite' }
        ]
      },
      {
        id: 'regex-text',
        name: 'Regex & Code Utilities',
        count: 90,
        chips: ['Regex Tester', 'Diff Checker', 'CSS Minifier', 'JS Minifier'],
        tools: [
          { id: 'regex-tester', slug: 'regex-tester', name: 'Interactive Regex Pattern Tester', description: 'Test and debug regular expressions with real-time match group highlighting.', category: 'dev-pro', subcategory: 'Regex & Code Utilities', categoryName: 'Developer Suite', isFlagship: true },
          { id: 'qr-generator', slug: 'qr-generator', name: 'Custom QR Code Studio', description: 'Create branded QR codes with colors, logos, and high-res vector SVG download.', category: 'dev-pro', subcategory: 'Regex & Code Utilities', categoryName: 'Developer Suite', isFlagship: true }
        ]
      }
    ]
  }
];
