const fetch = require("node-fetch");
const Movie = require("../../models/movie");

async function fetchMovies(req, res) {
  try {
    console.log("Fetching movies...");
    const searchTerm = req.query.search;
    const apiKey = process.env.API_KEY;
    const url = `http://www.omdbapi.com/?si=${searchTerm}&apikey=69f40c47`;

    console.log("Calling external API...");
    const response = await fetch(url);
    const data = await response.json();
    console.log("Received response from API:", data);

    if (data.Search) {
      const movies = data.Search.map((movie) => ({
        title: movie.Title,
        // imdbID: movie.imdbID,
        poster: movie.Poster,
      }));
      console.log("Movies to be saved in the database:", movies);

      // Save the movies to the database using your Movie model
      await Movie.insertMany(movies);
      console.log("Movies saved in the database.");

      // Send the movies as a response
      res.json(movies);
    } else {
      console.log("No movies found.");
      res.json([]);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  fetchMovies,
};
