import React from 'react';

interface FooterProps {
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-bold mb-2">Free Tools No Signup</h4>
          <p className="text-xs text-gray-300">4,753 tools - No signup - 100% private</p>
        </div>
        <div className="flex flex-col space-y-1.5">
          <h4 className="font-bold mb-1">Legal</h4>
          <a href="/privacy-policy" onClick={(e) => handleLink(e, '/privacy-policy')} className="text-xs text-gray-300 hover:text-white transition">Privacy Policy</a>
          <a href="/terms" onClick={(e) => handleLink(e, '/terms')} className="text-xs text-gray-300 hover:text-white transition">Terms</a>
          <a href="/about" onClick={(e) => handleLink(e, '/about')} className="text-xs text-gray-300 hover:text-white transition">About</a>
          <a href="/contact" onClick={(e) => handleLink(e, '/contact')} className="text-xs text-gray-300 hover:text-white transition">Contact</a>
        </div>
        <div className="flex flex-col space-y-1.5">
          <h4 className="font-bold mb-1">Tools</h4>
          <a href="/audit" onClick={(e) => handleLink(e, '/audit')} className="text-xs text-gray-300 hover:text-white transition">Audit (4753 tools)</a>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-white transition">Sitemap</a>
          <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-white transition">Robots</a>
        </div>
        <div>
          <h4 className="font-bold mb-1">Contact</h4>
          <p className="text-xs text-gray-300">hello@freetoolsnosignup.com</p>
        </div>
      </div>
      <div className="text-center mt-6 text-xs text-gray-400 border-t border-gray-800 pt-4">
        © 2026 Free Tools No Signup - 4753 Powerful Tools That Actually Work - Made in India 🇮🇳 Global Edition 🇺🇸🇯🇵🇪🇸🇬🇧🇨🇦🇦🇺🇩🇪
      </div>
    </footer>
  );
};
