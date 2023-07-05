import { useState, useEffect } from "react";
import * as rentalsApi from "../../utilities/rentals-api";

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
    <div>
      <div className="row">
        <div className="col">
          <h1 className="mt-4">Rental History Page</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {/* Iterate over the rentalHistory array and render rental cards */}
          {rentalHistory.map((rental) => (
            <div className="col-3" key={rental._id}>
              <div className="card-group">
                <div key={rental._id} className="card">
                  <div className="card-body">
                    {/* Display movie poster */}
                    <img
                      object-fit="contain"
                      className="card-img"
                      height="300px"
                      src={rental.movies[0].poster}
                      alt="Card cap"
                    />
                    {/* Display rental order number */}
                    <h5 className="card-order#">Order # {rental._id}</h5>
                    {/* Display rental date */}
                    <p className="card-text">
                      {new Date(rental.rentalDate).toLocaleDateString()}
                    </p>
                    {/* Display rental total */}
                    <p className="card-text">Total: ${rental.total}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
