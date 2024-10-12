import React from 'react';
import './HostelDetails.css';

const HostelDetails = ({ hostel, onClose }) => {
  return (
    <div className="hostel-details">
      
      <h2>{hostel.name}</h2>
      <p><strong>Location:</strong> {hostel.location}</p>
      <p><strong>Price:</strong> ₹{hostel.price}/month</p>
      <p><strong>Rating:</strong> {hostel.rating} ⭐</p>
      <p>{hostel.details}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default HostelDetails;