const CACHE_NAME = "image-cache-v1";

const imageUrls: string[] = [
  "./backgrounds/background1.png",
  "./backgrounds/background2.png",
  "./backgrounds/background3.png",
  "./backgrounds/background4.png",
  "./backgrounds/background5.png",
  "./backgrounds/background6.png",
  "./backgrounds/background7.png",
  "./backgrounds/background8.png",
  "./backgrounds/background9.png",
  "./backgrounds/background10.png",
  "/assets/images/bullets/electro-1.png",
  "/assets/images/bullets/electro-2.png",
  "/assets/images/bullets/fire-1.png",
  "/assets/images/bullets/fire-2.png",
  "/assets/images/bullets/fire.png",
  "/assets/images/bullets/lz-1.png",
  "/assets/images/bullets/lz-2.png",
  "/assets/images/bullets/lz-3.png",
  "/assets/images/bullets/plz-2.png",
  "/assets/images/bullets/plz-1.png",
];

(self as unknown as ServiceWorkerGlobalScope).addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching images...");
      return cache.addAll(imageUrls);
    })
  );
});

(self as unknown as ServiceWorkerGlobalScope).addEventListener("fetch", (event: FetchEvent) => {
  const requestUrl = new URL(event.request.url);
  const isImage = imageUrls.some((path) => requestUrl.pathname.endsWith(path.replace(/^\.\//, "")));

  if (isImage) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return (
          cached ||
          fetch(event.request).then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
        );
      })
    );
  }
});
