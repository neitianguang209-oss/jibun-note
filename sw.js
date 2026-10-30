// Service Worker テンプレート（ビルド不要・手書き）
// 使い方: APP_SHELLの一覧を実際のプロジェクトのファイル構成に合わせて書き換える。
// 全パスは相対（先頭に/を付けない）。GitHub Pagesのようなサブパス配信でも壊れないようにするため。
const CACHE_NAME = 'jibun-note-v1'; // 更新のたびに上げる。以後アプリを更新してデプロイするたび、内容を問わず毎回vを上げる。
// 上げないとブラウザがsw.js自体の変更を検知できず、古いキャッシュを配信し続ける(details: references/pwa-and-deploy.md)
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
].map((p) => new URL(p, self.registration.scope).toString());

const INDEX_URL = new URL('./index.html', self.registration.scope).toString();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => {
          if (req.mode === 'navigate') return caches.match(INDEX_URL);
          return cached;
        });
      return cached || fetchPromise;
    })
  );
});
