import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Search, X } from 'lucide-react';
import { useTranslation } from '../i18n/I18nContext';
import { SUPPORTED_LANGUAGES, LanguageConfig } from '../i18n/languages';

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false, className = '' }) => {
  const { locale, currentLanguage, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLanguage = (lang: LanguageConfig) => {
    setLocale(lang.code, true);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button - Toolify Pill Style */}
      <button
        id="language-switcher-pill"
        onClick={() => setIsOpen(prev => !prev)}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={t('selectLanguage', 'Select Language')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-all shadow-2xs ${
          isOpen 
            ? 'bg-amber-500 text-slate-950 border-amber-600' 
            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
        }`}
      >
        <Globe className={`w-3.5 h-3.5 ${isOpen ? 'text-slate-950' : 'text-slate-500'}`} />
        <span className="text-sm leading-none">{currentLanguage.flag}</span>
        <span className="font-mono uppercase tracking-wider font-extrabold text-[11px]">
          {currentLanguage.code}
        </span>
        {!compact && (
          <span className="hidden sm:inline text-xs font-semibold max-w-[80px] truncate">
            {currentLanguage.nativeName}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          id="language-dropdown-menu"
          className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header & Search */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                {t('selectLanguage', 'Select Language')} (20)
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchLanguage', 'Search 20 languages...')}
                autoFocus
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Languages List */}
          <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5">
            {filteredLanguages.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No language found
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === locale;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                      isSelected
                        ? 'bg-amber-50 text-amber-900 font-bold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base leading-none shrink-0">{lang.flag}</span>
                      <div className="flex flex-col truncate">
                        <span className="font-semibold text-slate-900 leading-tight">
                          {lang.nativeName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {lang.name} ({lang.code.toUpperCase()})
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
            <span className="text-[10px] text-slate-400 font-medium">
              Auto-detected from your browser settings
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
