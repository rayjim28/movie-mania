import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import MovieHeading from "../../components/MovieHeading/MovieHeading";
import SearchMovie from "../../components/SearchMovie/SearchMovie";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY || "69f40c47";

export default function GuestMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  let navigate = useNavigate();

  // Function to fetch movie data from the API
  async function getMovieRequest(searchMovie) {
    let url;

    if (searchMovie === "") {
      return Promise.resolve();
    }

    // Check if the searchMovie starts with "tt" indicating an individual search
    if (searchMovie.startsWith("tt")) {
      // If it starts with "tt", construct the URL for individual search
      url = `https://www.omdbapi.com/?i=${searchMovie}&apikey=${API_KEY}`;
    } else {
      // If it doesn't start with "tt", construct the URL for general search
      url = `https://www.omdbapi.com/?s=${searchMovie}&apikey=${API_KEY}`;
    }

    try {
      // Fetch movie data from the API
      const response = await fetch(url);
      const responseJson = await response.json();

      // Check if the response has a "Search" property, indicating multiple movies were found
      if (responseJson.Search) {
        // Set the found movies as the state
        const movies = responseJson.Search.map((movie) => {
          if (movie.Poster === "N/A") {
            movie.Poster = "https://via.placeholder.com/300x300";
          }
          return movie;
        });
        setMovies(movies);
      }
      // If the response doesn't have a "Search" property but has a "Title" property,
      // it means a single movie was found
      else if (responseJson.Title) {
        // Set the single movie as the state (convert it into an array)
        setMovies([responseJson]);
      } else if (responseJson.Error) {
        // If the response has an "Error" property, it means no movies were found
        // Set the movies state to an empty array
        setMovies([]);
        console.log(responseJson.Error);
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.log("Error fetching movie data:", error.message);
    }
  }

  // Trigger the movie search request when searchMovie state changes
  useEffect(() => {
    getMovieRequest(searchMovie);
  }, [searchMovie]);

  // Function to handle adding a movie to the rental list and navigate to the login page
  async function handleAdd() {
    // Console.log removed for debugging
    return navigate("/login");
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <MovieHeading heading="Movies" />
        </div>
        <div className="col-md-12 my-4">
          <SearchMovie
            searchMovie={searchMovie}
            setSearchMovie={setSearchMovie}
          />
        </div>
        <div className="col-md-12 mt-4">
          <MovieList
            movies={movies}
            handleRentMovieClick={handleAdd}
            guest={true}
          />
        </div>
      </div>
    </div>
  );
}
