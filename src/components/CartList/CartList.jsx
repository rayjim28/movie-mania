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
    <div className="cart-info row mb-3">
      <div className="col-6">
        <strong>Return Date:</strong>
      </div>
      <div className="col-6">{getReturnDate()}</div>
    </div>
    <h2 className="mb-3">Movie Cart</h2>
    <div className="total mb-3 row">
      <div className="col-6">
        <strong>Total:</strong>
      </div>
      <div className="col-6">${calculateTotal()}</div>
    </div>
    <button className="btn btn-success mb-3" onClick={handleCheckout}>
      Checkout
    </button>
    <div className="rental-list">
      {rentals.map((rental, idx) => (
        <div className="rental-row row mb-2" key={idx}>
          <RentalDetail rental={rental} removeRentalMovie={handleRemoveRental} />
        </div>
      ))}
    </div>
  </div>
  );
}
