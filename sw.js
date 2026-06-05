// TransitionCommand service worker
// Purpose:
//   1. Satisfy PWA installability so Chrome fires beforeinstallprompt
//      (a registered SW with a fetch handler controlling the site scope).
//   2. Provide a safe offline fallback.
// Strategy: network-first for every GET so the HTML shell is never served
// stale. Cache is only used when the network is unavailable. This avoids the
// stale-shell splash loop that bit Going Out.

const CACHE = 'tc-cache-v1';
const CORE = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE).catch(() => {}))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return; // never touch POSTs (license, Jessica, etc.)

  event.respondWith(
    fetch(req)
      .then(res => {
        // Cache a copy of successful same-origin responses for offline use.
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(hit => hit || caches.match('/index.html'))
      )
  );
});
