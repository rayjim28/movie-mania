import { checkToken } from "../../utilities/users-service";
import { useState, useEffect } from "react";
import * as rentalsApi from '../../utilities/rentals-api'

export default function RentalHistoryPage() {
  const [rentalHistory, setRentalHistory] = useState([]);

  useEffect(() => {
    fetchRentalHistory();
  }, []);

  async function fetchRentalHistory() {
    try {
      const response = await rentalsApi.getRentalHistory();
      console.log(response)
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
    <div>
      <h1>Rental History Page</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
      {/* Render rental history data */}
      {rentalHistory.map((rental) => (
        <div key={rental._id}>
          {/* Render rental history information */}
          <img src={rental.Poster} alt='' />
          <p>Rental ID: {rental._id}</p>
          <p>Rental Date: {rental.rentalDate}</p>
          {/* Additional rental history fields */}
        </div>
      ))}
    </div>
  );
}
