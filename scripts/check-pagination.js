// Test OMDb pagination up to page 100 without exposing an actual API key.
const Module = require('module');
const originalLoad = Module._load;
const originalFetch = global.fetch;
const originalKey = process.env.OMDB_API_KEY;
const routes = {};
Module._load = function(name, parent, isMain) {
 if(name === 'express') return {Router: () => ({get: (path, handler) => {routes[path] = handler;}})};
 return originalLoad.call(this, name, parent, isMain);
};
process.env.OMDB_API_KEY = 'testkey8';
try {require('../routes/api/movies');} finally {Module._load = originalLoad;}
const pages = [];
global.fetch = async (url) => {
 const parsed = new URL(url);
 pages.push(Number(parsed.searchParams.get('page')));
 return {ok:true,json:async () => ({Response:'True',totalResults:'1000',Search:[{Title:'Test title',imdbID:'tt1234567',Poster:'N/A'}]})};
};
async function invoke(page) {
 const res = {json(data){this.body=data;return this;}, status(c){this.statusCode=c;return this;}};
 await routes['/search']({query:{q:'Batman',page:String(page)}},res);
 return res.body;
}
(async () => {
 try {
  const result = await invoke(100);
  await invoke(800);
  await invoke(-5);
  if(result.total!==1000 || pages.join(',')!=='100,100,1') throw new Error(`Unexpected pagination: ${JSON.stringify(pages)}`);
  console.log('PASS: live-search pagination supports pages 1–100 and clamps invalid values');
 } finally {global.fetch=originalFetch;if(originalKey===undefined)delete process.env.OMDB_API_KEY;else process.env.OMDB_API_KEY=originalKey;}
})().catch(error=>{console.error('FAIL:',error.message);process.exitCode=1;});
