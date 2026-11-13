/* =========================================================
   The Five Senses — Offline-First Service Worker (PWA)
   Cache-First for core app shell; network passthrough for video range requests.
   ========================================================= */
const CACHE_NAME = 'five-senses-clil-v4.0';
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

  // Do not intercept video Range requests to avoid breaking HTML5 media streaming
  if (req.headers.has('range') || req.url.endsWith('.mp4')) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
