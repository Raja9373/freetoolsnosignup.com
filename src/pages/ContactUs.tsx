import React, { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';

interface ContactUsProps {
  onNavigateHome: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onNavigateHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:hello@freetoolsnosignup.com?subject=Contact from ${encodeURIComponent(name)} (${encodeURIComponent(email)})&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

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
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">Contact Us</h1>
            <p className="text-xs text-[#64748B] mt-1">Response time: 24-48 hours</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 text-sm text-[#334155]">
            <p className="font-semibold text-[#0B1F3A]">Email Directory:</p>
            <ul className="space-y-2 font-mono text-xs">
              <li>General: <a href="mailto:hello@freetoolsnosignup.com" className="text-[#126BFF] hover:underline">hello@freetoolsnosignup.com</a></li>
              <li>Privacy: <a href="mailto:privacy@freetoolsnosignup.com" className="text-[#126BFF] hover:underline">privacy@freetoolsnosignup.com</a></li>
              <li>Support: <a href="mailto:support@freetoolsnosignup.com" className="text-[#126BFF] hover:underline">support@freetoolsnosignup.com</a></li>
            </ul>
            <div className="pt-4 border-t border-[#E2E8F0]">
              <p className="font-semibold text-[#0B1F3A]">Address:</p>
              <p className="text-xs text-[#64748B] mt-1">Delhi, India</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:border-[#126BFF] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:border-[#126BFF] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Your message..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:border-[#126BFF] outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#0A1931] hover:bg-[#142646] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>Send Message (mailto)</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
