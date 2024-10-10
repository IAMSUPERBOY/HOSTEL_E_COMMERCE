import React, { useEffect, useState } from "react";
import { Get_Cart } from "../../../backend/Product/controller";
import { Gen_Bill } from "../../../backend/Student/controller";


export default function Bill()
{
    const [bill,setBill]=useState(0)
    useEffect(()=>{
       
    })
    return(
        <div>
            Thank you for your purchase of {bill}
        </div>
    )
}