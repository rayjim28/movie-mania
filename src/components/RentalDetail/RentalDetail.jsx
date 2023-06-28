import React from "react";
import "./RentalDetail.css";

export default function RentalDetail({ rental, removeRentalMovie }) {
  return (
    <aside>
            
      <div className="rentals-container">
                
        <div className="rental-list">
                    <button onClick={removeRentalMovie}>X</button>
                    
          <div key={rental.id} className="rental">
                        <h2 className="rental-title">{rental.title}</h2>
                        
            <div className="return-date">
                            Price: {rental.price}
                          
            </div>
                        
            <div className="return-date">
                            ID: {rental.imdbID}
                          
            </div>
                      
          </div>
                  
        </div>
              
      </div>
          
    </aside>
  );
}
