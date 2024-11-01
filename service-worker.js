const CACHE_NAME = "weather-app-cache-v0.0.3";
const ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/manifest.json",
    "/IMG_2142.jpeg", // Ensure the map image path is correct
    "/images/icon-192x192.png", // Ensure these paths are correct
    "/images/icon-512x512.png"
];

// Install Service Worker and Cache Assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching app assets");
            return cache.addAll(ASSETS);
        }).catch((error) => {
            console.error("Failed to cache assets during installation:", error);
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
        }).catch((error) => {
            console.error("Failed to clear old caches during activation:", error);
        })
    );
    self.clients.claim();
});

// Fetch Event to Serve Cached Assets and Update Cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Serve the cached response if available
            if (cachedResponse) {
                return cachedResponse;
            }

            // Fetch from network and update cache with new content
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch((error) => {
            console.error("Fetch failed:", error);
        })
    );
});
