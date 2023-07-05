import RentalDetail from "../RentalDetail/RentalDetail";

export default function CartList({
  rentals,
  handleCheckout,
  removeRentalMovie,
}) {
  // Handler for removing a rental movie
  const handleRemoveRental = (rentalId) => {
    removeRentalMovie(rentalId);
  };

  // Function to get the earliest return date from the rentals
  function getReturnDate() {
    if (rentals.length === 0) {
      return "";
    } else {
      // Get an array of return dates from the rentals
      const returnDates = rentals.map((rental) => new Date(rental.returnDate));
      // Filter out invalid return dates (NaN)
      const validReturnDates = returnDates.filter((date) => !isNaN(date));
      if (validReturnDates.length === 0) {
        return "Invalid Date";
      } else {
        // Find the earliest return date
        const earliestReturnDate = new Date(Math.min(...validReturnDates));
        return earliestReturnDate.toLocaleDateString();
      }
    }
  }

  // Function to calculate the total price of the rentals
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
