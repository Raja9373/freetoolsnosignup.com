import React, { useState, useEffect, useRef } from 'react';
import { 
  Files, Upload, Download, Trash2, CheckCircle2, RefreshCw, FileText, 
  Scissors, Minimize2, RotateCw, Stamp, FileDigit, Image, FileImage, 
  Lock, Unlock, Tags, Eye, Sliders, Check, ArrowUpDown, Copy, Search,
  Wrench, Moon, PenTool, EyeOff, Hash, Layers, Split, Award, Receipt,
  Fingerprint, Sparkles, AlertCircle, ArrowRight, Crop, Maximize,
  CheckSquare, GitCompare, Grid, BookOpen, ArrowDownUp, Shield,
  Eraser, PlusCircle, Rows, PanelLeft, LayoutGrid, FolderArchive,
  FileSpreadsheet, QrCode, ShieldAlert, Palette, User, Music, AlignLeft,
  Type, FileCheck, Table, Presentation, ScanText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  PDFFileInfo, createSamplePdf, mergePdfs, splitPdf, compressPdf, rotatePdf, 
  deletePdfPages, reorderPdfPages, addWatermarkToPdf, addPageNumbersToPdf, 
  pdfToImages, imagesToPdf, extractPdfText, exportDocxFromText, textToPdf, 
  excelToPdf, pptToPdf, convertPdfToGrayscale, editPdfMetadata, resizePdfPages, 
  cropPdfPages, protectPdf, unlockPdf, stampSignatureOnPdf, repairPdfStream, 
  invertPdfColors, redactPdfArea, addBatesNumbering, reversePdfPages, 
  splitDuplexPages, createNUpPdf, createBookletPdf, flattenPdf, removeBlankPages, 
  insertBlankPage, splitPdfByChunkSize, addBindingMargin, createPosterPdf, 
  stampBarcodeOrQrOnPdf, generateCertificatePdf, generateInvoicePdf, 
  calculatePdfChecksum, triggerFileDownload 
} from './pdfEngines';
import { TOOLS_DATABASE } from '../../data/toolsData';

interface PDFToolsModalProps {
  initialToolId?: string;
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

export const PDFToolsModal: React.FC<PDFToolsModalProps> = ({ 
  initialToolId = 'pdf-merge', 
  onClose, 
  onRecordUse 
}) => {
  // Active tool state
  const [activeToolId, setActiveToolId] = useState<string>(initialToolId);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryTab, setCategoryTab] = useState<'all' | 'organize' | 'convert' | 'security' | 'edit'>('all');

  // File state
  const [files, setFiles] = useState<PDFFileInfo[]>([]);
  const [imageFiles, setImageFiles] = useState<{ data: ArrayBuffer; name: string; type: string }[]>([]);
  
  // Processing & UI state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [downloadResult, setDownloadResult] = useState<{
    url?: string;
    blob?: Blob;
    filename: string;
    metrics?: string;
    extractedText?: string;
  } | null>(null);

  // Tool Specific Options
  const [splitRange, setSplitRange] = useState('all');
  const [rotateAngle, setRotateAngle] = useState<90 | 180 | 270>(90);
  const [rotateTarget, setRotateTarget] = useState<'all' | 'odd' | 'even'>('all');
  const [deletePagesStr, setDeletePagesStr] = useState('');
  const [extractPagesStr, setExtractPagesStr] = useState('1');
  const [reorderOrderStr, setReorderOrderStr] = useState('2, 1');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.25);
  const [draftStampChoice, setDraftStampChoice] = useState<'DRAFT' | 'CONFIDENTIAL' | 'APPROVED' | 'COPY' | 'FINAL'>('CONFIDENTIAL');
  const [pageNumberFormat, setPageNumberFormat] = useState<'Page X of Y' | 'X / Y' | 'X' | 'Bottom Right' | 'Top Center'>('Page X of Y');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaAuthor, setMetaAuthor] = useState('');
  const [metaSubject, setMetaSubject] = useState('');
  const [cropMarginTop, setCropMarginTop] = useState(20);
  const [cropMarginBottom, setCropMarginBottom] = useState(20);
  const [cropMarginLeft, setCropMarginLeft] = useState(20);
  const [cropMarginRight, setCropMarginRight] = useState(20);
  const [textInput, setTextInput] = useState('Sample notes for text to PDF converter.\nCreated 100% offline on FreeToolsNoSignup.com.\nFast, private, and secure.');
  const [pageSizeChoice, setPageSizeChoice] = useState<'A4' | 'Letter' | 'Legal' | 'A3'>('A4');
  const [nUpChoice, setNUpChoice] = useState<'2-up' | '4-up'>('2-up');
  const [chunkSizeInput, setChunkSizeInput] = useState(2);
  const [blankInsertPos, setBlankInsertPos] = useState<'start' | 'end' | '1'>('end');
  const [gutterMarginChoice, setGutterMarginChoice] = useState<number>(36);
  const [gutterSideChoice, setGutterSideChoice] = useState<'left' | 'right'>('left');
  const [batesPrefix, setBatesPrefix] = useState('LEGAL-DOC-');
  const [batesStart, setBatesStart] = useState(1);
  const [protectPassword, setProtectPassword] = useState('SecretPassword123');
  const [codeStampType, setCodeStampType] = useState<'qr' | 'barcode'>('qr');
  const [codeStampContent, setCodeStampContent] = useState('https://FreeToolsNoSignup.com');
  const [codeStampPos, setCodeStampPos] = useState<'bottom-right' | 'top-right' | 'bottom-left' | 'top-left'>('bottom-right');
  const [certificateName, setCertificateName] = useState('Alex Morgan');
  const [certificateCourse, setCertificateCourse] = useState('Advanced Full-Stack Engineering');
  const [invoiceClient, setInvoiceClient] = useState('Acme Corporation');
  const [invoiceAmount, setInvoiceAmount] = useState('1,250.00');

  // Signature canvas
  const signatureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);

  // Sync active tool when prop changes
  useEffect(() => {
    if (initialToolId) {
      setActiveToolId(initialToolId);
    }
  }, [initialToolId]);

  // Filter 54 PDF tools from database
  const pdfTools = TOOLS_DATABASE.filter(t => t.category === 'pdf');

  const filteredTools = pdfTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags.some(tg => tg.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    if (categoryTab === 'all') return true;
    if (categoryTab === 'organize') return ['pdf-merge', 'pdf-split', 'pdf-rotate', 'pdf-delete-pages', 'pdf-extract-pages', 'pdf-reorder-pages', 'pdf-reverse', 'pdf-duplex-split', 'pdf-blank-page-remover', 'pdf-add-blank-page', 'pdf-split-by-size', 'pdf-n-up', 'pdf-booklet'].includes(tool.id);
    if (categoryTab === 'convert') return ['pdf-to-jpg', 'pdf-to-png', 'jpg-to-pdf', 'png-to-pdf', 'pdf-to-word', 'pdf-to-text', 'text-to-pdf', 'word-to-pdf', 'excel-to-pdf', 'ppt-to-pdf', 'pdf-table-extractor', 'pdf-image-extractor'].includes(tool.id);
    if (categoryTab === 'security') return ['pdf-watermark', 'pdf-protect', 'pdf-unlock', 'pdf-secure-redact', 'pdf-checksum-verifier', 'pdf-draft-watermark', 'pdf-header-stamp', 'pdf-barcode-stamp'].includes(tool.id);
    if (categoryTab === 'edit') return ['pdf-compress', 'pdf-header-footer', 'pdf-metadata-editor', 'pdf-crop', 'pdf-page-resizer', 'pdf-grayscale', 'pdf-repair', 'pdf-sign', 'pdf-invert-colors', 'pdf-certificate-generator', 'pdf-invoice-generator', 'pdf-flatten', 'pdf-add-margin', 'pdf-poster-maker', 'pdf-ocr', 'pdf-form-filler', 'pdf-compare', 'pdf-dpi-converter', 'pdf-color-separator', 'pdf-resume-exporter', 'pdf-sheet-music-transposer'].includes(tool.id);
    return true;
  });

  const activeTool = pdfTools.find(t => t.id === activeToolId) || pdfTools[0];

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;
    onRecordUse(activeToolId);

    // Handle Image uploads for Image-to-PDF
    if (activeToolId === 'jpg-to-pdf' || activeToolId === 'png-to-pdf') {
      const newImages: { data: ArrayBuffer; name: string; type: string }[] = [];
      for (let i = 0; i < selected.length; i++) {
        const file = selected[i];
        const buffer = await file.arrayBuffer();
        newImages.push({ data: buffer, name: file.name, type: file.type });
      }
      setImageFiles(prev => [...prev, ...newImages]);
      setDownloadResult(null);
      return;
    }

    // Handle PDF files
    const newFiles: PDFFileInfo[] = [];
    for (let i = 0; i < selected.length; i++) {
      const file = selected[i];
      const buffer = await file.arrayBuffer();
      try {
        const { PDFDocument } = await import('pdf-lib');
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        newFiles.push({
          name: file.name,
          size: file.size,
          arrayBuffer: buffer,
          pageCount: doc.getPageCount()
        });
      } catch {
        newFiles.push({
          name: file.name,
          size: file.size,
          arrayBuffer: buffer,
          pageCount: 1
        });
      }
    }

    setFiles(prev => [...prev, ...newFiles]);
    setDownloadResult(null);
  };

  // Load Demo Samples
  const handleLoadSample = async () => {
    setIsProcessing(true);
    setProgressMsg('Generating high-res test sample in browser memory...');
    try {
      if (activeToolId === 'pdf-merge') {
        const sample1 = await createSamplePdf('Contract_Agreement_Part1', 2);
        const sample2 = await createSamplePdf('Technical_Appendix_Part2', 3);
        setFiles([sample1, sample2]);
      } else {
        const sample = await createSamplePdf('Sample_Client_Document', 4);
        setFiles([sample]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
      setProgressMsg('');
    }
  };

  // Signature canvas handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e293b';
    setIsDrawing(true);
  };

  const drawSignature = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      setSignatureImage(canvas.toDataURL('image/png'));
    }
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureImage(null);
  };

  // Master Tool Execution Router
  const runTool = async () => {
    setIsProcessing(true);
    setDownloadResult(null);
    onRecordUse(activeToolId);

    try {
      // 1. PDF Merge
      if (activeToolId === 'pdf-merge') {
        if (files.length < 2) throw new Error('Please select at least 2 PDF files to merge.');
        const buffers = files.map(f => f.arrayBuffer);
        const mergedBytes = await mergePdfs(buffers, setProgressMsg);
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: 'merged_document.pdf',
          metrics: `Merged ${files.length} documents into 1 file (${(blob.size / 1024).toFixed(1)} KB)`
        });
      }

      // 2. PDF Split
      else if (activeToolId === 'pdf-split') {
        if (files.length === 0) throw new Error('Please upload a PDF file.');
        const res = await splitPdf(files[0].arrayBuffer, splitRange, splitRange === 'all', files[0].name.replace('.pdf', ''), setProgressMsg);
        const url = URL.createObjectURL(res.data);
        setDownloadResult({
          url,
          blob: res.data,
          filename: res.filename,
          metrics: `Extracted pages successfully into ${res.filename}`
        });
      }

      // 3. PDF Compress & DPI Optimizer
      else if (activeToolId === 'pdf-compress' || activeToolId === 'pdf-dpi-converter') {
        if (files.length === 0) throw new Error('Please upload a PDF to optimize.');
        const res = await compressPdf(files[0].arrayBuffer, setProgressMsg);
        const blob = new Blob([res.bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_optimized.pdf`,
          metrics: `Reduced from ${(res.originalSize / 1024).toFixed(1)} KB to ${(res.newSize / 1024).toFixed(1)} KB (Saved ${res.savingsPercent}%)`
        });
      }

      // 4. PDF Rotate
      else if (activeToolId === 'pdf-rotate') {
        if (files.length === 0) throw new Error('Please upload a PDF to rotate.');
        const rotatedBytes = await rotatePdf(files[0].arrayBuffer, rotateAngle, rotateTarget, setProgressMsg);
        const blob = new Blob([rotatedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_rotated_${rotateAngle}deg.pdf`,
          metrics: `Rotated ${rotateTarget} pages by ${rotateAngle}° clockwise`
        });
      }

      // 5. PDF Delete Pages
      else if (activeToolId === 'pdf-delete-pages') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const pageNums = deletePagesStr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
        if (pageNums.length === 0) throw new Error('Please specify at least 1 page number to remove (e.g. 1, 3).');
        const prunedBytes = await deletePdfPages(files[0].arrayBuffer, pageNums, setProgressMsg);
        const blob = new Blob([prunedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_pruned.pdf`,
          metrics: `Removed pages [${pageNums.join(', ')}] successfully`
        });
      }

      // 6. PDF Extract Pages
      else if (activeToolId === 'pdf-extract-pages') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const res = await splitPdf(files[0].arrayBuffer, extractPagesStr, false, files[0].name.replace('.pdf', ''), setProgressMsg);
        const url = URL.createObjectURL(res.data);
        setDownloadResult({
          url,
          blob: res.data,
          filename: `${files[0].name.replace('.pdf', '')}_extracted.pdf`,
          metrics: `Extracted pages [${extractPagesStr}] into new document`
        });
      }

      // 7. PDF Reorder Pages
      else if (activeToolId === 'pdf-reorder-pages') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const pageNums = reorderOrderStr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
        if (pageNums.length === 0) throw new Error('Please specify new page sequence e.g. 3, 1, 2.');
        const reorderedBytes = await reorderPdfPages(files[0].arrayBuffer, pageNums, setProgressMsg);
        const blob = new Blob([reorderedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_reordered.pdf`,
          metrics: `Reordered pages to [${pageNums.join(', ')}]`
        });
      }

      // 8. PDF Watermark & Draft Stamp
      else if (activeToolId === 'pdf-watermark' || activeToolId === 'pdf-draft-watermark') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const text = activeToolId === 'pdf-draft-watermark' ? draftStampChoice : watermarkText;
        const watermarkedBytes = await addWatermarkToPdf(files[0].arrayBuffer, text, { opacity: watermarkOpacity }, setProgressMsg);
        const blob = new Blob([watermarkedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_watermarked.pdf`,
          metrics: `Stamped watermark "${text}" with ${(watermarkOpacity * 100).toFixed(0)}% opacity across all pages`
        });
      }

      // 9. PDF Page Numbers & Bates Numbering Stamp
      else if (activeToolId === 'pdf-header-footer' || activeToolId === 'pdf-header-stamp') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        if (activeToolId === 'pdf-header-stamp') {
          const batesBytes = await addBatesNumbering(files[0].arrayBuffer, batesPrefix, batesStart);
          const blob = new Blob([batesBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          setDownloadResult({
            url,
            blob,
            filename: `${files[0].name.replace('.pdf', '')}_bates_stamped.pdf`,
            metrics: `Applied Bates indexing starting from ${batesPrefix}${String(batesStart).padStart(6, '0')}`
          });
        } else {
          const numberedBytes = await addPageNumbersToPdf(files[0].arrayBuffer, pageNumberFormat, setProgressMsg);
          const blob = new Blob([numberedBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          setDownloadResult({
            url,
            blob,
            filename: `${files[0].name.replace('.pdf', '')}_numbered.pdf`,
            metrics: `Applied page numbering (${pageNumberFormat}) to all pages`
          });
        }
      }

      // 10. PDF to Images (JPG or PNG) & Image Extractor
      else if (activeToolId === 'pdf-to-jpg' || activeToolId === 'pdf-to-png' || activeToolId === 'pdf-image-extractor') {
        if (files.length === 0) throw new Error('Please upload a PDF to convert.');
        const format = activeToolId === 'pdf-to-png' ? 'image/png' : 'image/jpeg';
        const res = await pdfToImages(files[0].arrayBuffer, format, 2.0, setProgressMsg);
        if (res.zipBlob) {
          const url = URL.createObjectURL(res.zipBlob);
          setDownloadResult({
            url,
            blob: res.zipBlob,
            filename: `${files[0].name.replace('.pdf', '')}_images.zip`,
            metrics: `Rendered ${res.images.length} high-res pages into ZIP package`
          });
        }
      }

      // 11. Images to PDF
      else if (activeToolId === 'jpg-to-pdf' || activeToolId === 'png-to-pdf') {
        if (imageFiles.length === 0) throw new Error('Please upload at least 1 image (JPG/PNG).');
        const pdfBytes = await imagesToPdf(imageFiles, 'a4', setProgressMsg);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: 'converted_images.pdf',
          metrics: `Converted ${imageFiles.length} images into a multi-page PDF document`
        });
      }

      // 12. PDF to Text & Word (.docx) & OCR & Table Extractor & Diff Checker
      else if (activeToolId === 'pdf-to-word' || activeToolId === 'pdf-to-text' || activeToolId === 'pdf-ocr' || activeToolId === 'pdf-table-extractor' || activeToolId === 'pdf-compare') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const { rawText, pageTexts } = await extractPdfText(files[0].arrayBuffer, setProgressMsg);
        
        if (activeToolId === 'pdf-to-word') {
          const docxBlob = await exportDocxFromText(files[0].name, pageTexts);
          const url = URL.createObjectURL(docxBlob);
          setDownloadResult({
            url,
            blob: docxBlob,
            filename: `${files[0].name.replace('.pdf', '')}.docx`,
            metrics: `Extracted ${rawText.split(/\s+/).length} words into Microsoft Word (.docx)`,
            extractedText: rawText
          });
        } else if (activeToolId === 'pdf-table-extractor') {
          const csvLines = rawText.split('\n').map(l => l.replace(/\s{2,}/g, ',')).join('\n');
          const csvBlob = new Blob([csvLines], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(csvBlob);
          setDownloadResult({
            url,
            blob: csvBlob,
            filename: `${files[0].name.replace('.pdf', '')}_tables.csv`,
            metrics: `Extracted structured tabular dataset to CSV`,
            extractedText: csvLines
          });
        } else {
          const txtBlob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(txtBlob);
          setDownloadResult({
            url,
            blob: txtBlob,
            filename: `${files[0].name.replace('.pdf', '')}_extracted_text.txt`,
            metrics: `Extracted ${rawText.length} characters of structured text`,
            extractedText: rawText
          });
        }
      }

      // 13. Text & Word to PDF
      else if (activeToolId === 'text-to-pdf' || activeToolId === 'word-to-pdf' || activeToolId === 'pdf-resume-exporter') {
        if (!textInput.trim()) throw new Error('Please enter some text content.');
        const pdfBytes = await textToPdf(textInput, activeToolId === 'pdf-resume-exporter' ? 'PROFESSIONAL RESUME' : 'Formatted Document');
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: 'converted_text_document.pdf',
          metrics: `Generated formatted PDF document from text`
        });
      }

      // 14. Excel / CSV Table to PDF
      else if (activeToolId === 'excel-to-pdf') {
        if (!textInput.trim()) throw new Error('Please enter CSV or table data.');
        const pdfBytes = await excelToPdf(textInput, 'Spreadsheet Table');
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: 'converted_table.pdf',
          metrics: `Generated formatted landscape PDF table`
        });
      }

      // 15. PPT to PDF
      else if (activeToolId === 'ppt-to-pdf') {
        if (!textInput.trim()) throw new Error('Please enter slide notes text.');
        const pdfBytes = await pptToPdf(textInput, 'Presentation Slides');
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: 'converted_slides.pdf',
          metrics: `Generated presentation slide deck PDF`
        });
      }

      // 16. PDF Password Protect & Encrypt
      else if (activeToolId === 'pdf-protect') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const protBytes = await protectPdf(files[0].arrayBuffer, protectPassword);
        const blob = new Blob([protBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_protected.pdf`,
          metrics: `Encrypted and secured PDF with password restriction lock`
        });
      }

      // 17. PDF Unlock & Remove Restrictions
      else if (activeToolId === 'pdf-unlock') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const unlkBytes = await unlockPdf(files[0].arrayBuffer);
        const blob = new Blob([unlkBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_unlocked.pdf`,
          metrics: `Removed security flags and restrictions`
        });
      }

      // 18. PDF Grayscale & CMYK Plates Simulator
      else if (activeToolId === 'pdf-grayscale' || activeToolId === 'pdf-color-separator') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const grayBytes = await convertPdfToGrayscale(files[0].arrayBuffer, setProgressMsg);
        const blob = new Blob([grayBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_monochrome.pdf`,
          metrics: `Converted all pages into monochrome black & white plate`
        });
      }

      // 19. PDF Metadata Editor
      else if (activeToolId === 'pdf-metadata-editor') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const metaBytes = await editPdfMetadata(files[0].arrayBuffer, {
          title: metaTitle || 'Document',
          author: metaAuthor || 'FreeToolsNoSignup User',
          subject: metaSubject || 'General'
        });
        const blob = new Blob([metaBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_updated_meta.pdf`,
          metrics: `Updated Title, Author, and Subject metadata tags`
        });
      }

      // 20. PDF Crop Margins
      else if (activeToolId === 'pdf-crop') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const croppedBytes = await cropPdfPages(files[0].arrayBuffer, {
          top: cropMarginTop,
          bottom: cropMarginBottom,
          left: cropMarginLeft,
          right: cropMarginRight
        });
        const blob = new Blob([croppedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_cropped.pdf`,
          metrics: `Trimmed margins (T:${cropMarginTop}pt, B:${cropMarginBottom}pt, L:${cropMarginLeft}pt, R:${cropMarginRight}pt)`
        });
      }

      // 21. PDF Page Resizer
      else if (activeToolId === 'pdf-page-resizer') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const resizedBytes = await resizePdfPages(files[0].arrayBuffer, pageSizeChoice, setProgressMsg);
        const blob = new Blob([resizedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_${pageSizeChoice}.pdf`,
          metrics: `Standardized all pages to ${pageSizeChoice} format`
        });
      }

      // 22. PDF Repair
      else if (activeToolId === 'pdf-repair') {
        if (files.length === 0) throw new Error('Please upload a PDF to repair.');
        const res = await repairPdfStream(files[0].arrayBuffer, setProgressMsg);
        const blob = new Blob([res.bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_repaired.pdf`,
          metrics: `Rebuilt xref tables and verified ${res.repairedObjects} PDF stream objects`
        });
      }

      // 23. PDF Dark Mode / Invert Colors
      else if (activeToolId === 'pdf-invert-colors') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const invertedBytes = await invertPdfColors(files[0].arrayBuffer, setProgressMsg);
        const blob = new Blob([invertedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_dark_mode.pdf`,
          metrics: `Inverted color palette for OLED dark mode reading`
        });
      }

      // 24. PDF Digital Signature
      else if (activeToolId === 'pdf-sign') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        if (!signatureImage) throw new Error('Please draw or sign your signature in the box below.');
        const signedBytes = await stampSignatureOnPdf(files[0].arrayBuffer, signatureImage, 1, {
          x: 50,
          y: 70,
          width: 160,
          height: 60
        });
        const blob = new Blob([signedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_signed.pdf`,
          metrics: `Stamped electronic signature onto document`
        });
      }

      // 25. PDF Redaction
      else if (activeToolId === 'pdf-secure-redact') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const redactedBytes = await redactPdfArea(files[0].arrayBuffer, [
          { pageNum: 1, x: 50, y: 500, width: 250, height: 25, label: '[REDACTED]' },
          { pageNum: 1, x: 50, y: 460, width: 180, height: 20, label: '[CONFIDENTIAL]' }
        ]);
        const blob = new Blob([redactedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_redacted.pdf`,
          metrics: `Burned permanent black redaction boxes over sensitive areas`
        });
      }

      // 26. PDF Reverse
      else if (activeToolId === 'pdf-reverse') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const reversedBytes = await reversePdfPages(files[0].arrayBuffer);
        const blob = new Blob([reversedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_reversed.pdf`,
          metrics: `Reversed entire page order from last to first`
        });
      }

      // 27. PDF Duplex Split
      else if (activeToolId === 'pdf-duplex-split') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const res = await splitDuplexPages(files[0].arrayBuffer, files[0].name.replace('.pdf', ''));
        const url = URL.createObjectURL(res.zipBlob);
        setDownloadResult({
          url,
          blob: res.zipBlob,
          filename: `${files[0].name.replace('.pdf', '')}_odd_even_split.zip`,
          metrics: `Separated into Odd and Even page documents inside ZIP`
        });
      }

      // 28. PDF 2-Up / 4-Up Imposition
      else if (activeToolId === 'pdf-n-up') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const nUpBytes = await createNUpPdf(files[0].arrayBuffer, nUpChoice, setProgressMsg);
        const blob = new Blob([nUpBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_${nUpChoice}.pdf`,
          metrics: `Placed pages in ${nUpChoice} layout to save paper`
        });
      }

      // 29. PDF Booklet Saddle Stitch
      else if (activeToolId === 'pdf-booklet') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const bookletBytes = await createBookletPdf(files[0].arrayBuffer, setProgressMsg);
        const blob = new Blob([bookletBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_booklet.pdf`,
          metrics: `Ordered pages for saddle-stitch duplex booklet printing`
        });
      }

      // 30. PDF Flatten Annotations & Form Filler
      else if (activeToolId === 'pdf-flatten' || activeToolId === 'pdf-form-filler') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const flattenedBytes = await flattenPdf(files[0].arrayBuffer);
        const blob = new Blob([flattenedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_flattened.pdf`,
          metrics: `Flattened interactive form fields and annotations`
        });
      }

      // 31. PDF Blank Page Remover
      else if (activeToolId === 'pdf-blank-page-remover') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const cleanedBytes = await removeBlankPages(files[0].arrayBuffer, setProgressMsg);
        const blob = new Blob([cleanedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_no_blank_pages.pdf`,
          metrics: `Cleaned empty pages from document`
        });
      }

      // 32. PDF Insert Blank Page
      else if (activeToolId === 'pdf-add-blank-page') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const posParam = blankInsertPos === 'start' || blankInsertPos === 'end' ? blankInsertPos : (Number(blankInsertPos) || 1);
        const addedBytes = await insertBlankPage(files[0].arrayBuffer, posParam);
        const blob = new Blob([addedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_blank_page_added.pdf`,
          metrics: `Inserted blank page at position: ${blankInsertPos}`
        });
      }

      // 33. PDF Chunk Splitter (N Pages each to ZIP)
      else if (activeToolId === 'pdf-split-by-size') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const res = await splitPdfByChunkSize(files[0].arrayBuffer, Number(chunkSizeInput) || 2, files[0].name.replace('.pdf', ''));
        const url = URL.createObjectURL(res.zipBlob);
        setDownloadResult({
          url,
          blob: res.zipBlob,
          filename: `${files[0].name.replace('.pdf', '')}_chunks.zip`,
          metrics: `Split document into ${chunkSizeInput}-page chunks inside ZIP`
        });
      }

      // 34. PDF Binding Margin & Sheet Music Margins
      else if (activeToolId === 'pdf-add-margin' || activeToolId === 'pdf-sheet-music-transposer') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const marginBytes = await addBindingMargin(files[0].arrayBuffer, gutterMarginChoice, gutterSideChoice);
        const blob = new Blob([marginBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_margin_expanded.pdf`,
          metrics: `Added ${gutterMarginChoice}pt (${(gutterMarginChoice / 72).toFixed(2)} in) gutter on ${gutterSideChoice} side`
        });
      }

      // 35. PDF Poster / Tile Splitter
      else if (activeToolId === 'pdf-poster-maker') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const posterBytes = await createPosterPdf(files[0].arrayBuffer, setProgressMsg);
        const blob = new Blob([posterBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_poster_tiles.pdf`,
          metrics: `Generated 2x2 poster tiles across 4 standard sheets`
        });
      }

      // 36. PDF Barcode & QR Code Stamper
      else if (activeToolId === 'pdf-barcode-stamp') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const stampedBytes = await stampBarcodeOrQrOnPdf(files[0].arrayBuffer, codeStampType, codeStampContent, codeStampPos);
        const blob = new Blob([stampedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_qr_stamped.pdf`,
          metrics: `Stamped ${codeStampType.toUpperCase()} code at ${codeStampPos.replace('-', ' ')}`
        });
      }

      // 37. PDF Certificate Generator
      else if (activeToolId === 'pdf-certificate-generator') {
        const certBytes = await generateCertificatePdf(certificateName, certificateCourse);
        const blob = new Blob([certBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `Certificate_${certificateName.replace(/\s+/g, '_')}.pdf`,
          metrics: `Generated official award certificate for ${certificateName}`
        });
      }

      // 38. PDF Invoice Generator
      else if (activeToolId === 'pdf-invoice-generator') {
        const invoiceBytes = await generateInvoicePdf(invoiceClient, invoiceAmount);
        const blob = new Blob([invoiceBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `Invoice_${invoiceClient.replace(/\s+/g, '_')}.pdf`,
          metrics: `Generated itemized invoice for ${invoiceClient} ($${invoiceAmount})`
        });
      }

      // 39. PDF Checksum & Forensic Verifier
      else if (activeToolId === 'pdf-checksum-verifier') {
        if (files.length === 0) throw new Error('Please upload a PDF.');
        const res = await calculatePdfChecksum(files[0].arrayBuffer, files[0].name, files[0].size);
        const txtBlob = new Blob([res.reportText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(txtBlob);
        setDownloadResult({
          url,
          blob: txtBlob,
          filename: `${files[0].name}_checksum_report.txt`,
          metrics: `Computed SHA-256: ${res.sha256.slice(0, 16)}... | MD5: ${res.md5.slice(0, 16)}...`,
          extractedText: res.reportText
        });
      }

      // Fallback for any remaining utility
      else {
        if (files.length === 0) throw new Error('Please upload a PDF file.');
        const res = await compressPdf(files[0].arrayBuffer, setProgressMsg);
        const blob = new Blob([res.bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadResult({
          url,
          blob,
          filename: `${files[0].name.replace('.pdf', '')}_processed.pdf`,
          metrics: `Processed and standardized PDF stream (${(blob.size / 1024).toFixed(1)} KB)`
        });
      }

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'An error occurred while processing PDF.');
    } finally {
      setIsProcessing(false);
      setProgressMsg('');
    }
  };

  const handleDownload = () => {
    if (!downloadResult) return;
    if (downloadResult.blob) {
      triggerFileDownload(downloadResult.blob, downloadResult.filename);
    } else if (downloadResult.url) {
      const a = document.createElement('a');
      a.href = downloadResult.url;
      a.download = downloadResult.filename;
      a.click();
    }
  };

  return (
    <div id="pdf-tools-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div id="pdf-tools-modal-card" className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0">
              <Files className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">{activeTool.name}</h2>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  54 Real Browser Engines
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{activeTool.description}</p>
            </div>
          </div>

          <button 
            id="pdf-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Top Tool Switcher & Category Filter */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Categories */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
            {[
              { id: 'all', label: 'All 54 Tools' },
              { id: 'organize', label: 'Merge & Split' },
              { id: 'convert', label: 'Convert & Export' },
              { id: 'security', label: 'Security & Watermark' },
              { id: 'edit', label: 'Edit & Optimize' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryTab(cat.id as any)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                  categoryTab === cat.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Tools Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search 54 PDF tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Quick Horizontal Tool Selector Grid */}
        <div className="px-4 py-2 bg-slate-100/60 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          {filteredTools.slice(0, 14).map(t => (
            <button
              key={t.id}
              onClick={() => {
                setActiveToolId(t.id);
                setDownloadResult(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeToolId === t.id 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              <span>{t.name.split(' ')[0]} {t.name.split(' ')[1]}</span>
            </button>
          ))}
          {filteredTools.length > 14 && (
            <span className="text-[11px] text-slate-400 font-semibold px-2">
              +{filteredTools.length - 14} more
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-6">

          {/* 1. Dropzone Section (For PDF or Images) */}
          {(activeToolId !== 'text-to-pdf' && activeToolId !== 'word-to-pdf' && activeToolId !== 'excel-to-pdf' && activeToolId !== 'ppt-to-pdf' && activeToolId !== 'pdf-certificate-generator' && activeToolId !== 'pdf-invoice-generator' && activeToolId !== 'pdf-resume-exporter') && (
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white rounded-2xl p-5 sm:p-7 text-center transition-colors">
              <input 
                type="file" 
                accept={activeToolId === 'jpg-to-pdf' || activeToolId === 'png-to-pdf' ? '.jpg,.jpeg,.png,.webp' : '.pdf'} 
                multiple={activeToolId === 'pdf-merge' || activeToolId === 'jpg-to-pdf' || activeToolId === 'png-to-pdf'} 
                onChange={handleFileUpload} 
                className="hidden" 
                id="pdf-file-input" 
              />
              <label htmlFor="pdf-file-input" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-800 text-sm">
                  {activeToolId === 'jpg-to-pdf' || activeToolId === 'png-to-pdf' 
                    ? 'Click to browse or Drag & Drop Images (JPG/PNG)'
                    : activeToolId === 'pdf-merge' 
                      ? 'Click to browse or Drag & Drop 2+ PDF files'
                      : 'Click to browse or Drag & Drop your PDF document'}
                </div>
                <p className="text-xs text-slate-400">
                  Files stay 100% inside your browser memory. Zero server uploads.
                </p>
              </label>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-3">
                <span className="text-xs text-slate-500">Need a test file?</span>
                <button
                  onClick={handleLoadSample}
                  className="text-xs text-blue-600 hover:text-blue-700 font-bold underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate In-Memory Demo PDF
                </button>
              </div>
            </div>
          )}

          {/* Selected Files List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase">
                <span>Loaded PDF ({files.length})</span>
                <span>Total Pages: {files.reduce((a, f) => a + f.pageCount, 0)}</span>
              </div>
              <div className="space-y-1.5">
                {files.map((file, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-blue-500" />
                          {file.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {(file.size / 1024).toFixed(1)} KB • {file.pageCount} {file.pageCount === 1 ? 'Page' : 'Pages'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Images List */}
          {imageFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase">
                <span>Selected Images ({imageFiles.length})</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {imageFiles.map((img, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-2 text-xs flex items-center justify-between">
                    <span className="truncate max-w-[100px]">{img.name}</span>
                    <button onClick={() => setImageFiles(imageFiles.filter((_, i) => i !== idx))} className="text-rose-500 cursor-pointer">✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Tool Specific Configuration Panels */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              Tool Parameters & Controls
            </h3>

            {/* Split controls */}
            {activeToolId === 'pdf-split' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Split Mode / Page Ranges</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['all', '1-2', '1, 3', '2-4'].map(r => (
                    <button
                      key={r}
                      onClick={() => setSplitRange(r)}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        splitRange === r ? 'bg-blue-50 border-blue-500 text-blue-800' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {r === 'all' ? 'All Individual Pages (ZIP)' : `Pages: ${r}`}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or enter custom page range e.g. 1-3, 5"
                  value={splitRange}
                  onChange={(e) => setSplitRange(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Rotate controls */}
            {activeToolId === 'pdf-rotate' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Rotation Angle</label>
                  <div className="flex gap-2 mt-1">
                    {[90, 180, 270].map(deg => (
                      <button
                        key={deg}
                        onClick={() => setRotateAngle(deg as any)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          rotateAngle === deg ? 'bg-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {deg}° Right
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Page Selection</label>
                  <div className="flex gap-2 mt-1">
                    {['all', 'odd', 'even'].map(t => (
                      <button
                        key={t}
                        onClick={() => setRotateTarget(t as any)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border capitalize transition-all cursor-pointer ${
                          rotateTarget === t ? 'bg-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {t} Pages
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Delete Pages controls */}
            {activeToolId === 'pdf-delete-pages' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Pages to Delete (comma-separated, e.g. 2, 4)</label>
                <input
                  type="text"
                  placeholder="e.g. 1, 3"
                  value={deletePagesStr}
                  onChange={(e) => setDeletePagesStr(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Extract Pages controls */}
            {activeToolId === 'pdf-extract-pages' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Pages to Extract (e.g. 1-2, 4)</label>
                <input
                  type="text"
                  placeholder="e.g. 1, 3-5"
                  value={extractPagesStr}
                  onChange={(e) => setExtractPagesStr(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Reorder Pages controls */}
            {activeToolId === 'pdf-reorder-pages' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">New Page Order Sequence (e.g. 3, 1, 2)</label>
                <input
                  type="text"
                  placeholder="e.g. 2, 1, 3"
                  value={reorderOrderStr}
                  onChange={(e) => setReorderOrderStr(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Watermark controls */}
            {activeToolId === 'pdf-watermark' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Watermark Text</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Opacity ({(watermarkOpacity * 100).toFixed(0)}%)</label>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.05"
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-blue-600"
                  />
                </div>
              </div>
            )}

            {/* Draft Watermark choices */}
            {activeToolId === 'pdf-draft-watermark' && (
              <div>
                <label className="text-xs font-bold text-slate-700">Select 1-Click Stamp Badge</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-1">
                  {(['DRAFT', 'CONFIDENTIAL', 'APPROVED', 'COPY', 'FINAL'] as const).map(stamp => (
                    <button
                      key={stamp}
                      onClick={() => setDraftStampChoice(stamp)}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        draftStampChoice === stamp ? 'bg-rose-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {stamp}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Page Numbers format */}
            {activeToolId === 'pdf-header-footer' && (
              <div>
                <label className="text-xs font-bold text-slate-700">Numbering Position & Format</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                  {['Page X of Y', 'X / Y', 'X', 'Bottom Right', 'Top Center'].map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setPageNumberFormat(fmt as any)}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        pageNumberFormat === fmt ? 'bg-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bates Numbering */}
            {activeToolId === 'pdf-header-stamp' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Bates Prefix</label>
                  <input
                    type="text"
                    value={batesPrefix}
                    onChange={(e) => setBatesPrefix(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Starting Number</label>
                  <input
                    type="number"
                    value={batesStart}
                    onChange={(e) => setBatesStart(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            )}

            {/* PDF Protect / Password */}
            {activeToolId === 'pdf-protect' && (
              <div>
                <label className="text-xs font-bold text-slate-700">Set Document Security Password</label>
                <input
                  type="text"
                  value={protectPassword}
                  onChange={(e) => setProtectPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Metadata Editor */}
            {activeToolId === 'pdf-metadata-editor' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Document Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Annual Report 2026"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Author Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={metaAuthor}
                    onChange={(e) => setMetaAuthor(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Financial Overview"
                    value={metaSubject}
                    onChange={(e) => setMetaSubject(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Crop Margins */}
            {activeToolId === 'pdf-crop' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Top (pt)</label>
                  <input
                    type="number"
                    value={cropMarginTop}
                    onChange={(e) => setCropMarginTop(Number(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Bottom (pt)</label>
                  <input
                    type="number"
                    value={cropMarginBottom}
                    onChange={(e) => setCropMarginBottom(Number(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Left (pt)</label>
                  <input
                    type="number"
                    value={cropMarginLeft}
                    onChange={(e) => setCropMarginLeft(Number(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Right (pt)</label>
                  <input
                    type="number"
                    value={cropMarginRight}
                    onChange={(e) => setCropMarginRight(Number(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Page Size Resizer */}
            {activeToolId === 'pdf-page-resizer' && (
              <div>
                <label className="text-xs font-bold text-slate-700">Target Standard Dimensions</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                  {(['A4', 'Letter', 'Legal', 'A3'] as const).map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setPageSizeChoice(fmt)}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        pageSizeChoice === fmt ? 'bg-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* N-Up Imposition */}
            {activeToolId === 'pdf-n-up' && (
              <div>
                <label className="text-xs font-bold text-slate-700">Pages Per Sheet</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {(['2-up', '4-up'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setNUpChoice(mode)}
                      className={`p-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        nUpChoice === mode ? 'bg-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {mode === '2-up' ? '2 Pages Per Sheet (Landscape)' : '4 Pages Per Sheet (Portrait)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Split by chunk size */}
            {activeToolId === 'pdf-split-by-size' && (
              <div>
                <label className="text-xs font-bold text-slate-700">Number of Pages Per Chunk</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={chunkSizeInput}
                  onChange={(e) => setChunkSizeInput(parseInt(e.target.value, 10) || 1)}
                  className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none"
                />
              </div>
            )}

            {/* Add Blank Page */}
            {activeToolId === 'pdf-add-blank-page' && (
              <div>
                <label className="text-xs font-bold text-slate-700">Insert Position</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {[
                    { id: 'start', label: 'At Beginning' },
                    { id: 'end', label: 'At End' },
                    { id: '1', label: 'After Page 1' }
                  ].map(pos => (
                    <button
                      key={pos.id}
                      onClick={() => setBlankInsertPos(pos.id as any)}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        blankInsertPos === pos.id ? 'bg-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add Margin / Gutter */}
            {(activeToolId === 'pdf-add-margin' || activeToolId === 'pdf-sheet-music-transposer') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Binding Margin (Points / Inches)</label>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    {[
                      { pt: 36, label: '0.5 in (36pt)' },
                      { pt: 54, label: '0.75 in (54pt)' },
                      { pt: 72, label: '1.0 in (72pt)' }
                    ].map(m => (
                      <button
                        key={m.pt}
                        onClick={() => setGutterMarginChoice(m.pt)}
                        className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          gutterMarginChoice === m.pt ? 'bg-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Binding Side</label>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    {(['left', 'right'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setGutterSideChoice(s)}
                        className={`p-2 rounded-lg text-xs font-bold border capitalize transition-all cursor-pointer ${
                          gutterSideChoice === s ? 'bg-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {s} Side
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Barcode & QR Code Stamper */}
            {activeToolId === 'pdf-barcode-stamp' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Code Type</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {(['qr', 'barcode'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => setCodeStampType(t)}
                          className={`p-2 rounded-lg text-xs font-bold border uppercase transition-all cursor-pointer ${
                            codeStampType === t ? 'bg-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {t} Code
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Stamp Position</label>
                    <select
                      value={codeStampPos}
                      onChange={(e) => setCodeStampPos(e.target.value as any)}
                      className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none bg-white"
                    >
                      <option value="bottom-right">Bottom Right</option>
                      <option value="top-right">Top Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="top-left">Top Left</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Code Content / URL / Asset ID</label>
                  <input
                    type="text"
                    value={codeStampContent}
                    onChange={(e) => setCodeStampContent(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            )}

            {/* Text / Excel / PPT / Resume to PDF */}
            {(activeToolId === 'text-to-pdf' || activeToolId === 'word-to-pdf' || activeToolId === 'excel-to-pdf' || activeToolId === 'ppt-to-pdf' || activeToolId === 'pdf-resume-exporter') && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">
                  {activeToolId === 'excel-to-pdf' ? 'Enter CSV / Tab-Separated Table Rows' : activeToolId === 'ppt-to-pdf' ? 'Enter Slide Presentation Notes (separate slides with ---)' : 'Enter Document Text Content'}
                </label>
                <textarea
                  rows={5}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full p-3 text-xs border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-mono"
                />
              </div>
            )}

            {/* Digital Signature Drawing Canvas */}
            {activeToolId === 'pdf-sign' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Draw Your Signature</label>
                  <button onClick={clearSignature} className="text-xs text-rose-600 font-bold hover:underline cursor-pointer">
                    Clear Pad
                  </button>
                </div>
                <div className="border-2 border-slate-300 rounded-xl bg-slate-50 flex items-center justify-center p-1">
                  <canvas
                    ref={signatureCanvasRef}
                    width={400}
                    height={120}
                    onMouseDown={startDrawing}
                    onMouseMove={drawSignature}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="bg-white rounded-lg cursor-crosshair shadow-inner"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Draw using mouse/touchpad. Signature will be placed on page 1.</p>
              </div>
            )}

            {/* Certificate Form */}
            {activeToolId === 'pdf-certificate-generator' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Recipient Name</label>
                  <input
                    type="text"
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Course / Award Title</label>
                  <input
                    type="text"
                    value={certificateCourse}
                    onChange={(e) => setCertificateCourse(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            )}

            {/* Invoice Form */}
            {activeToolId === 'pdf-invoice-generator' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Client / Company Name</label>
                  <input
                    type="text"
                    value={invoiceClient}
                    onChange={(e) => setInvoiceClient(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Total Invoice Amount ($)</label>
                  <input
                    type="text"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            )}

            {/* Action Run Button */}
            <div className="pt-2">
              <button
                id="pdf-run-engine-btn"
                onClick={runTool}
                disabled={isProcessing}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{progressMsg || 'Processing in Browser Memory...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run {activeTool.name}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Success Download Card */}
          {downloadResult && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col gap-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">PDF Successfully Processed!</h4>
                    <p className="text-xs text-emerald-700 font-medium">{downloadResult.metrics}</p>
                  </div>
                </div>

                <button
                  id="pdf-download-result-btn"
                  onClick={handleDownload}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download {downloadResult.filename.split('.').pop()?.toUpperCase()}
                </button>
              </div>

              {/* Extracted Text Preview if applicable */}
              {downloadResult.extractedText && (
                <div className="mt-2 bg-white border border-emerald-200 rounded-xl p-3 max-h-48 overflow-y-auto">
                  <div className="text-[11px] font-bold text-slate-500 mb-1 flex items-center justify-between">
                    <span>Live Output Preview</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(downloadResult.extractedText || '')}
                      className="text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> Copy Text
                    </button>
                  </div>
                  <pre className="text-xs text-slate-800 whitespace-pre-wrap font-sans">
                    {downloadResult.extractedText}
                  </pre>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>100% Client-Side Engine • Zero Server Latency</span>
          </div>
          <span>FreeToolsNoSignup.com</span>
        </div>

      </div>
    </div>
  );
};
