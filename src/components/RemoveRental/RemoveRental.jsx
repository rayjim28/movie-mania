export default function RemoveRental({ movie, removeRental }) {
  const handleRemoveRentalClick = () => {
    removeRental(movie); // Call the removeRental function when the button is clicked
  };

  return (
    <>
      <button onClick={handleRemoveRentalClick}>Remove Rental</button>
    </>
  );
}
