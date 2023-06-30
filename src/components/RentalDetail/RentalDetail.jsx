import React from "react";
import "./RentalDetail.css";

export default function RentalDetail({ rental, removeRentalMovie }) {
   const handleRemoveClick = () => {
     removeRentalMovie(rental.imdbID);
   };

  return (
    <aside>
      <div className="rentals-container">
        <div className="rental-list">
          <button onClick={handleRemoveClick}>X</button>
          <div key={rental.id} className="rental">
            <h2 className="rental-title">{rental.title}</h2>
            <img
              src={rental.poster} 
              alt="Movie Poster"
              className="poster-image"
            />
            <div className="return-price">Price: ${rental.price}</div>
            {/* <div className="return-id">ID: {rental.imdbID}</div> */}
          </div>
        </div>
      </div>
    </aside>
  );
}
