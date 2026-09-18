import React from 'react';
import { ArrowLeft, Sparkles, Bot, Newspaper, Cpu, Zap } from 'lucide-react';

interface AIUpdatesHubPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const AIUpdatesHubPage: React.FC<AIUpdatesHubPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  const aiCategories = [
    { id: 'models', name: 'AI Model Releases', desc: 'Latest breakthroughs, weights, benchmarks and capabilities of frontier models.', icon: '🚀' },
    { id: 'agents', name: 'AI Agents & Automation', desc: 'Multi-agent frameworks, autonomous workflow tools and enterprise integrations.', icon: '🤖' },
    { id: 'research', name: 'AI Research & Papers', desc: 'Peer-reviewed papers, transformer architectures, diffusion breakthroughs and mathematics.', icon: '📚' },
    { id: 'coding', name: 'AI Coding & IDEs', desc: 'Agentic coding assistants, benchmark leaderboards, terminal tools and developer workflows.', icon: '💻' },
    { id: 'multimodal', name: 'Vision, Audio & Video', desc: 'Sora, Gemini 1.5/2.0 multimodal reasoning, real-time voice synthesis and image generation.', icon: '🎨' },
    { id: 'industry', name: 'Industry & Regulation', desc: 'Global AI policy, compute infrastructure, silicon updates and enterprise adoption.', icon: '🌐' },
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
              🤖 AI UPDATES HUB
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1931]/10 text-[#0A1931] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Frontier Artificial Intelligence Feed
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A1931] mb-4">
            Latest AI Updates &amp; News
          </h1>
          <p className="text-base text-[#475569]">
            Curated updates on model releases, research papers, agentic frameworks, and industry developments. Zero fluff, pure technical signal.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiCategories.map((cat) => (
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
                    Live Feed
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0A1931] mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <div className="w-full bg-gray-100 text-gray-500 font-semibold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2">
                <span>Ingestion Ready</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
