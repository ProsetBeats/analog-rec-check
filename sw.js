
const CACHE_NAME = 'analog-rec-check-v1';
const ASSETS = [
  './',
  './index.html',
  './index.tsx',
  'https://cdn.tailwindcss.com',
  'https://www.transparenttextures.com/patterns/dark-leather.png',
  'https://www.transparenttextures.com/patterns/absurd-dad.png',
  'https://www.transparenttextures.com/patterns/carbon-fibre.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
