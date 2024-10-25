import React, { useState } from "react";
import { EditHostel } from "../../backend/Owner/controller";
import { useParams } from "react-router-dom";
import supabase from "../../backend/util/supabaseclient";
import { decode } from "base64-arraybuffer";

function EditHostelDetails() {
  const { hostelid } = useParams();

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
    imageUrl: "",
    startingprice:""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formattedHostel = {
      ...hostel,
      capacity: parseInt(hostel.capacity, 10),
      pincode: parseInt(hostel.pincode, 10),
      startingprice:parseInt(hostel.startingprice,10)
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
        "startingprice"
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
      if (imageFile) {
        const fileName = `public/${Date.now()}`;
        const decodedFile = decode(imageFile);

        const { data, error: uploadError } = await supabase.storage
          .from("hostel")
          .upload(fileName, decodedFile, { contentType: "image/jpeg", upsert: true });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          throw new Error(uploadError.message);
        }

        console.log("File uploaded successfully:", data);

        const { publicURL, error: urlError } = supabase.storage
          .from("hostel")
          .getPublicUrl(data.path);

        if (urlError) {
          console.error("Error getting public URL:", urlError.message);
          throw new Error(urlError.message);
        }

        formattedHostel.imageUrl = `https://sdspzxoxvksccuaglgjs.supabase.co/storage/v1/object/public/hostel/${fileName}`;
        console.log("Public URL:", formattedHostel.imageUrl);
      }

      await EditHostel(hostelid, formattedHostel);
      alert("Hostel updated successfully");
      setHostel({
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
        imageUrl: "",
        startingprice:""
      });

      setImageFile(null);
    } catch (error) {
      console.error("Error updating hostel:", error);
      setError("Failed to update hostel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = function () {
      const base64String = fileReader.result.split(",")[1];
      setImageFile(base64String);
    };

    fileReader.readAsDataURL(file);
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
      <h1 className="text-xl font-semibold text-center mb-4">Edit Hostel</h1>
      <form className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
      
        <div>
          <label className="block text-sm font-medium">Hostel Name</label>
          <input
            type="text"
            name="hostelname"
            value={hostel.hostelname}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={hostel.description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            type="text"
            name="contactnumber"
            value={hostel.contactnumber}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address Line 1</label>
          <input
            type="text"
            name="addressline1"
            value={hostel.addressline1}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address Line 2</label>
          <input
            type="text"
            name="addressline2"
            value={hostel.addressline2}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={hostel.city}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={hostel.pincode}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            name="state"
            value={hostel.state}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={hostel.capacity}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
              <label className="block  font-medium">StartingPrice</label>
              <input
                type="text"
                name="startingprice"
                value={hostel.startingprice}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md"
                
              />
            </div>

        <div>
          <label className="block text-sm font-medium">Upload Hostel Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 w-full px-4 py-2 border rounded-md"
          />
        </div>

        <p className="mt-4 block text-sm font-medium">Type</p>
        <div className="flex items-center space-x-4 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="hostel"
              checked={hostel.type === "hostel"}
              onChange={handleRadioChange}
              className="mr-2"
              required
            />
            Hostel
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="PG"
              checked={hostel.type === "PG"}
              onChange={handleRadioChange}
              className="mr-2"
              required
            />
            PG
          </label>
        </div>

        <p className="mt-4 block text-sm font-medium">Gender</p>
        <div className="flex items-center space-x-4 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="boys"
              checked={hostel.gender === "boys"}
              onChange={handleRadioChange}
              className="mr-2"
              required
            />
            Boys
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="girls"
              checked={hostel.gender === "girls"}
              onChange={handleRadioChange}
              className="mr-2"
              required
            />
            Girls
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="mixed"
              checked={hostel.gender === "mixed"}
              onChange={handleRadioChange}
              className="mr-2"
              required
            />
            Mixed
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium">Rating</label>
          <input
            type="number"
            name="rating"
            value={hostel.rating}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="5"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full px-4 py-2 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Updating..." : "Update Hostel"}
        </button>
      </form>
    </div>
  );
}

export default EditHostelDetails;
