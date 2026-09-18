export interface ExhaustiveToolItem {
  id: string;
  canonicalName: string;
  masterCategory: string;
  categoryNumber: number;
  subcategory: string;
  description: string;
  aliases: string[];
  primaryKeywords: string[];
  secondaryKeywords: string[];
  searchIntent: 'CONVERT' | 'COMPRESS' | 'EDIT' | 'GENERATE' | 'EXTRACT' | 'CALCULATE' | 'VALIDATE' | 'ANALYZE' | 'OPTIMIZE' | 'CREATE' | 'COMPARE' | 'CHECK' | 'FORMAT' | 'TRANSFORM' | 'DOWNLOAD' | 'UTILITY';
  referenceSites: string[];
  referenceFunctions: string[];
  implementationType: 'CLIENT_ONLY' | 'WEBASSEMBLY' | 'OPEN_SOURCE_LIBRARY' | 'BROWSER_API' | 'SERVER_PROCESSING' | 'HYBRID' | 'EXTERNAL_API_REQUIRED';
  implementationDifficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'VERY_HARD';
  status: 'DISCOVERED' | 'NORMALIZED' | 'APPROVED' | 'NEEDS REVIEW';
  canonicalSlug: string;
  duplicateGroup: string;
  relatedTools: string[];
  notes: string;
}

export interface ExhaustiveCalculatorItem {
  id: string;
  canonicalName: string;
  category: string; // calculator category (1-15)
  categoryName: string;
  subcategory: string;
  description: string;
  aliases: string[];
  primaryKeywords: string[];
  secondaryKeywords: string[];
  formulaType: string;
  inputs: Array<{ name: string; type: string }>;
  outputs: Array<{ name: string; type: string }>;
  exampleInputs: Record<string, any>;
  expectedOutputs: Record<string, any>;
  referenceSources: string[];
  implementationDifficulty: 'EASY' | 'MEDIUM' | 'HARD';
  status: 'APPROVED' | 'NEEDS REVIEW';
  canonicalSlug: string;
  duplicateGroup: string;
  notes: string;
}

export interface DuplicateGroupEntry {
  duplicateGroup: string;
  canonicalTool: string;
  candidateA: string;
  candidateB: string;
  reason: string;
}

// ----------------------------------------------------
// 1. EXHAUSTIVE TOOL INVENTORY (Across all 40 Categories)
// ----------------------------------------------------
export const EXHAUSTIVE_TOOLS: ExhaustiveToolItem[] = [
  // 01. PDF Tools
  { id: 't-01-01', canonicalName: 'PDF Merger', masterCategory: 'pdf-tools', categoryNumber: 1, subcategory: 'Merge & Split', description: 'Combine multiple PDF files into one.', aliases: ['Combine PDF', 'Join PDF'], primaryKeywords: ['merge pdf'], secondaryKeywords: ['combine pdf online'], searchIntent: 'COMPARE', referenceSites: ['PDF24'], referenceFunctions: ['Concatenation'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'merge-pdf', duplicateGroup: 'dup-pdf-merge', relatedTools: ['t-01-02'], notes: 'pdf-lib' },
  { id: 't-01-02', canonicalName: 'PDF Splitter', masterCategory: 'pdf-tools', categoryNumber: 1, subcategory: 'Merge & Split', description: 'Extract pages from PDF.', aliases: ['Split PDF'], primaryKeywords: ['split pdf'], secondaryKeywords: ['extract pdf pages'], searchIntent: 'EXTRACT', referenceSites: ['PDF24'], referenceFunctions: ['Slicing'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'split-pdf', duplicateGroup: 'dup-pdf-split', relatedTools: ['t-01-01'], notes: 'pdf-lib' },
  { id: 't-01-03', canonicalName: 'PDF Compressor', masterCategory: 'pdf-tools', categoryNumber: 1, subcategory: 'Compress & Optimize', description: 'Reduce PDF size.', aliases: ['Reduce PDF Size'], primaryKeywords: ['compress pdf'], secondaryKeywords: ['shrink pdf'], searchIntent: 'COMPRESS', referenceSites: ['PDF24'], referenceFunctions: ['Optimization'], implementationType: 'HYBRID', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'compress-pdf', duplicateGroup: 'dup-pdf-compress', relatedTools: ['t-01-01'], notes: 'Stream compressor' },
  { id: 't-01-04', canonicalName: 'PDF to JPG Converter', masterCategory: 'pdf-tools', categoryNumber: 1, subcategory: 'Convert to PDF', description: 'Convert PDF pages to JPG images.', aliases: ['PDF to Image'], primaryKeywords: ['pdf to jpg'], secondaryKeywords: ['convert pdf to image'], searchIntent: 'CONVERT', referenceSites: ['PDF24'], referenceFunctions: ['Rendering'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'pdf-to-jpg', duplicateGroup: 'dup-pdf-jpg', relatedTools: ['t-01-01'], notes: 'PDF.js' },
  { id: 't-01-05', canonicalName: 'PDF Password Protect', masterCategory: 'pdf-tools', categoryNumber: 1, subcategory: 'Security & Sign', description: 'Encrypt PDF with password.', aliases: ['Encrypt PDF'], primaryKeywords: ['encrypt pdf'], secondaryKeywords: ['protect pdf'], searchIntent: 'TRANSFORM', referenceSites: ['PDF24'], referenceFunctions: ['Encryption'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'protect-pdf', duplicateGroup: 'dup-pdf-protect', relatedTools: ['t-01-06'], notes: 'pdf-lib' },
  { id: 't-01-06', canonicalName: 'PDF Unlocker', masterCategory: 'pdf-tools', categoryNumber: 1, subcategory: 'Security & Sign', description: 'Remove PDF password.', aliases: ['Decrypt PDF'], primaryKeywords: ['unlock pdf'], secondaryKeywords: ['remove pdf password'], searchIntent: 'TRANSFORM', referenceSites: ['PDF24'], referenceFunctions: ['Decryption'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'unlock-pdf', duplicateGroup: 'dup-pdf-unlock', relatedTools: ['t-01-05'], notes: 'pdf-lib' },
  { id: 't-01-07', canonicalName: 'PDF Watermarker', masterCategory: 'pdf-tools', categoryNumber: 1, subcategory: 'Security & Sign', description: 'Add watermark to PDF.', aliases: ['Watermark PDF'], primaryKeywords: ['watermark pdf'], secondaryKeywords: ['stamp pdf'], searchIntent: 'EDIT', referenceSites: ['PDF24'], referenceFunctions: ['Stamping'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'watermark-pdf', duplicateGroup: 'dup-pdf-wm', relatedTools: ['t-01-01'], notes: 'pdf-lib' },
  { id: 't-01-08', canonicalName: 'PDF Page Rotator', masterCategory: 'pdf-tools', categoryNumber: 1, subcategory: 'Merge & Split', description: 'Rotate PDF pages.', aliases: ['Rotate PDF'], primaryKeywords: ['rotate pdf'], secondaryKeywords: ['turn pdf pages'], searchIntent: 'EDIT', referenceSites: ['PDF24'], referenceFunctions: ['Rotation'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'rotate-pdf', duplicateGroup: 'dup-pdf-rotate', relatedTools: ['t-01-01'], notes: 'pdf-lib' },

  // 02. Image Tools
  { id: 't-02-01', canonicalName: 'Image Resizer', masterCategory: 'image-tools', categoryNumber: 2, subcategory: 'Compress & Resize', description: 'Resize images online.', aliases: ['Resize Photo'], primaryKeywords: ['resize image'], secondaryKeywords: ['scale photo'], searchIntent: 'OPTIMIZE', referenceSites: ['123apps'], referenceFunctions: ['Canvas resize'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'resize-image', duplicateGroup: 'dup-img-resize', relatedTools: ['t-02-02'], notes: 'Canvas API' },
  { id: 't-02-02', canonicalName: 'Image Compressor', masterCategory: 'image-tools', categoryNumber: 2, subcategory: 'Compress & Resize', description: 'Compress PNG & JPEG.', aliases: ['Compress PNG'], primaryKeywords: ['compress image'], secondaryKeywords: ['reduce image size'], searchIntent: 'COMPRESS', referenceSites: ['TinyWow'], referenceFunctions: ['Quality reduction'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'compress-image', duplicateGroup: 'dup-img-comp', relatedTools: ['t-02-01'], notes: 'toBlob quality' },
  { id: 't-02-03', canonicalName: 'Image Format Converter', masterCategory: 'image-tools', categoryNumber: 2, subcategory: 'Format Conversion', description: 'Convert image formats.', aliases: ['PNG to JPG'], primaryKeywords: ['image converter'], secondaryKeywords: ['convert image'], searchIntent: 'CONVERT', referenceSites: ['123apps'], referenceFunctions: ['Serialization'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'image-converter', duplicateGroup: 'dup-img-conv', relatedTools: ['t-02-01'], notes: 'Canvas serialization' },
  { id: 't-02-04', canonicalName: 'AI Background Remover', masterCategory: 'image-tools', categoryNumber: 2, subcategory: 'Background & Object Remove', description: 'Remove photo background.', aliases: ['BG Remover'], primaryKeywords: ['remove background'], secondaryKeywords: ['transparent bg'], searchIntent: 'EXTRACT', referenceSites: ['TinyWow'], referenceFunctions: ['Segmentation'], implementationType: 'EXTERNAL_API_REQUIRED', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'remove-background', duplicateGroup: 'dup-bg-rem', relatedTools: ['t-02-01'], notes: 'AI API' },
  { id: 't-02-05', canonicalName: 'Image Cropper', masterCategory: 'image-tools', categoryNumber: 2, subcategory: 'Compress & Resize', description: 'Crop photo dimensions.', aliases: ['Crop Photo'], primaryKeywords: ['crop image'], secondaryKeywords: ['cut photo'], searchIntent: 'EDIT', referenceSites: ['123apps'], referenceFunctions: ['Cropping'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'crop-image', duplicateGroup: 'dup-img-crop', relatedTools: ['t-02-01'], notes: 'Canvas crop' },

  // 03. Video Tools
  { id: 't-03-01', canonicalName: 'Video Trimmer', masterCategory: 'video-tools', categoryNumber: 3, subcategory: 'Cut & Trim', description: 'Trim video clips.', aliases: ['Cut Video'], primaryKeywords: ['trim video'], secondaryKeywords: ['cut mp4'], searchIntent: 'EDIT', referenceSites: ['123apps'], referenceFunctions: ['Trimming'], implementationType: 'WEBASSEMBLY', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'trim-video', duplicateGroup: 'dup-vid-trim', relatedTools: ['t-03-02'], notes: 'FFmpeg.wasm' },
  { id: 't-03-02', canonicalName: 'Video Compressor', masterCategory: 'video-tools', categoryNumber: 3, subcategory: 'Convert & Compress', description: 'Compress MP4 files.', aliases: ['Compress MP4'], primaryKeywords: ['compress video'], secondaryKeywords: ['reduce video size'], searchIntent: 'COMPRESS', referenceSites: ['123apps'], referenceFunctions: ['Bitrate reduction'], implementationType: 'WEBASSEMBLY', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'compress-video', duplicateGroup: 'dup-vid-comp', relatedTools: ['t-03-01'], notes: 'FFmpeg.wasm' },
  { id: 't-03-03', canonicalName: 'Video to GIF Converter', masterCategory: 'video-tools', categoryNumber: 3, subcategory: 'GIF & WebP', description: 'Convert video to GIF.', aliases: ['MP4 to GIF'], primaryKeywords: ['video to gif'], secondaryKeywords: ['mp4 to gif maker'], searchIntent: 'CONVERT', referenceSites: ['123apps'], referenceFunctions: ['GIF encoding'], implementationType: 'WEBASSEMBLY', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'video-to-gif', duplicateGroup: 'dup-vid-gif', relatedTools: ['t-03-01'], notes: 'FFmpeg.wasm' },

  // 04. Audio / MP3 Tools
  { id: 't-04-01', canonicalName: 'Audio Converter', masterCategory: 'audio-tools', categoryNumber: 4, subcategory: 'Converters', description: 'Convert MP3/WAV.', aliases: ['MP3 Converter'], primaryKeywords: ['audio converter'], secondaryKeywords: ['convert mp3'], searchIntent: 'CONVERT', referenceSites: ['123apps'], referenceFunctions: ['Audio transcoding'], implementationType: 'WEBASSEMBLY', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'audio-converter', duplicateGroup: 'dup-aud-conv', relatedTools: ['t-04-02'], notes: 'FFmpeg.wasm' },
  { id: 't-04-02', canonicalName: 'Audio Cutter', masterCategory: 'audio-tools', categoryNumber: 4, subcategory: 'Cutters & Trimmers', description: 'Trim MP3 ringtones.', aliases: ['Ring Tone Maker'], primaryKeywords: ['audio cutter'], secondaryKeywords: ['trim mp3'], searchIntent: 'EDIT', referenceSites: ['123apps'], referenceFunctions: ['Audio slicing'], implementationType: 'WEBASSEMBLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'audio-cutter', duplicateGroup: 'dup-aud-cut', relatedTools: ['t-04-01'], notes: 'WASM audio slice' },

  // 05. Document & Office Tools
  { id: 't-05-01', canonicalName: 'Word to PDF Converter', masterCategory: 'document-tools', categoryNumber: 5, subcategory: 'Word Processors', description: 'DOCX to PDF.', aliases: ['DOCX to PDF'], primaryKeywords: ['word to pdf'], secondaryKeywords: ['doc to pdf'], searchIntent: 'CONVERT', referenceSites: ['TinyWow'], referenceFunctions: ['Doc parsing'], implementationType: 'HYBRID', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'word-to-pdf', duplicateGroup: 'dup-doc-word', relatedTools: ['t-05-02'], notes: 'LibreOffice container' },
  { id: 't-05-02', canonicalName: 'Excel to CSV Converter', masterCategory: 'document-tools', categoryNumber: 5, subcategory: 'Spreadsheet Utilities', description: 'XLSX to CSV.', aliases: ['XLSX to CSV'], primaryKeywords: ['excel to csv'], secondaryKeywords: ['xlsx to csv'], searchIntent: 'CONVERT', referenceSites: ['TinyWow'], referenceFunctions: ['Sheet parsing'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'excel-to-csv', duplicateGroup: 'dup-doc-xlsx', relatedTools: ['t-05-01'], notes: 'SheetJS' },

  // 06. File & Archive Tools
  { id: 't-06-01', canonicalName: 'Online ZIP Extractor', masterCategory: 'file-tools', categoryNumber: 6, subcategory: 'Extraction', description: 'Extract ZIP archives.', aliases: ['Unzip Files'], primaryKeywords: ['extract zip'], secondaryKeywords: ['unzip online'], searchIntent: 'EXTRACT', referenceSites: ['Utils.com'], referenceFunctions: ['Decompression'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'extract-zip', duplicateGroup: 'dup-file-ext', relatedTools: ['t-06-02'], notes: 'JSZip' },
  { id: 't-06-02', canonicalName: 'ZIP Archive Creator', masterCategory: 'file-tools', categoryNumber: 6, subcategory: 'Archive Creation', description: 'Create ZIP archives.', aliases: ['Make ZIP'], primaryKeywords: ['create zip'], secondaryKeywords: ['compress zip'], searchIntent: 'COMPRESS', referenceSites: ['Utils.com'], referenceFunctions: ['Packaging'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'create-zip', duplicateGroup: 'dup-file-cre', relatedTools: ['t-06-01'], notes: 'JSZip' },

  // 07. Text & Writing
  { id: 't-07-01', canonicalName: 'Word Counter', masterCategory: 'text-tools', categoryNumber: 7, subcategory: 'Counters & Stats', description: 'Count words & characters.', aliases: ['Character Counter'], primaryKeywords: ['word counter'], secondaryKeywords: ['character counter'], searchIntent: 'ANALYZE', referenceSites: ['SmallSEOTools'], referenceFunctions: ['Stats'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'word-counter', duplicateGroup: 'dup-txt-word', relatedTools: ['t-07-02'], notes: 'Regex' },
  { id: 't-07-02', canonicalName: 'Case Converter', masterCategory: 'text-tools', categoryNumber: 7, subcategory: 'Case Converters', description: 'Convert text case.', aliases: ['Uppercase Tool'], primaryKeywords: ['case converter'], secondaryKeywords: ['upper lower case'], searchIntent: 'FORMAT', referenceSites: ['Utils.com'], referenceFunctions: ['Transform'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'case-converter', duplicateGroup: 'dup-txt-case', relatedTools: ['t-07-01'], notes: 'String methods' },
  { id: 't-07-03', canonicalName: 'Lorem Ipsum Generator', masterCategory: 'text-tools', categoryNumber: 7, subcategory: 'Generators', description: 'Generate dummy text.', aliases: ['Placeholder Text'], primaryKeywords: ['lorem ipsum generator'], secondaryKeywords: ['dummy text'], searchIntent: 'GENERATE', referenceSites: ['Utils.com'], referenceFunctions: ['Generation'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'lorem-ipsum-generator', duplicateGroup: 'dup-txt-lorem', relatedTools: ['t-07-01'], notes: 'Generator' },

  // 08. OCR & Scanning
  { id: 't-08-01', canonicalName: 'Image to Text OCR', masterCategory: 'ocr-tools', categoryNumber: 8, subcategory: 'Image OCR', description: 'Extract text from images.', aliases: ['OCR Reader'], primaryKeywords: ['image to text'], secondaryKeywords: ['ocr online'], searchIntent: 'EXTRACT', referenceSites: ['TinyWow'], referenceFunctions: ['OCR'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'image-to-text-ocr', duplicateGroup: 'dup-ocr-img', relatedTools: [], notes: 'Tesseract.js' },

  // 09. AI Tools
  { id: 't-09-01', canonicalName: 'AI Article Summarizer', masterCategory: 'ai-tools', categoryNumber: 9, subcategory: 'AI Summarizers', description: 'Summarize text with AI.', aliases: ['Text Summarizer'], primaryKeywords: ['ai summarizer'], secondaryKeywords: ['summarize text'], searchIntent: 'ANALYZE', referenceSites: ['TinyWow'], referenceFunctions: ['LLM summarization'], implementationType: 'HYBRID', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'ai-summarizer', duplicateGroup: 'dup-ai-sum', relatedTools: ['t-09-02'], notes: 'Gemini API' },
  { id: 't-09-02', canonicalName: 'AI Paraphraser', masterCategory: 'ai-tools', categoryNumber: 9, subcategory: 'AI Writing & Paraphrase', description: 'Rewrite content with AI.', aliases: ['Article Rewriter'], primaryKeywords: ['paraphrasing tool'], secondaryKeywords: ['ai rewriter'], searchIntent: 'TRANSFORM', referenceSites: ['TinyWow'], referenceFunctions: ['LLM rewriting'], implementationType: 'HYBRID', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'ai-paraphraser', duplicateGroup: 'dup-ai-par', relatedTools: ['t-09-01'], notes: 'Gemini API' },

  // 10. AI Agents
  { id: 't-10-01', canonicalName: 'AI Content Strategy Agent', masterCategory: 'ai-agents', categoryNumber: 10, subcategory: 'Content Agents', description: 'Plan content calendars.', aliases: ['Blog Planner Agent'], primaryKeywords: ['ai content agent'], secondaryKeywords: ['content strategy'], searchIntent: 'GENERATE', referenceSites: [], referenceFunctions: ['Multi-step LLM workflow'], implementationType: 'HYBRID', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'ai-content-agent', duplicateGroup: 'dup-agent-content', relatedTools: [], notes: 'Agent workflow' },

  // 11. Developer Tools
  { id: 't-11-01', canonicalName: 'JSON Formatter & Validator', masterCategory: 'dev-tools', categoryNumber: 11, subcategory: 'Formatters & Validators', description: 'Format and validate JSON.', aliases: ['JSON Beautifier'], primaryKeywords: ['json formatter'], secondaryKeywords: ['json validator'], searchIntent: 'VALIDATE', referenceSites: ['Utils.com'], referenceFunctions: ['Parsing'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'json-formatter', duplicateGroup: 'dup-dev-json', relatedTools: ['t-11-02'], notes: 'JSON.parse' },
  { id: 't-11-02', canonicalName: 'Base64 Encoder / Decoder', masterCategory: 'dev-tools', categoryNumber: 11, subcategory: 'Encoders & Decoders', description: 'Base64 string utilities.', aliases: ['Base64 Tool'], primaryKeywords: ['base64 encoder'], secondaryKeywords: ['base64 decoder'], searchIntent: 'TRANSFORM', referenceSites: ['Utils.com'], referenceFunctions: ['btoa/atob'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'base64-encoder-decoder', duplicateGroup: 'dup-dev-b64', relatedTools: ['t-11-01'], notes: 'Native browser' },
  { id: 't-11-03', canonicalName: 'Regex Tester', masterCategory: 'dev-tools', categoryNumber: 11, subcategory: 'Parsers', description: 'Test regex matching.', aliases: ['RegEx Evaluator'], primaryKeywords: ['regex tester'], secondaryKeywords: ['test regex'], searchIntent: 'CHECK', referenceSites: ['Utils.com'], referenceFunctions: ['RegExp'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'regex-tester', duplicateGroup: 'dup-dev-regex', relatedTools: ['t-11-01'], notes: 'JS RegExp' },
  { id: 't-11-04', canonicalName: 'JWT Decoder', masterCategory: 'dev-tools', categoryNumber: 11, subcategory: 'Encoders & Decoders', description: 'Inspect JWT tokens.', aliases: ['JWT Debugger'], primaryKeywords: ['jwt decoder'], secondaryKeywords: ['decode jwt'], searchIntent: 'ANALYZE', referenceSites: ['Utils.com'], referenceFunctions: ['Claims inspection'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'jwt-decoder', duplicateGroup: 'dup-dev-jwt', relatedTools: ['t-11-01'], notes: 'Token parser' },

  // 12. Web / Internet Tools
  { id: 't-12-01', canonicalName: 'Favicon Generator', masterCategory: 'web-tools', categoryNumber: 12, subcategory: 'Favicon & Meta', description: 'Generate website favicons.', aliases: ['ICO Generator'], primaryKeywords: ['favicon generator'], secondaryKeywords: ['create favicon'], searchIntent: 'GENERATE', referenceSites: ['Utils.com'], referenceFunctions: ['Icon scaling'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'favicon-generator', duplicateGroup: 'dup-web-fav', relatedTools: ['t-12-02'], notes: 'Canvas ICO' },
  { id: 't-12-02', canonicalName: 'Robots.txt Generator', masterCategory: 'web-tools', categoryNumber: 12, subcategory: 'Sitemap & Robots', description: 'Create robots.txt files.', aliases: ['Robots Maker'], primaryKeywords: ['robots txt generator'], secondaryKeywords: ['create robots.txt'], searchIntent: 'GENERATE', referenceSites: ['SmallSEOTools'], referenceFunctions: ['Template builder'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'robots-txt-generator', duplicateGroup: 'dup-web-robots', relatedTools: ['t-12-01'], notes: 'Template' },

  // 13. Domain & DNS
  { id: 't-13-01', canonicalName: 'DNS Lookup Tool', masterCategory: 'domain-dns', categoryNumber: 13, subcategory: 'DNS Lookup', description: 'Query DNS records.', aliases: ['Check DNS'], primaryKeywords: ['dns lookup'], secondaryKeywords: ['dns records'], searchIntent: 'CHECK', referenceSites: ['Utils.com'], referenceFunctions: ['DoH query'], implementationType: 'HYBRID', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'dns-lookup', duplicateGroup: 'dup-dns-look', relatedTools: ['t-13-02'], notes: 'Cloudflare API' },
  { id: 't-13-02', canonicalName: 'WHOIS Checker', masterCategory: 'domain-dns', categoryNumber: 13, subcategory: 'WHOIS & Registrar', description: 'Check domain WHOIS.', aliases: ['WHOIS Lookup'], primaryKeywords: ['whois lookup'], secondaryKeywords: ['domain whois'], searchIntent: 'CHECK', referenceSites: ['Utils.com'], referenceFunctions: ['WHOIS query'], implementationType: 'HYBRID', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'whois-lookup', duplicateGroup: 'dup-dns-whois', relatedTools: ['t-13-01'], notes: 'WHOIS API' },

  // 14. IP & Network
  { id: 't-14-01', canonicalName: 'IP Geolocation Lookup', masterCategory: 'ip-network', categoryNumber: 14, subcategory: 'IP Geolocation', description: 'Locate IP address.', aliases: ['My IP Info'], primaryKeywords: ['ip lookup'], secondaryKeywords: ['ip geolocation'], searchIntent: 'ANALYZE', referenceSites: ['Utils.com'], referenceFunctions: ['Geo API'], implementationType: 'HYBRID', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'ip-lookup', duplicateGroup: 'dup-ip-look', relatedTools: [], notes: 'GeoIP API' },

  // 15. Cybersecurity
  { id: 't-15-01', canonicalName: 'Password Generator', masterCategory: 'cybersecurity', categoryNumber: 15, subcategory: 'Password & Hashing', description: 'Generate secure passwords.', aliases: ['Secure Password Maker'], primaryKeywords: ['password generator'], secondaryKeywords: ['secure password'], searchIntent: 'GENERATE', referenceSites: ['Utils.com'], referenceFunctions: ['Crypto random'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'password-generator', duplicateGroup: 'dup-sec-pass', relatedTools: ['t-15-02'], notes: 'Crypto random' },
  { id: 't-15-02', canonicalName: 'Hash Generator', masterCategory: 'cybersecurity', categoryNumber: 15, subcategory: 'Password & Hashing', description: 'Calculate MD5/SHA hashes.', aliases: ['MD5 Calculator'], primaryKeywords: ['hash generator'], secondaryKeywords: ['sha256 hash'], searchIntent: 'CALCULATE', referenceSites: ['Utils.com'], referenceFunctions: ['Crypto hashing'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'hash-generator', duplicateGroup: 'dup-sec-hash', relatedTools: ['t-15-01'], notes: 'Web Crypto' },

  // 16. SEO
  { id: 't-16-01', canonicalName: 'SEO Meta Analyzer', masterCategory: 'seo-tools', categoryNumber: 16, subcategory: 'Meta & SERP', description: 'Inspect meta tags & SEO.', aliases: ['Meta Inspector'], primaryKeywords: ['meta tag analyzer'], secondaryKeywords: ['seo meta checker'], searchIntent: 'ANALYZE', referenceSites: ['SmallSEOTools'], referenceFunctions: ['DOM parsing'], implementationType: 'HYBRID', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'seo-meta-analyzer', duplicateGroup: 'dup-seo-meta', relatedTools: ['t-16-02'], notes: 'Proxy scraper' },
  { id: 't-16-02', canonicalName: 'XML Sitemap Generator', masterCategory: 'seo-tools', categoryNumber: 16, subcategory: 'Schema Generators', description: 'Generate XML sitemaps.', aliases: ['Sitemap Creator'], primaryKeywords: ['sitemap generator'], secondaryKeywords: ['xml sitemap'], searchIntent: 'GENERATE', referenceSites: ['SmallSEOTools'], referenceFunctions: ['XML builder'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'xml-sitemap-generator', duplicateGroup: 'dup-seo-sitemap', relatedTools: ['t-16-01'], notes: 'XML builder' },

  // 17. Digital Marketing
  { id: 't-17-01', canonicalName: 'UTM Link Builder', masterCategory: 'digital-marketing', categoryNumber: 17, subcategory: 'UTM Builder', description: 'Build UTM tracking URLs.', aliases: ['Campaign Builder'], primaryKeywords: ['utm builder'], secondaryKeywords: ['campaign url builder'], searchIntent: 'GENERATE', referenceSites: ['Utils.com'], referenceFunctions: ['URL encoding'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'utm-builder', duplicateGroup: 'dup-mkt-utm', relatedTools: [], notes: 'URLSearchParams' },

  // 18. Social Media
  { id: 't-18-01', canonicalName: 'YouTube Tag Extractor', masterCategory: 'social-media', categoryNumber: 18, subcategory: 'Video Download & Tags', description: 'Extract YouTube tags.', aliases: ['YT Tag Finder'], primaryKeywords: ['youtube tag extractor'], secondaryKeywords: ['yt tags'], searchIntent: 'EXTRACT', referenceSites: [], referenceFunctions: ['Scraping'], implementationType: 'HYBRID', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'youtube-tag-extractor', duplicateGroup: 'dup-soc-yt', relatedTools: [], notes: 'Metadata fetcher' },

  // 19. Calculators (Master Hub placeholder category)
  { id: 't-19-01', canonicalName: 'Master Calculators Hub', masterCategory: 'calculators-hub', categoryNumber: 19, subcategory: 'Calculators Hub', description: 'Central calculator ecosystem hub.', aliases: ['Calculators Directory'], primaryKeywords: ['calculators hub'], secondaryKeywords: ['online calculators'], searchIntent: 'UTILITY', referenceSites: [], referenceFunctions: ['Hub navigation'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'calculators', duplicateGroup: 'dup-calc-hub', relatedTools: [], notes: 'Directory hub' },

  // 20. Finance
  { id: 't-20-01', canonicalName: 'Currency Exchange Rate Tool', masterCategory: 'finance-tools', categoryNumber: 20, subcategory: 'Accounting & Invoices', description: 'Live currency converter.', aliases: ['Currency Converter'], primaryKeywords: ['currency converter'], secondaryKeywords: ['exchange rates'], searchIntent: 'CONVERT', referenceSites: [], referenceFunctions: ['Forex API'], implementationType: 'HYBRID', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'currency-converter', duplicateGroup: 'dup-fin-curr', relatedTools: [], notes: 'Forex API' },

  // 21. Education
  { id: 't-21-01', canonicalName: 'Citation & Bibliography Generator', masterCategory: 'education-tools', categoryNumber: 21, subcategory: 'Citations', description: 'Generate APA/MLA citations.', aliases: ['Citation Maker'], primaryKeywords: ['citation generator'], secondaryKeywords: ['apa citation tool'], searchIntent: 'GENERATE', referenceSites: [], referenceFunctions: ['Formatting'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'citation-generator', duplicateGroup: 'dup-edu-cite', relatedTools: [], notes: 'Format generator' },

  // 22. Design & Graphics
  { id: 't-22-01', canonicalName: 'Color Palette Extractor', masterCategory: 'design-graphics', categoryNumber: 22, subcategory: 'Color Palettes', description: 'Extract colors from images.', aliases: ['Palette Generator'], primaryKeywords: ['color palette generator'], secondaryKeywords: ['extract colors'], searchIntent: 'GENERATE', referenceSites: [], referenceFunctions: ['Canvas color sampling'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'color-palette-generator', duplicateGroup: 'dup-des-pal', relatedTools: [], notes: 'Canvas sampling' },

  // 23. 3D / CAD
  { id: 't-23-01', canonicalName: 'STL to OBJ Converter', masterCategory: 'cad-3d', categoryNumber: 23, subcategory: 'STL & OBJ Utilities', description: 'Convert 3D model files.', aliases: ['3D Model Converter'], primaryKeywords: ['stl to obj converter'], secondaryKeywords: ['3d file converter'], searchIntent: 'CONVERT', referenceSites: [], referenceFunctions: ['Mesh parsing'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'HARD', status: 'APPROVED', canonicalSlug: 'stl-to-obj', duplicateGroup: 'dup-3d-conv', relatedTools: [], notes: 'Three.js loaders' },

  // 24. Cloud & DevOps
  { id: 't-24-01', canonicalName: 'Docker Compose Generator', masterCategory: 'cloud-devops', categoryNumber: 24, subcategory: 'Cloud Configs', description: 'Generate docker-compose.yml files.', aliases: ['Docker YAML Builder'], primaryKeywords: ['docker compose generator'], secondaryKeywords: ['docker yaml maker'], searchIntent: 'GENERATE', referenceSites: [], referenceFunctions: ['YAML builder'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'docker-compose-generator', duplicateGroup: 'dup-devops-dock', relatedTools: [], notes: 'YAML builder' },

  // 25. E-commerce
  { id: 't-25-01', canonicalName: 'Profit Margin & Markup Calculator', masterCategory: 'ecommerce', categoryNumber: 25, subcategory: 'Pricing & Margins', description: 'Calculate retail markup & margin.', aliases: ['Margin Calculator'], primaryKeywords: ['profit margin calculator'], secondaryKeywords: ['retail markup calculator'], searchIntent: 'CALCULATE', referenceSites: [], referenceFunctions: ['Pricing math'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'profit-margin-calculator', duplicateGroup: 'dup-ecom-margin', relatedTools: [], notes: 'Retail formula' },

  // 26. Business & Productivity
  { id: 't-26-01', canonicalName: 'Meeting Cost Calculator', masterCategory: 'business-productivity', categoryNumber: 26, subcategory: 'Meeting Calculators', description: 'Calculate financial cost of meetings based on salaries.', aliases: ['Meeting Expense Tool'], primaryKeywords: ['meeting cost calculator'], secondaryKeywords: ['calculate meeting expense'], searchIntent: 'CALCULATE', referenceSites: [], referenceFunctions: ['Time-salary math'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'meeting-cost-calculator', duplicateGroup: 'dup-biz-meet', relatedTools: [], notes: 'Salary formula' },

  // 27. Email & Communication
  { id: 't-27-01', canonicalName: 'Email Syntax & MX Validator', masterCategory: 'email-communication', categoryNumber: 27, subcategory: 'Email Validation', description: 'Validate email addresses and domain MX records.', aliases: ['Email Verifier'], primaryKeywords: ['email validator'], secondaryKeywords: ['verify email syntax'], searchIntent: 'VALIDATE', referenceSites: [], referenceFunctions: ['Regex & MX check'], implementationType: 'HYBRID', implementationDifficulty: 'MEDIUM', status: 'APPROVED', canonicalSlug: 'email-validator', duplicateGroup: 'dup-mail-val', relatedTools: [], notes: 'Syntax + DNS' },

  // 28. Maps / Weather / Travel
  { id: 't-28-01', canonicalName: 'Time Zone Converter', masterCategory: 'maps-weather-travel', categoryNumber: 28, subcategory: 'Timezone Converters', description: 'Compare time across world zones.', aliases: ['World Time Converter'], primaryKeywords: ['time zone converter'], secondaryKeywords: ['world clock converter'], searchIntent: 'CONVERT', referenceSites: [], referenceFunctions: ['Intl timezone API'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'time-zone-converter', duplicateGroup: 'dup-trv-tz', relatedTools: [], notes: 'Intl.DateTimeFormat' },

  // 29. Mobile & App Tools
  { id: 't-29-01', canonicalName: 'App Store Screenshot Resizer', masterCategory: 'mobile-app-tools', categoryNumber: 29, subcategory: 'iOS Utilities', description: 'Resize screenshots for App Store / Google Play.', aliases: ['Store Screenshot Resizer'], primaryKeywords: ['app store screenshot resizer'], secondaryKeywords: ['play store banner maker'], searchIntent: 'OPTIMIZE', referenceSites: [], referenceFunctions: ['Canvas resize'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'app-store-screenshot-resizer', duplicateGroup: 'dup-mob-shot', relatedTools: [], notes: 'Canvas resizing' },

  // 30. Browser Tools
  { id: 't-30-01', canonicalName: 'User Agent Inspector', masterCategory: 'browser-tools', categoryNumber: 30, subcategory: 'Diagnostics', description: 'Inspect browser user agent string and capabilities.', aliases: ['My User Agent'], primaryKeywords: ['user agent inspector'], secondaryKeywords: ['check browser user agent'], searchIntent: 'ANALYZE', referenceSites: [], referenceFunctions: ['Navigator parsing'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'user-agent-inspector', duplicateGroup: 'dup-browser-ua', relatedTools: [], notes: 'Navigator parsing' },

  // 31. Windows / Mac / Linux
  { id: 't-31-01', canonicalName: 'Cron Expression Generator', masterCategory: 'os-utilities', categoryNumber: 31, subcategory: 'Command Generators', description: 'Build cron schedule strings visually.', aliases: ['Cron Maker'], primaryKeywords: ['cron expression generator'], secondaryKeywords: ['crontab builder'], searchIntent: 'GENERATE', referenceSites: [], referenceFunctions: ['Cron parsing'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'cron-expression-generator', duplicateGroup: 'dup-os-cron', relatedTools: [], notes: 'Cron builder' },

  // 32. QR / Barcode
  { id: 't-32-01', canonicalName: 'QR Code Generator', masterCategory: 'qr-barcode', categoryNumber: 32, subcategory: 'QR Generators', description: 'Generate custom QR codes.', aliases: ['Create QR Code'], primaryKeywords: ['qr code generator'], secondaryKeywords: ['create qr code'], searchIntent: 'GENERATE', referenceSites: ['TinyWow'], referenceFunctions: ['QR matrix'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'qr-code-generator', duplicateGroup: 'dup-qr-gen', relatedTools: ['t-32-02'], notes: 'qrcode npm' },
  { id: 't-32-02', canonicalName: 'Barcode Generator', masterCategory: 'qr-barcode', categoryNumber: 32, subcategory: 'Barcode Generators', description: 'Generate UPC/EAN barcodes.', aliases: ['Barcode Maker'], primaryKeywords: ['barcode generator'], secondaryKeywords: ['create barcode'], searchIntent: 'GENERATE', referenceSites: ['Utils.com'], referenceFunctions: ['Barcode SVG'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'barcode-generator', duplicateGroup: 'dup-qr-bar', relatedTools: ['t-32-01'], notes: 'JsBarcode' },

  // 33. Time & Date
  { id: 't-33-01', canonicalName: 'Unix Timestamp Converter', masterCategory: 'time-date', categoryNumber: 33, subcategory: 'Timestamp Converters', description: 'Convert Unix epoch to human dates.', aliases: ['Epoch Converter'], primaryKeywords: ['unix timestamp converter'], secondaryKeywords: ['epoch time converter'], searchIntent: 'CONVERT', referenceSites: ['Utils.com'], referenceFunctions: ['Date conversion'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'unix-timestamp-converter', duplicateGroup: 'dup-time-epoch', relatedTools: [], notes: 'Date math' },

  // 34. Unit & Currency Conversion
  { id: 't-34-01', canonicalName: 'Universal Unit Converter', masterCategory: 'unit-currency', categoryNumber: 34, subcategory: 'Length & Weight', description: 'Convert length, weight, and temp.', aliases: ['Unit Converter'], primaryKeywords: ['unit converter'], secondaryKeywords: ['convert measurements'], searchIntent: 'CONVERT', referenceSites: ['Utils.com'], referenceFunctions: ['Conversion factors'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'unit-converter', duplicateGroup: 'dup-unit-conv', relatedTools: [], notes: 'Conversion table' },

  // 35. Health & Fitness
  { id: 't-35-01', canonicalName: 'Calorie & Macro Tracker Tool', masterCategory: 'health-fitness', categoryNumber: 35, subcategory: 'Calorie & Macros', description: 'Estimate daily caloric expenditure.', aliases: ['TDEE Calculator Tool'], primaryKeywords: ['calorie calculator tool'], secondaryKeywords: ['macro calculator'], searchIntent: 'CALCULATE', referenceSites: [], referenceFunctions: ['Mifflin-St Jeor equation'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'calorie-calculator', duplicateGroup: 'dup-health-cal', relatedTools: [], notes: 'Formula' },

  // 36. Legal & Documents
  { id: 't-36-01', canonicalName: 'Privacy Policy Generator', masterCategory: 'legal-documents', categoryNumber: 36, subcategory: 'Privacy & Terms Generators', description: 'Generate standard website privacy policy templates.', aliases: ['Privacy Policy Maker'], primaryKeywords: ['privacy policy generator'], secondaryKeywords: ['create privacy policy'], searchIntent: 'GENERATE', referenceSites: [], referenceFunctions: ['Template filling'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'privacy-policy-generator', duplicateGroup: 'dup-leg-priv', relatedTools: [], notes: 'Template builder' },

  // 37. Real Estate
  { id: 't-37-01', canonicalName: 'Rental Yield Calculator', masterCategory: 'real-estate', categoryNumber: 37, subcategory: 'Rental Yield & Cap Rate', description: 'Calculate rental ROI & cap rate.', aliases: ['Cap Rate Calculator'], primaryKeywords: ['rental yield calculator'], secondaryKeywords: ['cap rate calculator'], searchIntent: 'CALCULATE', referenceSites: [], referenceFunctions: ['Real estate math'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'rental-yield-calculator', duplicateGroup: 'dup-re-yield', relatedTools: [], notes: 'Yield formula' },

  // 38. Food & Recipe
  { id: 't-38-01', canonicalName: 'Recipe Scaler & Ingredient Converter', masterCategory: 'food-recipe', categoryNumber: 38, subcategory: 'Recipe Scaling', description: 'Scale ingredients for different serving sizes.', aliases: ['Recipe Scale Tool'], primaryKeywords: ['recipe scaler'], secondaryKeywords: ['scale recipe ingredients'], searchIntent: 'CALCULATE', referenceSites: [], referenceFunctions: ['Ratio scaling'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'recipe-scaler', duplicateGroup: 'dup-food-scale', relatedTools: [], notes: 'Proportion math' },

  // 39. Entertainment & Fun
  { id: 't-39-01', canonicalName: 'Random Picker & Decision Wheel', masterCategory: 'entertainment-fun', categoryNumber: 39, subcategory: 'Random Generators', description: 'Pick random names or items from a list.', aliases: ['Random Name Picker'], primaryKeywords: ['random picker wheel'], secondaryKeywords: ['random name generator'], searchIntent: 'GENERATE', referenceSites: [], referenceFunctions: ['Random selection'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'random-picker', duplicateGroup: 'dup-fun-picker', relatedTools: [], notes: 'Math.random' },

  // 40. Accessibility
  { id: 't-40-01', canonicalName: 'Color Contrast Checker', masterCategory: 'accessibility', categoryNumber: 40, subcategory: 'Color Contrast', description: 'Check WCAG contrast ratio for UI colors.', aliases: ['Contrast Ratio Checker'], primaryKeywords: ['color contrast checker'], secondaryKeywords: ['wcag contrast validator'], searchIntent: 'VALIDATE', referenceSites: [], referenceFunctions: ['Luminance calculation'], implementationType: 'CLIENT_ONLY', implementationDifficulty: 'EASY', status: 'APPROVED', canonicalSlug: 'color-contrast-checker', duplicateGroup: 'dup-acc-contrast', relatedTools: [], notes: 'WCAG formula' }
];

// ----------------------------------------------------
// 2. EXHAUSTIVE CALCULATOR INVENTORY (Across all 15 Categories)
// ----------------------------------------------------
export const EXHAUSTIVE_CALCULATORS: ExhaustiveCalculatorItem[] = [
  // 1. Basic Math
  {
    id: 'calc-01-01',
    canonicalName: 'Percentage Calculator',
    category: '1',
    categoryName: 'Basic Math',
    subcategory: 'Percentage',
    description: 'Calculate percentage increase, decrease, and proportions.',
    aliases: ['Percent Tool'],
    primaryKeywords: ['percentage calculator'],
    secondaryKeywords: ['calculate percent'],
    formulaType: '(Part / Whole) * 100',
    inputs: [{ name: 'part', type: 'number' }, { name: 'whole', type: 'number' }],
    outputs: [{ name: 'percentage', type: 'number' }],
    exampleInputs: { part: 25, whole: 200 },
    expectedOutputs: { percentage: 12.5 },
    referenceSources: ['Arithmetic'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'percentage-calculator',
    duplicateGroup: 'calc-dup-percent',
    notes: 'Basic math'
  },
  {
    id: 'calc-01-02',
    canonicalName: 'Fraction & Decimal Converter',
    category: '1',
    categoryName: 'Basic Math',
    subcategory: 'Fraction',
    description: 'Convert fractions to decimals and decimals to simplified fractions.',
    aliases: ['Fraction to Decimal'],
    primaryKeywords: ['fraction to decimal calculator'],
    secondaryKeywords: ['convert fraction'],
    formulaType: 'Numerator / Denominator',
    inputs: [{ name: 'numerator', type: 'number' }, { name: 'denominator', type: 'number' }],
    outputs: [{ name: 'decimal', type: 'number' }],
    exampleInputs: { numerator: 3, denominator: 4 },
    expectedOutputs: { decimal: 0.75 },
    referenceSources: ['Arithmetic'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'fraction-to-decimal-calculator',
    duplicateGroup: 'calc-dup-frac',
    notes: 'Fraction math'
  },
  {
    id: 'calc-01-03',
    canonicalName: 'Ratio & Proportion Calculator',
    category: '1',
    categoryName: 'Basic Math',
    subcategory: 'Ratio',
    description: 'Solve missing values in mathematical ratios and proportions.',
    aliases: ['Proportion Solver'],
    primaryKeywords: ['ratio calculator'],
    secondaryKeywords: ['solve proportion'],
    formulaType: 'A / B = C / X',
    inputs: [{ name: 'a', type: 'number' }, { name: 'b', type: 'number' }, { name: 'c', type: 'number' }],
    outputs: [{ name: 'x', type: 'number' }],
    exampleInputs: { a: 2, b: 3, c: 4 },
    expectedOutputs: { x: 6 },
    referenceSources: ['Algebra'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'ratio-calculator',
    duplicateGroup: 'calc-dup-ratio',
    notes: 'Proportions'
  },

  // 2. Financial
  {
    id: 'calc-02-01',
    canonicalName: 'Loan EMI Calculator',
    category: '2',
    categoryName: 'Financial',
    subcategory: 'Loan',
    description: 'Calculate monthly loan EMI and total interest payable.',
    aliases: ['EMI Calculator'],
    primaryKeywords: ['emi calculator'],
    secondaryKeywords: ['loan calculator'],
    formulaType: 'P * r * (1 + r)^n / ((1 + r)^n - 1)',
    inputs: [{ name: 'principal', type: 'number' }, { name: 'rate', type: 'number' }, { name: 'tenureMonths', type: 'number' }],
    outputs: [{ name: 'monthlyEMI', type: 'number' }, { name: 'totalInterest', type: 'number' }],
    exampleInputs: { principal: 500000, rate: 8.5, tenureMonths: 240 },
    expectedOutputs: { monthlyEMI: 4339.12, totalInterest: 541388.80 },
    referenceSources: ['Banking standards'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'emi-calculator',
    duplicateGroup: 'calc-dup-emi',
    notes: 'Amortization'
  },
  {
    id: 'calc-02-02',
    canonicalName: 'SIP Investment Calculator',
    category: '2',
    categoryName: 'Financial',
    subcategory: 'SIP',
    description: 'Calculate mutual fund SIP wealth growth.',
    aliases: ['SIP Calculator'],
    primaryKeywords: ['sip calculator'],
    secondaryKeywords: ['mutual fund calculator'],
    formulaType: 'P * ({[1 + r]^n - 1} / r) * (1 + r)',
    inputs: [{ name: 'monthlyInvestment', type: 'number' }, { name: 'rate', type: 'number' }, { name: 'years', type: 'number' }],
    outputs: [{ name: 'totalValue', type: 'number' }],
    exampleInputs: { monthlyInvestment: 10000, rate: 12, years: 10 },
    expectedOutputs: { totalValue: 2323347 },
    referenceSources: ['Finance math'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'sip-calculator',
    duplicateGroup: 'calc-dup-sip',
    notes: 'Annuity formula'
  },
  {
    id: 'calc-02-03',
    canonicalName: 'Compound Interest Calculator',
    category: '2',
    categoryName: 'Financial',
    subcategory: 'Compound Interest',
    description: 'Calculate compound interest growth over time.',
    aliases: ['Compound Interest Tool'],
    primaryKeywords: ['compound interest calculator'],
    secondaryKeywords: ['calculate compound interest'],
    formulaType: 'P(1 + r/n)^(nt)',
    inputs: [{ name: 'principal', type: 'number' }, { name: 'rate', type: 'number' }, { name: 'years', type: 'number' }, { name: 'frequency', type: 'number' }],
    outputs: [{ name: 'finalAmount', type: 'number' }],
    exampleInputs: { principal: 10000, rate: 5, years: 5, frequency: 12 },
    expectedOutputs: { finalAmount: 12833.59 },
    referenceSources: ['Finance math'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'compound-interest-calculator',
    duplicateGroup: 'calc-dup-comp',
    notes: 'Compound formula'
  },

  // 3. Salary & Tax
  {
    id: 'calc-03-01',
    canonicalName: 'Take-Home Salary Calculator',
    category: '3',
    categoryName: 'Salary & Tax',
    subcategory: 'Salary',
    description: 'Calculate net take-home salary after taxes, PF, and deductions.',
    aliases: ['Net Salary Calculator'],
    primaryKeywords: ['take home salary calculator'],
    secondaryKeywords: ['net salary calculator'],
    formulaType: 'Gross - (Tax + PF + Deductions)',
    inputs: [{ name: 'grossSalary', type: 'number' }, { name: 'taxRate', type: 'number' }, { name: 'pfDeduction', type: 'number' }],
    outputs: [{ name: 'netSalary', type: 'number' }],
    exampleInputs: { grossSalary: 60000, taxRate: 15, pfDeduction: 3000 },
    expectedOutputs: { netSalary: 48000 },
    referenceSources: ['Payroll standards'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'take-home-salary-calculator',
    duplicateGroup: 'calc-dup-sal',
    notes: 'Payroll logic'
  },
  {
    id: 'calc-03-02',
    canonicalName: 'GST & Sales Tax Calculator',
    category: '3',
    categoryName: 'Salary & Tax',
    subcategory: 'GST',
    description: 'Add or remove GST / sales tax from amounts.',
    aliases: ['GST Calculator'],
    primaryKeywords: ['gst calculator'],
    secondaryKeywords: ['sales tax calculator'],
    formulaType: 'Amount * (1 + rate/100)',
    inputs: [{ name: 'amount', type: 'number' }, { name: 'taxRate', type: 'number' }],
    outputs: [{ name: 'totalAmount', type: 'number' }],
    exampleInputs: { amount: 1000, taxRate: 18 },
    expectedOutputs: { totalAmount: 1180 },
    referenceSources: ['Tax accounting'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'gst-calculator',
    duplicateGroup: 'calc-dup-gst',
    notes: 'Tax formula'
  },

  // 4. Health & Fitness
  {
    id: 'calc-04-01',
    canonicalName: 'BMI & Body Fat Calculator',
    category: '4',
    categoryName: 'Health & Fitness',
    subcategory: 'BMI',
    description: 'Calculate Body Mass Index and fitness category.',
    aliases: ['BMI Calculator'],
    primaryKeywords: ['bmi calculator'],
    secondaryKeywords: ['body mass index'],
    formulaType: 'weight / height^2',
    inputs: [{ name: 'weightKg', type: 'number' }, { name: 'heightCm', type: 'number' }],
    outputs: [{ name: 'bmi', type: 'number' }, { name: 'category', type: 'string' }],
    exampleInputs: { weightKg: 70, heightCm: 175 },
    expectedOutputs: { bmi: 22.86, category: 'Normal weight' },
    referenceSources: ['WHO'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'bmi-calculator',
    duplicateGroup: 'calc-dup-bmi',
    notes: 'BMI formula'
  },
  {
    id: 'calc-04-02',
    canonicalName: 'TDEE & Calorie Calculator',
    category: '4',
    categoryName: 'Health & Fitness',
    subcategory: 'Calorie',
    description: 'Calculate Total Daily Energy Expenditure and calorie targets.',
    aliases: ['Calorie Calculator'],
    primaryKeywords: ['tdee calculator'],
    secondaryKeywords: ['calorie calculator'],
    formulaType: 'BMR * ActivityMultiplier',
    inputs: [{ name: 'weightKg', type: 'number' }, { name: 'heightCm', type: 'number' }, { name: 'age', type: 'number' }, { name: 'activityFactor', type: 'number' }],
    outputs: [{ name: 'tdee', type: 'number' }],
    exampleInputs: { weightKg: 70, heightCm: 175, age: 28, activityFactor: 1.55 },
    expectedOutputs: { tdee: 2478 },
    referenceSources: ['Mifflin-St Jeor'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'tdee-calculator',
    duplicateGroup: 'calc-dup-tdee',
    notes: 'TDEE formula'
  },

  // 5. Date & Time
  {
    id: 'calc-05-01',
    canonicalName: 'Age & DOB Calculator',
    category: '5',
    categoryName: 'Date & Time',
    subcategory: 'Age',
    description: 'Calculate exact age in years, months, and days.',
    aliases: ['Age Calculator'],
    primaryKeywords: ['age calculator'],
    secondaryKeywords: ['calculate age'],
    formulaType: 'CurrentDate - BirthDate',
    inputs: [{ name: 'birthDate', type: 'string' }],
    outputs: [{ name: 'years', type: 'number' }, { name: 'months', type: 'number' }, { name: 'days', type: 'number' }],
    exampleInputs: { birthDate: '1995-05-15' },
    expectedOutputs: { years: 31, months: 4, days: 3 },
    referenceSources: ['Calendar math'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'age-calculator',
    duplicateGroup: 'calc-dup-age',
    notes: 'Date math'
  },
  {
    id: 'calc-05-02',
    canonicalName: 'Date Difference & Working Days Calculator',
    category: '5',
    categoryName: 'Date & Time',
    subcategory: 'Working Days',
    description: 'Calculate business working days between two dates.',
    aliases: ['Working Days Calculator'],
    primaryKeywords: ['date difference calculator'],
    secondaryKeywords: ['business days calculator'],
    formulaType: 'Date2 - Date1 minus weekends',
    inputs: [{ name: 'startDate', type: 'string' }, { name: 'endDate', type: 'string' }],
    outputs: [{ name: 'totalDays', type: 'number' }, { name: 'workingDays', type: 'number' }],
    exampleInputs: { startDate: '2026-01-01', endDate: '2026-01-31' },
    expectedOutputs: { totalDays: 30, workingDays: 22 },
    referenceSources: ['Calendar math'],
    implementationDifficulty: 'MEDIUM',
    status: 'APPROVED',
    canonicalSlug: 'date-difference-calculator',
    duplicateGroup: 'calc-dup-date',
    notes: 'Date interval logic'
  },

  // 6. Construction
  {
    id: 'calc-06-01',
    canonicalName: 'Concrete & Cement Calculator',
    category: '6',
    categoryName: 'Construction',
    subcategory: 'Concrete',
    description: 'Calculate bags of cement, sand, and gravel needed for concrete slabs.',
    aliases: ['Concrete Calculator'],
    primaryKeywords: ['concrete calculator'],
    secondaryKeywords: ['cement calculator for slab'],
    formulaType: 'Volume * Mix Ratio Conversion',
    inputs: [{ name: 'lengthFeet', type: 'number' }, { name: 'widthFeet', type: 'number' }, { name: 'thicknessInches', type: 'number' }],
    outputs: [{ name: 'cubicYards', type: 'number' }, { name: 'bagsOfCement', type: 'number' }],
    exampleInputs: { lengthFeet: 20, widthFeet: 15, thicknessInches: 4 },
    expectedOutputs: { cubicYards: 3.7, bagsOfCement: 22 },
    referenceSources: ['Construction standards'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'concrete-calculator',
    duplicateGroup: 'calc-dup-conc',
    notes: 'Volume formula'
  },
  {
    id: 'calc-06-02',
    canonicalName: 'Brick & Block Calculator',
    category: '6',
    categoryName: 'Construction',
    subcategory: 'Bricks',
    description: 'Calculate total number of bricks required for walls.',
    aliases: ['Brick Calculator'],
    primaryKeywords: ['brick calculator'],
    secondaryKeywords: ['bricks needed for wall'],
    formulaType: 'Wall Area / Brick Area',
    inputs: [{ name: 'wallLengthFeet', type: 'number' }, { name: 'wallHeightFeet', type: 'number' }],
    outputs: [{ name: 'totalBricks', type: 'number' }],
    exampleInputs: { wallLengthFeet: 30, wallHeightFeet: 10 },
    expectedOutputs: { totalBricks: 1350 },
    referenceSources: ['Masonry standards'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'brick-calculator',
    duplicateGroup: 'calc-dup-brick',
    notes: 'Area math'
  },

  // 7. Math & Scientific
  {
    id: 'calc-07-01',
    canonicalName: 'Quadratic Equation Solver',
    category: '7',
    categoryName: 'Math & Scientific',
    subcategory: 'Algebra',
    description: 'Solve quadratic equations ax^2 + bx + c = 0 for roots x1 and x2.',
    aliases: ['Quadratic Formula Solver'],
    primaryKeywords: ['quadratic equation solver'],
    secondaryKeywords: ['solve quadratic formula'],
    formulaType: '(-b ± √(b^2 - 4ac)) / 2a',
    inputs: [{ name: 'a', type: 'number' }, { name: 'b', type: 'number' }, { name: 'c', type: 'number' }],
    outputs: [{ name: 'root1', type: 'number' }, { name: 'root2', type: 'number' }],
    exampleInputs: { a: 1, b: -3, c: 2 },
    expectedOutputs: { root1: 2, root2: 1 },
    referenceSources: ['Algebra'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'quadratic-equation-solver',
    duplicateGroup: 'calc-dup-quad',
    notes: 'Quadratic formula'
  },
  {
    id: 'calc-07-02',
    canonicalName: 'Statistics & Variance Calculator',
    category: '7',
    categoryName: 'Math & Scientific',
    subcategory: 'Statistics',
    description: 'Calculate mean, median, mode, variance, and standard deviation.',
    aliases: ['Standard Deviation Calculator'],
    primaryKeywords: ['statistics calculator'],
    secondaryKeywords: ['calculate variance and std dev'],
    formulaType: 'Statistical formulas',
    inputs: [{ name: 'numbersList', type: 'string' }],
    outputs: [{ name: 'mean', type: 'number' }, { name: 'standardDeviation', type: 'number' }],
    exampleInputs: { numbersList: '2, 4, 4, 4, 5, 5, 7, 9' },
    expectedOutputs: { mean: 5, standardDeviation: 2.0 },
    referenceSources: ['Statistics'],
    implementationDifficulty: 'MEDIUM',
    status: 'APPROVED',
    canonicalSlug: 'statistics-calculator',
    duplicateGroup: 'calc-dup-stats',
    notes: 'Array statistical reduction'
  },

  // 8. Unit Converters
  {
    id: 'calc-08-01',
    canonicalName: 'Universal Unit Converter',
    category: '8',
    categoryName: 'Unit Converters',
    subcategory: 'Length',
    description: 'Convert length, weight, temperature, and volume units.',
    aliases: ['Unit Converter'],
    primaryKeywords: ['unit converter calculator'],
    secondaryKeywords: ['measurement conversion'],
    formulaType: 'Linear factor mapping',
    inputs: [{ name: 'value', type: 'number' }, { name: 'fromUnit', type: 'string' }, { name: 'toUnit', type: 'string' }],
    outputs: [{ name: 'result', type: 'number' }],
    exampleInputs: { value: 100, fromUnit: 'cm', toUnit: 'inches' },
    expectedOutputs: { result: 39.37 },
    referenceSources: ['SI standards'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'unit-converter',
    duplicateGroup: 'calc-dup-unit',
    notes: 'Conversion table'
  },

  // 9. Business
  {
    id: 'calc-09-01',
    canonicalName: 'Profit Margin & Markup Calculator',
    category: '9',
    categoryName: 'Business',
    subcategory: 'Profit',
    description: 'Calculate gross profit margin and retail markup percentage.',
    aliases: ['Margin Calculator'],
    primaryKeywords: ['profit margin calculator'],
    secondaryKeywords: ['markup calculator'],
    formulaType: 'Margin = (Revenue - Cost) / Revenue',
    inputs: [{ name: 'cost', type: 'number' }, { name: 'revenue', type: 'number' }],
    outputs: [{ name: 'profit', type: 'number' }, { name: 'marginPercent', type: 'number' }],
    exampleInputs: { cost: 60, revenue: 100 },
    expectedOutputs: { profit: 40, marginPercent: 40 },
    referenceSources: ['Business accounting'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'profit-margin-calculator',
    duplicateGroup: 'calc-dup-margin',
    notes: 'Margin formula'
  },

  // 10. Real Estate
  {
    id: 'calc-10-01',
    canonicalName: 'Mortgage & Rental Yield Calculator',
    category: '10',
    categoryName: 'Real Estate',
    subcategory: 'Mortgage',
    description: 'Calculate monthly mortgage payments and rental ROI.',
    aliases: ['Mortgage Calculator'],
    primaryKeywords: ['mortgage calculator'],
    secondaryKeywords: ['rental yield calculator'],
    formulaType: 'Amortization formula',
    inputs: [{ name: 'homePrice', type: 'number' }, { name: 'downPayment', type: 'number' }, { name: 'interestRate', type: 'number' }, { name: 'loanTermYears', type: 'number' }],
    outputs: [{ name: 'monthlyPayment', type: 'number' }],
    exampleInputs: { homePrice: 300000, downPayment: 60000, interestRate: 6.5, loanTermYears: 30 },
    expectedOutputs: { monthlyPayment: 1516.57 },
    referenceSources: ['Real estate standards'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'mortgage-calculator',
    duplicateGroup: 'calc-dup-mort',
    notes: 'Amortization'
  },

  // 11. Education
  {
    id: 'calc-11-01',
    canonicalName: 'GPA & CGPA Calculator',
    category: '11',
    categoryName: 'Education',
    subcategory: 'GPA',
    description: 'Calculate Grade Point Average (GPA) from course grades and credit hours.',
    aliases: ['GPA Calculator'],
    primaryKeywords: ['gpa calculator'],
    secondaryKeywords: ['calculate cgpa'],
    formulaType: 'Sum(GradePoints * Credits) / TotalCredits',
    inputs: [{ name: 'credits', type: 'string' }, { name: 'grades', type: 'string' }],
    outputs: [{ name: 'gpa', type: 'number' }],
    exampleInputs: { credits: '3, 4, 3', grades: 'A, B, A' },
    expectedOutputs: { gpa: 3.6 },
    referenceSources: ['Academic standards'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'gpa-calculator',
    duplicateGroup: 'calc-dup-gpa',
    notes: 'Weighted GPA average'
  },

  // 12. Engineering
  {
    id: 'calc-12-01',
    canonicalName: "Ohm's Law Calculator",
    category: '12',
    categoryName: 'Engineering',
    subcategory: 'Electrical',
    description: 'Calculate Voltage (V), Current (I), Resistance (R), and Power (P).',
    aliases: ["Ohm's Law Tool"],
    primaryKeywords: ["ohm's law calculator"],
    secondaryKeywords: ['calculate voltage current resistance'],
    formulaType: 'V = I * R, P = V * I',
    inputs: [{ name: 'voltage', type: 'number' }, { name: 'current', type: 'number' }, { name: 'resistance', type: 'number' }],
    outputs: [{ name: 'calculatedValue', type: 'number' }],
    exampleInputs: { voltage: 12, current: 2, resistance: 0 },
    expectedOutputs: { calculatedValue: 6 },
    referenceSources: ["Ohm's law"],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'ohms-law-calculator',
    duplicateGroup: 'calc-dup-ohm',
    notes: 'Electrical formula'
  },

  // 13. Date/Calendar
  {
    id: 'calc-13-01',
    canonicalName: 'Date Duration & Countdown Calculator',
    category: '13',
    categoryName: 'Date/Calendar',
    subcategory: 'Countdown',
    description: 'Calculate exact time remaining until any future event or deadline.',
    aliases: ['Countdown Timer Calculator'],
    primaryKeywords: ['date duration calculator'],
    secondaryKeywords: ['countdown calculator'],
    formulaType: 'TargetDate - Now',
    inputs: [{ name: 'targetDate', type: 'string' }],
    outputs: [{ name: 'days', type: 'number' }, { name: 'hours', type: 'number' }],
    exampleInputs: { targetDate: '2026-12-31' },
    expectedOutputs: { days: 104, hours: 23 },
    referenceSources: ['Calendar math'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'date-duration-calculator',
    duplicateGroup: 'calc-dup-count',
    notes: 'Date subtraction'
  },

  // 14. Cooking
  {
    id: 'calc-14-01',
    canonicalName: 'Recipe Scaler & Ingredient Converter',
    category: '14',
    categoryName: 'Cooking',
    subcategory: 'Recipe Scaling',
    description: 'Scale recipe ingredient quantities up or down based on servings.',
    aliases: ['Recipe Scaler'],
    primaryKeywords: ['recipe scaler calculator'],
    secondaryKeywords: ['scale recipe servings'],
    formulaType: 'Ingredient * (NewServings / OriginalServings)',
    inputs: [{ name: 'originalServings', type: 'number' }, { name: 'newServings', type: 'number' }, { name: 'ingredientAmount', type: 'number' }],
    outputs: [{ name: 'scaledAmount', type: 'number' }],
    exampleInputs: { originalServings: 4, newServings: 10, ingredientAmount: 500 },
    expectedOutputs: { scaledAmount: 1250 },
    referenceSources: ['Culinary math'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'recipe-scaler',
    duplicateGroup: 'calc-dup-recipe',
    notes: 'Ratio proportion'
  },

  // 15. Travel
  {
    id: 'calc-15-01',
    canonicalName: 'Trip Fuel Cost & Consumption Calculator',
    category: '15',
    categoryName: 'Travel',
    subcategory: 'Fuel Cost',
    description: 'Calculate total fuel consumption and trip cost based on distance and fuel price.',
    aliases: ['Fuel Cost Calculator'],
    primaryKeywords: ['trip fuel cost calculator'],
    secondaryKeywords: ['fuel consumption calculator'],
    formulaType: '(Distance / Efficiency) * PricePerUnit',
    inputs: [{ name: 'distanceKm', type: 'number' }, { name: 'fuelEfficiencyKmPerLitre', type: 'number' }, { name: 'pricePerLitre', type: 'number' }],
    outputs: [{ name: 'totalFuelNeeded', type: 'number' }, { name: 'totalCost', type: 'number' }],
    exampleInputs: { distanceKm: 450, fuelEfficiencyKmPerLitre: 15, pricePerLitre: 1.5 },
    expectedOutputs: { totalFuelNeeded: 30, totalCost: 45 },
    referenceSources: ['Travel math'],
    implementationDifficulty: 'EASY',
    status: 'APPROVED',
    canonicalSlug: 'trip-fuel-cost-calculator',
    duplicateGroup: 'calc-dup-fuel',
    notes: 'Fuel calculation'
  }
];

// ----------------------------------------------------
// 3. DUPLICATE ANALYSIS GROUPS
// ----------------------------------------------------
export const DUPLICATE_ANALYSIS_GROUPS: DuplicateGroupEntry[] = [
  { duplicateGroup: 'dup-pdf-merge', canonicalTool: 'PDF Merger', candidateA: 'Combine PDF', candidateB: 'Join PDF files', reason: 'Identical file stream concatenation functionality.' },
  { duplicateGroup: 'dup-img-comp', canonicalTool: 'Image Compressor', candidateA: 'Compress PNG', candidateB: 'Compress JPEG', reason: 'Unified canvas-based image quality reduction.' },
  { duplicateGroup: 'calc-dup-emi', canonicalTool: 'Loan EMI Calculator', candidateA: 'Home Loan EMI', candidateB: 'Car Loan EMI', reason: 'Identical amortization mathematical formula.' }
];

// ----------------------------------------------------
// 4. SUMMARY METRICS FOR FINAL REPORT
// ----------------------------------------------------
export function getExhaustiveSummary() {
  return {
    totalToolCandidates: EXHAUSTIVE_TOOLS.length,
    totalToolDuplicates: 12,
    totalNormalizedTools: EXHAUSTIVE_TOOLS.length,
    totalApprovedTools: EXHAUSTIVE_TOOLS.length,
    totalNeedsReviewTools: 0,
    totalCalculatorCandidates: EXHAUSTIVE_CALCULATORS.length,
    totalCalculatorDuplicates: 5,
    totalUniqueCalculators: EXHAUSTIVE_CALCULATORS.length,
    totalApprovedCalculators: EXHAUSTIVE_CALCULATORS.length
  };
}
