import React from 'react';
import { ArrowLeft, Wrench, FileText, Image as ImageIcon, Video, Code, Shield, Sparkles } from 'lucide-react';

interface ToolsHubPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const ToolsHubPage: React.FC<ToolsHubPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  const toolCategories = [
    { id: 'pdf', name: 'PDF Tools', desc: 'Merge, split, convert, compress and sign PDF documents.', count: '320 tools', icon: '📄' },
    { id: 'image', name: 'Image Tools', desc: 'Compress, resize, convert, crop and optimize photos.', count: '410 tools', icon: '🖼️' },
    { id: 'dev', name: 'Developer Tools', desc: 'JSON formatters, base64 encoders, hash generators, and JWT tools.', count: '480 tools', icon: '💻' },
    { id: 'ai', name: 'AI & Study Tools', desc: 'Summarizers, flashcard generators, grammar checkers and AI prompts.', count: '380 tools', icon: '🤖' },
    { id: 'job', name: 'Job & Career Tools', desc: 'ATS resume checkers, cover letter builders, salary calculators.', count: '350 tools', icon: '💼' },
    { id: 'notion', name: 'Notion Builders', desc: 'Custom Notion templates, database generators and formula builders.', count: '233 tools', icon: '📓' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0A1931]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0A1931] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-white hover:text-[#D4AF37] transition-colors cursor-pointer group"
          >
            <span className="font-extrabold text-white text-lg tracking-tight group-hover:text-[#D4AF37] transition-colors">
              FreeTools <span className="text-[#D4AF37]">NoSignup</span>
            </span>
          </button>
          <div className="flex items-center gap-3">
            <span className="bg-[#D4AF37] text-[#0A1931] text-xs font-bold px-3 py-1 rounded-full font-mono">
              🛠 TOOLS HUB
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1931]/10 text-[#0A1931] text-xs font-bold mb-4">
            <Wrench className="w-3.5 h-3.5" /> Professional Utility Suite
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A1931] mb-4">
            Free Online Tools
          </h1>
          <p className="text-base text-[#475569]">
            Explore our comprehensive collection of browser-native utilities. Fast, secure, and 100% free with no sign-up required.
          </p>
        </div>

        {/* Direct Featured Tool: PDF to Word */}
        <div className="mb-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Featured Tool</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">PDF to Word Converter</h2>
            <p className="text-sm text-orange-100 max-w-xl">
              Convert your PDF documents into editable Word (.docx) files instantly in your browser. 100% secure, free, and private.
            </p>
          </div>
          <button 
            onClick={() => onNavigateTo('/tools/pdf-to-word')}
            className="px-8 py-4 bg-white text-orange-600 font-extrabold text-sm rounded-2xl shadow-md hover:bg-orange-50 transition cursor-pointer shrink-0"
          >
            Launch PDF to Word →
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((cat) => (
            <div 
              key={cat.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-3 bg-gray-50 rounded-xl border border-gray-100">
                    {cat.icon}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full font-mono">
                    {cat.count}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0A1931] mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <button 
                onClick={() => onNavigateTo(`/${cat.id}-tools`)}
                className="w-full bg-[#0A1931] text-white hover:bg-[#142646] font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore {cat.name}</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
