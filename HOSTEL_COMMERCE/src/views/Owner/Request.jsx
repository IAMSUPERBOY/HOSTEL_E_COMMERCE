import React, { useEffect, useState } from "react";
import {
  Get_Applicant_Names,
  Get_Application_Counts,
  Accept_Student,
  ListHostel,
} from "../../backend/Owner/controller";
import JoinReq from "../../components/JoinReq";
import LeaveReq from "../../components/LeaveReq";
import credential from "../../credentials.json";
async function findName(studentid, ownerid) {
  const data = await Get_Applicant_Names();
  const student = data.find(
    (element) => element.student.studentid === studentid
  );
  return student ? student.student.studentfname : "Unknown";
}

let joinreq;
let join_updated=[];

export default function RequestPage() {
  const [join, setJoin] = useState([]);
  const [page, SetPage] = useState(0);
  const [leave, setLeave] = useState([]);
  const [names, setNames] = useState({});
  function changePage() {
    SetPage(!page);
  }

  useEffect(() => {
    Get_Application_Counts().then(async (data) => {
      // Filtering for 'JoinRequest' with 'pending' status
      joinreq = data.filter(
        (item) => item.status === "pending" && item.type === "JoinRequest"
      );

      ListHostel(credential.ownerid).then((hostel) => {
        const join_updated = joinreq.filter((req) => 
          hostel.some((hostelItem) => hostelItem.hostelid === req.hostelid)
        );
      
        console.log(join_updated);
        setJoin(join_updated);  
      });
    
      // Filtering for 'LeaveRequest' with 'pending' status
      let leavereq = data.filter(
        (item) => item.status === "pending" && item.type === "LeaveRequest"
      );
      setLeave(leavereq);
      const namesMap = {};
      for (let item of joinreq) {
        const name = await findName(item.studentid, item.hostelid);
        namesMap[item.studentid] = name;
      }
      for (let item of leavereq) {
        const name = await findName(item.studentid, item.hostelid);
        namesMap[item.studentid] = name;
      }

      setNames(namesMap);
      console.log(names);
    });
    //Get_Applicant_Names(1).then((data)=>{console.log(data[0].student.studentfname)});
  }, []);
  return (
    <div>
      <div className="">
        <button
          className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={changePage}
        >
          JOIN REQUEST({join.length})
        </button>
        <button
          onClick={changePage}
          className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          LEAVE REQUEST({leave.length})
        </button>
      </div>
      <div class="card bg-white shadow-md rounded-lg overflow-hidden">
        {page == 0 &&
          join.map((item) => (
            <JoinReq
              key={item.studentid}
              studentid={item.studentid}
              id={item.id}
              roomid={item.roomid}
              hostelid={item.hostelid}
              Name={names[item.studentid]}
              content={item.content}
            />
          ))}
        {page == 1 &&
          leave.map((item) => (
            <LeaveReq
              key={item.studentid}
              studentid={item.studentid}
              id={item.id}
              roomid={item.roomid}
              hostelid={item.hostelid}
              Name={names[item.studentid]}
            />
          ))}
      </div>
    </div>
  );
}
