import React, { useEffect, useState } from "react";
import { Get_Cart, Prod_details } from "../../../backend/Product/controller";
import { Gen_Bill } from "../../../backend/Student/controller";
import Invoice from "./Invoice";
import credentials from "../../../credentials.json";
import { Link } from "react-router-dom";
export default function Bill() {
  const [bill, setBill] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const cartData = await Get_Cart(credentials.studentid);

        if (cartData.length > 0 && cartData[0].cart_items) {
          const cartItems = cartData[0].cart_items;

          const productDetailsPromises = cartItems.map(async (item) => {
            const product = await Prod_details(item.productid);
            return {
              ...item, // Keep the cart item info
              ...product, // Merge with product details
            };
          });

          const productsWithDetails = await Promise.all(productDetailsPromises);

          setCart(productsWithDetails);
        }
      } catch (error) {
        console.error("Error fetching cart or product details:", error);
      }
    };

    fetchCartDetails();

    Gen_Bill(credentials.studentid).then((total) => {
      setBill(total);
    });
  }, []);
 

  return (
    <div>
      <Invoice totalP={bill} products={cart} />
      <Link to="/Student">
      <button
        className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        Go Back to Home
      </button>
      </Link>
    </div>
    
  );
}
