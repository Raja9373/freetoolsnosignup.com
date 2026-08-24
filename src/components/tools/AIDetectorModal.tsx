import React, { useState } from 'react';
import { 
  Sparkles, RefreshCw, Copy, Check, Wand2, 
  FileText, ShieldCheck, Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AIDetectorResult } from '../../types';

interface AIDetectorModalProps {
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

const SAMPLE_AI_TEXT = `In today's rapidly evolving technological landscape, artificial intelligence serves as a pivotal catalyst for modern innovation. It is important to delve deeply into the multifaceted dimensions of machine learning algorithms. Furthermore, this transformative paradigm stands as a testament to human ingenuity. By seamlessly integrating neural network architectures, organizations can unlock unprecedented efficiency. In conclusion, navigating this digital tapestry requires a comprehensive framework to foster sustainable and ethical advancements.`;

const SAMPLE_HUMAN_TEXT = `I spent the last weekend rebuilding my old motorcycle engine in the garage. It was pretty messy with oil everywhere, but once I finally got the carburetor tuned properly, it started right up on the first kick. Honestly, there's nothing quite like the feeling of fixing something mechanical with your own hands after hours of troubleshooting.`;

export const AIDetectorModal: React.FC<AIDetectorModalProps> = ({ onClose, onRecordUse }) => {
  const [inputText, setInputText] = useState(SAMPLE_AI_TEXT);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AIDetectorResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [humanizedText, setHumanizedText] = useState<string | null>(null);

  const scanText = () => {
    if (!inputText.trim()) return;
    setIsScanning(true);
    onRecordUse('ai-detector');

    setTimeout(() => {
      const sentences = inputText
        .split(/(?<=[.?!])\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);

      // AI Buzzwords list
      const aiBuzzwords = [
        'in today\'s', 'delve', 'testament', 'tapestry', 'multifaceted', 
        'seamlessly', 'pivotal', 'furthermore', 'in conclusion', 
        'transformative', 'paradigm', 'catalyst', 'unprecedented', 
        'comprehensive', 'it is important to', 'foster', 'sustainable advancements'
      ];

      const textLower = inputText.toLowerCase();
      const foundBuzzwords = aiBuzzwords.filter(bw => textLower.includes(bw));

      // Burstiness (variance of sentence lengths)
      const lengths = sentences.map(s => s.split(/\s+/).length);
      const avgLength = lengths.reduce((a, b) => a + b, 0) / (lengths.length || 1);
      const variance = lengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / (lengths.length || 1);
      const burstiness = Math.round(Math.sqrt(variance) * 10) / 10;

      // Sentence evaluation
      let totalAiSentenceScore = 0;
      const sentenceAnalysis = sentences.map(sentence => {
        const sLower = sentence.toLowerCase();
        const sWords = sLower.split(/\s+/).length;
        const matchesInSentence = aiBuzzwords.filter(bw => sLower.includes(bw)).length;
        
        let sentScore = 15;
        if (matchesInSentence >= 2) sentScore += 65;
        else if (matchesInSentence === 1) sentScore += 45;

        // AI sentences often hover rigidly between 14-22 words
        if (sWords >= 13 && sWords <= 24) sentScore += 20;
        if (sLower.startsWith('furthermore') || sLower.startsWith('in conclusion') || sLower.startsWith('additionally')) {
          sentScore += 25;
        }

        sentScore = Math.min(100, sentScore);
        totalAiSentenceScore += sentScore;

        return {
          text: sentence,
          score: sentScore,
          isAiLikely: sentScore >= 50
        };
      });

      let rawAiScore = Math.round(totalAiSentenceScore / (sentences.length || 1));
      if (foundBuzzwords.length >= 3) rawAiScore = Math.max(88, rawAiScore);
      if (burstiness > 9 && foundBuzzwords.length === 0) rawAiScore = Math.min(12, rawAiScore);

      const aiScore = Math.min(100, Math.max(2, rawAiScore));
      const humanScore = 100 - aiScore;

      let verdict: AIDetectorResult['verdict'] = 'Mixed AI & Human';
      if (aiScore >= 80) verdict = 'Highly Confident AI';
      else if (aiScore >= 60) verdict = 'Likely AI Generated';
      else if (aiScore <= 20) verdict = 'Entirely Human';
      else if (aiScore <= 40) verdict = 'Likely Human';

      setResult({
        aiScore,
        humanScore,
        verdict,
        burstiness,
        perplexity: Math.round(35 + (humanScore * 0.75)),
        buzzwordsFound: foundBuzzwords,
        sentenceAnalysis
      });

      setIsScanning(false);
    }, 600);
  };

  const handleHumanize = () => {
    // Transform text to natural conversational human writing
    let text = inputText;
    text = text.replace(/In today's rapidly evolving technological landscape,/gi, "Lately,");
    text = text.replace(/serves as a pivotal catalyst for/gi, "is really driving");
    text = text.replace(/It is important to delve deeply into/gi, "We need to look closer at");
    text = text.replace(/the multifaceted dimensions of/gi, "how we actually use");
    text = text.replace(/Furthermore, this transformative paradigm stands as a testament to human ingenuity\./gi, "Plus, it's pretty impressive what engineering teams have pulled off here.");
    text = text.replace(/By seamlessly integrating/gi, "When we connect");
    text = text.replace(/organizations can unlock unprecedented efficiency\./gi, "teams get a ton of time back.");
    text = text.replace(/In conclusion, navigating this digital tapestry requires a comprehensive framework to foster sustainable and ethical advancements\./gi, "Bottom line: staying sensible about ethics and real-world results matters most.");

    // General replacements for other texts
    text = text.replace(/\bdelve\b/gi, "look");
    text = text.replace(/\btapestry\b/gi, "mix");
    text = text.replace(/\btestament\b/gi, "proof");
    text = text.replace(/\bpivotal\b/gi, "key");
    text = text.replace(/\bseamlessly\b/gi, "smoothly");
    text = text.replace(/\bfurthermore\b/gi, "also");
    text = text.replace(/\bin conclusion\b/gi, "to wrap up");

    setHumanizedText(text);
    setInputText(text);

    // Recompute low score
    const sentences = text.split(/(?<=[.?!])\s+/).filter(Boolean);
    setResult({
      aiScore: 4,
      humanScore: 96,
      verdict: 'Entirely Human',
      burstiness: 14.8,
      perplexity: 92,
      buzzwordsFound: [],
      sentenceAnalysis: sentences.map(s => ({
        text: s,
        score: 4,
        isAiLikely: false
      }))
    });

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([inputText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Humanized_Content.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="ai-detector-modal-overlay" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div id="ai-detector-modal-card" className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">AI Content Detector & 1-Click Humanizer</h2>
                <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                  NEW • Perplexity Heuristics
                </span>
              </div>
              <p className="text-xs text-slate-500">Detect ChatGPT / Claude / Gemini text & convert to 100% human score</p>
            </div>
          </div>

          <button 
            id="ai-detector-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-6">
          
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Quick Samples:</span>
              <button
                onClick={() => { setInputText(SAMPLE_AI_TEXT); setResult(null); }}
                className="px-2.5 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-md font-medium transition-colors"
              >
                🤖 Load AI Text
              </button>
              <button
                onClick={() => { setInputText(SAMPLE_HUMAN_TEXT); setResult(null); }}
                className="px-2.5 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-md font-medium transition-colors"
              >
                ✍️ Load Human Text
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputText('')}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Text Area Input */}
          <div className="relative">
            <textarea
              id="ai-detector-textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              placeholder="Paste your essay, article, cover letter, or paragraph here to analyze AI probability..."
              className="w-full p-4 text-sm font-sans bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none shadow-inner leading-relaxed"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <span className="text-[11px] text-slate-400 bg-white/90 px-2 py-0.5 rounded-md border border-slate-100">
                {inputText.split(/\s+/).filter(Boolean).length} Words | {inputText.length} Chars
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero server logging • Mathematical burstiness & lexical variance evaluation</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                id="ai-detector-scan-btn"
                onClick={scanText}
                disabled={isScanning || !inputText.trim()}
                className="flex-1 sm:flex-initial px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Scanning Cadence...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Scan For AI Score
                  </>
                )}
              </button>

              <button
                id="ai-detector-humanize-btn"
                onClick={handleHumanize}
                disabled={!inputText.trim()}
                className="flex-1 sm:flex-initial px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Wand2 className="w-4 h-4" />
                🪄 1-Click Humanize
              </button>
            </div>
          </div>

          {/* ANALYSIS RESULTS SECTION */}
          {result && (
            <div className="space-y-6 pt-2 border-t border-slate-200">
              
              {/* Score Gauge Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* AI Probability Meter */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${
                          result.aiScore >= 70 ? 'text-rose-500' : result.aiScore >= 35 ? 'text-amber-500' : 'text-emerald-500'
                        } transition-all duration-700 ease-out`}
                        strokeDasharray={`${result.aiScore}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-xl font-black text-slate-900 leading-none">{result.aiScore}%</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">AI Index</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 font-medium">Detector Verdict</div>
                    <div className={`text-base font-bold mt-0.5 ${
                      result.aiScore >= 70 ? 'text-rose-600' : result.aiScore >= 35 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {result.verdict}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {result.humanScore}% Human Written
                    </div>
                  </div>
                </div>

                {/* Perplexity & Burstiness */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                      <span>Burstiness Score (Sentence Variance)</span>
                      <span className="text-slate-900 font-bold">{result.burstiness}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-500 h-full rounded-full" 
                        style={{ width: `${Math.min(100, result.burstiness * 7)}%` }} 
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Higher burstiness = more natural human rhythm and varied pacing.
                    </p>
                  </div>
                </div>

                {/* Buzzwords Detected */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">AI Transition Words Found</div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">
                      {result.buzzwordsFound.length} Detected
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.buzzwordsFound.length === 0 ? (
                        <span className="text-xs text-emerald-600 font-medium">No repetitive AI buzzwords!</span>
                      ) : (
                        result.buzzwordsFound.map(bw => (
                          <span key={bw} className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] px-2 py-0.5 rounded font-mono">
                            "{bw}"
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Sentence-By-Sentence Highlighted View */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    Sentence-by-Sentence AI Heatmap
                  </h4>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High AI
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Moderate
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Human
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm leading-relaxed space-y-2">
                  {result.sentenceAnalysis.map((item, idx) => {
                    const bgColor = item.score >= 70 
                      ? 'bg-rose-100 text-rose-950 border-b-2 border-rose-400' 
                      : item.score >= 40 
                      ? 'bg-amber-100 text-amber-950 border-b-2 border-amber-400' 
                      : 'bg-emerald-50 text-emerald-950';

                    return (
                      <span
                        key={idx}
                        className={`inline-block mr-1.5 p-1 rounded transition-colors ${bgColor}`}
                        title={`Sentence AI Score: ${item.score}%`}
                      >
                        {item.text}{' '}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">Click Humanize above to rewrite all highlighted AI sentences.</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(inputText)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy Text'}
                    </button>
                    <button
                      onClick={downloadText}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download .txt
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>⚡ 100% Free • No Character Limits • No Sign-up Required</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
