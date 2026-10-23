// Tests the local curated movie API handlers without a database or external key.
const Module = require('module');
const originalLoad = Module._load;
const handlers = {};
Module._load = function mockExpress(name, parent, isMain) {
  if (name === 'express') return { Router: () => ({ get: (path, fn) => { handlers[path] = fn; } }) };
  return originalLoad.call(this, name, parent, isMain);
};
try { require('../routes/api/movies'); } finally { Module._load = originalLoad; }
async function request(path, query={}) {
  const res = {
    statusCode:200, status(code){this.statusCode=code;return this;},
    json(body){this.body=body;return this;},
  };
  await handlers[path]({query},res);
  if (res.statusCode !== 200) throw new Error(`${path} returned ${res.statusCode}`);
  return res.body;
}
(async () => {
  const collection = await request('/curated');
  const featured = await request('/featured');
  const search = await request('/search', {q:'Batman'});
  const details = await request('/detail', {id:'tt0816692'});
  if (collection.movies.length < 8 || featured.movies.length < 8 || search.movies.length < 1 || details.Title !== 'Interstellar') {
    throw new Error('Movie starter collection failed its checks');
  }
  console.log('PASS: featured posters, starter catalog, title search and film details');
})().catch(error => { console.error('FAIL:',error.message);process.exitCode=1; });
