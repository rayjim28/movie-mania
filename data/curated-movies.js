// Starter collection: works without an external movie API key.
// Film posters are loaded from TMDB's public image CDN. Movie imagery remains
// owned by its respective rights holders; no images are redistributed here.
// Once OMDB_API_KEY is set, full search and detailed information come from OMDb.
const films = [
  { imdbID:'tt0816692', Title:'Interstellar', Year:'2014', Genre:'Adventure, Drama, Sci-Fi', Runtime:'169 min', Rated:'PG-13',
    Plot:'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.',
    Poster:'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', Director:'Christopher Nolan' },
  { imdbID:'tt15239678', Title:'Dune: Part Two', Year:'2024', Genre:'Science Fiction, Adventure', Runtime:'166 min', Rated:'PG-13',
    Plot:'Paul Atreides unites with Chani and the Fremen while facing the choices that will determine the fate of Arrakis.',
    Poster:'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', Director:'Denis Villeneuve' },
  { imdbID:'tt1877830', Title:'The Batman', Year:'2022', Genre:'Crime, Drama, Mystery', Runtime:'176 min', Rated:'PG-13',
    Plot:'Batman investigates a series of murders that expose corruption at the heart of Gotham City.',
    Poster:'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', Director:'Matt Reeves' },
  { imdbID:'tt0468569', Title:'The Dark Knight', Year:'2008', Genre:'Action, Crime, Drama', Runtime:'152 min', Rated:'PG-13',
    Plot:'Batman faces a criminal mastermind whose escalating chaos pushes Gotham to its limits.',
    Poster:'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', Director:'Christopher Nolan' },
  { imdbID:'tt9362722', Title:'Spider-Man: Across the Spider-Verse', Year:'2023', Genre:'Animation, Action, Adventure', Runtime:'140 min', Rated:'PG',
    Plot:'Miles Morales travels across the multiverse and meets a team of Spider-People facing a new threat.',
    Poster:'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', Director:'Joaquim Dos Santos, Kemp Powers, Justin K. Thompson' },
  { imdbID:'tt0133093', Title:'The Matrix', Year:'1999', Genre:'Action, Sci-Fi', Runtime:'136 min', Rated:'R',
    Plot:'A hacker discovers the unsettling truth about his world and joins a rebellion against the machines.',
    Poster:'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', Director:'Lana Wachowski, Lilly Wachowski' },
  { imdbID:'tt1856101', Title:'Blade Runner 2049', Year:'2017', Genre:'Drama, Mystery, Sci-Fi', Runtime:'164 min', Rated:'R',
    Plot:'A young blade runner uncovers a long-buried secret that could destabilize society.',
    Poster:'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', Director:'Denis Villeneuve' },
  { imdbID:'tt15398776', Title:'Oppenheimer', Year:'2023', Genre:'Biography, Drama, History', Runtime:'180 min', Rated:'R',
    Plot:'The story of theoretical physicist J. Robert Oppenheimer and the development of the atomic bomb.',
    Poster:'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', Director:'Christopher Nolan' },
];
const toFeatured = (movie) => ({ id:movie.imdbID, imdbID:movie.imdbID, title:movie.Title, Title:movie.Title, year:movie.Year, Year:movie.Year, poster:movie.Poster, Poster:movie.Poster, overview:movie.Plot, genre:movie.Genre, director:movie.Director });
const findById = (id) => films.find((movie) => movie.imdbID === id);
const search = (term) => films.filter((film) => `${film.Title} ${film.Genre} ${film.Director}`.toLowerCase().includes(term.toLowerCase()));
module.exports = { films, toFeatured, findById, search };
