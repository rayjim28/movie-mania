import React from "react";
import "./RentalDetail.css";

export default function RentalDetail({ Rentals }) {
  console.log("Rentals:", Rentals);

  if (!Rentals) {
    return null;
  }

  return (
    <div className="rentals-container">
      <h2>Rental Detail</h2>
      <div className="rental-list">
        {Rentals.map((rental) => (
          <div key={rental.id} className="rental">{rental.title}
            <h2 className="rental-title">{rental.title}</h2>
            <div className="return-date">Return Date: {rental.returnDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
