import React from 'react';
import './HostelCard.css';



function HostelCard({ hostel, onClick }) {
  return (
    <div className="hostel-card" onClick={onClick}>
      <h3>{hostel.hostelname}</h3>
      <p>{hostel.addressline1}</p>
      <p>Price: ₹{hostel.startingprice}</p> {/* Displaying the starting price */}
      <p>Rating: {hostel.rating} stars</p>
    </div>
  );
}



export default HostelCard;
