import React from 'react';

export const HostelDetails = () => {
  const hostel = {
    name: 'Green Meadows',
    location: 'Near Kowdiar Palace, Kowdiar, Trivandrum, Kerala - 695003',
    contact: '+91 98471 23456',
    rating: 4.5,
    description:
      "Welcome to Green Meadows, a top-rated men's hostel located in the prestigious Kowdiar area. Situated near the iconic Kowdiar Palace, this hostel offers a perfect blend of comfort, convenience, and community living for students and working professionals alike.",
    rooms: [
      { id: 1, name: 'Double Room (Non AC)' },
      { id: 2, name: 'Double Room (AC)' }
    ]
  };

  return (
    <div className="flex h-screen justify-between p-5 bg-gray-100 rounded-lg shadow-lg my-5">
      {/* Left section with hostel details */}
      <div className="w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{hostel.name}</h1>
          <button className="bg-orange-500 text-white py-2 mr-6 px-4 rounded-md hover:bg-orange-600">
            Edit Hostel
          </button>
        </div>
        <p><strong>Location:</strong> {hostel.location}</p>
        <p><strong>Contact:</strong> {hostel.contact}</p>
        <p><strong>Rating:</strong> {hostel.rating} ★</p>
        <p className="mb-4">{hostel.description}</p>

        {/* Rooms section */}
        <div className="mt-5">
          <h2 className="text-2xl font-semibold">Rooms</h2>
          <div className="flex gap-5 mt-3">
            {hostel.rooms.map((room) => (
              <div key={room.id} className="bg-white p-4 rounded-lg text-center shadow-md w-36">
                <div className="w-28 h-24 bg-gray-300 mb-3"></div> {/* Placeholder for room image */}
                <p>{room.name}</p>
                <button className="bg-blue-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-blue-600">
                  Edit
                </button>
              </div>
            ))}
            <div className="flex items-center justify-center">
              <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                + Add Room
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right section for hostel image */}
      <div className="w-2/5 flex justify-center items-start">
        <div className="w-full bg-white h-5/6 p-5 rounded-lg shadow-md">
          <img
            src="path-to-hostel-image.jpg"
            alt="Hostel"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
