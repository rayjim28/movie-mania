export default function RemoveRental({ movie, removeRental }) {
  const handleRemoveRentalClick = () => {
    removeRental(movie); 
  };

  return (
    <>
      <button onClick={handleRemoveRentalClick}>Remove Rental</button>
    </>
  );
}
