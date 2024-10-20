import React, { useState,useEffect } from 'react';
import { ApplicationRequest } from '../../backend/Student/controller';
import supabase from '../../backend/util/supabaseclient';
import { GetHostel,GetRooms } from '../../backend/Owner/controller';
import { useParams } from 'react-router-dom';
import credentials from '../../credentials.json'
export const HostelView = () => {
  const [rooms, setRooms] = useState([]);
  const [requestContent, setRequestContent] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [formStatus, setFormStatus] = useState(null); // To handle success/error message
  const [hostel,setHostel]=useState(null);
  const { hostelid } = useParams();
  console.log(hostelid);
 /*  const hostel=GetHostel() */
  useEffect(()=>{
    console.log(hostelid);
    GetHostel(hostelid)
      .then((data) => {
        setHostel(data);
        console.log(data);
      })
      .catch((err) => console.error("Error fetching hostel:", err));
      if(err)
        {
          console.log(err);
        }
     
      const fetchRoomIds = async () => {
        const { data, error } = await supabase
          .from('rooms')
          .select('roomid') // Fetch only the room IDs
          .eq('hostelid', hostelid) // Filter by hostelid = 2
          .gt('currentvacancy', 0);
          
        if (error) {
          console.error('Error fetching room IDs:', error);
        } else {
          setRooms(data); // Set fetched room IDs to the state
          if (data.length > 0) {
            setSelectedRoom(data[0].roomid); // Set default selected room to the first ID
          }
        }
      };
    
      fetchRoomIds();
  },[hostelid]);

    
    let  studentid = credentials.studentid;


  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the application data to be sent to the backend
      const applicationData = {
        content: requestContent,
        roomid: selectedRoom,
       
      };

      // Call the backend function to submit the application
      const result = await ApplicationRequest(applicationData, hostelid,studentid);

      // Set the status message after successful submission
      setFormStatus('Request submitted successfully!');

      // Optionally, reset the form
      setRequestContent('');

      setSelectedRoom(hostel.rooms[0].id);
    } catch (error) {
      // Handle errors and display a message to the user
      console.error('Error submitting request:', error);
      setFormStatus('Failed to submit the request. Please try again.');
    }
  };

  return (
    <div className="flex h-screen justify-between p-5 bg-gray-50">
      {/* Left section with hostel details */}
      <div className="w-3/5 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-800">{hostel.hostelname}</h1>
        </div>
        <p className="text-lg"><strong>Location:</strong> {hostel.location}</p>
        <p className="text-lg"><strong>Contact:</strong> {hostel.contact}</p>
        <p className="text-lg"><strong>Rating:</strong> {hostel.rating} ★</p>
        <p className="mb-4 text-gray-700">{hostel.description}</p>

        {/* Rooms section as cards */}
        <div className="mt-5">
          <h2 className="text-2xl font-semibold text-gray-800">Available Rooms</h2>
          <div className="flex gap-5 mt-3">
            {hostel.rooms.map((room) => (
              <div key={room.id} className="bg-white p-4 rounded-lg text-center shadow-md w-36">
                <div className="w-28 h-24 bg-gray-300 mb-3"></div> {/* Placeholder for room image */}
                <p>{room.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right section for hostel image and request form */}
      <div className="w-2/5 flex flex-col">
        {/* Image container */}
        <div className="w-full bg-white h-3/6 p-5 rounded-lg shadow-md mb-4">
          <img
            src="path-to-hostel-image.jpg"
            alt="Hostel"
            className="h-auto object-cover rounded-md transition-transform transform hover:scale-105"
          />
        </div>

        {/* Request to Join Form */}
        <div className="mt-8 p-5 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Request to Join</h2>
          <form onSubmit={handleRequestSubmit} className="flex flex-col mt-6 w-96">
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
              name='room'
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.roomid}>Room {room.roomid}</option>
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
          {formStatus && <p className="mt-4 text-lg text-gray-700">{formStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default HostelView;
