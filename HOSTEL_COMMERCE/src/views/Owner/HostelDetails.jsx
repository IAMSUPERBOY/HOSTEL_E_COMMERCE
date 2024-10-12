import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetHostel, GetRooms } from "../../backend/Owner/controller";
import { Link } from "react-router-dom";

export const HostelDetails = () => {
  const [hostel, setHostel] = useState(null); // Initialize state to null
  const [rooms,setRooms]=useState(null)
  const { hostelid } = useParams();

  useEffect(() => {
    GetHostel(hostelid)
      .then((data) => {
        setHostel(data);
      })
      .catch((err) => console.error("Error fetching hostel:", err));
    GetRooms(hostelid).then((data)=>{
      setRooms(data);
    })
  }, [hostelid]);

  // Log to ensure hostel data is received
  console.log(hostel);
  console.log(rooms);

  // Render a loading state if hostel data is not yet available
  if (!hostel) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Once hostel data is available, render the details
  return (
    <div className="flex h-screen justify-between p-5 bg-gray-100 rounded-lg shadow-lg my-5">
      {/* Left section with hostel details */}
      <div className="w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{hostel[0].hostelname}</h1>
          <Link to={`/Owner/EditHostels/${hostel.hostelid}`}>
          <button className="bg-orange-500 text-white py-2 mr-6 px-4 rounded-md hover:bg-orange-600">
            Edit Hostel
          </button>
          </Link>
        </div>
        <p>
          <strong>Location:</strong> {hostel[0].addressline1}, {hostel[0].addressline2}
        </p>
        <p>
          <strong>Rating:</strong> ★ {hostel[0].rating || "N/A"}
        </p>
        <p className="mb-4"></p>

        {/* Rooms section */}
        {/* Uncomment and modify the rooms section based on your requirements */}
        {rooms && (
          <div className="mt-5">
            <h2 className="text-2xl font-semibold">Rooms</h2>
            <div className="flex gap-5 mt-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white p-4 rounded-lg text-center shadow-md w-36"
                >
                  <div className="w-28 h-24 bg-gray-300 mb-3"></div>
                  <p>{room.name}</p>
                  
                  <button className="bg-blue-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-blue-600">
                    Edit
                  </button>
                
                </div>
              ))}
              <div className="flex items-center justify-center">
              <Link to={`/Owner/AddRooms/${hostel[0].hostelid}`}>
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                  + Add Room
                </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelDetails;
