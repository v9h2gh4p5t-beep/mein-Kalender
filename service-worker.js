const CACHE_NAME = "dienstplan-v1";

const DATEIEN = [
    "./",
    "./index.html",
    "./icon.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(DATEIEN);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNamen) {
            return Promise.all(
                cacheNamen
                    .filter(function(name) {
                        return name !== CACHE_NAME;
                    })
                    .map(function(name) {
                        return caches.delete(name);
                    })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(antwort) {
            return antwort || fetch(event.request);
        })
    );
});