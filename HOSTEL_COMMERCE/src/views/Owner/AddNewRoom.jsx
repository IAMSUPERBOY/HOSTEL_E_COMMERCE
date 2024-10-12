import React, { useState } from "react";
import { AddRoom } from "../../backend/Owner/controller";

function AddNewRoom() {
  const hostelid = 1;

  const [room, setRoom] = useState({
    currentvacancy: "",
    rent: "",
    roomtype: "",
    acnonac: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formattedRoom = {
      ...room,
      currentvacancy: parseInt(room.currentvacancy, 10),
      rent: parseInt(room.rent, 10),
    };

    const validateInputs = () => {
      const requiredFields = ["currentvacancy", "rent", "roomtype", "acnonac"];

      for (let field of requiredFields) {
        if (!formattedRoom[field]) {
          setError(
            `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
          );
          return false;
        }
      }
      return true;
    };

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      await AddRoom(hostelid, formattedRoom); // Call the backend function
      alert("room added successfully");
      // Optionally reset form fields here
    } catch (error) {
      console.error("Error adding room:", error);
      setError("Failed to add new room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1 className="text-xl font-medium mt-4 ml-8">ADD NEW ROOM TYPE</h1>
      <div className="flex flex-col md:flex-row gap-24 mt-6">
        <div className="flex-1">
          <form
            className="space-y-4 mt-4 ml-44 w-3/4 h-full"
            onSubmit={handleSubmit}
          >
            <div className="">
              <label className="text-sm font-medium ">CURRENT VACANCY</label>
              <input
                type="text"
                name="currentvacancy"
                value={room.currentvacancy}
                onChange={handleChange}
                placeholder=""
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium">RENT</label>
              <input
                type="text"
                name="rent"
                value={room.rent}
                onChange={handleChange}
                placeholder=""
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <p className="mt-2 block text-sm font-medium">ROOMTYPE</p>
            <div className="flex items-center space-x-6 ">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="roomtype" // Same name for both radio buttons
                  value="Single"
                  checked={room.roomtype === "Single"} // heck this if value matches state
                  onChange={handleRadioChange} // Handle state change
                  className="h-4 w-4 text-black-900"
                />
                <span className="ml-2 text-sm">SINGLE</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="roomtype" // Same name for both radio buttons
                  value="Double"
                  checked={room.roomtype === "Double"} // Check this if value matches state
                  onChange={handleRadioChange} // Handle state change
                  className="h-4 w-4 focus:ring-black-800"
                />
                <span className="ml-2 text-sm">DOUBLE</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="roomtype" // Same name for both radio buttons
                  value="Multiple"
                  checked={room.roomtype === "Multiple"} // Check this if value matches state
                  onChange={handleRadioChange} // Handle state change
                  className="h-4 w-4 "
                />
                <span className="ml-2 text-sm">MULTIPLE</span>
              </label>
            </div>
            <p className="mt-8 block text-sm font-medium">AC/NON-AC</p>
            <div className="flex items-center space-x-6 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="acnonac" // Same name for both radio buttons
                  value="TRUE"
                  checked={room.acnonac === "TRUE"} // Check this if value matches state
                  onChange={handleRadioChange} // Handle state change
                  className="h-4 w-4 text-black-500 focus:ring-blue-400"
                />
                <span className="ml-2 text-sm">AC</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="acnonac" // Same name for both radio buttons
                  value="FALSE"
                  checked={room.acnonac === "FALSE"} // Check this if value matches state
                  onChange={handleRadioChange} // Handle state change
                  className="h-4 w-4 focus:ring-black-800"
                />
                <span className="ml-2 text-sm">NON-AC</span>
              </label>
            </div>
            <button
              type="submit"
              className="absolute bottom-8 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-60"
            >
              ADD ROOM
            </button>
          </form>
        </div>

        <div className="h-screen flex-1 space-y-4 relative mt-4">
          <div className="">
            <div>
              <label className="text-sm font-medium">HOSTEL PICS</label>
              <div className="mt-2 w-96 h-48 bg-gray-200 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                <p>Upload Image</p>
              </div>
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Upload file
              </label>
              {/* <input class="block w-96 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400" id="file_input" type="file" /> */}
            </div>
          </div>

          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

export default AddNewRoom;
