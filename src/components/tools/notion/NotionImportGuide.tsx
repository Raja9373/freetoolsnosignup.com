import React, { useState } from 'react';
import { Download, UploadCloud, CheckCircle2, ChevronDown, ChevronUp, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

export const NotionImportGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    {
      q: 'How do I import the generated CSV into Notion?',
      a: 'In Notion, create or open any workspace page. Click the "..." top-right menu, select "Import", and choose "CSV". Upload your downloaded CSV file — Notion will automatically create a database with your customized column headers and sample data.'
    },
    {
      q: 'Can I add more column types or change existing options in Notion?',
      a: 'Yes! Once imported into Notion, your database is 100% native Notion. You can freely add relations, rollups, formulas, view boards, calendars, or customize select tag colors directly within Notion.'
    },
    {
      q: 'Is this Notion Database Builder 100% free with no signup?',
      a: 'Yes, completely free with zero signup or account creation required. Everything runs locally inside your web browser with complete privacy.'
    },
    {
      q: 'Which 18 column types are supported in the builder?',
      a: 'The builder supports Title, Text, Number, Select, Multi-select, Status, Date, Person, File & Media, Checkbox, URL Link, Email, Phone, Rating, Progress, Created Time, Last Edited Time, and Formula.'
    }
  ];

  return (
    <section className="space-y-6 pt-4">
      {/* 3-Step Notion Import Guide */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1F5F9] pb-4">
          <div>
            <h3 className="text-lg font-black text-[#0A1931] tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
              How to Import Your Database into Notion (3 Simple Steps)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Zero coding or setup required — import in under 10 seconds.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Native Notion Format
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 relative">
            <div className="w-8 h-8 rounded-lg bg-[#0A1931] text-[#C5A059] font-black text-sm flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-sm text-[#0A1931]">
              Download CSV
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Design your columns or pick one of the 25 presets, then click the golden <strong>"Download CSV for Notion"</strong> button.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 relative">
            <div className="w-8 h-8 rounded-lg bg-[#0A1931] text-[#C5A059] font-black text-sm flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-sm text-[#0A1931]">
              Open Notion & Import
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open your Notion workspace, click <strong>"Import"</strong> from the sidebar or page menu (<code>...</code>), and select <strong>"CSV"</strong>.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 relative">
            <div className="w-8 h-8 rounded-lg bg-[#0A1931] text-[#C5A059] font-black text-sm flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-sm text-[#0A1931]">
              Database Ready
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Notion will automatically detect all columns, create matching properties, and fill in your test rows instantly!
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <h3 className="text-base font-black text-[#0A1931] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#C5A059]" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-2 divide-y divide-[#F1F5F9]">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="pt-2">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-2 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#0A1931] hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {openFaq === idx && (
                <p className="text-xs text-slate-600 leading-relaxed pb-3 pr-4 animate-in fade-in duration-150">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
