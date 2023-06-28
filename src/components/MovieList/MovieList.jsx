import React from "react";
import "./MovieList.css";
import Movie from "./Movie/Movie";

export default function MovieList({ movies, handleRentMovieClick }) {
  return (
    <div className="movie-list-container">
      <div className="movies-container">
        <div className="movie-list">
          {movies.map((movie) => (
            <Movie
              key={movie.imdbID}
              movie={movie}
              className="movie"
              handleRentMovieClick={handleRentMovieClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
