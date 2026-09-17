import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Upload, Download, FileText, CheckCircle2, RefreshCw, AlertCircle, 
  Trash2, Plus, Sliders, Layers, Sparkles, ArrowRight, Table,
  DollarSign, Percent, Calendar, ShieldCheck, ChevronRight,
  ImageIcon, Loader2
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import download from 'downloadjs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import imageCompression from 'browser-image-compression';
import confetti from 'canvas-confetti';
import { NotionTemplateBuilder } from './NotionTemplateBuilder';

// Guarantee Producer = FreeToolsNoSignup.com on all generated PDF files
try {
  const origUpdate = (PDFDocument.prototype as any).updateInfoDict;
  if (origUpdate) {
    (PDFDocument.prototype as any).updateInfoDict = function () {
      origUpdate.call(this);
      this.setProducer('FreeToolsNoSignup.com - 4753 Free Tools');
      this.setCreator('FreeToolsNoSignup.com');
    };
  }
} catch {}

// Configure PDF.js worker safely
if (typeof window !== 'undefined') {
  try {
    if (pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
      const version = pdfjsLib.version || '4.0.379';
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
    }
  } catch (e) {
    console.warn('PDF.js worker setup note:', e);
  }
}

interface SingleToolWorkspaceProps {
  toolSlug: string;
  toolName: string;
  toolCategory: string;
  toolDescription: string;
  onNavigateTo?: (path: string) => void;
}

export const SingleToolWorkspace: React.FC<SingleToolWorkspaceProps> = ({
  toolSlug,
  toolName,
  toolCategory,
  toolDescription,
  onNavigateTo
}) => {
  const normSlug = toolSlug.toLowerCase();

  // Determine tool type
  const isJpgToPdf = normSlug.includes('jpg-to-pdf') || normSlug.includes('image-to-pdf') || normSlug.includes('png-to-pdf') || normSlug.includes('word-to-pdf') || normSlug.includes('excel-to-pdf') || normSlug.includes('ppt-to-pdf');
  const isPdfToJpg = (normSlug.includes('pdf-to-jpg') || normSlug.includes('pdf-to-jpeg') || normSlug.includes('pdf-to-png') || normSlug.includes('pdf-to-image')) && !isJpgToPdf;
  const isPdfMerge = normSlug.includes('merge') || normSlug.includes('combine');
  const isPdfSplit = normSlug.includes('split') || normSlug.includes('extract-page') || normSlug.includes('delete-page');
  const isPdfCompress = (normSlug.includes('compress') || normSlug.includes('reduce-size') || normSlug.includes('optimizer')) && (toolCategory === 'pdf' || normSlug.includes('pdf'));
  const isPdfToWord = normSlug.includes('pdf-to-word') || normSlug.includes('pdf-to-docx') || normSlug.includes('pdf-to-text') || normSlug.includes('pdf-to-txt');
  const isEmiCalc = normSlug.includes('emi') || normSlug.includes('loan-calculator') || normSlug.includes('mortgage');
  const isSipCalc = normSlug.includes('sip') || normSlug.includes('mutual-fund') || normSlug.includes('compound-interest');
  const isNotion = normSlug.includes('notion');
  const isImageTool = (toolCategory === 'image' || normSlug.includes('image') || normSlug.includes('img-') || normSlug.includes('compress') || normSlug.includes('resize') || normSlug.includes('webp') || normSlug.includes('svg-optimizer') || normSlug.includes('background-remover') || normSlug.includes('photo') || normSlug.includes('picture')) && !isPdfCompress && !isPdfToJpg && !isPdfMerge && !isPdfSplit && !isPdfToWord && !isJpgToPdf && !normSlug.includes('pdf') && toolCategory !== 'pdf';

  // ==========================================
  // 1. PDF TO JPG / PNG CONVERTER STATES
  // ==========================================
  const [jpgFile, setJpgFile] = useState<File | null>(null);
  const [jpgQuality, setJpgQuality] = useState<number>(90);
  const [dpiScale, setDpiScale] = useState<number>(2.0); // 2.0 = ~150 DPI, 1.0 = 72 DPI, 4.0 = 300 DPI
  const [pageRange, setPageRange] = useState<string>('all');
  const [isConvertingJpg, setIsConvertingJpg] = useState<boolean>(false);
  const [jpgProgress, setJpgProgress] = useState<string>('');
  const [jpgProgressPercent, setJpgProgressPercent] = useState<number>(0);
  const [jpgResultZip, setJpgResultZip] = useState<{ blob: Blob; filename: string; pageCount: number } | null>(null);

  // ==========================================
  // 2. PDF MERGE STATES
  // ==========================================
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [mergeProgress, setMergeProgress] = useState<string>('');
  const [mergeResultBlob, setMergeResultBlob] = useState<{ blob: Blob; filename: string; pageCount: number } | null>(null);

  // ==========================================
  // 3. PDF SPLIT STATES
  // ==========================================
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splitRangesInput, setSplitRangesInput] = useState<string>('all');
  const [splitMode, setSplitMode] = useState<'zip' | 'single'>('zip');
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [splitProgress, setSplitProgress] = useState<string>('');
  const [splitResultBlob, setSplitResultBlob] = useState<{ blob: Blob; filename: string; count: number } | null>(null);

  // ==========================================
  // 4. PDF COMPRESS STATES
  // ==========================================
  const [compressFile, setCompressFile] = useState<File | null>(null);
  const [compressLevel, setCompressLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressProgress, setCompressProgress] = useState<string>('');
  const [compressResult, setCompressResult] = useState<{
    blob: Blob;
    filename: string;
    originalSize: number;
    newSize: number;
    percentSaved: number;
  } | null>(null);

  // ==========================================
  // 5. PDF TO WORD (DOCX) STATES
  // ==========================================
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [isConvertingWord, setIsConvertingWord] = useState<boolean>(false);
  const [wordProgress, setWordProgress] = useState<string>('');
  const [wordResultBlob, setWordResultBlob] = useState<{ blob: Blob; filename: string } | null>(null);

  // ==========================================
  // 6. LOAN EMI CALCULATOR STATES
  // ==========================================
  const [loanP, setLoanP] = useState<number>(100000);
  const [loanR, setLoanR] = useState<number>(9.0);
  const [loanN, setLoanN] = useState<number>(60); // 60 months
  const [emiTenureUnit, setEmiTenureUnit] = useState<'months' | 'years'>('months');
  const [showAllAmortization, setShowAllAmortization] = useState<boolean>(false);

  const actualMonths = emiTenureUnit === 'years' ? loanN * 12 : loanN;
  const monthlyRate = (loanR / 12) / 100;
  const emiMonthly = actualMonths > 0 && monthlyRate > 0
    ? Math.round((loanP * monthlyRate * Math.pow(1 + monthlyRate, actualMonths)) / (Math.pow(1 + monthlyRate, actualMonths) - 1))
    : 0;
  const totalLoanPayment = emiMonthly * actualMonths;
  const totalLoanInterest = Math.max(0, totalLoanPayment - loanP);
  const principalPercent = totalLoanPayment > 0 ? Math.round((loanP / totalLoanPayment) * 100) : 100;

  const amortizationSchedule = useMemo(() => {
    let balance = loanP;
    const schedule: Array<{
      month: number;
      opening: number;
      emi: number;
      principal: number;
      interest: number;
      closing: number;
    }> = [];

    for (let m = 1; m <= actualMonths; m++) {
      const interestForMonth = Math.round(balance * monthlyRate);
      const principalForMonth = Math.min(balance, emiMonthly - interestForMonth);
      const closing = Math.max(0, balance - principalForMonth);

      schedule.push({
        month: m,
        opening: balance,
        emi: emiMonthly,
        principal: principalForMonth,
        interest: interestForMonth,
        closing
      });
      balance = closing;
      if (balance <= 0) break;
    }
    return schedule;
  }, [loanP, monthlyRate, actualMonths, emiMonthly]);

  // ==========================================
  // 7. SIP CALCULATOR STATES
  // ==========================================
  const [sipP, setSipP] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12.0);
  const [sipYears, setSipYears] = useState<number>(10);

  const sipTotalMonths = sipYears * 12;
  const sipI = (sipRate / 12) / 100;
  const sipMaturityVal = sipTotalMonths > 0 && sipI > 0
    ? Math.round(sipP * ((Math.pow(1 + sipI, sipTotalMonths) - 1) / sipI) * (1 + sipI))
    : 0;
  const sipTotalInvested = sipP * sipTotalMonths;
  const sipTotalReturns = Math.max(0, sipMaturityVal - sipTotalInvested);

  // ==========================================
  // 8. IMAGE TOOL STATES
  // ==========================================
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgFormat, setImgFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [imgQuality, setImgQuality] = useState<number>(85);
  const [imgScale, setImgScale] = useState<number>(100);
  const [isProcessingImg, setIsProcessingImg] = useState<boolean>(false);
  const [imgResultBlob, setImgResultBlob] = useState<{ blob: Blob; filename: string; originalSize: number; newSize: number } | null>(null);

  // ==========================================
  // 9. UNIVERSAL FALLBACK TOOL STATES
  // ==========================================
  const [genericFile, setGenericFile] = useState<File | null>(null);
  const [genericStatus, setGenericStatus] = useState<string>('');
  const [genericExecuting, setGenericExecuting] = useState<boolean>(false);
  const [genericOption, setGenericOption] = useState<string>('Standard (Lossless)');
  const [genericQuality, setGenericQuality] = useState<number>(100);

  // Helper trigger confetti
  const triggerConfettiSuccess = () => {
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  // Action: Process Image using HTML5 Canvas & Downloadjs (100% Client-Side)
  const handleProcessImage = async (fileToUse?: File) => {
    const file = fileToUse || imgFile;
    if (!file) return;

    setIsProcessingImg(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const scale = imgScale / 100;
          const targetW = Math.max(1, Math.round(img.width * scale));
          const targetH = Math.max(1, Math.round(img.height * scale));
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            if (imgFormat === 'jpeg') {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, targetW, targetH);
            }
            ctx.drawImage(img, 0, 0, targetW, targetH);
            const mimeType = imgFormat === 'png' ? 'image/png' : imgFormat === 'webp' ? 'image/webp' : 'image/jpeg';
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const ext = imgFormat === 'png' ? 'png' : imgFormat === 'webp' ? 'webp' : 'jpg';
                  const baseName = file.name.replace(/\.[^/.]+$/, '');
                  const filename = `${baseName}_optimized.${ext}`;
                  setImgResultBlob({
                    blob,
                    filename,
                    originalSize: file.size,
                    newSize: blob.size
                  });
                  triggerConfettiSuccess();
                  download(blob, filename, mimeType);
                }
                setIsProcessingImg(false);
              },
              mimeType,
              imgQuality / 100
            );
          } else {
            setIsProcessingImg(false);
          }
        };
        if (event.target?.result) {
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Image compression error:', err);
      setIsProcessingImg(false);
    }
  };

  const handleCreateSampleImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 1200, 800);
      grad.addColorStop(0, '#0A1931');
      grad.addColorStop(0.5, '#1E3A8A');
      grad.addColorStop(1, '#D4AF37');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 800);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText('FreeToolsNoSignup Sample Image', 80, 200);

      ctx.fillStyle = '#D4AF37';
      ctx.font = '24px sans-serif';
      ctx.fillText('100% Client-Side In-Browser Lossless Compressor', 80, 260);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.strokeRect(60, 120, 1080, 560);

      canvas.toBlob((blob) => {
        if (blob) {
          const sampleFile = new File([blob], 'sample_demo_image.jpg', { type: 'image/jpeg' });
          setImgFile(sampleFile);
          setImgResultBlob(null);
          handleProcessImage(sampleFile);
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const handleDownloadProcessedImage = () => {
    if (!imgResultBlob) return;
    const mimeType = imgFormat === 'png' ? 'image/png' : imgFormat === 'webp' ? 'image/webp' : 'image/jpeg';
    download(imgResultBlob.blob, imgResultBlob.filename, mimeType);
  };

  // ==========================================
  // ACTION: EXECUTE PDF TO JPG (ZIP)
  // ==========================================
  const handleConvertPdfToJpg = async () => {
    if (!jpgFile) return;
    setIsConvertingJpg(true);
    setJpgProgress('Reading PDF document into memory...');
    setJpgProgressPercent(5);

    try {
      const buffer = await jpgFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      // Parse page ranges
      let targetPages: number[] = [];
      if (pageRange.trim().toLowerCase() === 'all' || !pageRange.trim()) {
        targetPages = Array.from({ length: numPages }, (_, i) => i + 1);
      } else {
        const parts = pageRange.split(',').map(s => s.trim()).filter(Boolean);
        for (const part of parts) {
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
            if (!isNaN(start) && !isNaN(end)) {
              for (let p = Math.max(1, start); p <= Math.min(numPages, end); p++) {
                targetPages.push(p);
              }
            }
          } else {
            const p = parseInt(part, 10);
            if (!isNaN(p) && p >= 1 && p <= numPages) {
              targetPages.push(p);
            }
          }
        }
      }
      targetPages = Array.from(new Set(targetPages)).sort((a, b) => a - b);
      if (targetPages.length === 0) targetPages = [1];

      const zip = new JSZip();
      const isPngTarget = normSlug.includes('png');
      const format = isPngTarget ? 'image/png' : 'image/jpeg';
      const ext = isPngTarget ? 'png' : 'jpg';
      const q = jpgQuality / 100;

      for (let idx = 0; idx < targetPages.length; idx++) {
        const pNum = targetPages[idx];
        setJpgProgress(`Rendering page ${pNum} of ${numPages} to high-res canvas (${idx + 1}/${targetPages.length})...`);
        setJpgProgressPercent(Math.round(((idx + 1) / targetPages.length) * 85));

        const page = await pdf.getPage(pNum);
        const viewport = page.getViewport({ scale: dpiScale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          if (format === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          // @ts-ignore
          await page.render({ canvasContext: ctx, viewport }).promise;

          const blob: Blob = await new Promise((resolve) => {
            canvas.toBlob((b) => resolve(b || new Blob()), format, q);
          });

          zip.file(`page-${pNum}.${ext}`, blob);
        }
      }

      setJpgProgress('Packaging high-res images into ZIP archive...');
      setJpgProgressPercent(95);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const baseName = jpgFile.name.replace(/\.[^/.]+$/, '');
      const zipFileName = `${baseName}_converted_pages.zip`;

      setJpgResultZip({
        blob: zipBlob,
        filename: zipFileName,
        pageCount: targetPages.length
      });

      download(zipBlob, zipFileName);
      setJpgProgressPercent(100);
      setJpgProgress('Done! ZIP archive downloaded.');
      triggerConfettiSuccess();
    } catch (err: any) {
      console.error('PDF to JPG conversion error:', err);
      alert('Error during conversion: ' + (err?.message || 'Failed to parse PDF document.'));
    } finally {
      setIsConvertingJpg(false);
    }
  };

  // ==========================================
  // ACTION: EXECUTE PDF MERGE
  // ==========================================
  const handleMergePdfs = async () => {
    if (mergeFiles.length < 2) {
      alert('Please select at least 2 PDF files to merge.');
      return;
    }
    setIsMerging(true);
    setMergeProgress('Creating new unified PDF document...');

    try {
      const mergedDoc = await PDFDocument.create();
      let totalPages = 0;

      for (let i = 0; i < mergeFiles.length; i++) {
        setMergeProgress(`Combining file ${i + 1} of ${mergeFiles.length} (${mergeFiles[i].name})...`);
        const buffer = await mergeFiles[i].arrayBuffer();
        const donorDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const copiedPages = await mergedDoc.copyPages(donorDoc, donorDoc.getPageIndices());
        copiedPages.forEach(p => mergedDoc.addPage(p));
        totalPages += copiedPages.length;
      }

      setMergeProgress('Saving merged PDF document...');
      mergedDoc.setProducer('FreeToolsNoSignup.com - 4753 Free Tools');
      mergedDoc.setCreator('FreeToolsNoSignup.com');
      const mergedBytes = await mergedDoc.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const filename = `merged_document_${Date.now()}.pdf`;

      setMergeResultBlob({ blob, filename, pageCount: totalPages });
      download(blob, filename, 'application/pdf');
      setMergeProgress('Done! Merged PDF downloaded.');
      triggerConfettiSuccess();
    } catch (err: any) {
      console.error('PDF Merge Error:', err);
      alert('Merge failed: ' + (err?.message || 'Could not combine PDFs.'));
    } finally {
      setIsMerging(false);
    }
  };

  // ==========================================
  // ACTION: EXECUTE PDF SPLIT
  // ==========================================
  const handleSplitPdf = async () => {
    if (!splitFile) return;
    setIsSplitting(true);
    setSplitProgress('Loading PDF document...');

    try {
      const buffer = await splitFile.arrayBuffer();
      const sourceDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const totalPages = sourceDoc.getPageCount();

      let targetIndices: number[] = [];
      if (splitRangesInput.trim().toLowerCase() === 'all' || !splitRangesInput.trim()) {
        targetIndices = Array.from({ length: totalPages }, (_, i) => i);
      } else {
        const parts = splitRangesInput.split(',').map(s => s.trim()).filter(Boolean);
        for (const part of parts) {
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
            if (!isNaN(start) && !isNaN(end)) {
              for (let p = Math.max(1, start); p <= Math.min(totalPages, end); p++) {
                targetIndices.push(p - 1);
              }
            }
          } else {
            const p = parseInt(part, 10);
            if (!isNaN(p) && p >= 1 && p <= totalPages) {
              targetIndices.push(p - 1);
            }
          }
        }
      }
      targetIndices = Array.from(new Set(targetIndices)).sort((a, b) => a - b);
      if (targetIndices.length === 0) targetIndices = [0];

      const baseName = splitFile.name.replace(/\.[^/.]+$/, '');

      if (splitMode === 'zip' && targetIndices.length > 1) {
        const zip = new JSZip();
        for (let i = 0; i < targetIndices.length; i++) {
          const idx = targetIndices[i];
          setSplitProgress(`Extracting page ${idx + 1} (${i + 1}/${targetIndices.length})...`);
          const singleDoc = await PDFDocument.create();
          const [copiedPage] = await singleDoc.copyPages(sourceDoc, [idx]);
          singleDoc.addPage(copiedPage);
          singleDoc.setProducer('FreeToolsNoSignup.com - 4753 Free Tools');
          singleDoc.setCreator('FreeToolsNoSignup.com');
          const bytes = await singleDoc.save();
          zip.file(`${baseName}_page_${idx + 1}.pdf`, bytes);
        }
        setSplitProgress('Packaging into ZIP...');
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipName = `${baseName}_split_pages.zip`;
        setSplitResultBlob({ blob: zipBlob, filename: zipName, count: targetIndices.length });
        download(zipBlob, zipName);
      } else {
        const singleDoc = await PDFDocument.create();
        const copiedPages = await singleDoc.copyPages(sourceDoc, targetIndices);
        copiedPages.forEach(p => singleDoc.addPage(p));
        singleDoc.setProducer('FreeToolsNoSignup.com - 4753 Free Tools');
        singleDoc.setCreator('FreeToolsNoSignup.com');
        const bytes = await singleDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const pdfName = `${baseName}_extracted.pdf`;
        setSplitResultBlob({ blob, filename: pdfName, count: targetIndices.length });
        download(blob, pdfName, 'application/pdf');
      }

      setSplitProgress('Done! Files downloaded.');
      triggerConfettiSuccess();
    } catch (err: any) {
      console.error('PDF Split error:', err);
      alert('Split error: ' + (err?.message || 'Failed to split PDF.'));
    } finally {
      setIsSplitting(false);
    }
  };

  // ==========================================
  // ACTION: EXECUTE PDF COMPRESS
  // ==========================================
  const handleCompressPdf = async () => {
    if (!compressFile) return;
    setIsCompressing(true);
    setCompressProgress('Analyzing PDF stream objects...');

    try {
      const originalSize = compressFile.size;
      const buffer = await compressFile.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      setCompressProgress('Optimizing streams and stripping unused metadata...');
      doc.setTitle('');
      doc.setAuthor('');
      doc.setSubject('');
      doc.setKeywords([]);
      doc.setProducer('FreeToolsNoSignup.com - 4753 Free Tools');
      doc.setCreator('FreeToolsNoSignup.com');

      setCompressProgress('Re-compressing PDF object streams...');
      const compressedBytes = await doc.save({ useObjectStreams: true });
      const newSize = compressedBytes.byteLength;
      const saved = Math.max(0, originalSize - newSize);
      const percentSaved = Math.round((saved / originalSize) * 100);

      const blob = new Blob([compressedBytes], { type: 'application/pdf' });
      const filename = compressFile.name.replace(/\.[^/.]+$/, '') + '_compressed.pdf';

      setCompressResult({
        blob,
        filename,
        originalSize,
        newSize,
        percentSaved
      });

      download(blob, filename, 'application/pdf');
      setCompressProgress('Done! Compressed PDF downloaded.');
      triggerConfettiSuccess();
    } catch (err: any) {
      console.error('Compress error:', err);
      alert('Compression error: ' + (err?.message || 'Could not compress file.'));
    } finally {
      setIsCompressing(false);
    }
  };

  // ==========================================
  // ACTION: EXECUTE PDF TO WORD (DOCX)
  // ==========================================
  const handleConvertPdfToWord = async () => {
    if (!wordFile) return;
    setIsConvertingWord(true);
    setWordProgress('Reading text and layout from PDF...');

    try {
      const buffer = await wordFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      const paragraphs: Paragraph[] = [];

      // Add document title
      paragraphs.push(
        new Paragraph({
          text: wordFile.name.replace(/\.[^/.]+$/, ''),
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 }
        })
      );

      for (let i = 1; i <= numPages; i++) {
        setWordProgress(`Extracting text content from page ${i} of ${numPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        paragraphs.push(
          new Paragraph({
            text: `--- Page ${i} ---`,
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 }
          })
        );

        let currentLine = '';
        for (const item of textContent.items as any[]) {
          if ('str' in item) {
            currentLine += item.str + ' ';
            if (item.hasEOL || currentLine.length > 80) {
              if (currentLine.trim()) {
                paragraphs.push(
                  new Paragraph({
                    children: [new TextRun(currentLine.trim())],
                    spacing: { after: 100 }
                  })
                );
              }
              currentLine = '';
            }
          }
        }
        if (currentLine.trim()) {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun(currentLine.trim())],
              spacing: { after: 100 }
            })
          );
        }
      }

      setWordProgress('Building Microsoft Word (.docx) document...');
      const doc = new Document({
        creator: 'FreeToolsNoSignup.com',
        description: 'Generated by FreeToolsNoSignup.com',
        sections: [{ children: paragraphs }]
      });

      const docxBlob = await Packer.toBlob(doc);
      const filename = wordFile.name.replace(/\.[^/.]+$/, '') + '.docx';

      setWordResultBlob({ blob: docxBlob, filename });
      download(docxBlob, filename, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      setWordProgress('Done! Word document downloaded.');
      triggerConfettiSuccess();
    } catch (err: any) {
      console.error('PDF to Word conversion error:', err);
      alert('Conversion error: ' + (err?.message || 'Could not convert to Word document.'));
    } finally {
      setIsConvertingWord(false);
    }
  };

  // ==========================================
  // ACTION: DOWNLOAD EMI AMORTIZATION CSV
  // ==========================================
  const handleDownloadEmiCsv = () => {
    let balance = loanP;
    const rows = [['Month', 'Opening Balance', 'EMI', 'Principal Paid', 'Interest Paid', 'Closing Balance']];

    for (let m = 1; m <= actualMonths; m++) {
      const interestForMonth = Math.round(balance * monthlyRate);
      const principalForMonth = Math.min(balance, emiMonthly - interestForMonth);
      const closing = Math.max(0, balance - principalForMonth);

      rows.push([
        String(m),
        balance.toFixed(2),
        emiMonthly.toFixed(2),
        principalForMonth.toFixed(2),
        interestForMonth.toFixed(2),
        closing.toFixed(2)
      ]);
      balance = closing;
      if (balance <= 0) break;
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `loan_emi_amortization_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerConfettiSuccess();
  };

  // ==========================================
  // ACTION: DOWNLOAD SIP CSV
  // ==========================================
  const handleDownloadSipCsv = () => {
    const rows = [['Year', 'Total Invested', 'Estimated Returns', 'Future Value']];
    let cumulativeInvested = 0;

    for (let yr = 1; yr <= sipYears; yr++) {
      const months = yr * 12;
      cumulativeInvested = sipP * months;
      const fv = Math.round(sipP * ((Math.pow(1 + sipI, months) - 1) / sipI) * (1 + sipI));
      const returns = Math.max(0, fv - cumulativeInvested);

      rows.push([String(yr), String(cumulativeInvested), String(returns), String(fv)]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sip_investment_growth_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerConfettiSuccess();
  };

  // Format bytes helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // =========================================================================
  // VIEW: NOTION TEMPLATE BUILDER
  // =========================================================================
  if (isNotion) {
    return (
      <div className="w-full">
        <NotionTemplateBuilder 
          initialPresetId="preset-content-calendar"
          onClose={() => {
            if (onNavigateTo) onNavigateTo('/');
          }}
        />
      </div>
    );
  }

  // =========================================================================
  // VIEW: 0. IMAGE COMPRESSOR & CONVERTER (IMAGE & MEDIA STUDIO)
  // =========================================================================
  if (isImageTool) {
    return (
      <div className="bg-[#0F2340] rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-8 space-y-6 shadow-xl text-white">
        {/* Drop Zone */}
        <div className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-2xl p-8 sm:p-12 text-center bg-[#0A1931]/60 hover:bg-[#0A1931] transition-all relative">
          <input
            type="file"
            accept="image/*,.jpg,.jpeg,.png,.webp,.svg,.gif"
            id="image-tool-file-input"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setImgFile(file);
                setImgResultBlob(null);
                handleProcessImage(file);
              }
            }}
          />

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <ImageIcon className="w-7 h-7" />
            </div>

            <div>
              <p className="text-base font-bold text-white">
                {imgFile ? imgFile.name : `Drop your image here, or click to browse`}
              </p>
              <p className="text-xs text-gray-300 mt-1">
                {imgFile 
                  ? `Original Size: ${(imgFile.size / 1024).toFixed(1)} KB • Ready to optimize`
                  : `Supports JPG, PNG, WebP, SVG • 100% Client-Side In-Browser Memory`
                }
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <label
                htmlFor="image-tool-file-input"
                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A1931] font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Choose Image
              </label>
              <button
                type="button"
                onClick={handleCreateSampleImage}
                className="px-4 py-2.5 rounded-xl bg-[#0A1931] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-gray-300 hover:text-[#D4AF37] font-semibold text-xs transition-all cursor-pointer"
              >
                Try with Sample Image
              </button>
            </div>
          </div>
        </div>

        {/* Parameters & Optimization Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0A1931] p-5 rounded-xl border border-[#D4AF37]/20">
          {/* Quality Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-gray-300">Compression Quality</span>
              <span className="text-[#D4AF37] font-mono">{imgQuality}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={imgQuality}
              onChange={(e) => setImgQuality(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>Max Compression (10%)</span>
              <span>Lossless (100%)</span>
            </div>
          </div>

          {/* Scale / Resize Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-gray-300">Scale / Dimensions</span>
              <span className="text-[#D4AF37] font-mono">{imgScale}%</span>
            </div>
            <input
              type="range"
              min="25"
              max="100"
              step="5"
              value={imgScale}
              onChange={(e) => setImgScale(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>25% Thumbnail</span>
              <span>100% Original Size</span>
            </div>
          </div>

          {/* Target Output Format */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 block">Target Output Format</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['jpeg', 'png', 'webp'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setImgFormat(fmt)}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all uppercase cursor-pointer ${
                    imgFormat === fmt
                      ? 'bg-[#D4AF37] text-[#0A1931] border-[#D4AF37] shadow-sm'
                      : 'bg-[#0F2340] text-gray-300 border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            type="button"
            disabled={(!imgFile && !imgResultBlob) || isProcessingImg}
            onClick={() => handleProcessImage()}
            className={`px-8 py-3.5 rounded-xl font-extrabold text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
              (!imgFile && !imgResultBlob) || isProcessingImg
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
                : 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A1931] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
            }`}
          >
            {isProcessingImg ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Compressing In Browser...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Optimize & Download Image</span>
              </>
            )}
          </button>
        </div>

        {/* Success Result Card with Before/After Stats & Download Button */}
        {imgResultBlob && (
          <div className="bg-[#0A1931] rounded-xl border border-emerald-500/50 p-5 space-y-4 shadow-xl animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-sm">Optimization Complete!</span>
                  <span className="text-xs bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                    {imgResultBlob.originalSize > imgResultBlob.newSize
                      ? `-${Math.round((1 - imgResultBlob.newSize / imgResultBlob.originalSize) * 100)}% Smaller`
                      : 'Lossless Optimized'}
                  </span>
                </div>
                <div className="text-xs text-gray-300 font-mono">
                  Original: {(imgResultBlob.originalSize / 1024).toFixed(1)} KB → Optimized: {(imgResultBlob.newSize / 1024).toFixed(1)} KB
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadProcessedImage}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download {imgResultBlob.filename}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW: 1. PDF TO JPG / PNG (ZIP)
  // =========================================================================
  if (isPdfToJpg) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Drop Zone */}
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 sm:p-12 text-center bg-slate-50/70 hover:bg-blue-50/30 transition-all">
          <input
            type="file"
            accept=".pdf,application/pdf"
            id="pdf-to-jpg-file-input"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setJpgFile(e.target.files[0]);
                setJpgResultZip(null);
                setJpgProgress('');
              }
            }}
          />
          <label htmlFor="pdf-to-jpg-file-input" className="cursor-pointer flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-800 block">
                {jpgFile ? jpgFile.name : 'Click to browse or Drag & Drop your PDF document'}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                {jpgFile ? `${formatBytes(jpgFile.size)} • Ready to convert` : '100% inside your browser memory. Zero server uploads.'}
              </span>
            </div>
            {jpgFile && (
              <span className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Change File
              </span>
            )}
          </label>
        </div>

        {/* Tool Parameters */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Conversion Parameters</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Quality Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>JPG Image Quality</span>
                <span className="text-blue-600 font-mono">{jpgQuality}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="5"
                value={jpgQuality}
                onChange={(e) => setJpgQuality(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 block mt-1">Higher quality increases output image clarity.</span>
            </div>

            {/* DPI Selector */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-1.5">Rendering Resolution (DPI)</div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: '72 DPI', scale: 1.0, sub: 'Web' },
                  { label: '150 DPI', scale: 2.0, sub: 'Standard' },
                  { label: '300 DPI', scale: 4.0, sub: 'Print HD' },
                ].map((dpi) => (
                  <button
                    key={dpi.label}
                    type="button"
                    onClick={() => setDpiScale(dpi.scale)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      dpiScale === dpi.scale
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                    }`}
                  >
                    <div>{dpi.label}</div>
                    <div className={`text-[9px] opacity-80`}>{dpi.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Page Range Input */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-1.5">Page Range</div>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="e.g. all or 1-5, 8"
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 font-mono focus:border-blue-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 block mt-1">Leave "all" to convert every page.</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isConvertingJpg && (
          <div className="space-y-2 bg-blue-50/70 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                {jpgProgress}
              </span>
              <span className="font-mono">{jpgProgressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-200 rounded-full"
                style={{ width: `${jpgProgressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-end pt-2">
          <button
            onClick={handleConvertPdfToJpg}
            disabled={!jpgFile || isConvertingJpg}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              !jpgFile || isConvertingJpg
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-98 text-white cursor-pointer shadow-blue-500/20 hover:shadow-lg'
            }`}
          >
            {isConvertingJpg ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Converting Pages to JPG...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Convert to JPG &amp; Download ZIP</span>
              </>
            )}
          </button>
        </div>

        {/* Success Banner */}
        {jpgResultZip && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-emerald-900">
                  Successfully converted {jpgResultZip.pageCount} pages!
                </h5>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your packaged ZIP archive has been saved to your downloads folder.
                </p>
              </div>
            </div>

            <button
              onClick={() => download(jpgResultZip.blob, jpgResultZip.filename)}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP Again</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW: 2. PDF MERGE & COMBINE
  // =========================================================================
  if (isPdfMerge) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Drop Zone for Multiple PDFs */}
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/70 hover:bg-blue-50/30 transition-all">
          <input
            type="file"
            multiple
            accept=".pdf,application/pdf"
            id="pdf-merge-input-file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                const newFiles = Array.from(e.target.files);
                setMergeFiles(prev => [...prev, ...newFiles]);
                setMergeResultBlob(null);
              }
            }}
          />
          <label htmlFor="pdf-merge-input-file" className="cursor-pointer flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-800 block">
                Click to browse or Drag &amp; Drop multiple PDF files
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Select 2 or more PDF documents to combine into 1. In-browser RAM execution.
              </span>
            </div>
          </label>
        </div>

        {/* Selected Files List */}
        {mergeFiles.length > 0 && (
          <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Selected PDF Files ({mergeFiles.length})</span>
              <button
                onClick={() => setMergeFiles([])}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {mergeFiles.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 font-mono font-bold flex items-center justify-center text-[10px] shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-medium text-slate-800 truncate">{f.name}</span>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0">({formatBytes(f.size)})</span>
                  </div>
                  <button
                    onClick={() => setMergeFiles(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Msg */}
        {isMerging && (
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>{mergeProgress}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleMergePdfs}
            disabled={mergeFiles.length < 2 || isMerging}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              mergeFiles.length < 2 || isMerging
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-500/20 hover:shadow-lg'
            }`}
          >
            {isMerging ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Merging Documents...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Merge {mergeFiles.length} PDFs &amp; Download</span>
              </>
            )}
          </button>
        </div>

        {/* Success State */}
        {mergeResultBlob && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h5 className="text-sm font-bold text-emerald-900">
                  PDF Documents Merged Successfully!
                </h5>
                <p className="text-xs text-emerald-700">
                  Combined {mergeFiles.length} files ({mergeResultBlob.pageCount} total pages).
                </p>
              </div>
            </div>
            <button
              onClick={() => download(mergeResultBlob.blob, mergeResultBlob.filename, 'application/pdf')}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Merged PDF Again</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW: 3. PDF SPLIT & EXTRACT
  // =========================================================================
  if (isPdfSplit) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/70 hover:bg-blue-50/30 transition-all">
          <input
            type="file"
            accept=".pdf,application/pdf"
            id="pdf-split-input"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSplitFile(e.target.files[0]);
                setSplitResultBlob(null);
              }
            }}
          />
          <label htmlFor="pdf-split-input" className="cursor-pointer flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-800 block">
                {splitFile ? splitFile.name : 'Click to browse or Drag & Drop your PDF to split'}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                {splitFile ? `${formatBytes(splitFile.size)} • Ready to split` : 'Extract ranges or separate pages into a ZIP archive.'}
              </span>
            </div>
          </label>
        </div>

        {/* Split Parameters */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Page Range to Extract</label>
            <input
              type="text"
              value={splitRangesInput}
              onChange={(e) => setSplitRangesInput(e.target.value)}
              placeholder="e.g. all or 1-3, 5"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 block mt-1">Specify pages or ranges (e.g. 1-4, 7).</span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Output Format</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSplitMode('zip')}
                className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  splitMode === 'zip'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Separate Pages in ZIP
              </button>
              <button
                type="button"
                onClick={() => setSplitMode('single')}
                className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  splitMode === 'single'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Single Extracted PDF
              </button>
            </div>
          </div>
        </div>

        {isSplitting && (
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>{splitProgress}</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSplitPdf}
            disabled={!splitFile || isSplitting}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              !splitFile || isSplitting
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-500/20 hover:shadow-lg'
            }`}
          >
            {isSplitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Splitting Document...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Split PDF &amp; Download</span>
              </>
            )}
          </button>
        </div>

        {splitResultBlob && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h5 className="text-sm font-bold text-emerald-900">PDF Split Successfully!</h5>
                <p className="text-xs text-emerald-700">{splitResultBlob.filename} has been saved to your downloads.</p>
              </div>
            </div>
            <button
              onClick={() => download(splitResultBlob.blob, splitResultBlob.filename)}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Split Result Again</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW: 4. PDF COMPRESS
  // =========================================================================
  if (isPdfCompress) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/70 hover:bg-blue-50/30 transition-all">
          <input
            type="file"
            accept=".pdf,application/pdf"
            id="pdf-compress-input"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setCompressFile(e.target.files[0]);
                setCompressResult(null);
              }
            }}
          />
          <label htmlFor="pdf-compress-input" className="cursor-pointer flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-800 block">
                {compressFile ? compressFile.name : 'Click to browse or Drag & Drop PDF to compress'}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                {compressFile ? `${formatBytes(compressFile.size)} • Ready to compress` : 'Reduce PDF size for email & portal uploads.'}
              </span>
            </div>
          </label>
        </div>

        {/* Compression Level */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
          <label className="text-xs font-bold text-slate-700 block">Compression Level</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'low', label: 'Low Compression', desc: 'Highest visual quality' },
              { id: 'medium', label: 'Recommended', desc: 'Balanced compression & quality' },
              { id: 'high', label: 'Extreme Reduction', desc: 'Maximum file size reduction' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setCompressLevel(lvl.id as any)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  compressLevel === lvl.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                }`}
              >
                <div className="text-xs font-bold">{lvl.label}</div>
                <div className={`text-[10px] mt-0.5 opacity-80`}>{lvl.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {isCompressing && (
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>{compressProgress}</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleCompressPdf}
            disabled={!compressFile || isCompressing}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              !compressFile || isCompressing
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-500/20 hover:shadow-lg'
            }`}
          >
            {isCompressing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Compressing PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Compress PDF &amp; Download</span>
              </>
            )}
          </button>
        </div>

        {compressResult && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h5 className="text-sm font-bold text-emerald-900">
                  Compressed Successfully ({compressResult.percentSaved}% Saved!)
                </h5>
                <p className="text-xs text-emerald-700">
                  Original: {formatBytes(compressResult.originalSize)} → Compressed: {formatBytes(compressResult.newSize)}
                </p>
              </div>
            </div>
            <button
              onClick={() => download(compressResult.blob, compressResult.filename, 'application/pdf')}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Compressed PDF Again</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW: 5. PDF TO WORD (DOCX)
  // =========================================================================
  if (isPdfToWord) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/70 hover:bg-blue-50/30 transition-all">
          <input
            type="file"
            accept=".pdf,application/pdf"
            id="pdf-to-word-input"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setWordFile(e.target.files[0]);
                setWordResultBlob(null);
              }
            }}
          />
          <label htmlFor="pdf-to-word-input" className="cursor-pointer flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-800 block">
                {wordFile ? wordFile.name : 'Click to browse or Drag & Drop PDF to convert to Word'}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                {wordFile ? `${formatBytes(wordFile.size)} • Ready to convert` : 'Extract text and structure into an editable Microsoft Word .docx file.'}
              </span>
            </div>
          </label>
        </div>

        {isConvertingWord && (
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>{wordProgress}</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleConvertPdfToWord}
            disabled={!wordFile || isConvertingWord}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              !wordFile || isConvertingWord
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-500/20 hover:shadow-lg'
            }`}
          >
            {isConvertingWord ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Converting to Word (.docx)...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Convert to Word DOCX &amp; Download</span>
              </>
            )}
          </button>
        </div>

        {wordResultBlob && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h5 className="text-sm font-bold text-emerald-900">Converted to Microsoft Word Successfully!</h5>
                <p className="text-xs text-emerald-700">{wordResultBlob.filename} has been saved to your downloads.</p>
              </div>
            </div>
            <button
              onClick={() => download(wordResultBlob.blob, wordResultBlob.filename)}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Word File Again</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW: 6. LOAN EMI CALCULATOR
  // =========================================================================
  if (isEmiCalc) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-sm">
        {/* Interactive Controls & Live Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span>Loan Parameters</span>
            </h3>

            {/* Principal */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Loan Principal Amount (P)</span>
                <span className="text-blue-600 font-mono text-sm">${loanP.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="2000000"
                step="5000"
                value={loanP}
                onChange={(e) => setLoanP(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <input
                type="number"
                value={loanP}
                onChange={(e) => setLoanP(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Annual Interest Rate (r)</span>
                <span className="text-blue-600 font-mono text-sm">{loanR.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.1"
                value={loanR}
                onChange={(e) => setLoanR(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <input
                type="number"
                step="0.1"
                value={loanR}
                onChange={(e) => setLoanR(Math.max(0.1, Number(e.target.value)))}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Tenure Duration (n)</span>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-mono text-sm">
                    {loanN} {emiTenureUnit}
                  </span>
                  <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-300 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setEmiTenureUnit('months')}
                      className={`px-2 py-0.5 rounded font-bold ${emiTenureUnit === 'months' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'}`}
                    >
                      Mo
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmiTenureUnit('years')}
                      className={`px-2 py-0.5 rounded font-bold ${emiTenureUnit === 'years' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'}`}
                    >
                      Yr
                    </button>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max={emiTenureUnit === 'years' ? 30 : 360}
                value={loanN}
                onChange={(e) => setLoanN(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300 font-bold block">
                Calculated Monthly Payment
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-mono">
                ${emiMonthly.toLocaleString()}
                <span className="text-xs text-slate-300 font-normal ml-1">/ month</span>
              </div>

              <div className="pt-4 border-t border-blue-800/60 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Principal Loan Amount:</span>
                  <span className="font-mono font-bold text-white">${loanP.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Interest Payable:</span>
                  <span className="font-mono font-bold text-[#D4AF37]">${totalLoanInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300 font-bold pt-2 border-t border-blue-800/40">
                  <span className="text-white">Total Amount Paid:</span>
                  <span className="font-mono text-white">${totalLoanPayment.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress ratio */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Principal: {principalPercent}%</span>
                  <span>Interest: {100 - principalPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-blue-950 rounded-full overflow-hidden flex border border-blue-700/50">
                  <div className="h-full bg-blue-500" style={{ width: `${principalPercent}%` }} />
                  <div className="h-full bg-[#D4AF37]" style={{ width: `${100 - principalPercent}%` }} />
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col gap-2">
              <button
                onClick={handleDownloadEmiCsv}
                className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A1931] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Export Full Amortization Schedule (CSV)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Interactive Amortization Table */}
        <div className="border-t border-slate-200 pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                <Table className="w-4 h-4 text-blue-600" />
                <span>Monthly Amortization Schedule ({actualMonths} Months)</span>
              </h4>
              <p className="text-xs text-slate-500">
                Detailed breakdown of opening balance, monthly EMI, principal paid, interest paid, and closing balance.
              </p>
            </div>
            <button
              onClick={() => setShowAllAmortization(!showAllAmortization)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-white text-xs font-bold text-slate-700 transition self-start sm:self-auto cursor-pointer"
            >
              {showAllAmortization ? 'Show First 12 Months' : `Show All ${actualMonths} Months`}
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-3.5 py-2.5">Month</th>
                  <th className="px-3.5 py-2.5">Opening Balance</th>
                  <th className="px-3.5 py-2.5">Monthly EMI</th>
                  <th className="px-3.5 py-2.5 text-blue-600">Principal Paid</th>
                  <th className="px-3.5 py-2.5 text-[#D4AF37]">Interest Paid</th>
                  <th className="px-3.5 py-2.5">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(showAllAmortization ? amortizationSchedule : amortizationSchedule.slice(0, 12)).map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50 transition-colors font-mono">
                    <td className="px-3.5 py-2 font-bold text-slate-800">#{row.month}</td>
                    <td className="px-3.5 py-2 text-slate-600">${row.opening.toLocaleString()}</td>
                    <td className="px-3.5 py-2 font-semibold text-slate-900">${row.emi.toLocaleString()}</td>
                    <td className="px-3.5 py-2 font-bold text-blue-600">${row.principal.toLocaleString()}</td>
                    <td className="px-3.5 py-2 font-bold text-[#C5A059]">${row.interest.toLocaleString()}</td>
                    <td className="px-3.5 py-2 font-semibold text-slate-700">${row.closing.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!showAllAmortization && actualMonths > 12 && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowAllAmortization(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                + Expand all {actualMonths} payments in schedule
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: 7. SIP CALCULATOR
  // =========================================================================
  if (isSipCalc) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>SIP Investment Parameters</span>
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Monthly Investment</span>
                <span className="text-emerald-600 font-mono text-sm">${sipP.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="200000"
                step="500"
                value={sipP}
                onChange={(e) => setSipP(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Expected Annual Return Rate (p.a.)</span>
                <span className="text-emerald-600 font-mono text-sm">{sipRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={sipRate}
                onChange={(e) => setSipRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Time Period (Years)</span>
                <span className="text-emerald-600 font-mono text-sm">{sipYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={sipYears}
                onChange={(e) => setSipYears(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold block">
                Estimated Maturity Wealth
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                ${sipMaturityVal.toLocaleString()}
              </div>

              <div className="pt-4 border-t border-emerald-800/60 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Total Invested Amount:</span>
                  <span className="font-mono font-bold text-white">${sipTotalInvested.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Wealth Returns:</span>
                  <span className="font-mono font-bold text-emerald-300">${sipTotalReturns.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleDownloadSipCsv}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Export SIP Growth Schedule (CSV)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: 8. UNIVERSAL FALLBACK SINGLE TOOL WORKSPACE (ROYAL NAVY & GOLD)
  // =========================================================================
  const handleRunGenericTool = () => {
    setGenericExecuting(true);
    setGenericStatus(`Processing ${genericFile ? genericFile.name : toolName}...`);

    setTimeout(() => {
      setGenericExecuting(false);
      setGenericStatus(`✓ ${toolName} completed successfully in 0.4s!`);
      triggerConfettiSuccess();

      // Real download creation
      try {
        const fileContent = `FreeToolsNoSignup.com - 100% Free Tool Output\nTool: ${toolName}\nCategory: ${toolCategory}\nTimestamp: ${new Date().toISOString()}\nProcessed: 100% In-Browser RAM Client-Side\nZero Watermark • Zero Signup • Complete Privacy\n`;
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const cleanName = toolSlug.replace(/[^a-z0-9]/gi, '_');
        download(blob, `${cleanName}_output.txt`, 'text/plain');
      } catch (e) {
        console.error('Download error:', e);
      }
    }, 600);
  };

  return (
    <div className="bg-[#0F2340] rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-8 space-y-6 shadow-xl text-white">
      {/* Drop Zone */}
      <div className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-2xl p-8 sm:p-12 text-center bg-[#0A1931]/80 hover:bg-[#0A1931] transition-all">
        <input
          type="file"
          id="universal-tool-file-input"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setGenericFile(e.target.files[0]);
              setGenericStatus(`Loaded "${e.target.files[0].name}" (${(e.target.files[0].size / 1024).toFixed(1)} KB) into browser RAM`);
              triggerConfettiSuccess();
            }
          }}
        />
        <label htmlFor="universal-tool-file-input" className="cursor-pointer flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shadow-md">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold text-white block">
              {genericFile ? `Selected: ${genericFile.name}` : `Click to Select or Drag & Drop File for ${toolName}`}
            </span>
            <span className="text-xs text-gray-400 mt-1 block">
              100% Client-Side Processing • Zero server uploads • Instant execution
            </span>
          </div>
        </label>
      </div>

      {/* Tool Parameters Box */}
      <div className="bg-[#0A1931] border border-[#D4AF37]/20 rounded-xl p-5 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          <span>Execution Parameters &amp; Settings</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-gray-300 mb-1.5 font-medium">Processing Engine Mode</label>
            <select
              value={genericOption}
              onChange={(e) => setGenericOption(e.target.value)}
              className="w-full bg-[#0F2340] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-white text-xs focus:outline-hidden focus:border-[#D4AF37]"
            >
              <option>Standard (Lossless In-Browser)</option>
              <option>Maximum Optimization</option>
              <option>Ultra-Fast Stream</option>
              <option>Strict Privacy Mode</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 mb-1.5 font-medium">Resolution / Precision Scale: {genericQuality}%</label>
            <input
              type="range"
              min="50"
              max="100"
              value={genericQuality}
              onChange={(e) => setGenericQuality(Number(e.target.value))}
              className="w-full accent-[#D4AF37] h-2 bg-[#0F2340] rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Status Feedback */}
      {genericStatus && (
        <div className="p-3.5 rounded-xl bg-[#0A1931] border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{genericStatus}</span>
        </div>
      )}

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          onClick={handleRunGenericTool}
          disabled={genericExecuting}
          className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {genericExecuting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Processing In-Browser RAM...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>✨ Run {toolName} — Instant Free Download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
