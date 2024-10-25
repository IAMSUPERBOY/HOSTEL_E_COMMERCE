import React, { useState } from "react";
import { AddHostel } from "../../backend/Owner/controller";
import Navbar from "./Navbar";
import Footer from "./Footer";
import supabase from "../../backend/util/supabaseclient";
import { decode } from 'base64-arraybuffer'


function AddNewHostel() {
  const ownerid = 1; // Temporarily hardcoded

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
    imageUrl: "", // To store the URL of the uploaded image
  });
  const [imageFile, setImageFile] = useState(null); // State to hold the selected file
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      if (!hostel[field]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }
    return true;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   const formattedHostel = {
  //     ...hostel,
  //     capacity: parseInt(hostel.capacity, 10),
  //     pincode: parseInt(hostel.pincode, 10),
  //     rating: 0,
  //   };

  //   if (!validateInputs()) {
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     // Upload image if a file was selected
  //     // if (imageFile) {
  //     //   console.log(imageFile);
  //     //   const { data, error } = await supabase.storage.from("hostels_2").upload(`im/${Date.now()}`,
  //     //   "data:image/jpeg;base64," + imageFile, {contentType: 'image/jpeg', upsert: true});

  //     //   console.log(`${Date.now()}`);


  //     //   if (error) {
  //     //     console.error("Upload error:", uploadError.message);
  //     //     throw new Error(uploadError.message);
  //     //   }
      
  //     //   console.log("File uploaded successfully:", data);
        
  //     //   const { publicURL, error: urlError } = supabase.storage
  //     //     .from("hostels")
  //     //     .getPublicUrl(data.path);
      
  //     //   if (urlError) {
  //     //     console.error("Error getting public URL:", urlError.message);
  //     //     throw new Error(urlError.message);
  //     //   }
      
  //     //   formattedHostel.imageUrl = publicURL;
  //     //   console.log("Public URL:", publicURL);
  //     // }
  //     if (imageFile) {
  //       const fileName = `im/${Date.now()}`; // Unique filename

  //       // Decode the base64 string to binary
  //       const decodedFile = decode(imageFile);

  //       // Upload to Supabase storage
  //       const { data, error: uploadError } = await supabase.storage
  //         .from("hostels_2")
  //         .upload(fileName, decodedFile, { contentType: "image/jpeg", upsert: true });

  //       if (uploadError) {
  //         console.error("Upload error:", uploadError.message);
  //         throw new Error(uploadError.message);
  //       }
  //     }

  //     await AddHostel(ownerid, formattedHostel); // Call the backend function
  //     alert("Hostel added successfully");
  //     // Reset the form after successful submission
  //     setHostel({
  //       hostelname: "",
  //       description: "",
  //       addressline1: "",
  //       addressline2: "",
  //       city: "",
  //       pincode: "",
  //       state: "",
  //       capacity: "",
  //       type: "",
  //       contactnumber: "",
  //       gender: "",
  //       imageUrl: "",
  //     });
  //     setImageFile(null); // Reset the image file
  //   } catch (error) {
  //     console.error("Error adding hostel:", error);
  //     setError("Failed to add hostel. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      // Upload image if a file was selected
      if (imageFile) {
        const fileName = `public/${Date.now()}`; // Unique filename

        // Decode the base64 string to binary
        const decodedFile = decode(imageFile);

        // Upload to Supabase storage
        const { data, error: uploadError } = await supabase.storage
          .from("hostels_2")
          .upload(fileName, decodedFile, { contentType: "image/jpeg", upsert: true });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          throw new Error(uploadError.message);
        }

        console.log("File uploaded successfully:", data);

        // Get the public URL of the uploaded file
        const { publicURL, error: urlError } = supabase.storage
          .from("hostels_2")
          .getPublicUrl(data.path);

        if (urlError) {
          console.error("Error getting public URL:", urlError.message);
          throw new Error(urlError.message);
        }

        formattedHostel.imageUrl = `https://seqmuvembwjhrrevewxr.supabase.co/storage/v1/object/public/hostels_2/${fileName}`; // Store the public URL in hostel data
        console.log("Public URL:", formattedHostel.imageUrl);
      }

      await AddHostel(ownerid, formattedHostel); // Call the backend function
      alert("Hostel added successfully");

      // Reset the form after successful submission
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
      });
      setImageFile(null); // Reset the image file
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Capture the selected file
    const fileReader = new FileReader();

    fileReader.onloadend = function () {
      const base64String = fileReader.result.split(",")[1]; // Extract base64 string
      setImageFile(base64String); // Store base64 string
    };

    fileReader.readAsDataURL(file); // Read the file as a data URL
  };


  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setHostel((prevHostel) => ({
      ...prevHostel,
      [name]: value,
    }));
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar /> {/* Add Navbar if necessary */}
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

          {/* File input for image upload */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Hostel Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Remaining form fields */}
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
              name="addressline2"
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
                    value="payingGuest"
                    checked={hostel.type === "payingGuest"}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Paying Guest</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <div className="flex items-center mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={hostel.gender === "male"}
                  onChange={handleRadioChange}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={hostel.gender === "female"}
                  onChange={handleRadioChange}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Female</span>
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

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className={`px-4 py-2 text-white font-bold rounded ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Hostel"}
            </button>
          </div>
        </form>
      </div>
      
    </div>
    <Footer />
    </>
  );
}

export default AddNewHostel;
