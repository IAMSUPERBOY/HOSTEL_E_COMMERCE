import React, { useState } from "react";
import { AddHostel } from "../../backend/Owner/controller";
import Navbar from "./Navbar";
import Footer from "./Footer";
import credentials from "../../credentials.json"

function AddNewHostel() {
  const ownerid = credentials.ownerid; // Temporarily hardcoded

  const [hostel, setHostel] = useState({
    hostelname: "",
    description: "",
    addressline1: "",
    addressline2: "",
    city: "",
    pincode: "",
    state: "",
    capacity: "",
    type: "",
    contactnumber: "",
    gender: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formattedHostel = {
      ...hostel,
      capacity: parseInt(hostel.capacity, 10),
      pincode: parseInt(hostel.pincode, 10),
      rating: 0,
    };

    const validateInputs = () => {
      const requiredFields = [
        "hostelname",
        "addressline1",
        "city",
        "pincode",
        "state",
        "capacity",
        "gender",
        "type",
        "description",
        "contactnumber",
      ];

      for (let field of requiredFields) {
        if (!formattedHostel[field]) {
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
      await AddHostel(ownerid, formattedHostel); // Call the backend function
      alert("Hostel added successfully");
    } catch (error) {
      console.error("Error adding hostel:", error);
      setError("Failed to add hostel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHostel((prevHostel) => ({
      ...prevHostel,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setHostel((prevHostel) => ({
      ...prevHostel,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
     

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Add New Hostel</h1>
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Hostel Name</label>
            <input
              type="text"
              name="hostelname"
              value={hostel.hostelname}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md"
              placeholder="Enter hostel name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={hostel.description}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md"
              placeholder="Enter hostel description"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Contact Number</label>
            <input
              type="text"
              name="contactnumber"
              value={hostel.contactnumber}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Address Line 1</label>
            <input
              type="text"
              name="addressline1"
              value={hostel.addressline1}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md"
              placeholder="Enter address line 1"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address Line 2</label>
            <input
              type="text"
              name="addressline1"
              value={hostel.addressline2}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md"
              placeholder="Enter address line 2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={hostel.city}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md"
              placeholder="Enter city"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">State</label>
              <input
                type="text"
                name="state"
                value={hostel.state}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md"
                placeholder="Enter state"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={hostel.pincode}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md"
                placeholder="Enter pincode"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Capacity</label>
              <input
                type="text"
                name="capacity"
                value={hostel.capacity}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md"
                placeholder="Enter capacity"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Hostel Type</label>
              <div className="flex items-center mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="hostel"
                    checked={hostel.type === "hostel"}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Hostel</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="type"
                    value="PG"
                    checked={hostel.type === "PG"}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">PG</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Gender</label>
              <div className="flex items-center mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="boys"
                    checked={hostel.gender === "boys"}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Boys</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="gender"
                    value="girls"
                    checked={hostel.gender === "girls"}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Girls</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="gender"
                    value="mixed"
                    checked={hostel.gender === "mixed"}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Mixed</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            {loading ? "Adding Hostel..." : "Add Hostel"}
          </button>
        </form>
      </div>

      
    </div>
  );
}

export default AddNewHostel;
