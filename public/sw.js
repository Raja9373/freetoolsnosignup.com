const CACHE_NAME = 'ftns-cache-v1';

const POPULAR_TOOLS_TO_PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/badge.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/apple-touch-icon.png',
  '/tools/pdf-merge',
  '/tools/pdf-split',
  '/tools/pdf-compress',
  '/tools/pdf-rotate',
  '/tools/pdf-to-jpg',
  '/tools/jpg-to-pdf',
  '/tools/pdf-to-word',
  '/tools/image-compressor',
  '/tools/image-resizer',
  '/tools/image-crop',
  '/tools/bg-remover',
  '/tools/image-converter',
  '/tools/custom-notion-template-database-builder',
  '/tools/ats-resume-scanner',
  '/tools/ats-keyword-matcher',
  '/tools/cover-letter-writer',
  '/tools/ai-content-detector',
  '/tools/ai-text-humanizer',
  '/tools/citation-generator',
  '/tools/fake-data-generator',
  '/tools/json-formatter',
  '/tools/qr-generator',
  '/tools/regex-tester',
  '/tools/base64-converter',
  '/tools/hash-generator',
  '/tools/mortgage-calculator',
  '/tools/sip-calculator',
  '/tools/emi-calculator',
  '/tools/salary-calculator',
  '/tools/compound-interest-calculator',
  '/tools/bmi-calculator',
  '/tools/scientific-calculator',
  '/pdf-tools',
  '/image-tools',
  '/calculators',
  '/job-ats',
  '/ai-study',
  '/dev-tools',
  '/notion-template-builder',
  '/backlinks',
  '/partners',
  '/launch',
  '/chrome-extension'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Precache popular paths - ignore individual failures so offline works even if a route changes
      return Promise.allSettled(
        POPULAR_TOOLS_TO_PRECACHE.map((url) =>
          fetch(url, { cache: 'reload' })
            .then((res) => {
              if (res.ok) return cache.put(url, res);
            })
            .catch(() => {
              // Ignore precache network misses during build
            })
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip cross-origin ad scripts and google analytics/syndication from caching
  if (
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/api') ||
    url.pathname === '/ads.txt'
  ) {
    return;
  }

  // HTML Navigation: Network-first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match('/');
          if (fallback) return fallback;
          return new Response('Offline: Page not cached yet. Please reconnect to internet.', {
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // Static Assets (JS, CSS, PNG, SVG, Fonts): Stale-while-revalidate or Cache-first
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background to revalidate
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      });
    })
  );
});
