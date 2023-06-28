import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import MovieHeading from "../../components/MovieHeading/MovieHeading";
import SearchMovie from "../../components/SearchMovie/SearchMovie";
import { addToCart, checkout, getCart } from "../../utilities/rentals-api";
import { getUser } from "../../utilities/users-service";
import CartList from "../../components/CartList/CartList";

const API_KEY = process.env.REACT_APP_API_KEY || "69f40c47";

export default function MoviesPage() {
  // State variables to hold movie data and rental list
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [rentals, setRentals] = useState([]);

  async function getMovieRequest(searchMovie) {
    let url;

    if (searchMovie === "") {
      return Promise.resolve();
    } // Check if the searchMovie starts with "tt" indicating an individual search

    if (searchMovie.startsWith("tt")) {
      // If it starts with "tt", construct the URL for individual search
      url = `http://www.omdbapi.com/?i=${searchMovie}&apikey=${API_KEY}`;
    } else {
      // If it doesn't start with "tt", construct the URL for general search
      url = `http://www.omdbapi.com/?s=${searchMovie}&apikey=${API_KEY}`;
    }

    try {
      // Fetch movie data from the API
      const response = await fetch(url);
      const responseJson = await response.json();

      console.log("API_RESPONSE", responseJson); // Check if the response has a "Search" property, indicating multiple movies were found

      if (responseJson.Search) {
        // Set the found movies as the state
        setMovies(responseJson.Search);
      } // If the response doesn't have a "Search" property but has a "Title" property, // it means a single movie was found
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
      console.log("Error fetching movie data:", error);
    }
  } // Trigger the movie search request when searchMovie state changes

  useEffect(() => {
    getMovieRequest(searchMovie);
  }, [searchMovie]); // Function to add a movie to the rental list and save it to the backend

  async function handleCheckout() {
    try {
      const createdRental = await checkout(rentals);
      setRentals([]); // Rental successfully created in the backend
      console.log("Rental created in the backend:", createdRental);
    } catch (error) {
      console.log("Error creating rental:", error);
    }
  } // Function to remove a movie from the rental list

  function removeRentalMovie(movie) {
    const newRentalList = rentals.filter((rental) => rental !== movie);

    setRentals(newRentalList);
  }

  async function addMovieToRent(movie) {
    console.log("addMovieToRent", movie); // // Check if the movie is already in the rental list
    const isDuplicate = rentals.some(
      (rental) => rental.imdbID === movie.imdbID
    ); // If it's a duplicate, return early and don't add it to the rental list

    if (isDuplicate) {
      console.log("Movie is already in the rental list");
      return;
    }

    try {
      // Create the rental in the backend
      const user = getUser();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      const rentalData = {
        userId: user._id,
        movie: {
          imdbID: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
        },
        rentalDate: new Date(),
        returnDate: new Date(sevenDaysFromNow),
      };
      console.log("Rental data:", user, rentalData);
      const createdRental = await addToCart(rentalData);
      const newMovie = {
        userId: user._id,
        imdbID: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        rentalDate: new Date(),
        returnDate: new Date(sevenDaysFromNow),
      };
      const newRentalList = [...rentals, newMovie];
      setRentals(newRentalList); // Rental successfully created in the backend
      console.log("Rental created in the backend:", createdRental);
    } catch (error) {
      console.log("Error creating rental:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rentalsData = await getCart();
        console.log(rentalsData);
        setRentals(rentalsData.movies);
      } catch (error) {
        console.log("Error fetching rentals:", error);
      }
    };

    fetchData();
  }, []); // Render the component

  return (
    <div>
            
      <div>
                
        <MovieHeading heading="Movies" />
                
        <SearchMovie
          searchMovie={searchMovie}
          setSearchMovie={setSearchMovie}
        />
              
      </div>
            
      <MovieList movies={movies} handleRentMovieClick={addMovieToRent} />
            
      <CartList
        rentals={rentals}
        handleCheckout={handleCheckout}
        removeRentalMovie={removeRentalMovie}
      />
          
    </div>
  );
}
