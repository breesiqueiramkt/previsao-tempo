// Service Worker simples: guarda em cache apenas os arquivos do "shell"
// do site (HTML, CSS, JS, ícones). Os dados de previsão do tempo NUNCA
// são armazenados em cache, pois precisam estar sempre atualizados.

const CACHE_NAME = "previsao-tempo-shell-v1";

const ARQUIVOS_DO_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/script.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS_DO_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(
        chaves
          .filter((chave) => chave !== CACHE_NAME)
          .map((chave) => caches.delete(chave))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
  // Nunca faz cache das chamadas à BrasilAPI: a previsão do tempo tem
  // que vir sempre da internet, nunca de uma versão antiga guardada
  if (evento.request.url.includes("brasilapi.com.br")) {
    return;
  }

  evento.respondWith(
    caches.match(evento.request).then((respostaEmCache) => {
      return respostaEmCache || fetch(evento.request);
    })
  );
});
