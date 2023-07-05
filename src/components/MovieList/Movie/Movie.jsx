import "./Movie.css";

export default function Movie({ movie, handleRentMovieClick, guest }) {
  // Function to determine the text for the button based on the guest status
  function isGuest() {
    // Check if the user is a guest
    return !guest ? "AddToRent" : "Log In";
  }

  return (
    <div key={movie.imdbID} className="movie">
      {/* Render the movie image */}
      <img
        src={movie.Poster || "placeholder-image-url"}
        alt={movie.Title}
        className="movie-image"
      />
      {/* Render the movie title */}
      <h2 className="movie-title">{movie.Title}</h2>
      {/* Render the rent button */}
      <button
        className="rent-button btn btn-primary"
        onClick={() => handleRentMovieClick(movie)}
      >
        {/* Render the button text based on the guest status */}
        {isGuest()}
      </button>
    </div>
  );
}
