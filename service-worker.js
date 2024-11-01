const CACHE_NAME = "weather-app-cache-v0.0.1";
const ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/manifest.json",
    "/images/icon-192x192.png", // Add paths to any icons or images used
    "/images/icon-512x512.png"
];

// Install Service Worker and Cache Assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching app assets");
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate Service Worker and Clear Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Clearing old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event to Serve Cached Assets and Update Cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse; // Serve from cache
            }
            return fetch(event.request).then((networkResponse) => {
                // Cache the new response
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});
