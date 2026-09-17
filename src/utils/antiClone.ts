/**
 * FreeToolsNoSignup.com - Soft Protection Layer
 * Soft protection only - No aggressive blocking that can cause blank screens on various deploy targets (Vercel, Netlify, Custom Domains, etc.)
 */

if (typeof window !== 'undefined') {
  // Console branding and protection message
  console.log(
    '%c© FreeToolsNoSignup.com Protected',
    'color:#D4AF37;font-size:20px;font-weight:bold;font-family:sans-serif;'
  );

  // Soft warning on inspect shortcuts without breaking developer tools or browser standard functions
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const key = (e.key || '').toUpperCase();
    if (
      e.key === 'F12' ||
      e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(key)) ||
      (e.metaKey && e.shiftKey && ['I', 'J', 'C'].includes(key))
    ) {
      console.warn('FreeToolsNoSignup.com - 4753 Tools Client-Side Protected');
    }
  });
}

export {};
