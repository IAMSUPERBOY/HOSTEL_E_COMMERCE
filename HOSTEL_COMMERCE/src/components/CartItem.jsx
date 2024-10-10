import React, { useEffect, useState } from "react";
import { Prod_details } from "../backend/Product/controller";
export default function CartItem({productid}) {
    const [prod,setProd]=useState({})
    useEffect(()=>{
        Prod_details(productid).then((data)=>{
            setProd(data);
            console.log(data);
        })
    },[])
  return (
    <div className=" flex-row">
      <div className="flex flex-col bg-white rounded-lg shadow-md  aspect-ratio-1/1">
        <img
          src="./book-composition-with-open-book.jpg"
          alt="Product Image"
          className="w-1/4 h-1/2 block p-5 object-cover"
        />
        <div className="p-4 border-solid bg-slate-400 m-6 rounded-lg">
          <h2 className="text-lg font-semibold">{prod.productname }</h2>
          <p className="text-gray-500">{prod.category}</p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-semibold text-blue-500">{prod.price}</p>
            <div className="flex items-center ml-5">
              <span className="text-white mr-2">M.R.P:</span>
              <span className="text-white ">₹{prod.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
