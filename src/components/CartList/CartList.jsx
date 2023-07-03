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
    <div>
      <div className="cart-info">
        {/* <span>Date: {new Date().toLocaleDateString()}&nbsp;&nbsp;</span> */}
        <span>Return Date: </span> <span>{getReturnDate()}</span>
      </div>
      <h2 className="mb-3">Movie Cart</h2>
      <div className="total mb-3">Total: ${calculateTotal()}</div>
      <button className="btn btn-success" onClick={handleCheckout}>
        Checkout
      </button>
      <div className="rental-list">
        {rentals.map((rental, idx) => (
          <RentalDetail
            key={idx}
            rental={rental}
            removeRentalMovie={handleRemoveRental}
          />
        ))}
      </div>
    </div>
  );
}
