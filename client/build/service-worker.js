"use strict";var precacheConfig=[["/index.html","73ba03b5005bc71a71d0f2e3c6a2d3ca"],["/static/css/main.bc691734.css","9719825e271daa062888e0b00f3924f1"],["/static/js/main.613a8ec7.js","1e4658104104688a5f2536e80334c88f"],["/static/media/bcc_logo.495efeb6.svg","495efeb6ecc763493a7e6e9220525a3a"],["/static/media/bnb_logo.3bcde3a5.svg","3bcde3a5d280c35a5c67c692be63421e"],["/static/media/btc_logo.6dbb5e7c.svg","6dbb5e7c654eb8774c84a21ae44b875c"],["/static/media/coin-crusader_logo.0813e5b1.svg","0813e5b1869048488d16bea85a144867"],["/static/media/dash_logo.171db6eb.svg","171db6ebd75ac4e9b808a9817fa8ea26"],["/static/media/etc_logo.b9dd7240.svg","b9dd7240bcd107fbe64ce68701f1bbe7"],["/static/media/eth_logo.b84514b3.svg","b84514b35dee07d260d4adb91148d45b"],["/static/media/jumbotron_img.3ccfb7fb.svg","3ccfb7fb8d7db5f303920729593d392d"],["/static/media/kmd_logo.e22ff62c.svg","e22ff62c5b5c7f02984e856f0fe956ae"],["/static/media/lbc_logo.d9c1173a.svg","d9c1173a0275925ab7a1c4f380402f46"],["/static/media/ltc_logo.c8e7793a.svg","c8e7793a36ef852d3bb6300d571ade46"],["/static/media/neo_logo.559996e9.svg","559996e918b1d9c7fd55b750a226a688"],["/static/media/steem_logo.0994fd05.svg","0994fd05c7456a588b019b3ecd47edd2"],["/static/media/usdt_logo.fb586eae.svg","fb586eae448e91a3e03388e2306720d0"],["/static/media/xlm_logo.91729b25.svg","91729b25e4f9f2e0580e7e49f8b673db"],["/static/media/xmr_logo.5a05d911.svg","5a05d911c919aadf786a0f6b810d2f43"],["/static/media/xrp_logo.cb977ecc.svg","cb977ecc4c44a0935be84a9e973bf3f9"],["/static/media/zec_logo.7c6753ea.svg","7c6753ea4eadbb39a02dcd6677d4da4d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});