import React, { useEffect, useState } from "react";
import { Get_Cart } from "../../../backend/Product/controller";
import CartItem from "../../../components/CartItem";
import credentials from "../../../credentials.json";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);

  const studentid = credentials.studentid;

  useEffect(() => {
    if (studentid) {
      Get_Cart(studentid).then((data) => {
        setCart(data);
        console.log(data[0]?.cart_items[0]); // Add optional chaining to avoid errors if cart_items is undefined
      });
    }
  }, [studentid]);

  return (
    <>
      <div>Student ID: {studentid}</div>
      {cart.map((data, index) => (
        <div key={index}>
          {data.cart_items.map((data_, i) => (
            <div key={i}>
              <CartItem productid={data_.productid} />
            </div>
          ))}
        </div>
      ))}
      <Link to="/Student/Bill">
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4">
        Purchase
      </button>
      </Link>
    </>
  );
}
