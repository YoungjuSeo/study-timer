// v5 - 자기 자신을 해제하는 서비스 워커
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))),
      self.registration.unregister()
    ])
  );
  self.clients.claim();
});

// 모든 요청은 네트워크에서 직접 가져옴 (캐시 안함)
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
