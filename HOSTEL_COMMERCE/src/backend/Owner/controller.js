import supabase from "../supabaseclient.js";


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
async function AddHostel(ownerid,hostel_details)
{


    const { data, error } = await supabase
    .from('hostel')
    .insert([
      {  hostelid:"100",
        hostelname:"check", 
        ownerid:"5",
        addressline1:"asdas", 
        addressline2:"asdasd",  
        city:"assad" , 
        pincode:"12312" ,
        state :"asdsd",
        capacity :"03",
        type:"mens",
        contactnumber:"9567456123" ,
        rating :"9",
        verification:"true" },
    ])
            
        
}
const test={};
try {await AddHostel(1,test);}
catch(Exception)
{
    console.log(Exception);
}