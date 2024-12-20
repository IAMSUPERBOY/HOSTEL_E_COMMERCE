import React, { useEffect, useState } from "react"; // Import useState from React
import { ListHostel } from "../../backend/Owner/controller";
import credentials from "../../credentials.json";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
export const HostelList = () => {
  const ownerid = credentials.ownerid;
  const [hostels, setHostels] = useState([]);
  useEffect(() => {
    ListHostel(ownerid).then((data) => {
      console.log(data[0]);

      setHostels(data);
    });
  }, []);

  return (
    <>
    <Navbar />
    <div className="p-5 h-screen bg-gray-100">
      
      <h2 key="bull" className="text-2xl font-bold mb-5">
        Manage Hostels
      </h2>
      {hostels.map((hostel) => (
        <div
          key={hostel.id}
          className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
        >

          <div className="flex items-start w-full max-w-lg">
  <div className="w-40 h-36 bg-gray-300 mr-4 rounded object-cover">
            <img
              src={hostel.imageUrl}
              alt={hostel.name}
              className="w-full h-full object-cover rounded"
            />
    </div> 
  {/* Placeholder for hostel image with increased width */}

  <div className="flex flex-col">
    <h3 className="text-lg font-semibold">{hostel.hostelname}</h3>
    <p>Current Inmates: {hostel.inmates}</p>
    <p>Current Vacancy: {hostel.capacity - hostel.inmates}</p>
    <p>Address:</p>
    <p>{hostel.addressline1}</p>
    <p>{hostel.addressline2}</p> {/* Added Address Line 2 */}
  </div>
</div>



          <div className="flex space-x-2">
            <Link to={`/Owner/HostelDetails/${hostel.hostelid}`}>
              <button className="bg-orange-950 text-white py-2  mr-5 px-4 font-bold rounded hover:bg-yellow-600 hover:text-black">
                View
              </button>
            </Link>
            {/* <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Manage Inmates
            </button> */}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default HostelList;
