import React from "react";
import "./RentalDetail.css";

export default function RentalDetail({ rental, removeRentalMovie, movie  }) {
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
              src={
                movie && movie.Poster ? movie.Poster : "placeholder-image-url"
              }
              alt={rental.title}
              className="poster-image"
            />
            <div className="return-date">Price: {rental.price}</div>
            <div className="return-date">ID: {rental.imdbID}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
