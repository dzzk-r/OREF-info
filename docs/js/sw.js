// js/sw.js
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute([
  { url: './', revision: null },
  { url: './index.html', revision: null },
  { url: './css/main.css', revision: null },
  { url: './js/main.js', revision: null },
  { url: './assets/lang.json', revision: null },
  { url: './js/language.js', revision: null },
  { url: './OREF-Info-Offline-v3.apk', revision: null },
  { url: './slides.pdf', revision: null },
  { url: './icons/icon-192.png', revision: null },
  { url: './icons/icon-512.png', revision: null },
  { url: './manifest.json', revision: null },
]);

// HTML pages: stale-while-revalidate
registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate()
);

// Static assets (CSS/JS/images)
registerRoute(
  ({ request }) =>
    ['style', 'script', 'image'].includes(request.destination),
  new StaleWhileRevalidate()
);
