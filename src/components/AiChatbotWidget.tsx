import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Bot, X, Send, Trash2, Minimize2, MessageSquare, 
  RotateCcw, ArrowRight, CornerDownLeft, ShieldCheck 
} from 'lucide-react';
import { searchToolsSemantic, SearchableTool } from '../utils/aiToolSearch';
import { ChatToolCard } from './ChatToolCard';
import { useTranslation } from '../i18n/I18nContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  tools?: SearchableTool[];
  timestamp: number;
}

interface AiChatbotWidgetProps {
  onOpenTool: (slug: string) => void;
  favorites: string[];
  onToggleFavorite: (toolId: string) => void;
}

export const AiChatbotWidget: React.FC<AiChatbotWidgetProps> = ({
  onOpenTool,
  favorites,
  onToggleFavorite
}) => {
  const { locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentQueries, setRecentQueries] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ftns_chat_queries') || '[]');
    } catch {
      return ['pdf jodna hai', 'resume check karna hai', 'notion database banana'];
    }
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Multilingual Initial Greeting
  const getInitialGreeting = (): string => {
    if (locale === 'ja') {
      return `こんにちは！👋 私は2753ツールの専属アシスタントです。\n\nどんな作業をしたいですか？\n• 「PDFを結合したい」\n• 「履歴書のATSスコアを調べたい」\n• 「Notionデータベースを作成したい」\n• 「画像の背景を透過したい」\n\n完全無料・登録不要の最適なツールをご案内します！`;
    }
    if (locale === 'es') {
      return `¡Hola! 👋 Soy tu asistente de 2,753 herramientas.\n\n¿Qué deseas hacer hoy?\n• 'Unir archivos PDF'\n• 'Escanear currículum para ATS'\n• 'Crear base de datos Notion'\n• 'Eliminar fondo de imagen'\n\n¡Te encontraré la herramienta perfecta, 100% gratis y sin registro!`;
    }
    if (locale === 'hi') {
      return `नमस्ते! 👋 मैं आपका 2753 टूल्स का AI असिस्टेंट हूँ।\n\nबताओ - कौन सा टूल चाहिए या क्या काम करना है?\n\nजैसे:\n• 'PDF जोड़ना है'\n• 'Resume का ATS score check करना है'\n• 'Notion database बनाना है'\n• 'Image का background हटाना है'\n\nमैं आपके लिए सबसे सही टूल ढूंढ के देता हूँ — 100% फ्री, कोई साइनअप नहीं!`;
    }
    // Default Hinglish/English mix as requested by user
    return `Namaste! 👋 Mai aapka 2753 tools ka assistant hu.\n\nBatao — Kaunsa tool chahiye ya kya karna hai aapko?\n\nJaise:\n• 'PDF jodna hai'\n• 'Resume ka ATS score check karna hai'\n• 'Notion database banana hai'\n• 'Image ka background hatana hai'\n\nMai aapke liye relevant tool dhundh ke deta hu — 100% free, no signup!`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ftns_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: getInitialGreeting(),
        timestamp: Date.now()
      }
    ];
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ftns_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  // Save recent queries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ftns_chat_queries', JSON.stringify(recentQueries.slice(0, 3)));
    } catch (e) {
      console.error(e);
    }
  }, [recentQueries]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const q = (textToSend || inputQuery).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Update recent queries
    setRecentQueries(prev => [q, ...prev.filter(x => x.toLowerCase() !== q.toLowerCase())].slice(0, 3));

    // Client-side instant semantic search using Fuse.js
    setTimeout(() => {
      const matchedTools = searchToolsSemantic(q, 3);
      
      let botResponseText = '';
      if (matchedTools.length > 0) {
        if (locale === 'ja') {
          botResponseText = `あなたのために最適な3つのツールが見つかりました：`;
        } else if (locale === 'es') {
          botResponseText = `Encontré estas 3 herramientas ideales para tu solicitud:`;
        } else {
          botResponseText = `Aapke liye ye 3 best tools mile:`;
        }
      } else {
        if (locale === 'ja') {
          botResponseText = `完全な一致が見つかりませんでしたが、こちらのおすすめツールをお試しください：`;
        } else if (locale === 'es') {
          botResponseText = `No encontré coincidencia exacta, pero prueba estas herramientas populares:`;
        } else {
          botResponseText = `Maaf karna, iske liye exact tool nahi mila, par ye similar tools try karo:`;
        }
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        tools: matchedTools,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMsg]);

      if (!isOpen) {
        setUnreadCount(c => c + 1);
      }
    }, 250);
  };

  const handleClearHistory = () => {
    const freshGreeting: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'bot',
      text: getInitialGreeting(),
      timestamp: Date.now()
    };
    setMessages([freshGreeting]);
    localStorage.removeItem('ftns_chat_history');
  };

  const handleToolCardClick = (slug: string) => {
    setIsOpen(false);
    onOpenTool(slug);
  };

  const quickChips = [
    { label: 'PDF Merge', query: 'pdf jodna hai' },
    { label: 'ATS Check', query: 'resume check karna hai' },
    { label: 'Notion Builder', query: 'notion database banana' },
    { label: 'BG Remove', query: 'image background hatana' }
  ];

  return (
    <>
      {/* Floating Action Button (Bottom-Right) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
          <button
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
            aria-label="Open 2753 Tools AI Assistant"
            className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#0A1931] to-[#1E293B] border-2 border-[#C5A059] shadow-2xl flex items-center justify-center text-[#C5A059] relative hover:scale-105 active:scale-95 transition-all group"
          >
            {/* Pulsing ring animation */}
            <span className="absolute inset-0 rounded-full border-2 border-[#C5A059] animate-ping opacity-25 pointer-events-none" />
            
            <Sparkles className="w-6 h-6 text-[#C5A059] group-hover:rotate-12 transition-transform" />

            {/* Notification Badge "AI" */}
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#C5A059] to-[#E5C77A] text-[#0A1931] font-black text-[10px] px-1.5 py-0.5 rounded-full shadow-md border border-[#0A1931]">
              AI
            </span>

            {unreadCount > 0 && (
              <span className="absolute -bottom-1 -right-1 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          id="ai-chatbot-window"
          className="fixed bottom-0 sm:bottom-5 right-0 sm:right-5 z-50 w-full sm:w-[380px] h-[100dvh] sm:h-[520px] bg-[#0A1931] sm:rounded-2xl border border-[#C5A059]/40 shadow-2xl flex flex-col overflow-hidden text-white animate-in slide-in-from-bottom-6 duration-200"
        >
          {/* Header */}
          <div className="bg-[#071326] border-b border-[#C5A059]/30 p-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#99732B] flex items-center justify-center text-[#0A1931] font-bold shadow-inner shrink-0">
                <Bot className="w-5 h-5 text-[#0A1931]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 truncate">
                  <span>🤖 Kaunsa tool chahiye?</span>
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 bg-[#C5A059] text-[#0A1931] rounded">
                    2753
                  </span>
                </h3>
                <p className="text-[10px] text-[#C5A059] truncate">
                  Batao kya karna hai, mai relevant tool dhundh ke deta hu
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleClearHistory}
                title="Clear chat history"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0A1931]/95 text-xs selection:bg-[#C5A059] selection:text-[#0A1931]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'bot' && (
                  <span className="text-[10px] font-mono text-[#C5A059] mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C5A059]" /> 2753 Assistant
                  </span>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl p-3 shadow-md whitespace-pre-line leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#B38D46] text-[#0A1931] font-medium rounded-tr-xs'
                      : 'bg-[#142646] text-slate-200 border border-[#C5A059]/20 rounded-tl-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Recommended Tool Cards */}
                {msg.tools && msg.tools.length > 0 && (
                  <div className="w-full mt-2.5 space-y-2">
                    {msg.tools.map((tool) => (
                      <ChatToolCard
                        key={tool.id}
                        tool={tool}
                        isFavorite={favorites.includes(tool.slug || tool.id)}
                        onToggleFavorite={onToggleFavorite}
                        onOpenTool={handleToolCardClick}
                      />
                    ))}
                    <p className="text-[10px] text-slate-400 italic pt-1 text-center">
                      Koi aur kaam hai? Batao mai dhundh ke deta hu ✨
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-[#071326] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[10px] text-slate-400 font-semibold shrink-0">Quick:</span>
            {quickChips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleSendMessage(chip.query)}
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#E5C77A] border border-[#C5A059]/30 text-[10px] whitespace-nowrap font-medium transition"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Recent Searches Chips */}
          {recentQueries.length > 0 && (
            <div className="px-3 py-1.5 bg-[#071326] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[10px] text-slate-400">
              <span className="shrink-0 text-slate-500">Recent:</span>
              {recentQueries.map((rq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(rq)}
                  className="truncate max-w-[120px] text-[#C5A059] hover:underline"
                >
                  "{rq}"
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-[#071326] border-t border-[#C5A059]/30 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Likho - jaise 'pdf merge karna hai'..."
                className="flex-1 px-3.5 py-2.5 bg-[#0A1931] border border-[#C5A059]/40 focus:border-[#C5A059] rounded-xl text-xs text-white placeholder:text-slate-400 outline-none transition shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4B06A] text-[#0A1931] font-bold disabled:opacity-40 transition active:scale-95 shadow-md flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
