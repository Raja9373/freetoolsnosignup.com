import QRCode from 'qrcode';

export type QRCodeType = 
  | 'url' 
  | 'text' 
  | 'wifi' 
  | 'email' 
  | 'phone' 
  | 'sms' 
  | 'vcard' 
  | 'whatsapp' 
  | 'custom';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface WiFiConfig {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface EmailConfig {
  email: string;
  subject?: string;
  body?: string;
}

export interface SMSConfig {
  phone: string;
  message?: string;
}

export interface VCardConfig {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  note?: string;
}

export interface WhatsAppConfig {
  phone: string;
  message?: string;
}

export interface QRCodeOptions {
  type: QRCodeType;
  // Payload configs
  url: string;
  text: string;
  wifi: WiFiConfig;
  email: EmailConfig;
  phone: string;
  sms: SMSConfig;
  vcard: VCardConfig;
  whatsapp: WhatsAppConfig;
  customText: string;

  // Visual customization
  size: number; // in pixels (e.g. 240, 320, 512, 1024)
  errorCorrectionLevel: ErrorCorrectionLevel;
  fgColor: string;
  bgColor: string;
  margin: number; // quiet zone
  logoDataUrl?: string | null;
  logoSizePercent?: number; // default 20%
}

/**
 * Builds the standard RFC/ISO-compliant payload string for any QR type
 */
export function buildQRPayload(options: QRCodeOptions): string {
  switch (options.type) {
    case 'url': {
      let target = (options.url || '').trim();
      if (!target) return 'https://freetoolsnosignup.com';
      if (!/^https?:\/\//i.test(target)) {
        target = `https://${target}`;
      }
      return target;
    }

    case 'text':
      return (options.text || '').trim() || 'FreeToolsNoSignup.com – 100% Free Client-Side Tools';

    case 'wifi': {
      const { ssid, password, encryption, hidden } = options.wifi;
      const cleanSsid = (ssid || '').replace(/([\\;,:"])/g, '\\$1');
      const cleanPass = (password || '').replace(/([\\;,:"])/g, '\\$1');
      let enc = encryption || 'WPA';
      if (enc === 'nopass' || !password) enc = 'nopass';
      return `WIFI:S:${cleanSsid};T:${enc};${enc !== 'nopass' ? `P:${cleanPass};` : ''}${hidden ? 'H:true;' : ''};`;
    }

    case 'email': {
      const { email, subject, body } = options.email;
      const cleanEmail = (email || '').trim();
      if (!cleanEmail) return 'mailto:support@freetoolsnosignup.com';
      const params: string[] = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);
      const query = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${cleanEmail}${query}`;
    }

    case 'phone': {
      const cleanPhone = (options.phone || '').trim();
      return cleanPhone ? `tel:${cleanPhone}` : 'tel:+18005550199';
    }

    case 'sms': {
      const { phone, message } = options.sms;
      const cleanPhone = (phone || '').trim();
      const cleanMsg = (message || '').trim();
      if (cleanMsg) {
        return `SMSTO:${cleanPhone}:${cleanMsg}`;
      }
      return `SMSTO:${cleanPhone}:`;
    }

    case 'whatsapp': {
      const { phone, message } = options.whatsapp;
      // Strip non-digit characters except leading plus
      const digitsOnly = (phone || '').replace(/[^0-9]/g, '');
      const encodedMsg = message ? encodeURIComponent(message) : '';
      if (!digitsOnly) return 'https://wa.me/';
      return encodedMsg ? `https://wa.me/${digitsOnly}?text=${encodedMsg}` : `https://wa.me/${digitsOnly}`;
    }

    case 'vcard': {
      const { firstName, lastName, organization, title, phone, email, website, address, note } = options.vcard;
      const fn = [firstName, lastName].filter(Boolean).join(' ') || 'Contact';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName || ''};${firstName || ''};;;`,
        `FN:${fn}`,
      ];
      if (organization) lines.push(`ORG:${organization}`);
      if (title) lines.push(`TITLE:${title}`);
      if (phone) lines.push(`TEL;TYPE=CELL,VOICE:${phone}`);
      if (email) lines.push(`EMAIL;TYPE=WORK,INTERNET:${email}`);
      if (website) lines.push(`URL:${/^https?:\/\//i.test(website) ? website : `https://${website}`}`);
      if (address) lines.push(`ADR;TYPE=WORK:;;${address.replace(/[\r\n]+/g, ', ')};;;;`);
      if (note) lines.push(`NOTE:${note}`);
      lines.push('END:VCARD');
      return lines.join('\n');
    }

    case 'custom':
      return options.customText || '';

    default:
      return 'https://freetoolsnosignup.com';
  }
}

/**
 * Validates the current input based on QR type
 */
export function validateQRInput(options: QRCodeOptions): { isValid: boolean; message?: string } {
  switch (options.type) {
    case 'url': {
      const target = (options.url || '').trim();
      if (!target) return { isValid: false, message: 'Please enter a target URL.' };
      if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(/^https?:\/\//i.test(target) ? target : `https://${target}`)) {
        return { isValid: false, message: 'Please enter a valid web domain or URL format.' };
      }
      return { isValid: true };
    }

    case 'text':
      if (!options.text?.trim()) return { isValid: false, message: 'Please enter text content for the QR code.' };
      return { isValid: true };

    case 'wifi':
      if (!options.wifi?.ssid?.trim()) return { isValid: false, message: 'Wi-Fi Network Name (SSID) is required.' };
      if (options.wifi.encryption !== 'nopass' && (!options.wifi.password || options.wifi.password.length < 4)) {
        return { isValid: false, message: 'Wi-Fi password is required for WPA/WEP networks.' };
      }
      return { isValid: true };

    case 'email': {
      const email = options.email?.email?.trim();
      if (!email) return { isValid: false, message: 'Email address is required.' };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { isValid: false, message: 'Please enter a valid email format.' };
      return { isValid: true };
    }

    case 'phone': {
      const phone = options.phone?.trim();
      if (!phone) return { isValid: false, message: 'Phone number is required.' };
      if (!/^[+0-9\s\-()]{4,20}$/.test(phone)) return { isValid: false, message: 'Please enter a valid phone number.' };
      return { isValid: true };
    }

    case 'sms': {
      const phone = options.sms?.phone?.trim();
      if (!phone) return { isValid: false, message: 'Recipient phone number is required.' };
      return { isValid: true };
    }

    case 'whatsapp': {
      const phone = options.whatsapp?.phone?.trim();
      if (!phone) return { isValid: false, message: 'WhatsApp phone number with country code is required.' };
      return { isValid: true };
    }

    case 'vcard': {
      const hasName = options.vcard?.firstName?.trim() || options.vcard?.lastName?.trim();
      if (!hasName) return { isValid: false, message: 'First name or Last name is required for vCard.' };
      return { isValid: true };
    }

    case 'custom':
      if (!options.customText?.trim()) return { isValid: false, message: 'Please enter custom content.' };
      return { isValid: true };

    default:
      return { isValid: true };
  }
}

/**
 * Renders the QR code onto an HTML Canvas with optional center logo
 */
export async function renderQRToCanvas(
  canvas: HTMLCanvasElement,
  options: QRCodeOptions,
  exportSize?: number
): Promise<void> {
  const payload = buildQRPayload(options);
  const size = exportSize || options.size || 320;
  
  // Use Level 'H' automatically if a logo is present to maintain scanning reliability
  const errorLevel = options.logoDataUrl ? 'H' : options.errorCorrectionLevel;

  await QRCode.toCanvas(canvas, payload, {
    width: size,
    margin: options.margin,
    errorCorrectionLevel: errorLevel,
    color: {
      dark: options.fgColor || '#0f172a',
      light: options.bgColor || '#ffffff',
    },
  });

  // If a logo is provided, draw it centered with a protective background badge
  if (options.logoDataUrl) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const logoRatio = (options.logoSizePercent || 20) / 100;
          const logoSize = Math.floor(size * logoRatio);
          const logoX = Math.floor((size - logoSize) / 2);
          const logoY = Math.floor((size - logoSize) / 2);
          const padding = Math.max(4, Math.floor(logoSize * 0.12));
          const badgeSize = logoSize + padding * 2;
          const badgeX = logoX - padding;
          const badgeY = logoY - padding;
          const radius = Math.floor(badgeSize * 0.22);

          // Draw rounded protective background badge
          ctx.save();
          ctx.fillStyle = options.bgColor === 'transparent' ? '#ffffff' : options.bgColor;
          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, radius);
          ctx.fill();

          // Subtle shadow / stroke on badge
          ctx.strokeStyle = options.fgColor;
          ctx.lineWidth = Math.max(1, Math.floor(size * 0.005));
          ctx.globalAlpha = 0.15;
          ctx.stroke();
          ctx.restore();

          // Draw the center logo image
          ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = options.logoDataUrl!;
      });
    }
  }
}

/**
 * Generates an SVG string of the QR code
 */
export async function generateQRSVG(options: QRCodeOptions): Promise<string> {
  const payload = buildQRPayload(options);
  const errorLevel = options.logoDataUrl ? 'H' : options.errorCorrectionLevel;

  return new Promise((resolve, reject) => {
    QRCode.toString(payload, {
      type: 'svg',
      width: options.size || 512,
      margin: options.margin,
      errorCorrectionLevel: errorLevel,
      color: {
        dark: options.fgColor || '#0f172a',
        light: options.bgColor || '#ffffff',
      },
    }, (err, string) => {
      if (err) reject(err);
      else resolve(string);
    });
  });
}

/**
 * Triggers browser download for a Blob or DataURL
 */
export function downloadFile(urlOrBlob: string | Blob, filename: string): void {
  const link = document.createElement('a');
  if (typeof urlOrBlob === 'string') {
    link.href = urlOrBlob;
  } else {
    link.href = URL.createObjectURL(urlOrBlob);
  }
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (typeof urlOrBlob !== 'string') {
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }
}
