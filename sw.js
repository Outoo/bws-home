const V='tamreeni-v5';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png']).catch(()=>{})).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true}).then(m=>{const f=fetch(r).then(n=>{if(n&&n.ok)c.put(r,n.clone());return n;}).catch(()=>m);return m||f;})));});
