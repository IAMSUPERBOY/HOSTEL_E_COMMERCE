import React, { useEffect, useState } from "react";
import { Get_Cart } from "../../../backend/Product/controller";
import CartItem from "../../../components/CartItem";
import credentials from "../../../credentials.json";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
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
    <Navbar />
    <div  className="h-screen flex-col justify-center align-middle">
      <div className="p-8">Student ID: {studentid}</div>
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
      <button className=" m-9 bg-orange-950 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-yellow-500 hover:text-black">
        Purchase
      </button>
      </Link>
      </div>
    </>
  );
}
