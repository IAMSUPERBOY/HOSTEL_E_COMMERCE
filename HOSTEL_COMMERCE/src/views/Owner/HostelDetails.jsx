import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetHostel, GetRooms } from "../../backend/Owner/controller";
import { Link } from "react-router-dom";

export const HostelDetails = () => {
  const [hostel, setHostel] = useState(null); // Initialize state to null
  const [rooms, setRooms] = useState(null);
  const { hostelid } = useParams();

  useEffect(() => {
    GetHostel(hostelid)
      .then((data) => {
        setHostel(data);
      })
      .catch((err) => console.error("Error fetching hostel:", err));
    GetRooms(hostelid).then((data) => {
      setRooms(data);
    });
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
    <div className="flex min-h-screen justify-between p-5  rounded-lg my-5">
      {/* Left section with hostel details */}
      <div className="w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{hostel[0].hostelname}</h1>
        </div>

        <div className="w-screen  rounded-lg  overflow-hidden">
          <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <img
              src={hostel[0].imageUrl}
              alt={hostel[0].name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-8 py-6 ">
            <p className="text-lg text-gray-700 mb-4">
              {hostel[0].description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {hostel[0].addressline1},{" "}
              {hostel[0].addressline2}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Rating:</strong> ★ {hostel[0].rating || "N/A"}
            </p>
          </div>
        </div>

        {/* Rooms section */}
        {/* Uncomment and modify the rooms section based on your requirements */}
        {rooms && (
          <div className="m-5">
            <h2 className="text-2xl  font-semibold">Rooms</h2>
            <div className="flex gap-5 mt-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white p-4 rounded-lg text-center shadow-md w-36"
                >
                  {/* <div className="w-28 h-24 bg-gray-300 mb-3"></div> */}

                  <p>{room.acnonac ? "AC" : "Non-AC"}</p>
                  <p>{room.roomtype}</p>

                  <p>VACANCY:{room.currentvacancy}</p>
                  <p>RENT:{room.rent}</p>
                </div>
              ))}
              <div className="flex items-center justify-center">
                <Link to={`/Owner/AddRooms/${hostel[0].hostelid}`}>
                  <button className="bg-green-500 text-white py-2 px-4 font-bold rounded-md hover:bg-green-600">
                    + Add Room
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Link to={`/Owner/EditHostels/${hostel.hostelid}`}>
        <button className="bg-orange-500 text-white py-2 mr-6 px-4 rounded-md hover:bg-orange-600">
          Edit Hostel
        </button>
      </Link>
    </div>
  );
};

export default HostelDetails;
