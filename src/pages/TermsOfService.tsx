import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onNavigateHome: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#E2E8F0] space-y-6">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#126BFF] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-6">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">Terms of Service</h1>
            <p className="text-xs text-[#64748B] mt-1">Last Updated: 15 Sep 2026</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-4 text-sm text-[#334155] leading-relaxed">
          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">1. Free Use</h3>
          <p>
            All tools free - No warranty - Formulas from public domain - Verify critical calculations.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">2. No Liability</h3>
          <p>
            Not responsible for financial/health decisions - Consult professional.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">3. No Abuse</h3>
          <p>
            Don't overload - 100% client-side so no server abuse possible.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">4. Intellectual Property</h3>
          <p>
            Original code - Formulas public domain.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">5. AdSense</h3>
          <p>
            Ads may appear - We don't control ad content.
          </p>
        </div>
      </div>
    </div>
  );
};
