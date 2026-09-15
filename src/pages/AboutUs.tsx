import React from 'react';
import { Globe, ArrowLeft } from 'lucide-react';

interface AboutUsProps {
  onNavigateHome: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigateHome }) => {
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
          <div className="p-3 bg-amber-50 text-[#C5A059] rounded-2xl">
            <Globe className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">About Free Tools No Signup</h1>
            <p className="text-xs text-[#64748B] mt-1">4,753 Powerful Tools That Actually Work - Global Edition</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-4 text-sm text-[#334155] leading-relaxed">
          <p className="font-medium text-base text-[#0B1F3A]">
            Our Mission: Provide 4,753 free tools - No signup, no waiting, 100% secure and private in your browser.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">Global Coverage</h3>
          <p>
            Founded 2024 - Global calculators: India 200 ₹, US 200 $, Japan 50 ¥, Spain 30 €, UK 20 £, Canada 150 C$, Australia 150 A$, Germany 150 € + Health 350 + Math 350 + Business 350 + PDF 320 + Image 410 + ATS etc.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">Original Implementation</h3>
          <p>
            100% Original Code - Public Domain Formulas - WHO formulas for health - No APIs.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">Contact & Creator</h3>
          <p>
            Creator: Alok Mohan Sharma — Contact: <a href="mailto:hello@freetoolsnosignup.com" className="text-[#126BFF] font-bold hover:underline">hello@freetoolsnosignup.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};
