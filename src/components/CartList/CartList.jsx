import RentalDetail from "../RentalDetail/RentalDetail";

export default function CartList({
  rentals,
  handleCheckout,
  removeRentalMovie,
}) {
  console.log("CartList", rentals);
  return (
    <div className="rentals-container">
      <div className="rental-list">
        {rentals.map((rental, idx) => (
          <RentalDetail
            key={idx}
            rental={rental}
            removeRentalMovie={removeRentalMovie}
          />
        ))}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
