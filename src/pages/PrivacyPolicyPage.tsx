import React, { useEffect } from 'react';
import { ShieldCheck, Lock, ArrowLeft, EyeOff, Cookie, Server, Scale, UserCheck, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

export const PrivacyPolicyPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  useEffect(() => {
    document.title = 'Privacy Policy | FreeToolsNoSignup.com - Strict Zero Data Collection & AdSense Compliance';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="privacy-policy-page" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              GDPR & CCPA Verified
            </span>
          </div>
        </div>
      </header>

      {/* Top AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pt-4 w-full">
        <AdSenseBanner format="728x90" slotName="PrivacyTop" />
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-slate-800">Home</a>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Privacy Policy</span>
        </nav>

        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <header className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              LEGAL, ADVERTISING & PRIVACY DISCLOSURES
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy & Cookie Disclosures
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Effective Date: August 24, 2026 • Official Reference: FTNS-PRIVACY-PUB9048615701580913
            </p>
          </header>

          {/* Quick Summary Callout */}
          <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-sm leading-relaxed space-y-2">
            <div className="font-bold flex items-center gap-2 text-emerald-950 text-base">
              <EyeOff className="w-5 h-5 text-emerald-600" />
              Plain-English Privacy Guarantee
            </div>
            <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
              We do not ask for your name, email, or password. We never upload your confidential PDF contracts, resumes, images, source code, or financial inputs to remote servers. All 521 utilities execute 100% locally inside your client-side browser sandbox.
            </p>
          </div>

          {/* Section 1: Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Introduction & Scope</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At FreeToolsNoSignup.com ("we", "our", or "the Platform"), accessible at <strong>https://www.freetoolsnosignup.com</strong>, the privacy of our visitors is our highest core priority. This comprehensive Privacy Policy document outlines the types of information that may be collected, recorded, or processed when you visit our website, how we utilize and protect data, and the strict technical boundaries governing our zero-server client-side utility suite.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              If you have any questions, require additional clarification, or wish to exercise data rights under international privacy laws, please contact our dedicated Data Protection Officer at: <strong>support@freetoolsnosignup.com</strong>.
            </p>
          </section>

          {/* Section 2: Zero Personal Data Collection */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. The "No Signup Ever" Promise — Zero PII Retention</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Unlike traditional SaaS utility platforms that harvest personal identities to build marketing lists or gate tools behind subscription paywalls, FreeToolsNoSignup.com operates under a strictly enforced zero-registration model:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
              <li>
                <strong>No Registration or Account Profiles:</strong> You will never be prompted to create an account, verify an email address, link a social media profile, or provide a phone number.
              </li>
              <li>
                <strong>No Cloud Storage of User Files:</strong> When you use our PDF Merge, PDF Splitter, Image Compressor, ATS Resume Scorer, or JSON Formatter, your files are never transmitted across the network to our servers. Computation takes place in volatile device memory (RAM) utilizing browser-native WebAssembly (WASM), HTML5 Canvas, and Web Crypto APIs.
              </li>
              <li>
                <strong>No Retention of Financial or Sensitive Inputs:</strong> Calculations in our Loan EMI, Mortgage, SIP, and Tax calculators are computed entirely locally via client-side mathematical algorithms. Inputs vanish the moment you navigate away or close your browser tab.
              </li>
            </ul>
          </section>

          {/* Section 3: Google AdSense & DoubleClick DART Cookies */}
          <section className="space-y-4 bg-amber-50/60 p-6 rounded-2xl border border-amber-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-600" />
              3. Google AdSense & DoubleClick DART Cookies Disclosures
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Google is an authorized third-party advertising vendor on FreeToolsNoSignup.com (Publisher ID: <strong>pub-9048615701580913</strong>). Google uses cookies, including the DoubleClick <strong>DART cookie</strong>, to serve contextually relevant advertisements to visitors based on their visit to www.freetoolsnosignup.com and other websites across the Internet.
            </p>
            
            <div className="space-y-3 text-slate-700 text-xs sm:text-sm">
              <div className="p-3 bg-white rounded-xl border border-amber-200/80">
                <h4 className="font-bold text-slate-900 text-sm mb-1">How Google Uses Cookies:</h4>
                <p className="leading-relaxed">
                  Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200/80">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Personalized Advertising Opt-Out:</h4>
                <p className="leading-relaxed">
                  Users may opt out of personalized advertising by visiting Google's official Ads Settings portal:
                </p>
                <a 
                  href="https://adssettings.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition-colors"
                >
                  <span>Google Ads Settings (https://adssettings.google.com)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200/80">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Third-Party Network Opt-Out:</h4>
                <p className="leading-relaxed">
                  Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting the Network Advertising Initiative (NAI) opt-out page at <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">optout.networkadvertising.org</a> or the Digital Advertising Alliance (DAA) portal at <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">www.aboutads.info/choices/</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Local Storage */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Browser LocalStorage Usage</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To enhance navigation speed and convenience without server sessions, FreeToolsNoSignup.com utilizes your browser's local storage (<code>localStorage</code>) to record:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
              <li><strong>Recently Used Tools (ftns_recent_tools):</strong> An ephemeral list of the last 10 utilities you launched to populate the left sidebar.</li>
              <li><strong>Favorite Pinned Tools (ftns_favorites):</strong> Your star-marked quick access tools.</li>
            </ul>
            <p className="text-slate-600 text-sm leading-relaxed">
              This data resides exclusively on your local device hardware. It is never transmitted across the network, and you can erase it at any time by clearing your browser cache or clicking "Clear History" in the sidebar.
            </p>
          </section>

          {/* Section 5: Log Files and Web Analytics */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Standard Server Log Files & Telemetry</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              FreeToolsNoSignup.com follows standard automated server logging procedures. These logs record standard connection parameters when visitors access pages, including: Internet Protocol (IP) address, browser family, Internet Service Provider (ISP), date/time stamps, referring/exit URLs, and platform uptime metrics.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              This information is strictly aggregated for platform health monitoring, DDOS attack prevention, capacity planning, and detecting broken tool routes. It is never linked to any personally identifiable human information.
            </p>
          </section>

          {/* Section 6: GDPR Compliance */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. GDPR Compliance (EU & UK Data Subjects)</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              For users located within the European Economic Area (EEA) and the United Kingdom, we adhere strictly to the General Data Protection Regulation (GDPR). Because we do not harvest or store personal identities, files, or sensitive metadata, our default posture provides maximum data minimization:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Right to Access & Portability</span>
                Since no user accounts or files exist on our servers, no retained personal dossier exists.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Right to Erasure ("Right to Be Forgotten")</span>
                All file processing artifacts are purged immediately from RAM upon browser tab closure.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Right to Object & Restrict</span>
                You may disable non-essential cookies via browser settings or opt-out portals anytime.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Right to Lodge a Complaint</span>
                You may reach your regional supervisory data authority if you believe rights were infringed.
              </div>
            </div>
          </section>

          {/* Section 7: CCPA / CPRA California Rights */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">7. California Privacy Rights (CCPA & CPRA)</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents are entitled to transparent disclosures:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
              <li><strong>Zero Sale of Personal Information:</strong> FreeToolsNoSignup.com does not sell, rent, or trade your personal data to data brokers or commercial marketers.</li>
              <li><strong>Right to Opt Out:</strong> You have the right to direct businesses not to sell your personal information.</li>
              <li><strong>Non-Discrimination:</strong> We provide full, unthrottled access to all 521 tools regardless of whether you opt out of third-party advertising cookies.</li>
            </ul>
          </section>

          {/* Section 8: Children's Privacy */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">8. Children's Online Privacy Protection (COPPA)</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Protecting the online privacy of children is especially vital. FreeToolsNoSignup.com does not knowingly collect any Personally Identifiable Information from children under the age of 13. If you believe your child has inadvertently provided information through our contact portal, contact us immediately at support@freetoolsnosignup.com, and we will promptly delete such records.
            </p>
          </section>

          {/* Section 9: Updates & Contact */}
          <section className="space-y-4 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900">9. Policy Modifications & Contact Information</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We reserve the right to periodically update this Privacy Policy to reflect advancements in client-side browser capabilities, changes in advertising compliance, or statutory requirements. Continued use of the platform constitutes acceptance of updated terms.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div><strong>Website:</strong> FreeToolsNoSignup.com (https://www.freetoolsnosignup.com)</div>
              <div><strong>AdSense Publisher Account:</strong> pub-9048615701580913</div>
              <div><strong>Chief Privacy & Security Officer:</strong> Alok Mohan Sharma</div>
              <div><strong>Direct Support Inquiries:</strong> <a href="mailto:support@freetoolsnosignup.com" className="text-blue-600 underline font-semibold">support@freetoolsnosignup.com</a></div>
            </div>
          </section>
        </article>
      </main>

      {/* Bottom AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pb-8 w-full">
        <AdSenseBanner format="728x90" slotName="PrivacyBottom" />
      </div>
    </div>
  );
};
