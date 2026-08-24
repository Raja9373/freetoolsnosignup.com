import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle2, AlertCircle, Sparkles, Download, 
  Copy, RefreshCw, FileText, ArrowRight, Check, Zap, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ATSAnalysisResult } from '../../types';

interface ATSToolModalProps {
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

const SAMPLE_RESUME = `ALEX MORGAN
Senior Full-Stack Software Engineer
Email: alex.morgan@email.com | Portfolio: alexmorgan.dev | GitHub: github.com/alexmorgan

PROFESSIONAL SUMMARY
Results-driven Software Engineer with 6+ years of experience designing and scaling web applications. Proficient in TypeScript, React, Node.js, and Cloud architectures. Proven track record of improving site performance by 40% and leading agile engineering squads.

WORK EXPERIENCE
Senior Frontend Engineer | CloudScale Inc. (2022 - Present)
- Engineered responsive user interfaces using React, Next.js, and Tailwind CSS for 450,000 monthly active users.
- Spearheaded the migration of legacy REST endpoints to GraphQL, decreasing average payload latency by 35%.
- Collaborated with UX designers and product managers in 2-week agile sprints.

Full-Stack Developer | TechVanguard Labs (2019 - 2022)
- Developed secure microservices in Node.js, Express, and PostgreSQL.
- Implemented automated CI/CD pipelines with GitHub Actions and Docker.
- Optimized database indexing to reduce complex query execution times from 850ms to 95ms.

SKILLS
- Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
- Frameworks: React, Next.js, Node.js, Express, Tailwind CSS
- Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, EC2), Docker`;

const SAMPLE_JD = `Job Title: Staff / Senior Full-Stack Engineer
Location: Remote
Company: Horizon Next Technologies

We are seeking a Senior Full-Stack Engineer with expertise in building high-scale distributed systems.

Required Qualifications:
- 5+ years of production experience with TypeScript, React, and Node.js
- Strong proficiency with PostgreSQL, Redis caching, and Docker containerization
- Hands-on experience with Kubernetes, AWS cloud infrastructure, and microservices architecture
- Experience with Unit Testing (Jest / Vitest), End-to-End Testing (Cypress / Playwright), and CI/CD pipelines
- Proven ability to mentor junior engineers, drive architectural reviews, and implement System Design patterns
- Excellent communication and cross-functional leadership in agile environments`;

export const ATSToolModal: React.FC<ATSToolModalProps> = ({ onClose, onRecordUse }) => {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [jobDescription, setJobDescription] = useState(SAMPLE_JD);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'analysis' | 'optimized'>('input');
  const [copied, setCopied] = useState(false);

  const analyzeATS = () => {
    setIsAnalyzing(true);
    onRecordUse('ats-checker');

    setTimeout(() => {
      // Analyze text keywords against job description
      const jdTokens = Array.from(new Set(
        jobDescription
          .toLowerCase()
          .replace(/[^\w\s-]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length > 2)
      ));

      // Key technical skills dictionary to look for
      const targetKeywords = [
        'typescript', 'react', 'node.js', 'postgresql', 'redis', 'docker', 
        'kubernetes', 'aws', 'microservices', 'graphql', 'ci/cd', 'testing', 
        'jest', 'vitest', 'cypress', 'playwright', 'system design', 'agile',
        'mentorship', 'architecture', 'scalability', 'performance', 'rest'
      ];

      const jdSkillList = targetKeywords.filter(k => 
        jobDescription.toLowerCase().includes(k)
      );

      const resumeLower = resumeText.toLowerCase();
      const matched: string[] = [];
      const missing: string[] = [];

      jdSkillList.forEach(skill => {
        if (resumeLower.includes(skill)) {
          matched.push(skill);
        } else {
          missing.push(skill);
        }
      });

      // Check action verbs
      const actionVerbs = ['spearheaded', 'engineered', 'architected', 'optimized', 'developed', 'led', 'scaled', 'implemented', 'designed'];
      const actionVerbMatches = actionVerbs.filter(v => resumeLower.includes(v));
      const actionVerbScore = Math.min(100, Math.round((actionVerbMatches.length / 5) * 100));

      // Check metrics / numbers ($ % numbers)
      const metricsMatches = (resumeText.match(/(\d+[%$kKmMbB]?|\$\d+)/g) || []).length;
      const measurableResultsScore = Math.min(100, Math.round((metricsMatches / 6) * 100));

      // Formatting score
      const formattingScore = resumeText.includes('EXPERIENCE') && resumeText.includes('SKILLS') && resumeText.includes('SUMMARY') ? 95 : 70;

      // Keyword match ratio
      const keywordRatio = jdSkillList.length > 0 ? (matched.length / jdSkillList.length) : 0.85;
      const rawScore = Math.round((keywordRatio * 55) + (actionVerbScore * 0.15) + (measurableResultsScore * 0.15) + (formattingScore * 0.15));
      const score = Math.min(99, Math.max(38, rawScore));

      let grade: ATSAnalysisResult['grade'] = 'Needs Work';
      if (score >= 90) grade = 'A+';
      else if (score >= 80) grade = 'A';
      else if (score >= 70) grade = 'B';
      else if (score >= 60) grade = 'C';

      // Generate optimized text that incorporates missing keywords in clean format
      const missingSkillsFormatted = missing.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ');
      
      const optimizedResume = resumeText + `\n\nADDITIONAL ATS-TARGETED COMPETENCIES & KEYWORDS\n- Core Competencies: ${missingSkillsFormatted}, Distributed Systems, High-Concurrency Architectures\n- Testing & CI/CD: Automated Unit/Integration Testing (Vitest, Playwright), Cloud Deployment Workflows`;

      const suggestions = [];
      if (missing.length > 0) {
        suggestions.push(`Add ${missing.length} missing keywords found in the JD: ${missing.slice(0, 4).join(', ')}.`);
      }
      if (measurableResultsScore < 80) {
        suggestions.push('Add more quantifiable achievements (e.g., "boosted speed by 35%", "scaled to 500k users").');
      }
      if (actionVerbScore < 80) {
        suggestions.push('Start bullet points with strong impact verbs like "Architected", "Spearheaded", "Engineered".');
      }
      suggestions.push('Ensure section headings match standard ATS parsers: SUMMARY, EXPERIENCE, EDUCATION, SKILLS.');

      setResult({
        score,
        grade,
        matchedKeywords: matched,
        missingKeywords: missing,
        formattingScore,
        actionVerbScore,
        measurableResultsScore,
        suggestions,
        optimizedResumeText: optimizedResume
      });

      setIsAnalyzing(false);
      setActiveTab('analysis');

      if (score >= 75) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    }, 650);
  };

  const handleFixAndOptimize = () => {
    if (!result) return;
    setResumeText(result.optimizedResumeText);
    setActiveTab('optimized');
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsTxt = () => {
    const textToDownload = activeTab === 'optimized' && result ? result.optimizedResumeText : resumeText;
    const element = document.createElement('a');
    const file = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'ATS_Optimized_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="ats-modal-overlay" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div id="ats-modal-card" className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">ATS Resume Score Checker & Auto-Fixer</h2>
                <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                  HOT • 100% Working
                </span>
              </div>
              <p className="text-xs text-slate-500">Scan match rate against JD, detect missing keywords, and 1-click optimize</p>
            </div>
          </div>

          <button 
            id="ats-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-4 bg-slate-50 text-sm font-medium text-slate-600 gap-2 pt-2">
          <button
            id="ats-tab-input"
            onClick={() => setActiveTab('input')}
            className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'input' 
                ? 'border-amber-500 text-amber-900 font-semibold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" /> 1. Input Resume & JD
          </button>
          <button
            id="ats-tab-analysis"
            onClick={() => { if (result) setActiveTab('analysis'); else analyzeATS(); }}
            className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'analysis' 
                ? 'border-amber-500 text-amber-900 font-semibold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" /> 2. ATS Score & Diagnostics {result ? `(${result.score}%)` : ''}
          </button>
          <button
            id="ats-tab-optimized"
            onClick={() => { if (result) setActiveTab('optimized'); }}
            disabled={!result}
            className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'optimized' 
                ? 'border-amber-500 text-amber-900 font-semibold' 
                : !result ? 'opacity-40 cursor-not-allowed border-transparent' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" /> 3. Optimized ATS Version
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
          
          {/* TAB 1: INPUTS */}
          {activeTab === 'input' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Resume Box */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                      <span>Your Resume (Paste Plain Text)</span>
                    </label>
                    <button 
                      onClick={() => setResumeText(SAMPLE_RESUME)}
                      className="text-xs text-amber-600 hover:text-amber-700 font-medium underline"
                    >
                      Load Sample Resume
                    </button>
                  </div>
                  <textarea
                    id="ats-resume-textarea"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    rows={13}
                    placeholder="Paste your current resume content here..."
                    className="w-full p-3 text-xs sm:text-sm font-mono bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none shadow-inner"
                  />
                  <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                    <span>{resumeText.split(/\s+/).filter(Boolean).length} words</span>
                    <span>100% Private in Browser</span>
                  </div>
                </div>

                {/* Job Description Box */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                      <span>Target Job Description (JD)</span>
                    </label>
                    <button 
                      onClick={() => setJobDescription(SAMPLE_JD)}
                      className="text-xs text-amber-600 hover:text-amber-700 font-medium underline"
                    >
                      Load Sample JD
                    </button>
                  </div>
                  <textarea
                    id="ats-jd-textarea"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={13}
                    placeholder="Paste the target job posting / requirements here..."
                    className="w-full p-3 text-xs sm:text-sm font-mono bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none shadow-inner"
                  />
                  <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                    <span>{jobDescription.split(/\s+/).filter(Boolean).length} words</span>
                    <span>Extracts key hard skills & tools</span>
                  </div>
                </div>

              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500 hidden sm:block">
                  💡 ATS algorithms check keyword density, action verbs, and standard headings.
                </div>
                <button
                  id="ats-calculate-btn"
                  onClick={analyzeATS}
                  disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      Analyzing ATS Match...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-slate-950" />
                      Calculate ATS Score Now
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ANALYSIS & SCORE */}
          {activeTab === 'analysis' && result && (
            <div className="space-y-6">
              
              {/* Score Hero Banner */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                
                <div className="flex items-center gap-5">
                  {/* Circular Score Gauge */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
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
                          result.score >= 80 ? 'text-emerald-500' : result.score >= 65 ? 'text-amber-500' : 'text-rose-500'
                        } transition-all duration-1000 ease-out`}
                        strokeDasharray={`${result.score}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-slate-900 leading-none">{result.score}%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Match</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        {result.score >= 85 ? 'Strong ATS Match!' : result.score >= 70 ? 'Moderate ATS Match' : 'High Rejection Risk'}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                        result.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        Grade {result.grade}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {result.score >= 85 
                        ? 'Your resume contains top skills, strong action verbs, and clear metrics for this job.'
                        : 'Recruiters ATS filters may discard this CV due to missing key technical qualifications.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                  <button
                    id="ats-autofix-btn"
                    onClick={handleFixAndOptimize}
                    className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    Auto-Fix & Enhance Resume
                  </button>
                  <button
                    onClick={() => setActiveTab('input')}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all"
                  >
                    Edit Input
                  </button>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Keywords Match</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {result.matchedKeywords.length} of {result.matchedKeywords.length + result.missingKeywords.length} Skills
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${(result.matchedKeywords.length / (result.matchedKeywords.length + result.missingKeywords.length || 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Impact & Action Verbs</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{result.actionVerbScore}% Score</div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${result.actionVerbScore}%` }} />
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Quantifiable Metrics</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{result.measurableResultsScore}% Presence</div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${result.measurableResultsScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Missing vs Matched Keywords Chips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Missing Keywords */}
                <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    Missing Critical Skills ({result.missingKeywords.length})
                  </div>
                  <p className="text-xs text-rose-700/80 mb-3">
                    These keywords appear in the job requirements but were not detected in your resume:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.length === 0 ? (
                      <span className="text-xs text-emerald-700 font-medium">Awesome! No major skills missing.</span>
                    ) : (
                      result.missingKeywords.map(skill => (
                        <span 
                          key={skill}
                          className="bg-rose-100 text-rose-800 border border-rose-300 text-xs px-2.5 py-1 rounded-md font-medium"
                        >
                          + {skill}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Matched Keywords */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Successfully Matched Skills ({result.matchedKeywords.length})
                  </div>
                  <p className="text-xs text-emerald-700/80 mb-3">
                    These skills matched the target JD perfectly:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.map(skill => (
                      <span 
                        key={skill}
                        className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Actionable Suggestions */}
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Actionable ATS Recommendations
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {result.suggestions.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* TAB 3: OPTIMIZED RESUME */}
          {activeTab === 'optimized' && result && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Resume optimized with missing JD keywords & ATS section headers!</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="ats-copy-opt-btn"
                    onClick={() => copyToClipboard(result.optimizedResumeText)}
                    className="px-3 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                  <button
                    id="ats-download-opt-btn"
                    onClick={downloadAsTxt}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download .txt
                  </button>
                </div>
              </div>

              <textarea
                value={result.optimizedResumeText}
                readOnly
                rows={14}
                className="w-full p-4 text-xs font-mono bg-white border border-slate-200 rounded-xl outline-none resize-none shadow-inner text-slate-800"
              />
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Client-Side Privacy • No Data Saved on Servers</span>
          </div>
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
