import "./CartList.css";
import RentalDetail from "../RentalDetail/RentalDetail";

export default function CartList({
  rentals,
  handleCheckout,
  removeRentalMovie,
  movies, 
}) {
  const handleRemoveRental = (rentalId) => {
    removeRentalMovie(rentalId);
  };

  console.log("CartList", rentals);

  return (
    <div className="cart-container">
      <h2>Movie Cart</h2>
      <div className="rental-list">
        {rentals.map((rental, idx) => {
          // Finding the movie object based on the rental's imdbID
          const movie = movies.find((movie) => movie.imdbID === rental.imdbID);

          return (
            <RentalDetail
              key={idx}
              rental={rental}
              removeRentalMovie={handleRemoveRental}
              movie={movie} 
            />
          );
        })}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

// import "./CartList.css";
// import RentalDetail from "../RentalDetail/RentalDetail";

// export default function CartList({
//   rentals,
//   handleCheckout,
//   removeRentalMovie,
// }) {
//   const handleRemoveRental = (rentalId) => {
//     removeRentalMovie(rentalId);
//   };
//   console.log("CartList", rentals);
//   return (
//     <div className="cart-container">
//       <h2>Movie Cart</h2>
//       <div className="rental-list">
//         {rentals.map((rental, idx) => (
//           <RentalDetail
//             key={idx}
//             rental={rental}
//             removeRentalMovie={handleRemoveRental}
//           />
//         ))}
//       </div>
//       <button onClick={handleCheckout}>Checkout</button>
//     </div>
//   );
// }
