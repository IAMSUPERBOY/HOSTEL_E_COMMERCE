import React from "react";
import { Reject_Application,Accept_Student } from "../backend/Owner/controller";
export default function JoinReq({ studentid,id,hostelid,roomid}) {
  function handleReject(data)
  {
    Reject_Application(id)
  }
  function handleAccept()
  {
    Accept_Student(id,studentid,hostelid,roomid);
  }
  return (
    <div>
      <div class="flex items-center gap-4 bg-gray-200 p-4 rounded-md">
        <div class="w-12 h-12 rounded-full bg-gray-400"></div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold">{name}</h3>
          <p class="text-sm text-gray-500">VIEW profile</p>
        </div>
        <div class="flex gap-2">
        <button class="btn btn-secondary hover:bg-red-500 hover:shadow-md" onClick={handleReject} >REJECT</button>
        <button class="btn btn-primary hover:bg-green-500 hover:shadow-md" >ACCEPT</button>
        </div>
      </div>
    </div>
  );
}
