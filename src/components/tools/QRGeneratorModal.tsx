import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, Download, Copy, Check, Globe, Wifi, Mail, 
  AlignLeft, Phone, MessageSquare, UserPlus, Send, 
  Sparkles, ShieldCheck, RefreshCw, Upload, Trash2, 
  Sliders, Palette, Eye, ArrowRight, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, Lock, FileCode,
  Share2, ArrowLeft, Image as ImageIcon, ExternalLink, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  QRCodeOptions, QRCodeType, ErrorCorrectionLevel,
  buildQRPayload, validateQRInput, renderQRToCanvas, 
  generateQRSVG, downloadFile 
} from './qrCodeEngine';
import { BrandLogo } from '../BrandLogo';

interface QRGeneratorProps {
  onClose?: () => void;
  onRecordUse?: (toolId: string) => void;
  isStandalonePage?: boolean;
  onNavigateHome?: () => void;
}

const COLOR_PRESETS = [
  { name: 'Obsidian Black', fg: '#0f172a', bg: '#ffffff' },
  { name: 'Royal Navy', fg: '#1e3a8a', bg: '#ffffff' },
  { name: 'Deep Emerald', fg: '#064e3b', bg: '#ffffff' },
  { name: 'Rich Amber', fg: '#78350f', bg: '#fffbeb' },
  { name: 'Crimson Wine', fg: '#881337', bg: '#ffffff' },
  { name: 'Amethyst Violet', fg: '#581c87', bg: '#faf5ff' },
  { name: 'Slate Gray', fg: '#334155', bg: '#f8fafc' },
  { name: 'Midnight Inverted', fg: '#f8fafc', bg: '#0f172a' },
];

const LOGO_PRESETS = [
  { name: 'Globe', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%231e3a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>' },
  { name: 'Wi-Fi', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>' },
  { name: 'WhatsApp', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%2316a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>' },
  { name: 'Email', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' },
  { name: 'Phone', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' },
];

export const QRGeneratorModal: React.FC<QRGeneratorProps> = ({ 
  onClose, 
  onRecordUse, 
  isStandalonePage = false,
  onNavigateHome
}) => {
  const [qrType, setQrType] = useState<QRCodeType>('url');

  // Input states
  const [urlInput, setUrlInput] = useState('https://freetoolsnosignup.com');
  const [textInput, setTextInput] = useState('Welcome to FreeToolsNoSignup.com! 100% Free & Private Online Utilities.');
  const [wifiConfig, setWifiConfig] = useState({
    ssid: 'Home_HighSpeed_5G',
    password: 'SecurePassword123',
    encryption: 'WPA' as const,
    hidden: false
  });
  const [emailConfig, setEmailConfig] = useState({
    email: 'hello@freetoolsnosignup.com',
    subject: 'Project Inquiry',
    body: 'Hello, I would like to get more information about your tools.'
  });
  const [phoneInput, setPhoneInput] = useState('+1-800-555-0199');
  const [smsConfig, setSmsConfig] = useState({
    phone: '+1-800-555-0199',
    message: 'Hello! I am contacting you regarding your services.'
  });
  const [vcardConfig, setVcardConfig] = useState({
    firstName: 'Sarah',
    lastName: 'Jenkins',
    organization: 'Apex Solutions Inc.',
    title: 'Lead Architect',
    phone: '+1 (555) 234-5678',
    email: 'sarah.jenkins@example.com',
    website: 'https://example.com',
    address: '100 Tech Plaza, San Francisco, CA',
    note: 'Connected at Annual Tech Conference'
  });
  const [whatsappConfig, setWhatsappConfig] = useState({
    phone: '+15552345678',
    message: 'Hi there! I am interested in connecting.'
  });
  const [customTextInput, setCustomTextInput] = useState('GEO:37.7749,-122.4194');

  // Customization states
  const [qrSize, setQrSize] = useState(320);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('M');
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [margin, setMargin] = useState(2);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoSizePercent, setLogoSizePercent] = useState(22);

  // Status states
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compile options
  const currentOptions: QRCodeOptions = {
    type: qrType,
    url: urlInput,
    text: textInput,
    wifi: wifiConfig,
    email: emailConfig,
    phone: phoneInput,
    sms: smsConfig,
    vcard: vcardConfig,
    whatsapp: whatsappConfig,
    customText: customTextInput,
    size: qrSize,
    errorCorrectionLevel: errorCorrection,
    fgColor,
    bgColor,
    margin,
    logoDataUrl,
    logoSizePercent
  };

  const validation = validateQRInput(currentOptions);
  const currentPayload = buildQRPayload(currentOptions);

  // Render QR Code in real time
  const updateCanvas = async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);
    try {
      await renderQRToCanvas(canvasRef.current, currentOptions, qrSize);
    } catch (err) {
      console.error('Failed to render QR Code:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    updateCanvas();
  }, [
    qrType, urlInput, textInput, wifiConfig, emailConfig, 
    phoneInput, smsConfig, vcardConfig, whatsappConfig, 
    customTextInput, qrSize, errorCorrection, fgColor, 
    bgColor, margin, logoDataUrl, logoSizePercent
  ]);

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size should be under 2MB for optimal browser performance.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoDataUrl(reader.result as string);
      // Automatically switch to High error correction level for reliable scanning
      setErrorCorrection('H');
    };
    reader.readAsDataURL(file);
  };

  // Download Handlers
  const handleDownloadPNG = async (exportResolution = 1024) => {
    if (onRecordUse) onRecordUse('qr-generator');
    const offscreenCanvas = document.createElement('canvas');
    await renderQRToCanvas(offscreenCanvas, currentOptions, exportResolution);
    const dataUrl = offscreenCanvas.toDataURL('image/png');
    downloadFile(dataUrl, `FreeToolsNoSignup_QR_${qrType}_${exportResolution}px.png`);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handleDownloadSVG = async () => {
    if (onRecordUse) onRecordUse('qr-generator');
    try {
      const svgString = await generateQRSVG(currentOptions);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      downloadFile(blob, `FreeToolsNoSignup_QR_${qrType}.svg`);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch (err) {
      console.error('SVG Generation Error:', err);
    }
  };

  const handleDownloadJPG = async () => {
    if (onRecordUse) onRecordUse('qr-generator');
    const offscreenCanvas = document.createElement('canvas');
    await renderQRToCanvas(offscreenCanvas, currentOptions, 1024);
    const dataUrl = offscreenCanvas.toDataURL('image/jpeg', 0.95);
    downloadFile(dataUrl, `FreeToolsNoSignup_QR_${qrType}_1024px.jpg`);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(currentPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleCopyImageToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        // @ts-ignore
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      });
    } catch (err) {
      console.warn('Clipboard image write not supported or permitted in this context', err);
      // Fallback: copy payload
      handleCopyPayload();
    }
  };

  const handleReset = () => {
    setUrlInput('https://freetoolsnosignup.com');
    setTextInput('');
    setFgColor('#0f172a');
    setBgColor('#ffffff');
    setErrorCorrection('M');
    setMargin(2);
    setLogoDataUrl(null);
    setQrSize(320);
  };

  // Content for the Tool Interface
  const toolContent = (
    <div className="space-y-6">
      
      {/* Top Banner / Privacy Guarantee */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">100% Client-Side Privacy Shield</h2>
              <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Zero Cloud Uploads
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Your QR payload, Wi-Fi keys, and contacts are encoded strictly inside your browser memory. No data is stored or logged.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            id="qr-reset-all-btn"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form & Settings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Studio Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Header Tabs: Content vs Design */}
            <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5">
              <button
                id="qr-tab-content-btn"
                onClick={() => setActiveTab('content')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'content'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <QrCode className="w-4 h-4 text-amber-600" />
                1. Select Type & Data
              </button>
              <button
                id="qr-tab-design-btn"
                onClick={() => setActiveTab('design')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'design'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Palette className="w-4 h-4 text-indigo-600" />
                2. Design & Logo Colors
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-5">
              
              {activeTab === 'content' && (
                <>
                  {/* QR Type Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Choose QR Code Content Type
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                      {[
                        { id: 'url', label: 'Website URL', icon: Globe },
                        { id: 'text', label: 'Plain Text', icon: AlignLeft },
                        { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
                        { id: 'email', label: 'Email Draft', icon: Mail },
                        { id: 'phone', label: 'Phone Call', icon: Phone },
                        { id: 'sms', label: 'SMS Message', icon: MessageSquare },
                        { id: 'vcard', label: 'vCard Contact', icon: UserPlus },
                        { id: 'whatsapp', label: 'WhatsApp', icon: Send },
                        { id: 'custom', label: 'Raw / Custom', icon: FileCode },
                      ].map((t) => {
                        const Icon = t.icon;
                        const isSelected = qrType === t.id;
                        return (
                          <button
                            key={t.id}
                            id={`qr-type-btn-${t.id}`}
                            onClick={() => setQrType(t.id as QRCodeType)}
                            className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all text-center border ${
                              isSelected
                                ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                            <span className="text-[11px] leading-tight">{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Form Fields */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-4">
                    
                    {/* 1. URL */}
                    {qrType === 'url' && (
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          Destination Website URL
                        </label>
                        <div className="relative">
                          <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            id="qr-url-input"
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full pl-9 pr-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Visitors scanning this code will instantly open your website on iOS Safari or Android Chrome.
                        </p>
                      </div>
                    )}

                    {/* 2. Plain Text */}
                    {qrType === 'text' && (
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          Plain Text Content
                        </label>
                        <textarea
                          id="qr-text-input"
                          rows={4}
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          placeholder="Type or paste any plain text note, instructions, or serial code..."
                          className="w-full p-3 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                        />
                        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                          <span>Standard UTF-8 encoding</span>
                          <span>{textInput.length} characters</span>
                        </div>
                      </div>
                    )}

                    {/* 3. Wi-Fi */}
                    {qrType === 'wifi' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Network Name (SSID) *
                          </label>
                          <input
                            id="qr-wifi-ssid"
                            type="text"
                            value={wifiConfig.ssid}
                            onChange={(e) => setWifiConfig({ ...wifiConfig, ssid: e.target.value })}
                            placeholder="e.g. Cafe_Guest_Wi-Fi"
                            className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">
                              Password / Key
                            </label>
                            <input
                              id="qr-wifi-pass"
                              type="text"
                              disabled={wifiConfig.encryption === 'nopass'}
                              value={wifiConfig.password}
                              onChange={(e) => setWifiConfig({ ...wifiConfig, password: e.target.value })}
                              placeholder="Wi-Fi Password"
                              className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900 disabled:bg-slate-100 disabled:text-slate-400"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">
                              Security Encryption
                            </label>
                            <select
                              id="qr-wifi-enc"
                              value={wifiConfig.encryption}
                              onChange={(e) => setWifiConfig({ ...wifiConfig, encryption: e.target.value as any })}
                              className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                            >
                              <option value="WPA">WPA / WPA2 / WPA3 (Default)</option>
                              <option value="WEP">WEP (Legacy)</option>
                              <option value="nopass">None / Open Network</option>
                            </select>
                          </div>
                        </div>

                        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={wifiConfig.hidden}
                            onChange={(e) => setWifiConfig({ ...wifiConfig, hidden: e.target.checked })}
                            className="rounded text-slate-900 focus:ring-slate-900"
                          />
                          <span>This is a hidden Wi-Fi network (SSID not broadcast)</span>
                        </label>
                      </div>
                    )}

                    {/* 4. Email */}
                    {qrType === 'email' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Recipient Email Address *
                          </label>
                          <input
                            id="qr-email-addr"
                            type="email"
                            value={emailConfig.email}
                            onChange={(e) => setEmailConfig({ ...emailConfig, email: e.target.value })}
                            placeholder="hello@example.com"
                            className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Pre-filled Subject (Optional)
                          </label>
                          <input
                            id="qr-email-subj"
                            type="text"
                            value={emailConfig.subject || ''}
                            onChange={(e) => setEmailConfig({ ...emailConfig, subject: e.target.value })}
                            placeholder="e.g. Schedule a Consultation"
                            className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Default Body Text (Optional)
                          </label>
                          <textarea
                            id="qr-email-body"
                            rows={2}
                            value={emailConfig.body || ''}
                            onChange={(e) => setEmailConfig({ ...emailConfig, body: e.target.value })}
                            placeholder="Default message content..."
                            className="w-full p-2.5 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>
                      </div>
                    )}

                    {/* 5. Phone */}
                    {qrType === 'phone' && (
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          Phone Number to Call *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            id="qr-phone-input"
                            type="tel"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            placeholder="+1 (555) 019-2834"
                            className="w-full pl-9 pr-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Includes international dialing prefix (`+` and country code).
                        </p>
                      </div>
                    )}

                    {/* 6. SMS */}
                    {qrType === 'sms' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Recipient Mobile Number *
                          </label>
                          <input
                            id="qr-sms-phone"
                            type="tel"
                            value={smsConfig.phone}
                            onChange={(e) => setSmsConfig({ ...smsConfig, phone: e.target.value })}
                            placeholder="+1 (555) 444-0199"
                            className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Pre-filled SMS Text (Optional)
                          </label>
                          <textarea
                            id="qr-sms-msg"
                            rows={2}
                            value={smsConfig.message || ''}
                            onChange={(e) => setSmsConfig({ ...smsConfig, message: e.target.value })}
                            placeholder="Text message to pre-populate..."
                            className="w-full p-2.5 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>
                      </div>
                    )}

                    {/* 7. vCard */}
                    {qrType === 'vcard' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">First Name *</label>
                            <input
                              id="qr-vcard-first"
                              type="text"
                              value={vcardConfig.firstName}
                              onChange={(e) => setVcardConfig({ ...vcardConfig, firstName: e.target.value })}
                              placeholder="First name"
                              className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">Last Name</label>
                            <input
                              id="qr-vcard-last"
                              type="text"
                              value={vcardConfig.lastName}
                              onChange={(e) => setVcardConfig({ ...vcardConfig, lastName: e.target.value })}
                              placeholder="Last name"
                              className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">Organization / Company</label>
                            <input
                              id="qr-vcard-org"
                              type="text"
                              value={vcardConfig.organization || ''}
                              onChange={(e) => setVcardConfig({ ...vcardConfig, organization: e.target.value })}
                              placeholder="Company name"
                              className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">Job Title</label>
                            <input
                              id="qr-vcard-title"
                              type="text"
                              value={vcardConfig.title || ''}
                              onChange={(e) => setVcardConfig({ ...vcardConfig, title: e.target.value })}
                              placeholder="Job title"
                              className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">Phone Number</label>
                            <input
                              id="qr-vcard-phone"
                              type="tel"
                              value={vcardConfig.phone || ''}
                              onChange={(e) => setVcardConfig({ ...vcardConfig, phone: e.target.value })}
                              placeholder="+1 (555) 019-2000"
                              className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-800 block mb-1">Email Address</label>
                            <input
                              id="qr-vcard-email"
                              type="email"
                              value={vcardConfig.email || ''}
                              onChange={(e) => setVcardConfig({ ...vcardConfig, email: e.target.value })}
                              placeholder="name@company.com"
                              className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">Website URL</label>
                          <input
                            id="qr-vcard-web"
                            type="url"
                            value={vcardConfig.website || ''}
                            onChange={(e) => setVcardConfig({ ...vcardConfig, website: e.target.value })}
                            placeholder="https://company.com"
                            className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>
                      </div>
                    )}

                    {/* 8. WhatsApp */}
                    {qrType === 'whatsapp' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            WhatsApp Phone Number (with Country Code) *
                          </label>
                          <input
                            id="qr-wa-phone"
                            type="tel"
                            value={whatsappConfig.phone}
                            onChange={(e) => setWhatsappConfig({ ...whatsappConfig, phone: e.target.value })}
                            placeholder="e.g. 15552345678"
                            className="w-full px-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                          <p className="text-[11px] text-slate-500 mt-1">
                            Enter country code without `+` or spaces (e.g. `1` for US, `44` for UK, `91` for India).
                          </p>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Pre-filled Chat Message (Optional)
                          </label>
                          <textarea
                            id="qr-wa-msg"
                            rows={2}
                            value={whatsappConfig.message || ''}
                            onChange={(e) => setWhatsappConfig({ ...whatsappConfig, message: e.target.value })}
                            placeholder="Hello! I found your QR code and would like to chat."
                            className="w-full p-2.5 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                          />
                        </div>
                      </div>
                    )}

                    {/* 9. Custom / Raw */}
                    {qrType === 'custom' && (
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          Raw QR Payload String
                        </label>
                        <textarea
                          id="qr-custom-input"
                          rows={4}
                          value={customTextInput}
                          onChange={(e) => setCustomTextInput(e.target.value)}
                          placeholder="e.g. GEO:37.7749,-122.4194 or custom app scheme payload..."
                          className="w-full p-3 bg-white font-mono text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
                        />
                      </div>
                    )}

                  </div>
                </>
              )}

              {activeTab === 'design' && (
                <div className="space-y-6">
                  
                  {/* Color Palettes Preset */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Quick Color Themes
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {COLOR_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            setFgColor(preset.fg);
                            setBgColor(preset.bg);
                          }}
                          className={`p-2 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
                            fgColor === preset.fg && bgColor === preset.bg
                              ? 'border-slate-900 ring-2 ring-slate-900/10 bg-slate-50 font-bold'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div 
                            className="w-6 h-6 rounded-lg border border-slate-300 shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: preset.bg }}
                          >
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: preset.fg }}
                            />
                          </div>
                          <span className="text-xs text-slate-800 truncate">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Color Pickers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        Foreground (Pattern) Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id="qr-fg-color"
                          type="color"
                          value={fgColor}
                          onChange={(e) => setFgColor(e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 bg-transparent p-0"
                        />
                        <input
                          type="text"
                          value={fgColor}
                          onChange={(e) => setFgColor(e.target.value)}
                          className="w-full px-3 py-2 bg-white text-xs font-mono rounded-lg border border-slate-300 font-bold uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        Background Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id="qr-bg-color"
                          type="color"
                          value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 bg-transparent p-0"
                        />
                        <input
                          type="text"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-full px-3 py-2 bg-white text-xs font-mono rounded-lg border border-slate-300 font-bold uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error Correction & Margin */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          Error Correction Level
                        </label>
                        <span className="text-[11px] font-bold text-amber-600">
                          {errorCorrection === 'L' && 'L (7% Recovery)'}
                          {errorCorrection === 'M' && 'M (15% Recovery - Standard)'}
                          {errorCorrection === 'Q' && 'Q (25% Recovery)'}
                          {errorCorrection === 'H' && 'H (30% Recovery - Recommended for Logos)'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
                        {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((lvl) => (
                          <button
                            key={lvl}
                            id={`qr-err-level-${lvl}`}
                            onClick={() => setErrorCorrection(lvl)}
                            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                              errorCorrection === lvl
                                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Level {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          Quiet Zone / Margin
                        </label>
                        <span className="text-[11px] font-bold text-slate-600">{margin} Modules</span>
                      </div>
                      <input
                        id="qr-margin-slider"
                        type="range"
                        min="0"
                        max="6"
                        step="1"
                        value={margin}
                        onChange={(e) => setMargin(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                      />
                    </div>
                  </div>

                  {/* Optional Center Logo */}
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Center Logo Overlay (Optional)</h4>
                        <p className="text-[11px] text-slate-500">
                          Embed your brand or service icon securely with automatic Level H error correction.
                        </p>
                      </div>
                      {logoDataUrl && (
                        <button
                          onClick={() => setLogoDataUrl(null)}
                          className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      )}
                    </div>

                    {/* Logo Presets or Upload */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 flex items-center gap-1.5 shadow-2xs transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-600" />
                        Upload Custom Logo
                      </button>

                      <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                        <span className="text-[11px] text-slate-400 font-medium">Or preset:</span>
                        {LOGO_PRESETS.map((p) => (
                          <button
                            key={p.name}
                            onClick={() => {
                              setLogoDataUrl(p.url);
                              setErrorCorrection('H');
                            }}
                            className="p-1.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium transition-colors"
                            title={`Use ${p.name} logo`}
                          >
                            <img src={p.url} alt={p.name} className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Column: Interactive Live Preview & High-Res Download (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 sm:p-6 space-y-5 text-center">
            
            {/* Header & Status Indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live Scannable Preview
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">Ready to Scan</span>
              </div>
            </div>

            {/* Canvas Wrapper */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-100/70 rounded-2xl border border-slate-200/80 min-h-[280px]">
              <div 
                className="p-3 rounded-2xl shadow-lg border border-slate-200 transition-transform duration-200 hover:scale-[1.02]"
                style={{ backgroundColor: bgColor === 'transparent' ? '#ffffff' : bgColor }}
              >
                <canvas 
                  ref={canvasRef} 
                  id="qr-preview-canvas"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Type: <strong className="text-slate-800 uppercase">{qrType}</strong></span>
                <span>•</span>
                <span>Payload: <strong className="text-slate-800">{currentPayload.length} B</strong></span>
              </div>
            </div>

            {/* Download Buttons Stack */}
            <div className="space-y-2.5 pt-1">
              
              <button
                id="qr-download-png-btn"
                onClick={() => handleDownloadPNG(1024)}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-400" />
                Download High-Res PNG (1024px)
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  id="qr-download-svg-btn"
                  onClick={handleDownloadSVG}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5"
                >
                  <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                  Download Vector SVG
                </button>

                <button
                  id="qr-download-jpg-btn"
                  onClick={handleDownloadJPG}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  Download JPG
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  id="qr-copy-image-btn"
                  onClick={handleCopyImageToClipboard}
                  className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedImage ? 'Image Copied!' : 'Copy Image'}
                </button>

                <button
                  id="qr-copy-payload-btn"
                  onClick={handleCopyPayload}
                  className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copiedPayload ? 'Payload Copied!' : 'Copy Text Data'}
                </button>
              </div>

            </div>

            {/* Scannability Notice */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-left flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-900 leading-relaxed">
                <strong>Static QR Guarantee:</strong> Static QR codes generated here never expire, require no monthly subscription, and contain zero tracking redirects.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );

  // If used as Standalone Page (`/qr-code-generator`)
  if (isStandalonePage) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onNavigateHome && (
                <button
                  onClick={onNavigateHome}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Tools</span>
                </button>
              )}
              <BrandLogo variant="header" onClick={onNavigateHome} />
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Free • No Signup
              </span>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-12">
          
          {/* Breadcrumb & Hero Heading */}
          <div className="space-y-3">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <a 
                href="/" 
                onClick={(e) => { if (onNavigateHome) { e.preventDefault(); onNavigateHome(); } }} 
                className="hover:text-slate-800"
              >
                Home
              </a>
              <span>/</span>
              <a 
                href="/dev-tools" 
                onClick={(e) => { if (onNavigateHome) { e.preventDefault(); onNavigateHome(); } }} 
                className="hover:text-slate-800"
              >
                Developer Tools
              </a>
              <span>/</span>
              <span className="text-slate-900 font-semibold">Free QR Code Generator</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  HIGH-RESOLUTION VECTOR & PNG STUDIO
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Free QR Code Generator
                </h1>
                <p className="text-slate-600 text-sm mt-1.5 max-w-3xl leading-relaxed">
                  Create custom QR codes for websites, Wi-Fi networks, contact cards (vCard), WhatsApp links, emails, and plain text. Download instant vector SVG or high-resolution PNG files with zero watermarks and no registration required.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Tool Studio */}
          {toolContent}

          {/* SEO Editorial & Guide Sections */}
          <div className="space-y-10 pt-6 border-t border-slate-200">
            
            {/* 3 Step Workflow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900">Choose Your Data Type</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Select from 9 supported formats including Website URL, Wi-Fi auto-connect, vCard contact information, WhatsApp messaging, phone calls, or plain text.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900">Customize Colors & Logo</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Match your brand with custom foreground and background colors, adjust quiet-zone margins, and optionally embed a center brand logo.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900">Download Print-Ready Assets</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Export infinitely scalable Vector SVG files for print media, posters, and billboards, or download crisp 1024px PNG images for digital distribution.
                </p>
              </div>
            </div>

            {/* Deep Dive Content Article */}
            <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 prose prose-slate max-w-none text-slate-700">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
                  What is a Quick Response (QR) Code?
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  A <strong>QR Code (Quick Response Code)</strong> is a two-dimensional matrix barcode invented in 1994 by the Japanese automotive company Denso Wave. Unlike standard 1D linear barcodes that store up to 20 digits horizontally, a 2D QR code encodes data in both horizontal and vertical directions, enabling it to store thousands of alphanumeric characters in a compact, instantly scannable square.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    How to Scan on iPhone & iPad (iOS)
                  </h3>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
                    <li>Open the native <strong>Camera</strong> app from your Home Screen or Control Center.</li>
                    <li>Hold your device so the QR code appears inside the camera viewfinder.</li>
                    <li>A yellow notification banner with the link will appear instantly.</li>
                    <li>Tap the banner to open the website, join the Wi-Fi network, or save the contact.</li>
                  </ol>
                </div>

                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    How to Scan on Android Devices
                  </h3>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal pl-4">
                    <li>Open your default <strong>Camera</strong> app or <strong>Google Lens</strong>.</li>
                    <li>Point the camera lens steadily at the QR code.</li>
                    <li>Tap the on-screen pop-up chip to trigger the destination action.</li>
                    <li>For quick access, you can also use the <strong>QR Code Scanner</strong> tile in Quick Settings.</li>
                  </ol>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
                  Popular Real-World QR Code Applications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  {[
                    { title: 'Restaurant Menus & Ordering', desc: 'Allow patrons to view contactless digital menus, allergen guides, and order tableside.' },
                    { title: 'Instant Wi-Fi Guest Access', desc: 'Let guests and clients join your secure Wi-Fi network without typing complicated passwords.' },
                    { title: 'Smart Business Cards (vCard)', desc: 'Share your full phone, email, company, and LinkedIn details in one scan to save directly to phone contacts.' },
                    { title: 'Product Packaging & Manuals', desc: 'Link directly to setup video tutorials, user manuals, warranty registrations, and certifications.' },
                    { title: 'Event Ticketing & Check-ins', desc: 'Streamline entrance management, conference registrations, and exhibition attendee verification.' },
                    { title: 'WhatsApp Direct Engagement', desc: 'Start a pre-filled customer support or sales conversation on WhatsApp with zero friction.' },
                  ].map((useCase, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">{useCase.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{useCase.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4">
                  Frequently Asked Questions (FAQ)
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      q: 'Is this QR code generator really 100% free with no signup?',
                      a: 'Yes. FreeToolsNoSignup.com provides an unconstrained, unlimited QR code generator. There are no registration forms, no email captures, no trial expirations, and no paid paywalls.'
                    },
                    {
                      q: 'Do the generated QR codes ever expire?',
                      a: 'No. All QR codes created on this platform are Static QR codes. The data (such as your URL or Wi-Fi password) is directly encoded into the visual matrix pattern itself. As long as your destination website remains online, the QR code will scan indefinitely.'
                    },
                    {
                      q: 'Is my data secure and private?',
                      a: 'Absolutely. The QR generation engine runs 100% client-side in your browser using standard JavaScript canvas and vector rendering. Your inputs, Wi-Fi credentials, and contact cards are never sent to our servers or stored in any database.'
                    },
                    {
                      q: 'Which format should I download for printing: PNG or SVG?',
                      a: 'For print media (business cards, flyers, restaurant tables, posters, vehicle wraps), we strongly recommend SVG (Scalable Vector Graphics). SVG files can be scaled to any size without losing sharpness or becoming pixelated. For social media, emails, and web pages, our 1024px High-Res PNG is optimal.'
                    },
                    {
                      q: 'How does Error Correction Level work?',
                      a: 'QR codes use Reed-Solomon error correction algorithms. Level L recovers up to 7% of damaged or obscured data, Level M recovers 15%, Level Q recovers 25%, and Level H recovers up to 30%. If you choose to embed a center logo, Level H ensures the surrounding matrix retains enough redundant data to scan reliably.'
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/60">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center hover:bg-slate-100/80 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>
                      {openFaqIndex === idx && (
                        <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Tools Navigation */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  Explore More Free Client-Side Tools
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { name: 'PDF Merger & Splitter', path: '/pdf-tools', desc: 'Combine & manage PDFs privately' },
                    { name: 'Image Compressor Pro', path: '/image-tools', desc: 'Optimize JPG, PNG & WebP' },
                    { name: 'Notion Template Builder', path: '/notion-template-builder', desc: 'Custom databases & CSV' },
                    { name: 'Developer Pro Suite', path: '/dev-tools', desc: '100+ Dev utilities & encoders' },
                  ].map((tool, idx) => (
                    <a
                      key={idx}
                      href={tool.path}
                      onClick={(e) => {
                        if (onNavigateHome) {
                          e.preventDefault();
                          // navigate directly via history
                          window.history.pushState({}, '', tool.path);
                          window.location.reload();
                        }
                      }}
                      className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-900 transition-colors block"
                    >
                      <span className="text-xs font-bold block">{tool.name}</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">{tool.desc}</span>
                    </a>
                  ))}
                </div>
              </div>

            </article>

          </div>

        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-slate-300 font-semibold">FreeToolsNoSignup.com</p>
              <p className="text-[11px] text-slate-500 mt-0.5">The Zero-Friction, 100% Client-Side Web Utility Platform.</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>
        </footer>

      </div>
    );
  }

  // Modal Render Layout (when clicked from Home Page Grid / Cmd+K Search)
  return (
    <div id="qr-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div id="qr-modal-card" className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Free QR Code Studio Pro
                </h2>
                <span className="bg-amber-400/20 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  Vector & HD PNG
                </span>
              </div>
              <p className="text-xs text-slate-300">Generate styled, high-res QR codes with instant vector export</p>
            </div>
          </div>

          <button 
            id="qr-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {toolContent}
        </div>

      </div>
    </div>
  );
};
