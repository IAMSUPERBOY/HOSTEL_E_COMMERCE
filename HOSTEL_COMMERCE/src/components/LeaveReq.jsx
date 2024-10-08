import React from "react";
import {Remove_Student_Vacate } from "../backend/Owner/controller";
export default function LeaveReq({ studentid,id,hostelid,roomid,Name}) {
 
  function handleAccept()
  {
    Remove_Student_Vacate(id,studentid,hostelid,roomid);
    
  }
return (
    <div>
      <div class="flex items-center gap-4 m-4 bg-gray-200 p-4 rounded-md">
        <div class="w-12 h-12 rounded-full bg-gray-400"></div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold">{Name}</h3>
          <p class="text-sm text-gray-500">VIEW profile</p>
        </div>
        <div class="flex gap-2">
       
        <button class="btn btn-primary hover:bg-green-500 hover:shadow-md" onClick={handleAccept}>ACCEPT</button>
        </div>
      </div>
    </div>
  );
}
