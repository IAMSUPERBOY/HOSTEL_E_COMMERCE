import React from 'react';
import './HostelCard.css';

const HostelCard = ({ hostel, onClick }) => {
  return (
    <div className="hostel-card" onClick={onClick}>
      <h2>{hostel.name}</h2>
      <p>{hostel.location}</p>
      <p>Price: ₹{hostel.price}/month</p>
      <p>Rating: {hostel.rating} ⭐</p>
    </div>
  );
};

export default HostelCard;
