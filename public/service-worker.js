const CACHE = 'asr-v1'
const ASSETS = ['/', '/manifest', '/branding/logo/logo-192.png']

self.addEventListener('install', e =>
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  )
)

self.addEventListener('activate', e =>
  e.waitUntil(self.clients.claim())
)

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  )
})