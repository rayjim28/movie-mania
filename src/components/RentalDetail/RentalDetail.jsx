import React from "react";
import "./RentalDetail.css";

export default function RentalDetail({ rental, removeRentalMovie }) {
  // Event handler for removing the rental movie
  const handleRemoveClick = () => {
    removeRentalMovie(rental.imdbID);
  };

  return (
    <aside>
      <div className="rentals-container">
        <div className="col-md-6" key={rental.id}>
          <div className="col row-cols-1">
            <div className="card rental-card">
              <div className="card-body">
                {/* Display the rental movie's title */}
                <h5 className="card-title rental-title">{rental.title}</h5>
                {/* Display the rental movie's poster */}
                <img
                  src={rental.poster}
                  alt="Movie Poster"
                  className="card-img-top poster-image smaller-poster"
                />
                {/* Display the rental movie's price */}
                <div className="card-text return-price">
                  Price: ${rental.price}
                </div>
                {/* Button for removing the rental movie */}
                <button
                  onClick={handleRemoveClick}
                  className="btn btn-danger delete-button"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
