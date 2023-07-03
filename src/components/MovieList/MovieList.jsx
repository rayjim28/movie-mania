import React from "react";
import "./MovieList.css";
import Movie from "./Movie/Movie";

export default function MovieList({ movies, handleRentMovieClick }) {
  return (
    <div className="movie-list-container">
      {movies.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleRentMovieClick={handleRentMovieClick}
        />
      ))}
    </div>
  );
}
