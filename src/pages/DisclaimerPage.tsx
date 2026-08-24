import React, { useEffect } from 'react';
import { AlertCircle, ArrowLeft, ShieldAlert, DollarSign, Briefcase, Sparkles, Activity, FileCheck } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

export const DisclaimerPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  useEffect(() => {
    document.title = 'Legal & Technical Disclaimer | FreeToolsNoSignup.com';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools</span>
            </button>
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onNavigateHome(); }}
              className="flex items-center gap-2"
            >
              <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                FTNS
              </span>
              <span className="font-extrabold text-sm text-slate-900">
                FreeToolsNoSignup<span className="text-amber-500">.com</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              Legal Advisory
            </span>
          </div>
        </div>
      </header>

      {/* Top AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pt-4 w-full">
        <AdSenseBanner slotType="leaderboard" />
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-slate-800">Home</a>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Disclaimer</span>
        </nav>

        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <header className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              IMPORTANT NOTICES & USAGE DISCLAIMERS
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Legal & Technical Disclaimer
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Applies to all 521 tools on FreeToolsNoSignup.com • Last Reviewed: August 2026
            </p>
          </header>

          {/* Section 1: General Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. General Information Disclaimer</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              The information and automated utilities provided by FreeToolsNoSignup.com ("we", "us", or "our") on https://www.freetoolsnosignup.com (the "Site") are for general informational, educational, and computational assistance purposes only. All tools on the Site are provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any calculated figures, scores, or generated outputs.
            </p>
          </section>

          {/* Section 2: Financial Calculators */}
          <section className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              2. Financial, Mortgage & Tax Calculators Disclaimer
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our financial utilities—including the Loan EMI Calculator, Compound Interest & SIP Wealth Planner, Net Salary Take-Home Estimator, and Sales VAT/GST Calculator:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
              <li>Are intended strictly for hypothetical estimation based on mathematical formulas (standard compound interest and annuity equations).</li>
              <li>Do not account for bank-specific processing fees, variable interest adjustments, regional surcharges, prepayment penalties, or changing municipal tax laws.</li>
              <li><strong>Do NOT constitute professional financial, investment, accounting, or tax advice.</strong> Always seek the counsel of a licensed financial planner, tax accountant, or your mortgage lender before signing financial contracts.</li>
            </ul>
          </section>

          {/* Section 3: Job & ATS Resume Optimizer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-600" />
              3. ATS Resume Checker & Employment Outcomes
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              The ATS Score Checker & Optimizer analyzes text based on standard industry keyword matching, action-verb density, and metric presence heuristics. Proprietary Applicant Tracking Systems (such as Workday, Greenhouse, Taleo, or Lever) utilize distinct, undisclosed parsing algorithms and human recruiter screening criteria. Achieving an ATS score of 90%+ on our tool does not guarantee job interviews, placement, or hiring success.
            </p>
          </section>

          {/* Section 4: AI Detector & Paraphraser */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              4. AI Content Detector & Text Analytics
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              The AI Content Detector evaluates sentence length variance (burstiness) and common predictive transitional tokens. Because human writers frequently employ structured syntax and AI models continuously evolve, no heuristic detector is 100% accurate. Output scores are probabilistic estimates and should never be used as sole or definitive evidence in academic misconduct accusations or disciplinary decisions.
            </p>
          </section>

          {/* Section 5: Health & Fitness (BMI) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              5. Health & BMI Calculator Disclaimer
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              The BMI (Body Mass Index) and calorie expenditure calculators use standard World Health Organization (WHO) statistical reference categories. BMI is a population-level screening metric that does not differentiate between muscle mass, bone density, or fat distribution. It is not a clinical medical diagnosis. Consult a licensed physician or registered dietitian for personalized medical advice.
            </p>
          </section>

          {/* Section 6: Synthetic Test Cards & Mock Data */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-cyan-600" />
              6. Synthetic Test Data & Developer Tools
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Credit card numbers generated by our Fake Data Suite are algorithmically calculated using the public Luhn Modulo-10 checksum algorithm strictly for software QA, checkout validation testing, and dummy database seeding. These numbers have no linked bank accounts, zero funds, and attempting to use them for real purchases is strictly prohibited by law.
            </p>
          </section>

          {/* Section 7: External Links & Ads */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900">7. External Advertisements & Third-Party Content</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              The Site contains advertisements placed by third-party advertising services (e.g. Google AdSense). We do not control or take responsibility for the products or services offered by these third parties. Your interactions with advertisers are solely between you and the respective advertiser.
            </p>
            <p className="text-slate-400 text-xs mt-2">
              For questions concerning this disclaimer, please contact: legal@freetoolsnosignup.com
            </p>
          </section>
        </article>
      </main>

      {/* Bottom AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pb-8 w-full">
        <AdSenseBanner slotType="leaderboard" />
      </div>
    </div>
  );
};
