import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, ArrowRight } from 'lucide-react';
import { searchToolsSemantic, SearchableTool } from '../utils/aiToolSearch';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  tools?: SearchableTool[];
  timestamp: number;
}

export default function AiChatbotWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // CRITICAL: Only mount on client
  useEffect(() => {
    setMounted(true);
    console.log('AiChatbotWidget mounted - live check');
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: "Namaste! 👋 Mai aapka 3253 tools ka AI assistant hu.\n\nBatao — Kaunsa tool chahiye ya kya karna hai aapko?\n\nJaise:\n• 'PDF jodna hai'\n• 'Resume ka ATS score check karna hai'\n• 'Notion database banana hai'\n• 'Image ka background hatana hai'",
        timestamp: Date.now()
      }
    ]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const q = (textToSend !== undefined ? textToSend : query).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      try {
        const foundTools = searchToolsSemantic(q);
        const botText = foundTools.length > 0
          ? `Yeh rahe ${foundTools.length} sabse behtareen tools aapke query ke liye:`
          : "Mujhe is query se milta-julta tool nahi mila, aap upar search bar ya category filters use kar sakte hain!";
        
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botText,
          tools: foundTools.slice(0, 4),
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, botMsg]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsTyping(false);
      }
    }, 400);
  };

  if (!mounted) return null; // Don't render on server

  return (
    <>
      {/* Floating Button - Always visible bottom-6 right-6 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-br from-[#0A1931] to-[#162B4D] border-2 border-[#C5A059] shadow-2xl flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform text-white group"
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
        aria-label="Open AI Assistant"
      >
        <span className="group-hover:rotate-12 transition-transform">🤖</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[9999] w-[380px] max-w-[calc(100vw-32px)] h-[540px] bg-[#0F172A] rounded-2xl shadow-2xl border border-[#C5A059]/40 flex flex-col overflow-hidden font-sans"
          style={{ position: 'fixed', bottom: '96px', right: '24px', zIndex: 9999 }}
        >
          {/* Header */}
          <div className="p-4 bg-[#0A1931] border-b border-[#C5A059]/20 flex justify-between items-center">
            <div>
              <div className="text-white font-bold flex items-center gap-2 text-sm">
                🤖 Kaunsa tool chahiye? <span className="bg-[#C5A059] text-[#0A1931] px-2 py-0.5 rounded text-[10px] font-mono">3253</span>
              </div>
              <div className="text-gray-400 text-[11px]">Batao kya karna hai, mai tool dhundh ke deta hu</div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 text-gray-200 text-xs space-y-3 overflow-y-auto flex-1 bg-[#090D16]">
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-xl max-w-[90%] leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-[#1E3A8A] text-white rounded-br-xs'
                    : 'bg-[#1E293B] text-gray-100 border border-gray-800 rounded-bl-xs'
                }`}>
                  {msg.text}
                </div>
                {msg.tools && msg.tools.length > 0 && (
                  <div className="mt-2 space-y-1.5 w-full">
                    {msg.tools.map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          window.location.hash = `/tools/${tool.slug || tool.id}`;
                          setIsOpen(false);
                        }}
                        className="w-full text-left p-2.5 bg-[#141C2E] hover:bg-[#1E293B] border border-[#C5A059]/30 rounded-xl transition flex items-center justify-between group"
                      >
                        <div className="truncate">
                          <div className="font-bold text-[#C5A059] text-xs group-hover:underline">{tool.name}</div>
                          <div className="text-[10px] text-gray-400 truncate">{tool.description}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-400 text-xs italic flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce [animation-delay:0.4s]" />
                <span>AI tool dhundh raha hai...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick chips */}
          <div className="p-2.5 bg-[#0A1931] border-t border-gray-800 flex gap-1.5 flex-wrap overflow-x-auto no-scrollbar">
            {['PDF Merge', 'ATS Check', 'Notion Builder', 'BG Remove', 'QR Code'].map(chip => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="px-2.5 py-1 bg-[#1E293B] hover:bg-[#283852] text-[#C5A059] rounded-full text-[11px] border border-[#C5A059]/30 transition shrink-0 cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#0A1931] border-t border-[#C5A059]/20 flex gap-2">
            <input
              type="text"
              placeholder="Likho - jaise 'pdf merge karna hai'..."
              className="flex-1 bg-[#141C2E] text-white rounded-full px-4 py-2 text-xs outline-none border border-gray-700 focus:border-[#C5A059]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-full bg-[#C5A059] hover:bg-[#D4AF67] text-[#0A1931] flex items-center justify-center transition shadow-md cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
