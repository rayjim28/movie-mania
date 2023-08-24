import React from "react";
import "./RentalDetail.css";

export default function RentalDetail({ rental, removeRentalMovie }) {
  const handleRemoveClick = () => {
    removeRentalMovie(rental.imdbID);
  };

  return (
    <div className="row rental-row mt-4 align-items-center">
      {/* Display the rental movie's poster */}
      <div className="col-md-3">
        <img
          src={rental.poster}
          alt="Movie Poster"
          className="img-fluid rounded poster-image"
        />
      </div>

      {/* Display the rental movie's title */}
      <div className="col-md-5">
        <h5 className="rental-title">{rental.title}</h5>
      </div>

      {/* Display the rental movie's price */}
      <div className="col-md-3">
        <div className="return-price badge bg-secondary">Price: ${rental.price}</div>
      </div>

      {/* Button for removing the rental movie */}
      <div className="col-md-1">
        <button onClick={handleRemoveClick} className="btn btn-danger btn-sm">
          X
        </button>
      </div>
    </div>
  );
}
