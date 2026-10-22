# Movie Mania — Cinematic Edition V3

A clean React + Express + MongoDB film discovery and demo rental application. This redesign preserves the original accounts and rental model, with a cinematic UI and responsive layout.

## Works immediately, even without a film API key

The **Discover** and **Explore** pages now show a curated set of real movie titles with poster images (served by TMDB's image CDN). Search matches titles and genres from that starter collection, and those films can be added to demo rentals. The **genre chips filter the curated collection only**; OMDb supports movie-title search, not general genre search. Search has accessible previous/next navigation up to OMDb's 100-page API limit (10 results per page). Add `OMDB_API_KEY` to enable **full OMDb film search**; add `TMDB_READ_ACCESS_TOKEN` only if you want live trending titles on the homepage. No fake results are presented as live data.

Movie posters need an internet connection. If OMDb has no poster (`N/A`), or a remote image fails to load, a designed title-and-year movie card appears instead of a broken image. This works on the movie grid, detail modal, and rental history. Movie posters and related trademarks belong to their owners.

## Setup on your Mac

1. Unzip and move `movie-mania-polished` alongside your working `movie-mania` in `~/personal_projects`.
2. Open `movie-mania-polished` in VS Code.
3. In the **new project's** VS Code terminal, run `cp ../movie-mania/.env .env` to copy your private working database settings. **Do not share or commit `.env`.**
4. Start two terminals in this folder:

```bash
# Terminal 1: install and run backend
npm install
node server.js

# Terminal 2: React frontend
npm start
```

Open http://localhost:3000. The API uses http://localhost:3001.

You can run `npm run check:movies` to validate the built-in featured catalog and movie routes even without an OMDb key.

5. Test: homepage should display Interstellar, Dune: Part Two, etc.; explore page should show the same starter collection; click movie details; log in; add a movie and confirm a **demo** rental. Full search requires a valid OMDb key.

## Optional full movie search

1. Request an OMDb API key at https://www.omdbapi.com/apikey.aspx.
2. In `.env`, add `OMDB_API_KEY=YOUR_REAL_KEY` (not in code, screenshots, or GitHub).
3. Restart **backend** (`Control+C`, `node server.js`) and reload the page. Check that the key is **only the key**, not the full OMDb URL.
4. Search by film title to get broader OMDb results and detailed plots/ratings.

To use live TMDB trending results, obtain an API Read Access Token via your TMDB account and set `TMDB_READ_ACCESS_TOKEN` in `.env`. The curated catalog still works without either provider. The app does **not** show video trailers; the right-side hero is a featured movie poster and detail action rather than a misleading play button.

## Preparing GitHub contributions correctly

Check https://github.com/settings/emails for an email verified on your GitHub account, or use the GitHub-provided `noreply` address there. Before committing, configure Git **in the Movie Mania folder**:

```bash
git config user.name "Raymond Jimenez"
git config user.email "YOUR_VERIFIED_GITHUB_EMAIL_OR_NOREPLY"
git config --get user.email
```

Then copy tested files to the original repository (or make this folder the new worktree), review `git diff` and `git status`, and commit/push on `main` once satisfied. Do not `git init` in this ZIP unless you intend to start an entirely new repository; existing Git history should be kept.

## Notes

- Signup/login and MongoDB rentals require the Express backend and a working MongoDB URL and JWT secret.
- Rental checkout is a **demo**, not a payment flow.
- This version retains the older Create React App dependency stack and may still show `npm audit` notices. Review and update dependencies before public deployment.
- The previous public frontend keys should be rotated if they were exposed.

## V3 updates and test checklist

- **Missing artwork:** Search for a film whose poster is unavailable. You should see a branded fallback showing the title, not a broken-image icon; click to test the modal too.
- **Genre picks:** On Explore, select Sci-Fi or Crime. The handpicked starter grid should filter; select **All films** to reset.
- **Live search and pagination:** Search a broad term such as Batman and use **Next** / **Previous**. The results range, total and URL page number should update. OMDb provides 10 movies per page and supports pages 1–100.
- **Details:** Click a result to inspect rating, runtime, plot, director and cast (when provided by OMDb).
- **Rentals:** Sign in, add a film, remove one, confirm a **demo** rental and check history. No actual payment is collected.

Run `npm run check:movies` for quick movie-route checks without a database. Before publishing, verify `npm run build`, test account/rental operations locally, and review dependency security advisories.

This folder is a **separate copy**: do not commit or push it to GitHub until you've tested it. Use your existing Movie Mania repo/history when you're ready.
