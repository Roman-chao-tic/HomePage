// PWA Service Worker - Cache static assets for offline/perf
const CACHE_NAME = 'browsHER-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/script.js',
  '/manifest.json',
  '/manifest.webmanifest',
  '/assets/bunny.mp3',
  '/assets/video/day.gif',
  '/assets/video/night.gif'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
