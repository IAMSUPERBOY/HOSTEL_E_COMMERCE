import React from 'react';
import './ItemCard.css'; // Make sure to create a CSS file for styling
import credentials from "../credentials.json"
import { Add_to_Cart } from '../backend/Product/controller';
function handle_Add(studenid, productid) {
  Add_to_Cart(studenid, productid);
}
function ItemCard({ item, onClick }) {
  const studentid=credentials.studentid;
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
      {
  item.condition === "Used" ? (
    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handle_Add(studentid, item.productid)}>
      Buy Used
    </button>
  ) : (
    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handle_Add(studentid, item.productid)}>
     Add to cart
    </button>
  )
}

    </div>
  );
}

export default ItemCard;
