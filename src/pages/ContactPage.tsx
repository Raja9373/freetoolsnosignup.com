import React, { useState, useEffect } from 'react';
import { Mail, Clock, MapPin, Send, ArrowLeft, CheckCircle2, MessageSquare, Shield, HelpCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

export const ContactPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry / Feedback',
    message: '',
    _hp_company: '' // Honeypot field for bot trapping
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; subject: string; time: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Contact Us | FreeToolsNoSignup.com - 24-Hour Developer Support';
    window.scrollTo(0, 0);
  }, []);

  const validateForm = (): string | null => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return 'Please enter a valid, deliverable email address so we can reply to you.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      return 'Please provide a message with at least 10 characters describing your inquiry.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          _hp_company: formData._hp_company, // anti-spam honeypot
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setSubmittedData({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry / Feedback',
          message: '',
          _hp_company: ''
        });
      } else {
        setErrorMessage(
          result.error || 'Unable to deliver your message at this moment. Please try again or email support@freetoolsnosignup.com directly.'
        );
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setErrorMessage('Network connection error. Please check your internet connection or email support@freetoolsnosignup.com directly.');
    } finally {
      setIsSubmitting(false);
    }
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
              Fill out the form below. Your message will be routed directly to our developer team with immediate Reply-To tracking.
            </p>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold">Submission Notice</div>
                  <p className="mt-0.5 text-red-700">{errorMessage}</p>
                </div>
              </div>
            )}

            {isSubmitted && submittedData ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-emerald-950">Message Successfully Delivered!</h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto mt-1.5 leading-relaxed">
                    Thank you, <strong>{submittedData.name}</strong>. Your message regarding <em>"{submittedData.subject}"</em> has been received at our support desk.
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-emerald-200/80 text-left text-xs max-w-md mx-auto space-y-1.5 shadow-2xs">
                  <div className="text-slate-500 flex justify-between">
                    <span>Reply Destination:</span>
                    <strong className="text-slate-800">{submittedData.email}</strong>
                  </div>
                  <div className="text-slate-500 flex justify-between">
                    <span>Target Response:</span>
                    <span className="font-semibold text-emerald-700">Within 24 Hours</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmittedData(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field hidden from human users */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="_hp_company">Company Website</label>
                  <input
                    id="_hp_company"
                    type="text"
                    name="_hp_company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData._hp_company}
                    onChange={(e) => setFormData({ ...formData, _hp_company: e.target.value })}
                  />
                </div>

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
                      disabled={isSubmitting}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
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
                      disabled={isSubmitting}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
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
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 disabled:opacity-60"
                  >
                    <option value="General Inquiry / Feedback">General Inquiry / Feedback</option>
                    <option value="Bug Report in a Tool">Bug Report in a Tool</option>
                    <option value="Suggest a New Tool for Catalog">Suggest a New Tool for Catalog</option>
                    <option value="AdSense & Partnership Inquiry">AdSense & Partnership Inquiry</option>
                    <option value="Data Privacy & GDPR Inquiry">Data Privacy & GDPR Inquiry</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formData.message.length}/5000
                    </span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    maxLength={5000}
                    placeholder="Describe how we can help or details about the tool/feature you would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 placeholder:text-slate-400 resize-y disabled:opacity-60"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Securely...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Directly</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Protected by Rate-Limiting &amp; Honeypot</span>
                  </div>
                </div>
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

