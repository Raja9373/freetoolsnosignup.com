import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigateHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigateHome }) => {
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
          <div className="p-3 bg-blue-50 text-[#126BFF] rounded-2xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">Privacy Policy - Free Tools No Signup</h1>
            <p className="text-xs text-[#64748B] mt-1">Last Updated: 15 Sep 2026</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-4 text-sm text-[#334155] leading-relaxed">
          <p className="font-medium text-base text-[#0B1F3A]">
            We respect your privacy - 100% In-Browser Processing.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">1. No Data Collection</h3>
          <p>
            All 4,753 tools run 100% in your browser - No server upload - No signup - No email - No tracking of your files.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">2. No Cookies for Tools</h3>
          <p>
            Tools do not use cookies - Only essential cookies for site preferences (theme, favorites stored in localStorage).
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">3. Third-Party</h3>
          <p>
            Google AdSense may use cookies for ads - Google Analytics for traffic - No tool data shared.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">4. Local Storage</h3>
          <p>
            Your recent tools, favorites stored locally in your browser only - You can clear anytime.
          </p>

          <h3 className="text-base font-bold text-[#0B1F3A] pt-2">5. Contact</h3>
          <p>
            Email: <a href="mailto:privacy@freetoolsnosignup.com" className="text-[#126BFF] font-bold hover:underline">privacy@freetoolsnosignup.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};
