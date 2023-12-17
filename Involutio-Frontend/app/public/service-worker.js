const CACHE_NAME = 'involutio-cache-data';

// Установка Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    "/",
                    "../public/robots.txt",
                    "../public/fonts/Oswald/Oswald-VariableFont_wght.ttf",
                    "../src/assets/home.svg",
                    "../src/assets/logout.svg",
                    "../src/assets/report.svg",
                    "../src/assets/users.svg",
                    "../src/assets/gradient.svg",
                    "../index.html",
                    "../src/global.scss",
                    "../src/styles/indexStyles.scss",
                    "../src/styles/sidebarStyles.scss",
                    "../src/styles/headerStyles.scss",
                    "../src/styles/cardsStyles.scss",
                    "../src/styles/chartsStyles.scss",
                    "../src/styles/dropdownMenu.scss"
                ]);
            })
    );
});

// Активация Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
});

// Получение запросов и возврат кэшированных данных, если такие есть, иначе выполнение сетевого запроса
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});