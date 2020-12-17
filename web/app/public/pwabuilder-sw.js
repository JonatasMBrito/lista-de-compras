var identificador = 'TC lista de compras';
var versao = 4;
var idAtual = identificador + '-' + versao;
var idAnterior = identificador + '-' + (versao - 1);

var urls = [    
    '/',
    '/cadastro',
    '/lista/',
    '/static/css/main.5b1a59d7.css',
    '/static/css/main.5b1a59d7.css.map',
    '/static/css/main.0cab8f06.js',
    '/static/css/main.0cab8f06.js.map',
    'favicon.ico',
    'icons/icon-72x72.png',
    'icons/icon-96x96.png',
    'icons/icon-144x144.png',
    'icons/icon-152x152.png',
    'icons/icon-192x192.png',
    'icons/icon-384x384.png',
    'icons/icon-512x512.png'
];

function instalarServiceWorker() {
    console.log('ServiceWorker instalado com sucesso!');
}

function ativarServiceWorker() {
    caches.open(idAtual).then(cache => {
        console.log('Cache Storage ' + idAtual + ' foi ativado com sucesso!');

        cache.addAll(urls)
            .then(function(){
                caches.delete(idAnterior)
                console.log('Cache Storage ' + idAnterior + ' foi excluído!');
            })
    })
}

function buscarArquivos(event) {    
    event.respondWith(
        caches.match(event.request).then(function(arquivoCache) {            
            return arquivoCache ? arquivoCache : fetch(event.request);
        })
    )
}

function buscarArquivosComSalvamento(event) {
    event.respondWith(
        caches.match(event.request).then(function(arquivoCache) {        
            if (arquivoCache) {
                return arquivoCache;
            }

            var cloneDoRequest = event.request.clone();
            return fetch(cloneDoRequest).then(function(response) {                
                var cloneDoResponse = response.clone();
                caches.open(idAtual).then(function(cache) {
                    cache.put(event.request, cloneDoResponse);
                });
                return response;
            });
        })
    );
}

self.addEventListener("install", instalarServiceWorker);
self.addEventListener("activate", ativarServiceWorker);
self.addEventListener("fetch", buscarArquivos);