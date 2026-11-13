/* =========================================================
   The Five Senses — Offline-First Service Worker (PWA)
   Stale-While-Revalidate for App Shell; Cache-First for Google Fonts CORS;
   passthrough for video Range requests & untrusted external origins.
   ========================================================= */
const CACHE_NAME = 'five-senses-clil-v4.1';
const FONT_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);
const CORE_ASSETS = [
  './',
  './index.html',
  './biblical_senses.html',
  './manifest.json',
  './css/styles.css',
  './js/data.js',
  './js/diagrams.js',
  './js/app.js',
  './js/biblical.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Do not intercept video Range requests or .mp4 streams
  if (req.headers.has('range') || url.pathname.endsWith('.mp4')) {
    return;
  }

  // Allowlist Google Fonts CORS caching so Fraunces/Inter persist offline
  if (url.origin !== self.location.origin) {
    if (!FONT_HOSTS.has(url.hostname)) return;
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.status === 200 && (res.type === 'cors' || res.type === 'basic')) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // Same-origin App Shell: Stale-While-Revalidate prevents stale GitHub Pages cache traps
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req).then((cached) => {
        const networkFetch = fetch(req)
          .then((res) => {
            if (res && res.status === 200 && res.type === 'basic') {
              cache.put(req, res.clone());
            }
            return res;
          })
          .catch(() => null);

        if (cached) {
          event.waitUntil(networkFetch);
          return cached;
        }

        return networkFetch.then((res) => {
          if (res) return res;
          if (req.mode === 'navigate') {
            return cache.match('./index.html');
          }
          return new Response('', { status: 504, statusText: 'Offline' });
        });
      })
    )
  );
});
