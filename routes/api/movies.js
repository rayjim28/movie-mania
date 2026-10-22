const express = require('express');
const router = express.Router();
const curated = require('../../data/curated-movies');
let featuredCache = null;
let featuredCachedAt = 0;

const hasOmdbKey = () => Boolean(process.env.OMDB_API_KEY && !/^(YOUR_|REPLACE_|PASTE_)/i.test(process.env.OMDB_API_KEY));
const hasTmdbToken = () => Boolean(process.env.TMDB_READ_ACCESS_TOKEN && !/^(YOUR_|REPLACE_|PASTE_)/i.test(process.env.TMDB_READ_ACCESS_TOKEN));

async function requestJson(url, headers = {}) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(9000) });
  if (!response.ok) throw new Error(`Movie provider returned ${response.status}`);
  return response.json();
}
function omdbUrl(params) {
  return `https://www.omdbapi.com/?${new URLSearchParams({ apikey:process.env.OMDB_API_KEY, ...params }).toString()}`;
}
const curatedNotice = 'Showing our starter collection. Add OMDB_API_KEY to .env for full movie search.';
// Additional picks for the Discover page. Movie information and posters come from OMDb.
const extraFeaturedIds = [
  'tt1375666', // Inception
  'tt0111161', // The Shawshank Redemption
  'tt0068646', // The Godfather
  'tt6751668', // Parasite
  'tt6710474', // Everything Everywhere All at Once
  'tt0120737', // The Fellowship of the Ring
  'tt0107290', // Jurassic Park
  'tt2582802', // Whiplash
  'tt1745960', // Top Gun: Maverick
  'tt5052448', // Get Out
  'tt2096673', // Inside Out
  'tt1392190'  // Mad Max: Fury Road
];

// Always-available collection, including when external movie providers aren't configured.
router.get('/curated', (req, res) => {
  res.json({ source:'curated', movies:curated.films.map(curated.toFeatured), total:curated.films.length });
});
router.get('/search', async (req, res) => {
  const term = String(req.query.q || '').trim().slice(0, 90);
  const page = Math.max(1, Math.min(100, Number.parseInt(req.query.page, 10) || 1));
  if (term.length < 2) return res.status(400).json({ error:'Enter at least 2 characters to search.' });
  if (!hasOmdbKey()) {
    const results = curated.search(term);
    return res.json({ source:'curated', movies:results, total:results.length, message:curatedNotice });
  }
  try {
    const data = await requestJson(omdbUrl({ s:term, page:String(page), type:'movie' }));
    if (data.Response === 'False') {
      if (/invalid api key|no api key|request limit/i.test(data.Error || '')) throw new Error(data.Error);
      return res.json({ source:'omdb', movies:[], total:0, message:data.Error || 'No matches found.' });
    }
    return res.json({ source:'omdb', movies:data.Search || [], total:Number(data.totalResults || 0) });
  } catch (error) {
    console.error('OMDb search failed:', error.message);
    const results = curated.search(term);
    return res.json({ source:'curated', movies:results, total:results.length,
      message:'Live search is temporarily unavailable. Showing matches from the starter collection.' });
  }
});
router.get('/detail', async (req, res) => {
  const id = String(req.query.id || '').trim();
  if (!/^tt\d{5,12}$/.test(id)) return res.status(400).json({ error:'Invalid movie ID.' });
  const local = curated.findById(id);
  if (!hasOmdbKey()) return local ? res.json(local) : res.status(503).json({ error:'Add OMDB_API_KEY for detailed movie lookup.' });
  try {
    const data = await requestJson(omdbUrl({ i:id, plot:'full' }));
    if (data.Response === 'False') return local ? res.json(local) : res.status(404).json({ error:'Movie details not found.' });
    return res.json(data);
  } catch (error) {
    console.error('OMDb detail failed:', error.message);
    return local ? res.json(local) : res.status(502).json({ error:'Movie details are temporarily unavailable.' });
  }
});
router.get('/featured', async (req, res) => {
  if (featuredCache && Date.now() - featuredCachedAt < 12 * 60 * 60 * 1000) return res.json(featuredCache);
  if (hasTmdbToken()) {
    try {
      const tmdb = await requestJson('https://api.themoviedb.org/3/trending/movie/week?language=en-US', {
        Authorization:`Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`, accept:'application/json'
      });
      const movies = (tmdb.results || []).filter(movie => movie.poster_path).slice(0, 16).map(movie => ({
        id:movie.id, title:movie.title, overview:movie.overview, year:String(movie.release_date || '').slice(0,4),
        rating:Number(movie.vote_average || 0).toFixed(1),
        poster:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backdrop:movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null
      }));
      if (movies.length) {
        featuredCache = { source:'tmdb', movies };
        featuredCachedAt = Date.now();
        return res.json(featuredCache);
      }
    } catch (error) { console.error('TMDB trending failed; using curated movies:', error.message); }
  }
  // Add more films using the existing OMDb key; keep the starter movies as a fallback.
  if (hasOmdbKey()) {
    const extras = await Promise.all(extraFeaturedIds.map(async (id) => {
      try {
        const movie = await requestJson(omdbUrl({ i:id, plot:'short' }));
        return movie.Response === 'True' && movie.Type === 'movie'
          ? curated.toFeatured(movie) : null;
      } catch (error) {
        console.warn('Featured movie unavailable:', id, error.message);
        return null;
      }
    }));
    const more = extras.filter(Boolean);
    if (more.length) {
      featuredCache = { source:'omdb', movies:[
        ...curated.films.map(curated.toFeatured), ...more
      ] };
      featuredCachedAt = Date.now();
      return res.json(featuredCache);
    }
  }
  // Curated fallback means the hero and homepage never depend on a service key.
  featuredCache = { source:'curated', movies:curated.films.map(curated.toFeatured) };
  featuredCachedAt = Date.now();
  res.json(featuredCache);
});
module.exports = router;
