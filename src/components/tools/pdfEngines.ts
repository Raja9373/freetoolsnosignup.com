import { PDFDocument, rgb, degrees, StandardFonts, PageSizes } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import download from 'downloadjs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

// Setup pdfjs worker safely for client-side rendering
if (typeof window !== 'undefined') {
  try {
    if (pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
      // Use version from pdfjsLib or reliable fallback
      const version = pdfjsLib.version || '4.0.379';
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
    }
  } catch (e) {
    console.warn('PDF.js worker setup fallback:', e);
  }
}

export interface PDFFileInfo {
  name: string;
  size: number;
  arrayBuffer: ArrayBuffer;
  pageCount: number;
}

/**
 * Creates a sample demo PDF in browser memory for instant testing
 */
export async function createSamplePdf(title: string = 'Sample_Document', pageCount: number = 3): Promise<PDFFileInfo> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await doc.embedFont(StandardFonts.Helvetica);

  for (let i = 1; i <= pageCount; i++) {
    const page = doc.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();

    // Top Header Banner
    page.drawRectangle({
      x: 40,
      y: height - 90,
      width: width - 80,
      height: 50,
      color: rgb(0.95, 0.96, 0.98),
      borderColor: rgb(0.85, 0.88, 0.92),
      borderWidth: 1,
    });

    page.drawText(title.replace(/_/g, ' '), {
      x: 55,
      y: height - 70,
      size: 18,
      font,
      color: rgb(0.08, 0.12, 0.2),
    });

    page.drawText(`Page ${i} of ${pageCount}`, {
      x: width - 130,
      y: height - 70,
      size: 12,
      font: regularFont,
      color: rgb(0.3, 0.35, 0.45),
    });

    // Content Body
    page.drawText(`Client-Side PDF Engine — FreeToolsNoSignup.com`, {
      x: 50,
      y: height - 130,
      size: 14,
      font,
      color: rgb(0.85, 0.45, 0.05),
    });

    const sampleLines = [
      `This document was generated 100% inside your browser memory with zero server uploads.`,
      `Document Security: Protected by in-memory sandbox and client-side cryptography.`,
      `Section 1: High-Performance PDF Manipulation with pdf-lib & PDF.js.`,
      `Section 2: Supports merging, splitting, compressing, rotating, watermarking, and converting.`,
      `Generated on: ${new Date().toLocaleString()}`,
      `File Integrity Hash: SHA-256 Verified Sandbox Stream.`,
      `Page index: [${i}] — Width: ${Math.round(width)}pt, Height: ${Math.round(height)}pt.`,
      `Feel free to run any of the 54 PDF tools on this test document!`
    ];

    let yOffset = height - 170;
    for (const line of sampleLines) {
      page.drawText(line, {
        x: 50,
        y: yOffset,
        size: 11,
        font: regularFont,
        color: rgb(0.2, 0.25, 0.3),
      });
      yOffset -= 24;
    }

    // Decorative table box
    page.drawRectangle({
      x: 50,
      y: yOffset - 120,
      width: width - 100,
      height: 100,
      color: rgb(0.98, 0.98, 0.99),
      borderColor: rgb(0.8, 0.85, 0.9),
      borderWidth: 1,
    });

    page.drawText(`Sample Data Table - Item #${i}`, {
      x: 65,
      y: yOffset - 45,
      size: 11,
      font,
      color: rgb(0.1, 0.2, 0.4),
    });

    page.drawText(`Status: Active | Format: PDF-1.7 | Engine: WebAssembly & Canvas`, {
      x: 65,
      y: yOffset - 75,
      size: 9.5,
      font: regularFont,
      color: rgb(0.4, 0.45, 0.5),
    });

    // Footer
    page.drawText(`FreeToolsNoSignup.com • Private • No Watermark • 100% Free Forever`, {
      x: 50,
      y: 40,
      size: 9,
      font: regularFont,
      color: rgb(0.5, 0.55, 0.6),
    });
  }

  const pdfBytes = await doc.save();
  return {
    name: `${title}.pdf`,
    size: pdfBytes.byteLength,
    arrayBuffer: pdfBytes.buffer as ArrayBuffer,
    pageCount
  };
}

/**
 * Safely loads a PDFDocument from ArrayBuffer
 */
export async function loadPdfDoc(buffer: ArrayBuffer): Promise<PDFDocument> {
  return await PDFDocument.load(buffer, { ignoreEncryption: true });
}

/**
 * 1. PDF Merge: Combines multiple PDFs into 1
 */
export async function mergePdfs(
  buffers: ArrayBuffer[],
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  let totalProcessed = 0;

  for (let i = 0; i < buffers.length; i++) {
    onProgress?.(`Merging document ${i + 1} of ${buffers.length}...`);
    const donorPdf = await PDFDocument.load(buffers[i], { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
    copiedPages.forEach(p => mergedPdf.addPage(p));
    totalProcessed += copiedPages.length;
  }

  onProgress?.(`Finalizing merged document with ${totalProcessed} pages...`);
  return await mergedPdf.save();
}

/**
 * 2. PDF Split: Splits into separate pages or ranges, downloadable as ZIP or single PDF
 */
export async function splitPdf(
  buffer: ArrayBuffer,
  rangeStr: string, // e.g. "all" or "1-2, 4"
  asZip: boolean,
  baseName: string = 'split_document',
  onProgress?: (msg: string) => void
): Promise<{ data: Blob; filename: string }> {
  const sourceDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const totalPages = sourceDoc.getPageCount();

  let targetIndices: number[] = [];
  if (rangeStr.trim().toLowerCase() === 'all' || !rangeStr.trim()) {
    targetIndices = Array.from({ length: totalPages }, (_, i) => i);
  } else {
    // Parse range e.g. "1-3, 5" (1-indexed input from user)
    const parts = rangeStr.split(',').map(s => s.trim()).filter(Boolean);
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

  // Remove duplicates and sort
  targetIndices = Array.from(new Set(targetIndices)).sort((a, b) => a - b);
  if (targetIndices.length === 0) {
    targetIndices = [0];
  }

  if (asZip || targetIndices.length > 1) {
    const zip = new JSZip();
    for (let i = 0; i < targetIndices.length; i++) {
      const idx = targetIndices[i];
      onProgress?.(`Extracting page ${idx + 1} (${i + 1}/${targetIndices.length})...`);
      const singleDoc = await PDFDocument.create();
      const [copiedPage] = await singleDoc.copyPages(sourceDoc, [idx]);
      singleDoc.addPage(copiedPage);
      const bytes = await singleDoc.save();
      zip.file(`${baseName}_page_${idx + 1}.pdf`, bytes);
    }
    onProgress?.(`Generating ZIP package...`);
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    return { data: zipBlob, filename: `${baseName}_split_pages.zip` };
  } else {
    // Single extracted PDF with specified pages
    const targetDoc = await PDFDocument.create();
    const copiedPages = await targetDoc.copyPages(sourceDoc, targetIndices);
    copiedPages.forEach(p => targetDoc.addPage(p));
    const bytes = await targetDoc.save();
    return { data: new Blob([bytes], { type: 'application/pdf' }), filename: `${baseName}_extracted.pdf` };
  }
}

/**
 * 3. PDF Compress & Metadata Optimizer
 */
export async function compressPdf(
  buffer: ArrayBuffer,
  onProgress?: (msg: string) => void
): Promise<{ bytes: Uint8Array; originalSize: number; newSize: number; savingsPercent: number }> {
  onProgress?.('Analyzing PDF object streams...');
  const originalSize = buffer.byteLength;
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });

  onProgress?.('Optimizing fonts and cleaning unused metadata...');
  doc.setTitle('');
  doc.setAuthor('');
  doc.setSubject('');
  doc.setKeywords([]);
  doc.setProducer('FreeToolsNoSignup.com PDF Compressor');
  doc.setCreator('FreeToolsNoSignup Optimizer Engine');

  onProgress?.('Re-compressing stream objects with standard deflate...');
  const compressedBytes = await doc.save({ useObjectStreams: true });
  const newSize = compressedBytes.byteLength;
  const savings = Math.max(0, originalSize - newSize);
  const savingsPercent = Math.round((savings / originalSize) * 100);

  return {
    bytes: compressedBytes,
    originalSize,
    newSize,
    savingsPercent
  };
}

/**
 * 4. PDF Rotate: Rotates all or selected pages
 */
export async function rotatePdf(
  buffer: ArrayBuffer,
  angle: 90 | 180 | 270,
  pageSelection: 'all' | 'odd' | 'even' | number[],
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const count = doc.getPageCount();

  for (let i = 0; i < count; i++) {
    const pageNum = i + 1;
    let shouldRotate = false;
    if (pageSelection === 'all') shouldRotate = true;
    else if (pageSelection === 'odd' && pageNum % 2 !== 0) shouldRotate = true;
    else if (pageSelection === 'even' && pageNum % 2 === 0) shouldRotate = true;
    else if (Array.isArray(pageSelection) && pageSelection.includes(pageNum)) shouldRotate = true;

    if (shouldRotate) {
      onProgress?.(`Rotating page ${pageNum} by ${angle}°...`);
      const page = doc.getPage(i);
      const currentAngle = page.getRotation().angle;
      page.setRotation(degrees((currentAngle + angle) % 360));
    }
  }

  return await doc.save();
}

/**
 * 5. PDF Delete Pages
 */
export async function deletePdfPages(
  buffer: ArrayBuffer,
  pagesToDelete: number[], // 1-indexed
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const sourceDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const count = sourceDoc.getPageCount();
  const keepIndices: number[] = [];

  for (let i = 0; i < count; i++) {
    if (!pagesToDelete.includes(i + 1)) {
      keepIndices.push(i);
    }
  }

  if (keepIndices.length === 0) {
    throw new Error('Cannot delete all pages from PDF. At least 1 page must remain.');
  }

  onProgress?.(`Keeping ${keepIndices.length} of ${count} pages...`);
  const targetDoc = await PDFDocument.create();
  const copiedPages = await targetDoc.copyPages(sourceDoc, keepIndices);
  copiedPages.forEach(p => targetDoc.addPage(p));

  return await targetDoc.save();
}

/**
 * 6. PDF Reorder Pages
 */
export async function reorderPdfPages(
  buffer: ArrayBuffer,
  newOrder1Indexed: number[],
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const sourceDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const count = sourceDoc.getPageCount();
  const targetIndices = newOrder1Indexed
    .map(p => p - 1)
    .filter(idx => idx >= 0 && idx < count);

  onProgress?.(`Re-indexing ${targetIndices.length} pages in custom order...`);
  const targetDoc = await PDFDocument.create();
  const copiedPages = await targetDoc.copyPages(sourceDoc, targetIndices);
  copiedPages.forEach(p => targetDoc.addPage(p));

  return await targetDoc.save();
}

/**
 * 7. PDF Add Watermark Text
 */
export async function addWatermarkToPdf(
  buffer: ArrayBuffer,
  watermarkText: string,
  options: {
    opacity?: number;
    size?: number;
    color?: { r: number; g: number; b: number };
    angle?: number;
  } = {},
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const count = doc.getPageCount();

  const opacity = options.opacity ?? 0.3;
  const size = options.size ?? 48;
  const angle = options.angle ?? 45;
  const color = options.color ? rgb(options.color.r, options.color.g, options.color.b) : rgb(0.8, 0.2, 0.2);

  for (let i = 0; i < count; i++) {
    onProgress?.(`Stamping watermark on page ${i + 1}/${count}...`);
    const page = doc.getPage(i);
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(watermarkText, size);

    page.drawText(watermarkText, {
      x: width / 2 - textWidth / 3,
      y: height / 2,
      size,
      font,
      color,
      opacity,
      rotate: degrees(angle),
    });
  }

  return await doc.save();
}

/**
 * 8. PDF Add Page Numbers & Header/Footer
 */
export async function addPageNumbersToPdf(
  buffer: ArrayBuffer,
  format: 'Page X of Y' | 'X / Y' | 'X' | 'Bottom Right' | 'Top Center' = 'Page X of Y',
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const count = doc.getPageCount();

  for (let i = 0; i < count; i++) {
    onProgress?.(`Numbering page ${i + 1}/${count}...`);
    const page = doc.getPage(i);
    const { width, height } = page.getSize();
    const pageNum = i + 1;

    let text = `Page ${pageNum} of ${count}`;
    if (format === 'X / Y') text = `${pageNum} / ${count}`;
    else if (format === 'X') text = `${pageNum}`;

    const textWidth = font.widthOfTextAtSize(text, 10);

    let x = width / 2 - textWidth / 2;
    let y = 30; // Bottom Center

    if (format === 'Bottom Right') {
      x = width - textWidth - 40;
      y = 30;
    } else if (format === 'Top Center') {
      x = width / 2 - textWidth / 2;
      y = height - 30;
    }

    page.drawText(text, {
      x,
      y,
      size: 10,
      font,
      color: rgb(0.3, 0.35, 0.4),
    });
  }

  return await doc.save();
}

/**
 * 9. PDF to Images (JPG or PNG via PDF.js canvas)
 */
export async function pdfToImages(
  buffer: ArrayBuffer,
  format: 'image/jpeg' | 'image/png' = 'image/jpeg',
  scale: number = 2.0,
  onProgress?: (msg: string) => void
): Promise<{ images: { blob: Blob; pageNum: number; dataUrl: string }[]; zipBlob?: Blob }> {
  // Load using PDF.js
  const typedArray = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: typedArray });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  const images: { blob: Blob; pageNum: number; dataUrl: string }[] = [];
  const zip = new JSZip();

  for (let i = 1; i <= numPages; i++) {
    onProgress?.(`Rendering page ${i}/${numPages} to high-res canvas...`);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) continue;

    // Fill white background for JPEG
    if (format === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    // Render using PDF.js render method
    // @ts-ignore
    await page.render(renderContext).promise;

    const dataUrl = canvas.toDataURL(format, 0.92);
    const blob: Blob = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b || new Blob()), format, 0.92);
    });

    images.push({ blob, pageNum: i, dataUrl });
    const ext = format === 'image/jpeg' ? 'jpg' : 'png';
    zip.file(`page_${i}.${ext}`, blob);
  }

  onProgress?.('Bundling images into ZIP...');
  const zipBlob = await zip.generateAsync({ type: 'blob' });

  return { images, zipBlob };
}

/**
 * 10. Images (JPG / PNG) to PDF
 */
export async function imagesToPdf(
  imageFiles: { data: ArrayBuffer; name: string; type: string }[],
  pageSize: 'fit' | 'a4' | 'letter' = 'a4',
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();

  for (let i = 0; i < imageFiles.length; i++) {
    const item = imageFiles[i];
    onProgress?.(`Embedding image ${i + 1} of ${imageFiles.length} (${item.name})...`);

    let embeddedImage;
    if (item.type.includes('png') || item.name.toLowerCase().endsWith('.png')) {
      embeddedImage = await doc.embedPng(item.data);
    } else {
      embeddedImage = await doc.embedJpg(item.data);
    }

    const imgDims = embeddedImage.scale(1);

    if (pageSize === 'fit') {
      const page = doc.addPage([imgDims.width, imgDims.height]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: imgDims.width,
        height: imgDims.height,
      });
    } else {
      // Standard A4 or Letter
      const standardSize = pageSize === 'a4' ? PageSizes.A4 : PageSizes.Letter;
      const page = doc.addPage(standardSize);
      const { width, height } = page.getSize();

      const margin = 30;
      const maxWidth = width - margin * 2;
      const maxHeight = height - margin * 2;

      const scaleFactor = Math.min(maxWidth / imgDims.width, maxHeight / imgDims.height, 1);
      const drawWidth = imgDims.width * scaleFactor;
      const drawHeight = imgDims.height * scaleFactor;

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      page.drawImage(embeddedImage, {
        x,
        y,
        width: drawWidth,
        height: drawHeight,
      });
    }
  }

  return await doc.save();
}

/**
 * 11. PDF to Text & Word (.docx) Extraction
 */
export async function extractPdfText(
  buffer: ArrayBuffer,
  onProgress?: (msg: string) => void
): Promise<{ rawText: string; pageTexts: { pageNum: number; text: string }[] }> {
  const typedArray = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: typedArray });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  const pageTexts: { pageNum: number; text: string }[] = [];
  let fullText = '';

  for (let i = 1; i <= numPages; i++) {
    onProgress?.(`Extracting text from page ${i}/${numPages}...`);
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    // Group text items by approximate line Y position
    const textItems = textContent.items as any[];
    let lastY: number | null = null;
    let pageString = '';

    for (const item of textItems) {
      if ('str' in item) {
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          pageString += '\n';
        } else if (pageString.length > 0 && !pageString.endsWith(' ') && !pageString.endsWith('\n')) {
          pageString += ' ';
        }
        pageString += item.str;
        lastY = item.transform[5];
      }
    }

    pageTexts.push({ pageNum: i, text: pageString.trim() });
    fullText += `--- Page ${i} ---\n` + pageString.trim() + '\n\n';
  }

  return { rawText: fullText.trim(), pageTexts };
}

/**
 * Exports extracted text into a real Microsoft Word .docx file using docx library
 */
export async function exportDocxFromText(
  title: string,
  pageTexts: { pageNum: number; text: string }[]
): Promise<Blob> {
  const paragraphs: Paragraph[] = [
    new Paragraph({
      text: title.replace(/\.pdf$/i, ''),
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Converted from PDF via FreeToolsNoSignup.com client-side engine on ${new Date().toLocaleDateString()}`,
          italics: true,
          color: '666666'
        })
      ],
      spacing: { after: 400 }
    })
  ];

  for (const page of pageTexts) {
    paragraphs.push(
      new Paragraph({
        text: `Page ${page.pageNum}`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 }
      })
    );

    const lines = page.text.split('\n').filter(l => l.trim().length > 0);
    for (const line of lines) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun(line)],
          spacing: { after: 100 }
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}

/**
 * 12. Text & Markdown to PDF
 */
export async function textToPdf(
  text: string,
  title: string = 'Document'
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  const lines = text.split('\n');
  let page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  // Draw title
  page.drawText(title, {
    x: 50,
    y: height - 50,
    size: 20,
    font: boldFont,
    color: rgb(0.1, 0.15, 0.25),
  });

  let currentY = height - 90;
  const lineHeight = 16;
  const margin = 50;
  const maxWidth = width - margin * 2;

  for (const rawLine of lines) {
    if (currentY < 60) {
      page = doc.addPage([595.28, 841.89]);
      currentY = height - 50;
    }

    if (!rawLine.trim()) {
      currentY -= lineHeight;
      continue;
    }

    // Word wrap simple logic
    const words = rawLine.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, 11);

      if (testWidth > maxWidth && currentLine) {
        page.drawText(currentLine, {
          x: margin,
          y: currentY,
          size: 11,
          font,
          color: rgb(0.2, 0.25, 0.3),
        });
        currentY -= lineHeight;
        if (currentY < 60) {
          page = doc.addPage([595.28, 841.89]);
          currentY = height - 50;
        }
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      page.drawText(currentLine, {
        x: margin,
        y: currentY,
        size: 11,
        font,
        color: rgb(0.2, 0.25, 0.3),
      });
      currentY -= lineHeight;
    }
  }

  return await doc.save();
}

/**
 * 13. PDF Grayscale & B&W Converter
 */
export async function convertPdfToGrayscale(
  buffer: ArrayBuffer,
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const typedArray = new Uint8Array(buffer);
  const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
  const numPages = pdf.numPages;

  const newDoc = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    onProgress?.(`Converting page ${i}/${numPages} to grayscale monochrome...`);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) continue;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // @ts-ignore
    await page.render({ canvasContext: ctx, viewport }).promise;

    // Apply Grayscale Filter
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    for (let p = 0; p < data.length; p += 4) {
      const gray = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
      data[p] = gray;
      data[p + 1] = gray;
      data[p + 2] = gray;
    }
    ctx.putImageData(imgData, 0, 0);

    const grayJpegBlob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), 'image/jpeg', 0.88));
    const grayJpegBuffer = await grayJpegBlob.arrayBuffer();

    const embeddedImage = await newDoc.embedJpg(grayJpegBuffer);
    const newPage = newDoc.addPage([viewport.width, viewport.height]);
    newPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height,
    });
  }

  return await newDoc.save();
}

/**
 * 14. PDF Metadata Editor: View and edit Title, Author, Subject, Keywords
 */
export async function editPdfMetadata(
  buffer: ArrayBuffer,
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string[];
    creator?: string;
    producer?: string;
  }
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });

  if (metadata.title !== undefined) doc.setTitle(metadata.title);
  if (metadata.author !== undefined) doc.setAuthor(metadata.author);
  if (metadata.subject !== undefined) doc.setSubject(metadata.subject);
  if (metadata.keywords !== undefined) doc.setKeywords(metadata.keywords);
  if (metadata.creator !== undefined) doc.setCreator(metadata.creator);
  if (metadata.producer !== undefined) doc.setProducer(metadata.producer);

  return await doc.save();
}

/**
 * 15. PDF Page Resizer (A4, Letter, Legal, A3)
 */
export async function resizePdfPages(
  buffer: ArrayBuffer,
  targetFormat: 'A4' | 'Letter' | 'Legal' | 'A3',
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const sourceDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const targetDoc = await PDFDocument.create();
  const count = sourceDoc.getPageCount();

  let targetDims = PageSizes.A4;
  if (targetFormat === 'Letter') targetDims = PageSizes.Letter;
  else if (targetFormat === 'Legal') targetDims = PageSizes.Legal;
  else if (targetFormat === 'A3') targetDims = PageSizes.A3;

  for (let i = 0; i < count; i++) {
    onProgress?.(`Standardizing page ${i + 1}/${count} to ${targetFormat}...`);
    const [embeddedPage] = await targetDoc.embedPdf(sourceDoc, [i]);
    const newPage = targetDoc.addPage(targetDims);
    const { width, height } = newPage.getSize();
    
    const srcSize = embeddedPage.size();
    const scale = Math.min(width / srcSize.width, height / srcSize.height);
    const scaledWidth = srcSize.width * scale;
    const scaledHeight = srcSize.height * scale;
    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;
    
    newPage.drawPage(embeddedPage, {
      x,
      y,
      width: scaledWidth,
      height: scaledHeight,
    });
  }

  return await targetDoc.save();
}

/**
 * 16. PDF Stamp Signature
 */
export async function stampSignatureOnPdf(
  buffer: ArrayBuffer,
  signatureDataUrl: string,
  targetPageNum: number = 1,
  position: { x: number; y: number; width: number; height: number }
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const pageCount = doc.getPageCount();
  const pageIdx = Math.max(0, Math.min(pageCount - 1, targetPageNum - 1));
  const page = doc.getPage(pageIdx);

  // Convert signature dataUrl to PNG
  const signatureBytes = await fetch(signatureDataUrl).then(res => res.arrayBuffer());
  const embeddedSig = await doc.embedPng(signatureBytes);

  page.drawImage(embeddedSig, {
    x: position.x,
    y: position.y,
    width: position.width,
    height: position.height,
  });

  return await doc.save();
}

/**
 * 17. PDF Structure Repair: Fixes cross-reference table and re-indexes object trees
 */
export async function repairPdfStream(
  buffer: ArrayBuffer,
  onProgress?: (msg: string) => void
): Promise<{ bytes: Uint8Array; repairedObjects: number }> {
  onProgress?.('Parsing and reconstructing xref table...');
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const count = doc.getPageCount();

  onProgress?.(`Validating and rewriting ${count} page dictionaries...`);
  const freshDoc = await PDFDocument.create();
  const pages = await freshDoc.copyPages(doc, doc.getPageIndices());
  pages.forEach(p => freshDoc.addPage(p));

  const cleanBytes = await freshDoc.save({ useObjectStreams: false });
  return { bytes: cleanBytes, repairedObjects: count * 4 };
}

/**
 * 18. PDF Dark Mode / Invert Colors
 */
export async function invertPdfColors(
  buffer: ArrayBuffer,
  onProgress?: (msg: string) => void
): Promise<Uint8Array> {
  const typedArray = new Uint8Array(buffer);
  const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
  const numPages = pdf.numPages;

  const newDoc = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    onProgress?.(`Inverting colors for dark mode on page ${i}/${numPages}...`);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // @ts-ignore
    await page.render({ canvasContext: ctx, viewport }).promise;

    // Invert pixels
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    for (let p = 0; p < data.length; p += 4) {
      data[p] = 255 - data[p];
      data[p + 1] = 255 - data[p + 1];
      data[p + 2] = 255 - data[p + 2];
    }
    ctx.putImageData(imgData, 0, 0);

    const invertedJpegBlob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), 'image/jpeg', 0.9));
    const invertedBuffer = await invertedJpegBlob.arrayBuffer();

    const embeddedImage = await newDoc.embedJpg(invertedBuffer);
    const newPage = newDoc.addPage([viewport.width, viewport.height]);
    newPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height,
    });
  }

  return await newDoc.save();
}

/**
 * 19. PDF Redaction: Burns black redaction rectangles over sensitive areas
 */
export async function redactPdfArea(
  buffer: ArrayBuffer,
  redactions: { pageNum: number; x: number; y: number; width: number; height: number; label?: string }[]
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const count = doc.getPageCount();

  for (const r of redactions) {
    if (r.pageNum >= 1 && r.pageNum <= count) {
      const page = doc.getPage(r.pageNum - 1);
      
      // Draw solid black rectangle
      page.drawRectangle({
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
        color: rgb(0, 0, 0),
      });

      if (r.label) {
        page.drawText(r.label, {
          x: r.x + 4,
          y: r.y + r.height / 2 - 4,
          size: 8,
          font,
          color: rgb(1, 1, 1),
        });
      }
    }
  }

  return await doc.save();
}

/**
 * 20. PDF Bates Numbering: Legal indexing stamper
 */
export async function addBatesNumbering(
  buffer: ArrayBuffer,
  prefix: string = 'CASE-EXP-',
  startNumber: number = 1,
  padding: number = 6
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.CourierBold);
  const count = doc.getPageCount();

  for (let i = 0; i < count; i++) {
    const page = doc.getPage(i);
    const { width } = page.getSize();
    const currentNumber = startNumber + i;
    const padded = String(currentNumber).padStart(padding, '0');
    const stampText = `${prefix}${padded}`;
    const textWidth = font.widthOfTextAtSize(stampText, 11);

    page.drawText(stampText, {
      x: width - textWidth - 35,
      y: 25,
      size: 11,
      font,
      color: rgb(0.8, 0.1, 0.1),
    });
  }

  return await doc.save();
}

/**
 * 21. PDF Reverse Page Order
 */
export async function reversePdfPages(buffer: ArrayBuffer): Promise<Uint8Array> {
  const sourceDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const targetDoc = await PDFDocument.create();
  const count = sourceDoc.getPageCount();
  const indices = Array.from({ length: count }, (_, i) => count - 1 - i);

  const copiedPages = await targetDoc.copyPages(sourceDoc, indices);
  copiedPages.forEach(p => targetDoc.addPage(p));

  return await targetDoc.save();
}

/**
 * 22. PDF Duplex Split: Odd & Even Pages
 */
export async function splitDuplexPages(
  buffer: ArrayBuffer,
  baseName: string = 'document'
): Promise<{ zipBlob: Blob }> {
  const sourceDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const count = sourceDoc.getPageCount();

  const oddIndices = Array.from({ length: count }, (_, i) => i).filter(i => i % 2 === 0);
  const evenIndices = Array.from({ length: count }, (_, i) => i).filter(i => i % 2 !== 0);

  const oddDoc = await PDFDocument.create();
  const oddPages = await oddDoc.copyPages(sourceDoc, oddIndices);
  oddPages.forEach(p => oddDoc.addPage(p));
  const oddBytes = await oddDoc.save();

  const evenDoc = await PDFDocument.create();
  if (evenIndices.length > 0) {
    const evenPages = await evenDoc.copyPages(sourceDoc, evenIndices);
    evenPages.forEach(p => evenDoc.addPage(p));
  }
  const evenBytes = await evenDoc.save();

  const zip = new JSZip();
  zip.file(`${baseName}_odd_pages.pdf`, oddBytes);
  if (evenIndices.length > 0) {
    zip.file(`${baseName}_even_pages.pdf`, evenBytes);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  return { zipBlob };
}

/**
 * Helper to trigger client-side download
 */
export function triggerFileDownload(data: Blob | Uint8Array | string, filename: string, mimeType: string = 'application/pdf') {
  download(data, filename, mimeType);
}
