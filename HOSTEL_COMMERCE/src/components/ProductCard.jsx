import React from "react";
import { Link } from "react-router-dom";

import { Add_to_Cart } from "../backend/Product/controller";
function handle_Add(studenid, productid) {
  Add_to_Cart(studenid, productid);
}

const ProductCard = ({
  Name,
  productid,
  product_desc,
  price,
  studentid,
  used,
}) => {
  return (
    <div className=" flex-row">
      <div className="flex flex-col bg-white rounded-lg shadow-md  aspect-ratio-1/1">
        <img
          src="./book-composition-with-open-book.jpg"
          alt="Product Image"
          className="w-1/4 h-1/2 block p-5 object-cover"
        />
        <div className="p-4 border-solid bg-slate-400 m-6 rounded-lg">
          <h2 className="text-lg font-semibold">{Name}</h2>
          <p className="text-gray-500">{product_desc}</p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-semibold text-blue-500">{price}</p>
            <div className="flex items-center ml-5">
              <span className="text-white mr-2">M.R.P:</span>
              <span className="text-white ">₹{price}</span>
            </div>
          </div>

          { !used ? 
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4"
              onClick={() => handle_Add(studentid, productid)}
            >
              Add to Cart
            </button>:<></>
          }
          {
             used ? <button
             className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4"
             onClick={() => handle_Add(studentid, productid)}
           >
             Buy
           </button>:<></>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
