import React, { useEffect, useState } from "react";
import {
  Get_Applicant_Names,
  Get_Application_Counts,
  ListHostel,
} from "../../backend/Owner/controller";
import JoinReq from "../../components/JoinReq";
import LeaveReq from "../../components/LeaveReq";
import credential from "../../credentials.json";
import Navbar from "./Navbar";

async function findName(studentid) {
  const data = await Get_Applicant_Names();
  if (!data) return "Unknown"; // Check for null data
  const student = data.find(
    (element) => element.student.studentid === studentid
  );
  return student ? student.student.studentfname : "Unknown";
}

export default function RequestPage() {
  const [join, setJoin] = useState([]);
  const [leave, setLeave] = useState([]);
  const [names, setNames] = useState({});
  const [page, SetPage] = useState(0);

  function changePage() {
    SetPage((prevPage) => (prevPage === 0 ? 1 : 0));
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await Get_Application_Counts();
        
        // Filtering join and leave requests with 'pending' status
        const joinreq = data.filter(
          (item) => item.status === "pending" && item.type === "JoinRequest"
        );
        const leavereq = data.filter(
          (item) => item.status === "pending" && item.type === "LeaveRequest"
        );

        // Get hostels for the owner
        const hostels = await ListHostel(credential.ownerid);

        // Filter join and leave requests that match hostels
        const join_updated = joinreq.filter((req) =>
          hostels.some((hostelItem) => hostelItem.hostelid === req.hostelid)
        );
        const leave_updated = leavereq.filter((req) =>
          hostels.some((hostelItem) => hostelItem.hostelid === req.hostelid)
        );

        setJoin(join_updated);
        setLeave(leave_updated);

        // Fetch and map student names for both join and leave requests
        const namesMap = {};
        for (let item of join_updated) {
          const name = await findName(item.studentid);
          namesMap[item.studentid] = name;
        }
        for (let item of leave_updated) {
          const name = await findName(item.studentid);
          namesMap[item.studentid] = name;
        }

        setNames(namesMap);
      } catch (error) {
        console.error("Error loading application data:", error);
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-screen">
        <div className="flex justify-center">
          <button
            className="m-2 bg-yellow-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={changePage}
          >
            JOIN REQUEST({join.length})
          </button>
          <button
            className="m-2 bg-yellow-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={changePage}
          >
            LEAVE REQUEST({leave.length})
          </button>
        </div>
        <div className="card bg-white shadow-md rounded-lg overflow-hidden">
          {page === 0 &&
            join.map((item) => (
              <JoinReq
                key={item.studentid}
                studentid={item.studentid}
                id={item.id}
                roomid={item.roomid}
                hostelid={item.hostelid}
                Name={names[item.studentid] || "Unknown"}
                content={item.content}
              />
            ))}
          {page === 1 &&
            leave.map((item) => (
              <LeaveReq
                key={item.studentid}
                studentid={item.studentid}
                id={item.id}
                roomid={item.roomid}
                hostelid={item.hostelid}
                Name={names[item.studentid] || "Unknown"}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
