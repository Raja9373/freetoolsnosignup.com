import React, { useState, useEffect } from 'react';
import { Mail, Clock, MapPin, Send, ArrowLeft, CheckCircle2, MessageSquare, Shield, HelpCircle } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

export const ContactPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry / Feedback',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | FreeToolsNoSignup.com - 24-Hour Developer Support';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger user mailto client
    const mailtoUrl = `mailto:support@freetoolsnosignup.com?subject=${encodeURIComponent(
      `[FTNS Contact] ${formData.subject} - from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              24-Hour SLA Response
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
          <span className="text-slate-900 font-semibold">Contact & Support</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Direct Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-500" />
                Get in Touch
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed">
                Have an inquiry about a tool, want to report a bug, or propose a new browser utility for our 521-tool catalog? We respond to every email.
              </p>

              <div className="space-y-4 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <div className="text-slate-400 font-medium">Official Developer Email</div>
                  <a 
                    href="mailto:support@freetoolsnosignup.com" 
                    className="font-bold text-slate-900 hover:text-amber-600 break-all text-sm block mt-0.5"
                  >
                    support@freetoolsnosignup.com
                  </a>
                </div>

                <div>
                  <div className="text-slate-400 font-medium">Response Time SLA</div>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    Within 24 Hours (Mon – Sun)
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 font-medium">Engineering Headquarters</div>
                  <div className="text-slate-700 mt-0.5 leading-relaxed">
                    FreeToolsNoSignup Systems<br />
                    Connaught Place, New Delhi 110001<br />
                    India & Global Cloud Edge
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                Spam-Free Guarantee
              </div>
              <p className="text-emerald-800 leading-relaxed">
                We never add your email to marketing lists or sell contact info. Emails are only used to respond to your direct request.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Send Us a Message
            </h1>
            <p className="text-slate-500 text-xs mb-6">
              Fill out the form below to reach our core developer and technical team directly.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950">Email Client Dispatched!</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you! Your default mail application has been opened with your message. If it didn't open, please send an email directly to <strong>support@freetoolsnosignup.com</strong>.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                  >
                    <option value="General Inquiry / Feedback">General Inquiry / Feedback</option>
                    <option value="Bug Report in a Tool">Bug Report in a Tool</option>
                    <option value="Suggest a New Tool for Catalog">Suggest a New Tool for Catalog</option>
                    <option value="AdSense & Partnership Inquiry">AdSense & Partnership Inquiry</option>
                    <option value="Data Privacy & GDPR Inquiry">Data Privacy & GDPR Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe how we can help or details about the tool/feature you would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 placeholder:text-slate-400 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Directly</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Bottom AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pb-8 w-full">
        <AdSenseBanner slotType="leaderboard" />
      </div>
    </div>
  );
};
