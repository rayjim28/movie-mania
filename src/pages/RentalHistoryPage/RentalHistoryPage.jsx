import { checkToken } from "../../utilities/users-service";
import { useState, useEffect } from "react";
import * as rentalsApi from "../../utilities/rentals-api";

export default function RentalHistoryPage() {
  const [rentalHistory, setRentalHistory] = useState([]);

  useEffect(() => {
    fetchRentalHistory();
  }, []);

  async function fetchRentalHistory() {
    try {
      const response = await rentalsApi.getRentalHistory();
      console.log(response);
      setRentalHistory(response);
    } catch (error) {
      console.log(error);
      // Handle error condition
    }
  }

  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Rental History Page</h1>
          <button onClick={handleCheckToken}>
            Check When My Login Expires
          </button>
        </div>
      </div>
      <div className="row">
        {rentalHistory.map((rental) => (
          <div className="col-3">
            <div className="card-group">
              <div key={rental._id} className="card">
                <div className="card-body">
                  <img
                    object-fit="contain"
                    className="card-img"
                    width="300px"
                    height="300px"
                    src={rental.movies[0].poster}
                    alt="Card cap"
                  />
                  <h5 className="card-title">Order # {rental._id}</h5>
                  <p className="card-text">
                    {new Date(rental.rentalDate).toLocaleDateString()}
                  </p>
                  {/* <a href="#" className="btn btn-primary">Order Detail</a> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
