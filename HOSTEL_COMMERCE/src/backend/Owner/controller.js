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

export async function AddOwner(owner) {
  let { data: maxownerid, ownerror } = await supabase
    .from("owner")
    .select("ownerid")
    .order("ownerid", { ascending: false })
    .limit(1); // Fetch the largest ownerid

  const { data, error } = await supabase.from("owner").insert([
    {
      ownerid: maxownerid[0].ownerid + 1,
      ownerfname: owner.ownerfname,
      ownerlname: owner.ownerlname,
      address: owner.address,
      dateofbirth: owner.dateofbirth,
      contactnumber: owner.contactnumber,
    },
  ]);

  if (error) {
    console.error("Error inserting hostel:", error);
    throw error; // Throw the error to be handled in the frontend
  }

  return data; // Return the inserted data (optional)
}

export async function AddStudent(student) {
  // Fetch the largest studentid
  let { data: maxstudentid, studenterror } = await supabase
    .from("student")
    .select("studentid")
    .order("studentid", { ascending: false })
    .limit(1);

  // Insert new student with incremented studentid
  const { data, error } = await supabase.from("student").insert([
    {
      studentid: maxstudentid[0].studentid + 1,
      studentfname: student.studentfname,
      studentlname: student.studentlname,
      institutionname: student.institutionname,
      yearofstudy: student.yearofstudy,
      age: student.age,
      gender: student.gender,
      guardianname: student.guardianname,
      phonenumber: student.phonenumber,
      addressline1: student.addressline1,
      addressline2: student.addressline2,
      city: student.city,
      pincode: student.pincode,
      state: student.state,
      currentresidence: student.currentresidence,
    },
  ]);

  if (error) {
    console.error("Error inserting student:", error);
    throw error; // Throw the error to be handled in the frontend
  }

  return data; // Return the inserted data (optional)
}

export async function AddHostel(ownerid, hostel) {
  let { data: maxhostelid, hoserror } = await supabase
    .from("hostel")
    .select("hostelid")
    .order("hostelid", { ascending: false })
    .limit(1); // Fetch the largest hostelid

  const { data, error } = await supabase.from("hostel").insert([
    {
      hostelname: hostel.hostelname,
      hostelid: maxhostelid[0].hostelid + 1,
      ownerid: ownerid, // Use the passed ownerid here
      addressline1: hostel.addressline1,
      addressline2: hostel.addressline2,
      city: hostel.city,
      pincode: hostel.pincode,
      state: hostel.state,
      capacity: hostel.capacity,
      type: hostel.type,
      contactnumber: hostel.contactnumber,
      rating: hostel.rating,
      gender: hostel.gender,
      description: hostel.description,
      imageUrl:hostel.imageUrl,
      startingprice:hostel.startingprice,
    },
  ]);

  if (error) {
    console.error("Error inserting hostel:", error);
    throw error; // Throw the error to be handled in the frontend
  }

  return data; // Return the inserted data (optional)
}

export async function EditHostel(hostelid, hostel) {
  const { data, error } = await supabase
    .from("hostel")
    .update({
      hostelname: hostel.hostelname,
      addressline1: hostel.addressline1,
      addressline2: hostel.addressline2,
      city: hostel.city,
      pincode: hostel.pincode,
      state: hostel.state,
      capacity: hostel.capacity,
      type: hostel.type,
      contactnumber: hostel.contactnumber,
      gender: hostel.gender,
      description: hostel.description,
      imageUrl:hostel.imageUrl,
      startingprice:hostel.startingprice,
      
    })
    .eq("hostelid", hostelid);

  if (error) {
    console.error("Error updating hostel:", error);
  } else {
    console.log("Hostel updated successfully:", data);
  }
}

export async function AddRoom(hostelid, roomDetails) {
  const { roomtype, currentvacancy, acnonac, rent } = roomDetails;

  try {
    // Step 1: Get the current highest roomid for the given hostelid
    const { data: existingRooms, error: fetchError } = await supabase
      .from("rooms")
      .select("roomid")
      .eq("hostelid", hostelid)
      .order("roomid", { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error("Error fetching existing rooms:", fetchError);
      return { success: false, message: fetchError.message };
    }

    // Step 2: Increment the roomid
    let newRoomId = 1; // Default roomid if no rooms exist for the hostel

    if (existingRooms && existingRooms.length > 0) {
      newRoomId = existingRooms[0].roomid + 1;
    }

    // Step 3: Insert the new room into the rooms table with the incremented roomid
    const { data, error } = await supabase.from("rooms").insert([
      {
        roomid: newRoomId,
        hostelid: hostelid,
        roomtype: roomtype,
        currentvacancy: currentvacancy,
        acnonac: acnonac,
        rent: rent,
      },
    ]);

    if (error) {
      console.error("Error adding room:", error);
      return { success: false, message: error.message };
    }

    return { success: true, data: data, message: "Room added successfully" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred" };
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

export const Reject_Application = async (applicationid) => {
  const { error } = await supabase
    .from("application")
    .delete()
    .eq("id", applicationid);
};

export const Get_Application_Counts = async () => {
  let { data: application, error } = await supabase
    .from("application")
    .select(`id,studentid,hostelid,roomid,type,status,content`);

  return application;
};

export const Accept_Student = async (
  applicationid,
  studentid,
  hostelid,
  roomid
) => {
  //get the currentvacancy for the room the student is leaving from
  try {
    let { data: room, e2 } = await supabase
      .from("rooms")
      .select("currentvacancy")
      .eq("hostelid", hostelid)
      .eq("roomid", roomid);
    //increment the vacancy for the room
    console.log(room);
    await supabase
      .from("rooms")
      .update({ currentvacancy: room[0].currentvacancy - 1 })
      .eq("hostelid", hostelid)
      .eq("roomid", roomid);
    await supabase
      .from("student")
      .update({ hostelid: hostelid, roomid: roomid })
      .eq("studentid", studentid);
    const { errors } = await supabase
      .from("application")
      .delete()
      .eq("id", applicationid);
  } catch (error) {
    console.log(error);
  }
};

export const Get_Applicant_Names = async (hostelid) => {
  let { data: application, error } = await supabase.from("application").select(`
    student (
    studentid,
      studentfname
    )
  `);

  return application;
};

export const Remove_Student_Vacate = async (
  applicationid,
  studentid,
  hostelid,
  roomid
) => {
  //students_leaving is an array of students that are leaving array : [application id], we need to ensure that a particular owner only sees the application made for his hostel.
  const { data: application, e1 } = await supabase
    .from("application")
    .select("id,hostelid,roomid,studentid")
    .eq("id", studentid);

  //const roomid = application.roomid;
  //const hostelid = application.hostelid;
  //const studentid = application.studentid;

  //get the currentvacancy for the room the student is leaving from

  /* const roomid = application.roomid;
  const hostelid = application.hostelid; */
  //const studentid = application.studentid;

  //get the currentvacancy for the room the student is leaving from

  let { data: room, e2 } = await supabase
    .from("rooms")
    .select("currentvacancy")
    .eq("hostelid", hostelid)
    .eq("roomid", roomid);
  //increment the vacancy for the room
  console.log(room);
  console.log(e2);
  await supabase
    .from("rooms")
    .update({ currentvacancy: room[0].currentvacancy + 1 })
    .eq("hostelid", hostelid)
    .eq("roomid", roomid);
  await supabase
    .from("student")
    .update({ hostelid: null, roomid: null })
    .eq("studentid", studentid);
  const { errors } = await supabase
    .from("application")
    .delete()
    .eq("id", applicationid);
};

function calculateTotalOccupants(room_vac_type) {
  const roomCapacity = {
    single: 1,
    double: 2,
    triple: 3,
    multiple: 5,
  };
  let totalOccupants = 0;
  room_vac_type.forEach((room) => {
    const maxOccupants = roomCapacity[room.roomtype.toLowerCase()] || 0;
    const occupants = maxOccupants - room.currentvacancy;
    totalOccupants += occupants;
  });

  return totalOccupants;
}

export const ListHostel = async (ownerid) => {
  let { data: hostel, e1 } = await supabase
    .from("hostel")
    .select("hostelid,hostelname,capacity,addressline1,addressline2,imageUrl")
    .eq("ownerid", ownerid);

  const hostelWithInmates = await Promise.all(
    hostel.map(async (item) => {
      const inmates = await calc_inmates(item.hostelid);
      return { ...item, inmates }; // Add inmates to each hostel object
    })
  );

  return hostelWithInmates;
};

export const calc_inmates = async (hostelid) => {
  let { data: room_vac_type, e2 } = await supabase
    .from("rooms")
    .select(
      `
  currentvacancy,
  roomtype,
  hostel (
    hostelid
  )
`
    )
    .eq("hostelid", hostelid);

  const totalOccupants = calculateTotalOccupants(room_vac_type);
  return totalOccupants;
};

export const GetHostel = async (hostelid) => {
  let { data: hostel, error } = await supabase
    .from("hostel")
    .select("*")
    .eq("hostelid", hostelid);
  return hostel;
};

export const GetRooms = async (hostelid) => {
  let { data: rooms, error } = await supabase
    .from("rooms")
    .select("*").eq("hostelid",hostelid);
    return rooms;
};
