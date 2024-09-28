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

  
async function AddHostel(ownerid,hostel)
{


    const { data, error } = await supabase
    .from('hostel')
    .insert([
      {  hostelid:hostel.hostelid,
        hostelname:hostel.hostelname, 
        ownerid:hostel.owner,
        addressline1:hostel.addressline1, 
        addressline2:hostel.addressline2,  
        city:hostel.city, 
        pincode:hostel.pincode,
        state :hostel.state,
        capacity :hostel.capacity,
        type:hostel.type,
        contactnumber:hostel.contactnumber ,
        rating :hostel.rating,
        verification:hostel.verification},
    ])
            
        
}


async function UpdateHostel(hostelid, hostel) {

  const { data, error } = await supabase
  .from('hostel')
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
      verification: hostel.verification
  })
  .eq('hostelid', hostelid) 

  if (error) {
      console.error("Error updating hostel:", error);
  } else {
      console.log("Hostel updated successfully:", data);
  }
}
