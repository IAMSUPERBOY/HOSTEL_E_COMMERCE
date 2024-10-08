import React,{useState} from "react";
import { EditHostel } from "../../backend/Owner/controller";

function EditHostelDetails() {
    const hostelid = 1;

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
      rating:"",
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
      };

      const validateInputs = () => {
        const requiredFields = [
          "hostelname", "addressline1", "city", "pincode", 
          "state", "capacity", "gender", "type", "description", 
          "contactnumber"
        ];
  
        for (let field of requiredFields) {
          if (!formattedHostel[field]) {
            setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
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
      


        await EditHostel(hostelid, formattedHostel); // Call the backend function
        alert("Hostel updated successfully");
        // Optionally reset form fields here
      } catch (error) {
        console.error("Error updating hostel:", error);
        setError("Failed to update hostel. Please try again.");
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
    <div className="container">
    <h1 className="text-xl font-medium mt-8 ml-8">EDIT HOSTEL</h1>
    <div className="flex flex-col md:flex-row gap-24 mt-8">
      <div className="flex-1">
        <form
          className="space-y-4 mt-0 ml-44 w-3/4 h-screen"
          onSubmit={handleSubmit}
        >
          <div className="">
            <label className="text-sm font-medium ">NAME</label>
            <input
              type="text"
              name="hostelname"
              value={hostel.hostelname}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">DESCRIPTION</label>
            <textarea
              name="description"
              value={hostel.description}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CONTACT NUMBER</label>
            <input
              type="text"
              name="contactnumber"
              value={hostel.contactnumber}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">ADDRESS LINE 1</label>
            <input
              type="text"
              name="addressline1"
              value={hostel.addressline1}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">ADDRESS LINE 2</label>
            <input
              type="text"
              name="addressline2"
              value={hostel.addressline2}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CITY</label>
            <input
              type="text"
              name="city"
              value={hostel.city}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">PINCODE</label>
            <input
              type="text"
              name="pincode"
              value={hostel.pincode}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">STATE</label>
            <input
              type="text"
              name="state"
              value={hostel.state}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CAPACITY</label>
            <input
              type="text"
              name="capacity"
              value={hostel.capacity}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="absolute bottom-5 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-60"
          >
            EDIT HOSTEL
          </button>
        </form>
      </div>

      <div className="mt-1 h-screen flex-1 space-y-6 relative">
        <div className="mb-4">
          <div>
            <label className="text-sm font-medium">HOSTEL PICS</label>
            <div className="mt-2 w-96 h-48 bg-gray-200 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <p>Upload Image</p>
            </div>
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            {/* <input
              className="block w-96 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            /> */}
          </div>
          <p className="mt-8 block text-sm font-medium">TYPE</p>
          <div className="flex items-center space-x-6 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="hostel"
                checked={hostel.type === "hostel"}
                onChange={handleRadioChange}
                className="h-4 w-4 text-black-500 focus:ring-blue-400"
              />
              <span className="ml-2 text-sm">HOSTEL</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="PG"
                checked={hostel.type === "PG"}
                onChange={handleRadioChange}
                className="h-4 w-4 focus:ring-black-800"
              />
              <span className="ml-2 text-sm">PG</span>
            </label>
          </div>
        </div>
        <div>
          <p className="block text-sm font-medium">GENDER</p>
          <div className="flex items-center space-x-6 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="boys"
                checked={hostel.gender === "boys"}
                onChange={handleRadioChange}
                className="h-4 w-4  focus:ring-blue-400"
              />
              <span className="ml-2 text-sm">BOYS</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="girls"
                checked={hostel.gender === "girls"}
                onChange={handleRadioChange}
                className="h-4 w-4 text-black-500 focus:ring-blue-400"
              />
              <span className="ml-2 text-sm">GIRLS</span>
            </label>
            <label className="flex items-center">
          <input
              type="radio"
               name="gender"
              value="mixed"
               checked={hostel.gender === "mixed"}
              onChange={handleRadioChange}
              className="h-4 w-4 focus:ring-blue-400"
          />
          <span className="ml-2 text-sm">MIXED</span>
          </label>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default EditHostelDetails;

