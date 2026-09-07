const CACHE_NAME = "fode-learning-hub-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./grades.html",
    "./subjects.html",
    "./units.html",
    "./library.html",
    "./resources.html",
    "./pdf-viewer.html",
    "./calculator.html",
    "./favourites.html",
    "./recent.html",
    "./about.html",

    "./css/style.css",

    "./js/data.js",
    "./js/script.js",
    "./js/grades.js",
    "./js/subjects.js",
    "./js/units.js",
    "./js/library.js",
    "./js/resources.js",
    "./js/pdf-viewer.js",
    "./js/favourites.js",
    "./js/recent.js",
    "./js/tools.js"
];


/* INSTALL */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});


/* ACTIVATE */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))

            );

        })

    );

    self.clients.claim();

});


/* FETCH */

self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)

            .then(response => {

                if (
                    response &&
                    response.status === 200 &&
                    response.type === "basic"
                ) {

                    const responseClone =
                        response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {

                            cache.put(
                                event.request,
                                responseClone
                            );

                        });

                }

                return response;

            })

            .catch(() => {

                return caches.match(event.request);

            })

    );

});