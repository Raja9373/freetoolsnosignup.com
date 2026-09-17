/**
 * FreeToolsNoSignup.com - Anti-Clone & Source Protection Layer
 * Protects code integrity, deters scraping, blocks iframe embedding, and prevents unauthorized clones.
 */

if (typeof window !== 'undefined') {
  // Console warning
  console.log('%cSTOP! © FreeToolsNoSignup.com', 'font-size:40px;color:red;font-weight:bold');

  // Prevent right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Block Developer Tools & Source Inspection Shortcuts
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const key = (e.key || '').toUpperCase();
    if (
      e.key === 'F12' ||
      e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(key)) ||
      (e.ctrlKey && ['U', 'S'].includes(key)) ||
      (e.metaKey && e.shiftKey && ['I', 'J', 'C'].includes(key)) ||
      (e.metaKey && ['U', 'S'].includes(key))
    ) {
      e.preventDefault();
      try {
        alert('© FreeToolsNoSignup.com - Protected');
      } catch {}
      return false;
    }
  });

  // Domain lock check
  const allowed = [
    'freetoolsnosignup.com',
    'www.freetoolsnosignup.com',
    'localhost',
    '127.0.0.1',
    'run.app'
  ];

  if (!allowed.some((d) => window.location.hostname.includes(d))) {
    document.body.innerHTML = '<h1 style="text-align:center;margin-top:100px;font-family:sans-serif;color:#D4AF37;">© Unauthorized Domain - Protected</h1>';
    throw new Error('Domain not allowed');
  }

  // Anti-iframe (exempts local and preview sandboxes)
  const isPreviewOrLocal =
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('127.0.0.1') ||
    window.location.hostname.includes('run.app');

  if (!isPreviewOrLocal && window.top !== window.self) {
    try {
      if (window.top) {
        window.top.location.href = window.self.location.href;
      }
    } catch {
      window.location.href = 'https://freetoolsnosignup.com';
    }
  }
}

export {};

