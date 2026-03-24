// ─── SERVICE WORKER ───────────────────────────────────────────────────────────
// Caches all app assets for full offline support.
// Cache-first strategy for assets, network-first for external resources.
// ──────────────────────────────────────────────────────────────────────────────

const CACHE_NAME    = 'gym-plan-129-v1.0.4';
const CACHE_STATIC  = 'gym-plan-static-v1.0.4';
const CACHE_FONTS   = 'gym-plan-fonts-v1.0.4';

// Core app files — always cache these
const STATIC_ASSETS = [
  './index.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './data/exercises.js',
  './data/meals.js',
  './data/foodtable.js',
  './js/storage.js',
  './js/app.js',
  './js/workout.js',
  './js/fuel.js',
  './js/overload.js'
];

// External assets to cache on first use
const EXTERNAL_CACHE = [
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
];

// ── Install ────────────────────────────────────────────────────────────────

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => {
        // Silent fail - could add analytics tracking here
        // console.error('Cache install failed:', err);
      })
  );
});

// ── Activate ───────────────────────────────────────────────────────────────

self.addEventListener('activate', event => {
  const validCaches = [CACHE_STATIC, CACHE_FONTS, CACHE_NAME];

  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => !validCaches.includes(key))
          .map(key => {
            // Silent cleanup - could add analytics here
            // console.log('Deleting old cache:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ──────────────────────────────────────────────────────────────────

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // Google Fonts — cache first, network fallback
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(event.request, CACHE_FONTS));
    return;
  }

  // Chart.js CDN — cache first
  if (url.hostname === 'cdnjs.cloudflare.com') {
    event.respondWith(cacheFirst(event.request, CACHE_NAME));
    return;
  }

  // External links (YouTube, MuscleWiki) — network only, no cache
  if (url.hostname !== self.location.hostname && !url.href.includes(self.location.origin)) {
    event.respondWith(networkOnly(event.request));
    return;
  }

  // App assets — cache first, network fallback
  event.respondWith(cacheFirst(event.request, CACHE_STATIC));
});

// ── Strategies ─────────────────────────────────────────────────────────────

// Cache first — serve from cache, fetch and update if not cached
async function cacheFirst(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return new Response('Offline — resource not cached', {
      status:  503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Network only — no caching (for external links)
async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch {
    return new Response('', { status: 503 });
  }
}

// ── Background Sync (future use) ───────────────────────────────────────────

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
