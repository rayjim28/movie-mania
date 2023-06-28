export default function Movie({ movie, handleRentMovieClick }) {
  return (
    <div key={movie.imdbID} className="movie">
      <img
        src={movie.Poster || "placeholder-image-url"}
        alt={movie.Title}
        className="movie-image"
      />
      <h2 className="movie-title">{movie.Title}</h2>
      <button
        className="rent-button"
        onClick={() => handleRentMovieClick(movie)}
      >
        <span>Add To Rent</span>
      </button>
    </div>
  );
}
