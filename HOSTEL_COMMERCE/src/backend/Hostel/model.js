/* create table
  public.hostel (
    hostelid integer not null,
    hostelname character varying(50) not null,
    ownerid integer not null,
    addressline1 character varying(60) not null,
    addressline2 character varying(60) null,
    city character varying(50) not null,
    pincode integer not null,
    state character varying(40) not null,
    capacity integer not null,
    type character varying(10) not null,
    contactnumber character varying(15) not null,
    rating numeric(4, 2) null,
    verification boolean not null,
    constraint hostel_pkey primary key (hostelid),
    constraint hostel_ownerid_fkey foreign key (ownerid) references owner (ownerid)
  ) tablespace pg_default; */
class Hostel {
  constructor(
    hostelid,
    hostelname,
    ownerid,
    addressline1,
    addressline2,
    city,
    pincode,
    state,
    capacity,
    type,
    contactnumber,
    rating,
    verification
  ) 
  {
    this.hostelid=hostelid;
    this.hostelname=hostelname;
    this.ownerid=ownerid;
    this.addressline1=addressline1;
    this.addressline2=addressline2;
    this.city=city;
    this.pincode=pincode;
    this.state=state;
    this.capacity=capacity;
    this.type=type;
    this.contactnumber=contactnumber;
    this.rating=rating;
    this.verification=verification;
  }
}

export default Hostel;
