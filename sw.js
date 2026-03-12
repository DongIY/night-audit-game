// Night Audit — Service Worker v1.4.0
const CACHE_NAME = 'night-audit-v1.4.0';
const ASSETS = [
  './home.html',
  './prologue.html',
  './index.html',
  './dashboard.html',
  './ticket.html',
  './victim-profile.html',
  './audit-log.html',
  './kb-diff.html',
  './email-forensics.html',
  './supply-chain.html',
  './db-forensics.html',
  './permission.html',
  './comms.html',
  './conspiracy.html',
  './personnel.html',
  './surveillance.html',
  './terminal.html',
  './choices.html',
  './finale.html',
  './ending-success.html',
  './ending-partial.html',
  './ending-failure.html',
  './css/global.css',
  './css/prologue.css',
  './css/login.css',
  './css/dashboard.css',
  './css/ticket.css',
  './css/audit-log.css',
  './css/kb-diff.css',
  './css/permission.css',
  './css/comms.css',
  './css/personnel.css',
  './css/terminal.css',
  './css/choices.css',
  './css/finale.css',
  './js/game-state.js',
  './js/interactions.js',
  './js/navigation.js',
  './js/audio.js',
  './js/timer.js',
  './manifest.json'
];

// 安装：预缓存所有资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 激活：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 请求：缓存优先策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => caches.match('./home.html'))
  );
});
