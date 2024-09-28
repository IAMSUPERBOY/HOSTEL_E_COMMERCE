import supabase from "../util/supabaseclient.js";
import Owner from "./model.js";
import Hostel from "../Hostel/model.js";

//The form data from the owner end is send as an json object to the following method
//hostel_details should be a key-value pair data structure
/* create table
  public.hostel (
    hostelid 
    hostelname 
    ownerid 
    addressline1 
    addressline2 
    city 
    pincode 
    state 
    capacity 
    type
    contactnumber 
    rating 
    verification
    constraint hostel_pkey primary key (hostelid),
    constraint hostel_ownerid_fkey foreign key (ownerid) references owner (ownerid)
  ) tablespace pg_default; */

async function AddHostel(ownerid, hostel) {
  const { data, error } = await supabase.from("hostel").insert([
    {
      hostelid: hostel.hostelid,
      hostelname: hostel.hostelname,
      ownerid: hostel.owner,
      addressline1: hostel.addressline1,
      addressline2: hostel.addressline2,
      city: hostel.city,
      pincode: hostel.pincode,
      state: hostel.state,
      capacity: hostel.capacity,
      type: hostel.type,
      contactnumber: hostel.contactnumber,
      rating: hostel.rating,
      verification: hostel.verification,
    },
  ]);
}

async function EditHostel(hostelid, hostel) {
  const { data, error } = await supabase
    .from("hostel")
    .update({
      hostelname: hostel.hostelname,
      ownerid: hostel.owner,
      addressline1: hostel.addressline1,
      addressline2: hostel.addressline2,
      city: hostel.city,
      pincode: hostel.pincode,
      state: hostel.state,
      capacity: hostel.capacity,
      type: hostel.type,
      contactnumber: hostel.contactnumber,
      rating: hostel.rating,
      verification: hostel.verification,
    })
    .eq("hostelid", hostelid);

  if (error) {
    console.error("Error updating hostel:", error);
  } else {
    console.log("Hostel updated successfully:", data);
  }
}

async function List_Leave(ownerid) {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("type", "LeaveRequest");
  return data;
}
/* Remove Student(Student Vacates) */
/* FLOW 
- The owner selects a set of students requesting leave from the table
- they are added to temporary array that contains the application id
*/
async function Remove_Student_Vacate(ownerid, students_leaving) {
  //students_leaving is an array of students that are leaving array : [application id], we need to ensure that a particular owner only sees the application made for his hostel.

  for (let i = 0; i < students_leaving.length; i++) {
    const { data: application, e1 } = await supabase
      .from("application")
      .select("id,hostelid,roomid,studentid")
      .eq("id", students_leaving[i]);

    const roomid = application.roomid;
    const hostelid = application.hostelid;
    const studentid = application.studentid;

    //get the currentvacancy for the room the student is leaving from
    let { current_vacancy: room, e2 } = await supabase
      .from("rooms")
      .select("currentvacancy")
      .eq("hostelid", hostelid)
      .eq("roomid", roomid);
    //increment the vacancy for the room

    await supabase
      .from("rooms")
      .update({ currentvacancy: room.currentvacancy + 1 })
      .eq("hostelid", hostelid)
      .eq("roomid", roomid);

    await supabase
      .from("student")
      .update({ hostelid: "NULL", roomid: "NULL" })
      .eq("studentid", studentid)
      .select();

    const { errors } = await supabase
      .from("application")
      .delete()
      .eq("id", students_leaving[i]);
  }
}

async function Reject_Application(applicationid) {
  const { error } = await supabase
    .from("application")
    .delete()
    .eq("id", applicationid);
}
