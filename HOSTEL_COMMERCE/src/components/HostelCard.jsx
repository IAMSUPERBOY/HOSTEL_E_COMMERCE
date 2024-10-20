import React from 'react';
import './ItemCard.css';



function HostelCard({ hostel, onClick }) {
  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-image">
        
        <img src={hostel.imageUrl } alt={hostel.name} />
      </div>
      <div className="item-details">
      <h3 className="item-name">{hostel.hostelname}</h3>
      <p>{hostel.addressline1}</p>
      <p className="item-price">Price: ₹{hostel.startingprice}</p> {/* Displaying the starting price */}
      <p>Rating: {hostel.rating} </p>
      </div>
    </div>
  );
}





export default HostelCard;
