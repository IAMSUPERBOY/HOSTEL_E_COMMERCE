import React from 'react';
import './ItemCard.css'; // Make sure to create a CSS file for styling
function ItemCard({ item, onClick }) {
  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-image">
        {/* If you have an image URL, replace 'item.imageUrl' with your image source */}
        <img src={item.imageUrl } alt={item.productname} />
      </div>
      <div className="item-details">
        <h3 className="item-name">{item.productname}</h3>
        <p className="item-price">₹{item.price.toFixed(2)}</p>
        <p className="item-condition">{item.condition}</p>
      </div>
    </div>
  );
}

export default ItemCard;
