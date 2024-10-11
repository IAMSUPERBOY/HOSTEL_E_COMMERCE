import React, { useState } from 'react'; // Import useState from React

export const HostelList = () => {
  const [hostels, setHostels] = useState([
    {
      id: 1,
      name: 'Green Meadows',
      inmates: 15,
      vacancy: 5,
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Blue Haven',
      inmates: 20,
      vacancy: 10,
      rating: 4.2,
    },
    {
      id: 3,
      name: 'Red Roof Inn',
      inmates: 10,
      vacancy: 0,
      rating: 3.8,
    },
  ]);

  return (
    <div className="p-5 h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-5">Manage Hostels</h2>
      {hostels.map((hostel) => (
        <div key={hostel.id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-24 h-16 bg-gray-300 mr-4 rounded"></div> {/* Placeholder for hostel image */}
            <div className="hostel-details">
              <h3 className="text-lg font-semibold">{hostel.name}</h3>
              <p>Current Inmates: {hostel.inmates}</p>
              <p>Current Vacancy: {hostel.vacancy}</p>
              <div className="font-bold">Rating: {hostel.rating}/5</div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View/Edit</button>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Manage Inmates</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HostelList;
