import React from "react";
import { useState, useEffect } from "react";
import "./HomePage.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const fetch = require("node-fetch");

  // API URL for fetching popular movies
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

  // API request options
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmFkY2RkNWFkMTllMDBhOTdhZWMyMDc5ZDQwMzczOCIsInN1YiI6IjY0OWI0YjNiNzdjMDFmMDE0ZTBhNmFkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yUrBB4Q0wkEEFUMkdseTMEJFCBlhCg_oEzXvsUQ7pj4",
    },
  };

  useEffect(() => {
    // Fetch popular movies from the API
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error("error:" + err));
  });

  return (
    
    <div className="container mt-5">
  <h1 className="mb-4">Popular Movies</h1>
  <div className="home-movie-posters">
    {movies.map((elm, idx) => {
      return (
        <div
          className="poster-path mb-4"
          key={idx}
          style={{
            backgroundImage: `url("https://www.themoviedb.org/t/p/original${elm.poster_path}")`,
            height: "300px",
            width: "200px",
            backgroundSize: "cover",
          }}
        ></div>
      );
    })}
  </div>
</div>

  );
}

export default HomePage;
