import React, { useEffect } from "react";
import {Get_Application_Counts} from '../../backend/Owner/controller'

export default function RequestPage() {
    useEffect(()=>{
    const data=Get_Application_Counts();
    console.log(data);

    },[])
  return (
    <div>
      <div class="inline-flex">
        <button class="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          JOIN REQUEST({})
        </button>
        <button class="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          LEAVE REQUEST
        </button>
        <button class="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          REJECTED
        </button>
      </div>
    </div>
  );
}
