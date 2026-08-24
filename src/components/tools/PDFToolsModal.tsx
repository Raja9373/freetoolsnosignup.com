import React, { useState } from 'react';
import { Files, Upload, Download, Trash2, CheckCircle2, RefreshCw, FileText } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import confetti from 'canvas-confetti';

interface PDFToolsModalProps {
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

interface UploadedPDF {
  name: string;
  size: number;
  arrayBuffer: ArrayBuffer;
  pageCount: number;
}

export const PDFToolsModal: React.FC<PDFToolsModalProps> = ({ onClose, onRecordUse }) => {
  const [files, setFiles] = useState<UploadedPDF[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;
    onRecordUse('pdf-merge');

    const newFiles: UploadedPDF[] = [];
    for (let i = 0; i < selected.length; i++) {
      const file = selected[i];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const buffer = await file.arrayBuffer();
        try {
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
    }

    setFiles(prev => [...prev, ...newFiles]);
  };

  const createSamplePdf = async (title: string, pageCount = 2) => {
    const doc = await PDFDocument.create();
    for (let i = 1; i <= pageCount; i++) {
      const page = doc.addPage([595, 842]);
      page.drawText(`${title} - Page ${i}`, { x: 50, y: 780, size: 24 });
      page.drawText(`Created client-side on FreeToolsNoSignup.com`, { x: 50, y: 740, size: 12 });
      page.drawText(`Document timestamp: ${new Date().toLocaleString()}`, { x: 50, y: 710, size: 10 });
    }
    const pdfBytes = await doc.save();
    return {
      name: `${title.replace(/\s+/g, '_')}.pdf`,
      size: pdfBytes.byteLength,
      arrayBuffer: pdfBytes.buffer as ArrayBuffer,
      pageCount
    };
  };

  const loadSamplePdfs = async () => {
    const pdf1 = await createSamplePdf('Contract_Agreement_Part1', 2);
    const pdf2 = await createSamplePdf('Technical_Appendix_Part2', 3);
    setFiles([pdf1, pdf2]);
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setIsMerging(true);
    onRecordUse('pdf-merge');

    try {
      const mergedPdf = await PDFDocument.create();
      for (const item of files) {
        const donorPdf = await PDFDocument.load(item.arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
      setIsMerging(false);

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
      setIsMerging(false);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
    setMergedPdfUrl(null);
  };

  return (
    <div id="pdf-tools-modal-overlay" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div id="pdf-tools-modal-card" className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
              <Files className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">PDF Merge & Combine Suite</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                  100% Client-Side
                </span>
              </div>
              <p className="text-xs text-slate-500">Merge, reorder, and combine multiple PDF documents with zero server uploads</p>
            </div>
          </div>

          <button 
            id="pdf-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-5">
          
          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white rounded-2xl p-6 sm:p-8 text-center transition-colors">
            <input 
              type="file" 
              accept=".pdf" 
              multiple 
              onChange={handleFileUpload} 
              className="hidden" 
              id="pdf-file-input" 
            />
            <label htmlFor="pdf-file-input" className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <div className="font-bold text-slate-800 text-sm">
                Click to browse or Drag & Drop PDF documents
              </div>
              <p className="text-xs text-slate-400">
                Select 2 or more PDF files to combine. Files stay 100% inside your browser memory.
              </p>
            </label>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-3">
              <span className="text-xs text-slate-500">Need sample files?</span>
              <button
                onClick={loadSamplePdfs}
                className="text-xs text-blue-600 hover:text-blue-700 font-bold underline"
              >
                + Generate 2 Sample Demo PDFs
              </button>
            </div>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span>Selected Documents ({files.length})</span>
                <span>Total Pages: {files.reduce((acc, f) => acc + f.pageCount, 0)}</span>
              </div>

              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between shadow-sm hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-blue-500" />
                          {file.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {(file.size / 1024).toFixed(1)} KB • {file.pageCount} {file.pageCount === 1 ? 'Page' : 'Pages'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFile(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove PDF"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setFiles([])}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Clear all files
                </button>

                <button
                  id="pdf-merge-btn"
                  onClick={mergePDFs}
                  disabled={isMerging || files.length < 2}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  {isMerging ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Merging Pages In-Memory...
                    </>
                  ) : (
                    <>
                      <Files className="w-4 h-4" />
                      Merge {files.length} PDFs into 1 File
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success Download Card */}
          {mergedPdfUrl && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">PDFs Successfully Merged!</h4>
                  <p className="text-xs text-emerald-800">
                    Combined document is ready. Zero watermarks, crisp typography.
                  </p>
                </div>
              </div>

              <a
                id="pdf-download-btn"
                href={mergedPdfUrl}
                download="FreeToolsNoSignup_Merged.pdf"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Merged PDF
              </a>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>🔒 100% Confidential • Documents never leave your device</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
