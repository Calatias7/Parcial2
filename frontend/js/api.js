const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  ? 'http://localhost:3000'
  : (location.origin.replace(/\/frontend$/, '')); // ajustar si se sirve estático por separado

async function api(path, method='GET', body){
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(API_BASE + path, opts);
  return await r.json();
}
