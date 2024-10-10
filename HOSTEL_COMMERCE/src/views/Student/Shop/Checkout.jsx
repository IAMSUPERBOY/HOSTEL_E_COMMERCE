/* import React, { useEffect, useState } from "react";
import { Get_Cart } from "../../../backend/Product/controller";
import { useLocation } from "react-router-dom";
import CartItem from "../../../components/CartItem";

export default function Checkout() {
const [cart,setCart]=useState([])
  const location = useLocation();
  const studentid = location.state.id;
  useEffect(() => {
    Get_Cart(studentid).then((data) => {
      setCart(data);
      console.log(data[0].cart_items[0]);
    });

  }, []);
  return (
    <>
      {studentid}
      {cart.map((data,index) => {
        data.cart_items.map((data_,i)=>{
            return(
                <>
                sasaadsdasd
                <CartItem key={i} productid={data_.productid}/> 
                </>
            )
        })
      })}
    </>
  );
}
 */
import React, { useEffect, useState } from "react";
import { Get_Cart } from "../../../backend/Product/controller";
import { useLocation } from "react-router-dom";
import CartItem from "../../../components/CartItem";
import { Link } from "react-router-dom";
export default function Checkout() {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const studentid = location.state.id;

  useEffect(() => {
    if (studentid) {
      Get_Cart(studentid).then((data) => {
        setCart(data);
        console.log(data[0].cart_items[0]);
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
    
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4" >
           Purchase
          </button>
    </>
  );
}
