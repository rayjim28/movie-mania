import React from "react";
import "./MovieList.css";
// import "./RentalDetail.css";
import RentalDetail from "../RentalDetail/RentalDetail";

export default function MovieList({
  movies,
  rentals,
  handleRentMovieClick,
  MovieToRent,
  removeRental,
}) {
  return (
    <div className="movie-list-container">
      <div className="movies-container">
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie">
              <img
                src={movie.Poster || "placeholder-image-url"}
                alt={movie.Title}
                className="movie-image"
              />
              <h2 className="movie-title">{movie.Title}</h2>
              <div
                onClick={() => handleRentMovieClick(movie)}
                className="rent-button"
              >
                {MovieToRent && (
                  <MovieToRent movie={movie} removeRental={removeRental} />
                )}{" "}
                {/* Pass the movie and removeRental props */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rental">
        <RentalDetail rentals={rentals} />
      </div>
    </div>
  );
}
