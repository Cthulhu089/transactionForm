// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));

// self.addEventListener("message", event => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });
self.addEventListener("activate", event =>
  event.waitUntil(self.clients.claim())
);

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.precaching.precacheAndRoute([]);
/* custom cache rules*/
workbox.routing.registerNavigationRoute("/index.html", {
  blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
});

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);

// app-shell
workbox.routing.registerRoute("/", workbox.strategies.networkFirst());
