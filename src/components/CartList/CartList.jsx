import "./CartList.css";
import RentalDetail from "../RentalDetail/RentalDetail";

export default function CartList({
  rentals,
  handleCheckout,
  removeRentalMovie,
}) {
  
  const handleRemoveRental = (rentalId) => {
    removeRentalMovie(rentalId);
  };

  console.log("CartList", rentals);

  function getReturnDate() {
    if (rentals.length === 0) {
      return "";
    } else {
      const returnDates = rentals.map((rental) => new Date(rental.returnDate));
      const validReturnDates = returnDates.filter((date) => !isNaN(date));
      if (validReturnDates.length === 0) {
        return "Invalid Date";
      } else {
        const earliestReturnDate = new Date(Math.min(...validReturnDates));
        return earliestReturnDate.toLocaleDateString();
      }
    }
  }

  const calculateTotal = () => {
    const total = rentals.reduce(
      (acc, rental) => acc + parseFloat(rental.price),
      0
    );
    return total.toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="cart-info">
        <span>Created Date: {new Date().toLocaleDateString()}&nbsp;&nbsp;</span>
        <span>Return Date: </span> <span>{getReturnDate()}</span>
      </div>
      <h2>Movie Cart</h2>
      <div>Total: ${calculateTotal()}</div>
      <div className="rental-list">
        {rentals.map((rental, idx) => {
          return (
            <RentalDetail
              key={idx}
              rental={rental}
              removeRentalMovie={handleRemoveRental}
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
