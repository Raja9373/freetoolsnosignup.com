import React, { useState } from 'react';
import { 
  ArrowLeft, Globe, ShieldCheck, CheckCircle2, 
  ExternalLink, Sparkles, Send, Award, Heart, Copy 
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';

interface PartnersPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

interface PartnerItem {
  name: string;
  url: string;
  toolUsed: string;
  category: string;
  description: string;
  date: string;
}

const INITIAL_PARTNERS: PartnerItem[] = [
  {
    name: 'DevResourceHub.io',
    url: 'https://devresourcehub.io',
    toolUsed: 'JSON Formatter & Validator',
    category: 'Developer Tools',
    description: 'A developer directory integrating FreeToolsNoSignup JSON formatter directly inside technical documentation.',
    date: 'Verified Partner'
  },
  {
    name: 'StudentResumeGuide.org',
    url: 'https://studentresumeguide.org',
    toolUsed: 'ATS Score Checker & CV Diagnostic',
    category: 'Job & Career',
    description: 'Non-profit university portal helping graduate students test resume formats against automated recruitment filters.',
    date: 'Verified Partner'
  },
  {
    name: 'NotionMasteryClub',
    url: 'https://notionmasteryclub.com',
    toolUsed: 'Royal Notion Template & Database Builder',
    category: 'Productivity',
    description: 'Community workspace embedding our custom column builder to export custom schema templates to members.',
    date: 'Verified Partner'
  },
  {
    name: 'DesignFlow Magazine',
    url: 'https://designflowmag.com',
    toolUsed: 'Image Compressor & Optimizer',
    category: 'Media & Creative',
    description: 'Design publication providing client-side image optimization widgets to junior UI/UX designers.',
    date: 'Verified Partner'
  }
];

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  const [partners, setPartners] = useState<PartnerItem[]>(INITIAL_PARTNERS);
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [toolUrl, setToolUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [siteDesc, setSiteDesc] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteName || !siteUrl || !contactEmail) return;

    const newPartner: PartnerItem = {
      name: siteName,
      url: siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`,
      toolUsed: toolUrl || 'PDF Merge & Combine Pro',
      category: 'Community Partner',
      description: siteDesc || 'Verified educational & tech partner utilizing client-side FreeToolsNoSignup utilities.',
      date: 'Just Submitted (Pending Live Badge)'
    };

    setPartners(prev => [newPartner, ...prev]);
    setIsSubmitted(true);
    setSiteName('');
    setSiteUrl('');
    setToolUrl('');
    setContactEmail('');
    setSiteDesc('');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col selection:bg-[#FF7A00] selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7FC] hover:bg-[#EBF3FF] hover:text-[#126BFF] text-[#0B1F3A] font-bold text-xs border border-[#E2E8F0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Directory</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTo('/backlinks')}
              className="px-3 py-1.5 rounded-xl bg-[#0A1931] hover:bg-[#126BFF] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Get Embed Code</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        
        {/* Hero Section */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Partner Exchange &amp; Dofollow Backlinks
            </span>
          </div>

          <h1 className="font-serif-royal text-2xl sm:text-4xl font-bold text-[#0A1931] tracking-tight">
            Featured Partners &amp; Community Showcase
          </h1>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
            We love collaborating with tech blogs, educational institutions, developer communities, and Notion creators. Embed any of our {TOTAL_TOOLS_COUNT} free browser utilities on your website, submit your link below, and we will feature your brand on our high-authority directory with a <strong>dofollow backlink</strong>.
          </p>
        </div>

        {/* Form and Submission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Submission Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#0B1F3A] flex items-center gap-2">
                <Send className="w-4 h-4 text-[#126BFF]" />
                <span>Submit Your Site for a Free Backlink</span>
              </h2>
              <p className="text-xs text-[#64748B]">
                Provide your site details and the URL where you linked or embedded our tools. Submissions are reviewed automatically.
              </p>
            </div>

            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Submission Received Successfully!</span>
                </div>
                <p>Your site has been logged into our partner showcase below. We will ping your backlink within 24 hours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B1F3A]">Website Name *</label>
                  <input
                    type="text"
                    required
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="e.g. MyTechBlog.com"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:outline-none focus:border-[#126BFF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B1F3A]">Website Homepage URL *</label>
                  <input
                    type="url"
                    required
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="https://mytechblog.com"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:outline-none focus:border-[#126BFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B1F3A]">Page Where Tool Is Embedded/Linked *</label>
                  <input
                    type="url"
                    required
                    value={toolUrl}
                    onChange={(e) => setToolUrl(e.target.value)}
                    placeholder="https://mytechblog.com/resources"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:outline-none focus:border-[#126BFF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0B1F3A]">Webmaster / Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="editor@mytechblog.com"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:outline-none focus:border-[#126BFF]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#0B1F3A]">Short Site Description (1-2 sentences)</label>
                <textarea
                  rows={3}
                  value={siteDesc}
                  onChange={(e) => setSiteDesc(e.target.value)}
                  placeholder="Tell our visitors what your website offers..."
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:outline-none focus:border-[#126BFF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0A1931] hover:bg-[#126BFF] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Site &amp; Claim Dofollow Backlink</span>
              </button>
            </form>
          </div>

          {/* Right Column: Requirements & Guide (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                <span>How Partner Inclusion Works</span>
              </h3>

              <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#EBF3FF] text-[#126BFF] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Add a link or embed code from FreeToolsNoSignup to any public page or blog post on your domain.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#EBF3FF] text-[#126BFF] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Fill in the form on the left with your live page URL.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#EBF3FF] text-[#126BFF] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Your site is permanently featured in our partner index with an SEO dofollow backlink.</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0]">
                <button
                  onClick={() => onNavigateTo('/backlinks')}
                  className="w-full py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EBF3FF] text-[#126BFF] font-bold text-xs border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Browse 2753 Embed Codes</span>
                </button>
              </div>
            </div>

            {/* Trust Quote */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0A1931] to-[#126BFF] text-white space-y-2 shadow-xs">
              <h4 className="font-bold text-sm">Mutual Web Growth</h4>
              <p className="text-xs text-[#EBF3FF] leading-relaxed">
                "By linking valuable zero-signup utilities, you provide immediate functional utility to your readers while building organic authority together."
              </p>
            </div>
          </div>

        </div>

        {/* Live Partner Directory Listing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
            <h3 className="text-sm font-black text-[#0B1F3A]">Current Verified Partners</h3>
            <span>{partners.length} websites featured</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partners.map((p, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3 hover:border-[#126BFF] transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-md border border-[#A7F3D0]">
                    {p.date}
                  </span>
                  <span className="text-[11px] text-[#64748B] font-medium">{p.category}</span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-[#0B1F3A] flex items-center gap-2">
                    <span>{p.name}</span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#126BFF] hover:text-[#0055E6]"
                      title="Visit Partner Site"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    {p.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#475569]">
                  <span>Embedded: <strong>{p.toolUsed}</strong></span>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#126BFF] font-bold hover:underline"
                  >
                    Visit &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
