import React from "react";
import "./MovieList.css";
import Movie from "./Movie/Movie";

export default function MovieList({ movies, handleRentMovieClick, guest }) {
  return (
    <div className="movie-list-container">
      {/* Map over the movies array and render a Movie component for each movie */}
      {movies.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleRentMovieClick={handleRentMovieClick}
          guest={guest}
        />
      ))}
    </div>
  );
}
