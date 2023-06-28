import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import MovieHeading from "../../components/MovieHeading/MovieHeading";
import SearchMovie from "../../components/SearchMovie/SearchMovie";
import AddToRent from "../../components/AddToRent/AddToRent";
import RemoveRental from "../../components/RemoveRental/RemoveRental";
import { createRental, getAllRentals } from "../../utilities/rentals-api";
import { getUser } from "../../utilities/users-service";

export default function Api() {
  // State variables to hold movie data and rental list
  const [movies, setMovies] = useState([]);
  const [movieRent, setMovieRent] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [rentals, setRentals] = useState([]);

  async function getMovieRequest(searchMovie) {
    let url;

    // Check if the searchMovie starts with "tt" indicating an individual search
    if (searchMovie.startsWith("tt")) {
      // If it starts with "tt", construct the URL for individual search
      url = `http://www.omdbapi.com/?i=${searchMovie}&apikey=69f40c47`;
    } else {
      // If it doesn't start with "tt", construct the URL for general search
      url = `http://www.omdbapi.com/?s=${searchMovie}&apikey=69f40c47`;
    }

    try {
      // Fetch movie data from the API
      const response = await fetch(url);
      const responseJson = await response.json();

      console.log(responseJson);

      // Check if the response has a "Search" property, indicating multiple movies were found
      if (responseJson.Search) {
        // Set the found movies as the state
        setMovies(responseJson.Search);
      }
      // If the response doesn't have a "Search" property but has a "Title" property,
      // it means a single movie was found
      else if (responseJson.Title) {
        // Set the single movie as the state (convert it into an array)
        setMovies([responseJson]);
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.log("Error fetching movie data:", error);
    }
  }

  // Trigger the movie search request when searchMovie state changes
  useEffect(() => {
    getMovieRequest(searchMovie);
  }, [searchMovie]);

  // Function to add a movie to the rental list and save it to the backend
  async function addMovieToRent(movie) {
    // Check if the movie is already in the rental list
    const isDuplicate = movieRent.some(
      (rental) => rental.imdbID === movie.imdbID
    );

    // If it's a duplicate, return early and don't add it to the rental list
    if (isDuplicate) {
      return;
    }

    const newRentalList = [...movieRent, movie];
    setMovieRent(newRentalList);

    try {
      // Create the rental in the backend
      const user = getUser();
      const rentalData = {
        userId: user.id,
        title: movie.Title,
        rentalDate: new Date(),
      };
      const createdRental = await createRental(rentalData);
      // Rental successfully created in the backend
      console.log("Rental created in the backend:", createdRental);
    } catch (error) {
      console.log("Error creating rental:", error);
    }
  }

  // Function to remove a movie from the rental list
  function removeRentalMovie(movie) {
    const newRentalList = movieRent.filter((rental) => rental !== movie);

    setMovieRent(newRentalList);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rentalsData = await getAllRentals();
        setRentals(rentalsData);
      } catch (error) {
        console.log("Error fetching rentals:", error);
      }
    };

    fetchData();
  }, []);

  // Render the component
  return (
    <div>
      <div>
        <MovieHeading heading="Movies" />
        <SearchMovie
          searchMovie={searchMovie}
          setSearchMovie={setSearchMovie}
        />
      </div>
      <MovieList
        movies={movies}
        rentals={rentals}
        handleRentMovieClick={addMovieToRent}
        MovieToRent={AddToRent}
      />
      <div>
        <MovieHeading heading="Rentals" />
      </div>
      <div>
        <MovieList
          movies={movieRent}
          handleRentMovieClick={removeRentalMovie}
          MovieToRent={RemoveRental}
          removeRental={removeRentalMovie}
        />
      </div>
    </div>
  );
}
