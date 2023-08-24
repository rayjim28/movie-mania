import { useState, useEffect } from "react";
import * as rentalsApi from "../../utilities/rentals-api";
import "../RentalHistoryPage/RentalHistoryPage.css"

export default function RentalHistoryPage() {
  // State variable to hold rental history data
  const [rentalHistory, setRentalHistory] = useState([]);

  // Fetch rental history data when the component mounts
  useEffect(() => {
    fetchRentalHistory();
  }, []);

  // Function to fetch rental history data from the backend
  async function fetchRentalHistory() {
    try {
      // Call the getRentalHistory function from rentalsApi to fetch rental history data
      const response = await rentalsApi.getRentalHistory();
      console.log(response); // Log the response for debugging
      setRentalHistory(response); // Update the rentalHistory state with the fetched data
    } catch (error) {
      console.log(error); // Log any errors that occur during the fetch
      // Handle error condition
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <h1>Rental History</h1>
        </div>
      </div>
      <div className="row mt-4">
        {rentalHistory.map((rental) => (
          <div className="col-3 card-column" key={rental._id}>
            <div className="card">
              {/* Aspect ratio box for image */}
              <div className="aspect-ratio-box">
                  <img src={rental.movies[0].poster} alt="Movie Poster" />
              </div>
              
              {/* Card body for order details */}
              <div className="card-body">
                  <h5 className="card-title">Order # {rental._id.slice(-8)}</h5>
                  <p className="card-text">
                      {new Date(rental.rentalDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">Total: ${rental.total}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
);
        }

// import { checkToken } from "../../utilities/users-service";
// async function handleCheckToken() {
//   const expDate = await checkToken();
//   console.log(expDate);
// }

/* <button onClick={handleCheckToken}>
        Check When My Login Expires
      </button> */

/* Display rental total */
/* <a href="#" className="btn btn-primary">Order Detail</a> */
