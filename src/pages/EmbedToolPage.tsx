import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap, ExternalLink, Sparkles } from 'lucide-react';
import { getToolSEOData } from '../data/toolSEOContent';
import { ALL_DIRECTORY_TOOLS } from '../data/allToolsDirectory';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';

// Interactive Components
import { PDFToolsModal } from '../components/tools/PDFToolsModal';
import { ImageToolsModal } from '../components/tools/ImageToolsModal';
import { CalculatorModal } from '../components/tools/CalculatorModal';
import { ATSToolsSuite } from '../components/tools/ATSToolsSuite';
import { AIStudySuite } from '../components/tools/AIStudySuite';
import { DevToolsSuite } from '../components/tools/DevToolsSuite';
import { NotionTemplateBuilder } from '../components/tools/NotionTemplateBuilder';

interface EmbedToolPageProps {
  toolSlug: string;
}

export const EmbedToolPage: React.FC<EmbedToolPageProps> = ({ toolSlug }) => {
  const [isReady, setIsReady] = useState(false);

  const matchedDirectoryTool = ALL_DIRECTORY_TOOLS.find(
    t => t.slug === toolSlug || t.id === toolSlug
  );

  const seoData = getToolSEOData(toolSlug, matchedDirectoryTool ? {
    name: matchedDirectoryTool.name,
    category: matchedDirectoryTool.category,
    categoryName: matchedDirectoryTool.categoryName,
    description: matchedDirectoryTool.description
  } : undefined);

  useEffect(() => {
    document.title = `${seoData.name} - Free Embeddable Tool | FreeToolsNoSignup`;
    setIsReady(true);
  }, [seoData.name]);

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Minimalist White-Label Header */}
      <div className="w-full bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h1 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
            {seoData.name}
          </h1>
          <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            100% Client-Side
          </span>
        </div>

        <a
          href={`https://www.freetoolsnosignup.com/tools/${seoData.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 transition-colors shrink-0"
        >
          <span>Open Full Tool</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Interactive Tool Body (Clean White-Label Frame) */}
      <main className="flex-1 w-full p-2 sm:p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {seoData.category === 'pdf' && (
            <div className="p-4 sm:p-6">
              <PDFToolsModal
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            </div>
          )}

          {seoData.category === 'image' && (
            <div className="p-4 sm:p-6">
              <ImageToolsModal
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            </div>
          )}

          {seoData.category === 'calculator' && (
            <div className="p-4 sm:p-6">
              <CalculatorModal
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            </div>
          )}

          {seoData.category === 'job-ats' && (
            <div className="p-4 sm:p-6">
              <ATSToolsSuite
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            </div>
          )}

          {seoData.category === 'ai-study' && (
            <div className="p-4 sm:p-6">
              <AIStudySuite
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            </div>
          )}

          {seoData.category === 'dev-pro' && (
            <div className="p-4 sm:p-6">
              <DevToolsSuite
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            </div>
          )}

          {seoData.category === 'notion' && (
            <div className="p-4 sm:p-6">
              <NotionTemplateBuilder
                initialPresetId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            </div>
          )}

          {/* Fallback for tools from broader directory */}
          {!['pdf', 'image', 'calculator', 'job-ats', 'ai-study', 'dev-pro', 'notion'].includes(seoData.category) && (
            <div className="p-8 text-center space-y-4">
              <Sparkles className="w-8 h-8 text-blue-600 mx-auto" />
              <h2 className="text-lg font-bold text-slate-800">{seoData.name}</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">{seoData.description}</p>
              <a
                href={`https://www.freetoolsnosignup.com/tools/${seoData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                <span>Launch Interactive Tool</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </main>

      {/* Discrete Backlink Attribution Footer */}
      <footer className="w-full bg-slate-100 border-t border-slate-200 px-4 py-2 text-center">
        <a
          href={`https://www.freetoolsnosignup.com/tools/${seoData.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-slate-500 hover:text-blue-600 font-medium transition-colors"
        >
          Powered by <strong className="text-slate-700 font-bold">FreeToolsNoSignup</strong> — {TOTAL_TOOLS_COUNT} Free Browser Tools • No Signup Required
        </a>
      </footer>
    </div>
  );
};
