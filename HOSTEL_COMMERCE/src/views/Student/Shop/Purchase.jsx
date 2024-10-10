import React, { useEffect } from "react";
import ProductCard from "../../../components/ProductCard";
import { Product_List_Vendors } from "../../../backend/Product/controller";
import { useState } from "react";
import { Link } from "react-router-dom";
let Prod_List;
export default function Purachase_Page({studentid}) {
    const routeState = {
        id: studentid,
      };
  const [prods, setList] = useState([]);
  useEffect(() => {
    Product_List_Vendors().then((data) => {
      Prod_List = data;
      setList(data);
    });
  }, []);
  routeState.id=1;
  return (
    <div>
        <Link to='/Student/Checkout' className='font-bold' state={routeState}>Checkout</Link>
      {prods.map((data,index) => {
        return (
            <>
                

          <ProductCard
          key={index}
          Name={data.productname}
          price={data.price}
          product_desc={data.category}
          productid={data.productid}
          studentid={1}
          used={0}
          />
          </>
        );
      })}
    </div>
  );
}
