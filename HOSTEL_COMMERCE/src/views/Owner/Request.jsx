import React, { useEffect, useState } from "react";
import { Get_Application_Counts } from "../../backend/Owner/controller";
import JoinReq from "../../components/JoinReq";

let joinreq;
export default function RequestPage() {
  const [join, setJoin] = useState([]);
  const [leave, setLeave] = useState([]);
  useEffect(() => {
    Get_Application_Counts().then((data) => {
      // Filtering for 'JoinRequest' with 'pending' status
      joinreq = data.filter(
        (item) => item.status === "pending" && item.type === "JoinRequest"
      );

      setJoin(joinreq);
      // Filtering for 'LeaveRequest' with 'pending' status
      let leavereq = data.filter(
        (item) => item.status === "pending" && item.type === "LeaveRequest"
      );
    });
  }, []);
  return (
    <div>
      <div className="">
        <button className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          JOIN REQUEST({})
        </button>
        <button className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          LEAVE REQUEST
        </button>
        <button className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          REJECTED
        </button>
      </div>
      <div class="card bg-white shadow-md rounded-lg overflow-hidden">
        {join.map((item) => (
          <JoinReq key={item.studentid} studentid={item.studentid} id={item.id} roomid={item.roomid} hostelid={item.hostelid}/>
        ))}
      </div>
    </div>
  );
}
