import React from "react";

export default function MovieList(props) {
  const MovieToRent = props.movieToRent;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div key={index}>
          {/* <img src={movie.Poster} alt="" /> */}
          <div onClick={() => (props.handleRentMovieClick())}>
            <MovieToRent />
          </div>
        </div>
      ))}
    </>
  );
}
