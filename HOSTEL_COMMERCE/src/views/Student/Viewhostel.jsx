import React, { useState, useEffect } from "react";
import { ApplicationRequest } from "../../backend/Student/controller";
import supabase from "../../backend/util/supabaseclient";
import { GetHostel,GetRooms } from "../../backend/Owner/controller";
import { useParams,useNavigate } from "react-router-dom";
import credentials from "../../credentials.json";
//import { checkUser } from "../../backend/util/checkUser";

const studentid=credentials.studentid;
export const HostelView = () => {
  const [rooms, setRooms] = useState([]);
  const [requestContent, setRequestContent] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hostel, setHostel] = useState(null);
  const { hostelid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hostel details
    const fetchHostelData = async () => {
      try {
        const hostelData = await GetHostel(hostelid);
        if (hostelData && hostelData.length > 0) {
          setHostel(hostelData[0]); // Set hostel data
        } else {
          console.error("No hostel data found");
        }
        GetRooms(hostelid).then((data) => {
          setRooms(data);
        });
      } catch (error) {
        console.error("Error fetching hostel:", error);
      } finally {
        setLoading(false); // Stop loading once the data fetch is complete
      }
     
      
    

    };

    // Fetch available room IDs for the hostel
    const fetchRoomIds = async () => {
      try {
        // Fetch available rooms with vacancy
        const { data: roomData, error: roomError } = await supabase
          .from("rooms")
          .select("roomid") // Fetch only the room IDs
          .eq("hostelid", hostelid)
          .gt("currentvacancy", 0); // Fetch rooms with vacancy

        // Fetch rooms that have already been applied by the student
        const { data: appliedRooms, error: appliedError } = await supabase
          .from("application")
          .select("roomid")
          .eq("hostelid", hostelid)
          .eq("studentid", studentid);

        if (roomError) {
          console.error("Error fetching room IDs:", roomError);
          return;
        }

        if (appliedError) {
          console.error("Error fetching applied room IDs:", appliedError);
          return;
        }

        // Extract room IDs from the appliedRooms data
        const appliedRoomIds = appliedRooms.map((room) => room.roomid);

        // Filter roomData to exclude rooms already applied by the student
        const availableRooms = roomData.filter(
          (room) => !appliedRoomIds.includes(room.roomid)
        );

        // Set the filtered available rooms to the state
        setRooms(availableRooms);

        // Set default selected room to the first available one, if any
        if (availableRooms.length > 0) {
          setSelectedRoom(availableRooms[0].roomid);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    
    fetchHostelData();
    fetchRoomIds()
   

    // Call both fetch functions in parallel
  }, [hostelid]);

  //const studentid = checkUser();
  // Handle request submission
  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the application data to be sent to the backend
      const applicationData = {
        content: requestContent,
        roomid: selectedRoom,
      };

      // Call the backend function to submit the application
      const result = await ApplicationRequest(
        applicationData,
        hostelid,
        studentid
      );

      // Set the status message after successful submission
      setFormStatus("Request submitted successfully!");

      // Optionally, reset the form
      setRequestContent("");
      const updatedRooms = rooms.filter((room) => room.roomid !== selectedRoom);
      setRooms(updatedRooms);

      // Set the selected room to the next available one, if any
      if (updatedRooms.length > 0) {
        setSelectedRoom(updatedRooms[0].roomid);
      } else {
        setSelectedRoom(null); // No rooms left
      }
    } catch (error) {
      // Handle errors and display a message to the user
      console.error("Error submitting request:", error);
      setFormStatus("Failed to submit the request. Please try again.");
    }
  };

  // Render loading state until data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no hostel data is available, show an error message
  if (!hostel) {
    return <div>Error: Hostel data not found</div>;
  }

  // Render the hostel name and form once data is available
  return (
    <div className="flex h-screen justify-between p-5 bg-gray-50">
      {/* Left section with hostel details */}
      <div className="w-3/5 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-800">
            {hostel.hostelname}
          </h1>
        </div>
        <p className="text-lg">
          <strong>Location:</strong> {hostel.addressline1} {hostel.addressline2}
          ,{hostel.city}
        </p>
        <p className="text-lg">
          <strong>Contact:</strong> {hostel.contactnumber}
        </p>
        <p className="text-lg">
          <strong>Rating:</strong> {hostel.rating} ★
        </p>
        <p className="mb-4 text-gray-700">{hostel.description}</p>

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
             
            </div>
          </div>
        )}
      
      </div>

      {/* Right section for hostel image and request form */}
      <div className=" mt-8 w-2/5 flex flex-col ">
        {/* Image container */}
        {/* <div className="flex items-start w-full max-w-lg"> */}
  <div className="w-5/6 h-72 bg-gray-300 mr-4 rounded-2xl object-cover">
            <img
              src={hostel.imageUrl}
              alt={hostel.name}
              className="w-full h-full object-cover rounded-2xl "
            />
    </div> 

        {/* Request to Join Form */}
        <div className="mt-8 p-5 rounded-lg ">
          <h2 className="text-2xl font-semibold text-gray-800">
            Request to Join
          </h2>
          <form
            onSubmit={handleRequestSubmit}
            className="flex flex-col mt-6 w-96"
          >
            <textarea
              className="border border-gray-300 rounded-md p-2 mb-4 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows="4"
              placeholder="Write your request..."
              value={requestContent}
              onChange={(e) => setRequestContent(e.target.value)}
              required
            />
            <label className="mb-2 font-medium">Select Room:</label>
            <select
              name="room"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.roomid}>
                  Room {room.roomid}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-900 font-bold transition duration-300"
            >
              REQUEST
            </button>
          </form>
          {/* Status message */}
          {formStatus && (
            <p className="mt-4 text-lg text-gray-700">{formStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelView;
