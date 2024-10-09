
import React,{useState} from "react";
import { AddOwner } from "../../backend/Owner/controller";

function OwnerRegisration() {
   

    const [owner, setOwner] = useState({
      ownerfname: "",
      ownerlname: "",
      address: "",
      dateofbirth: "",
      contactnumber: "",
     
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      const formattedOwner = {
        ...owner,
         
      };

      const validateInputs = () => {
        const requiredFields = [
          "ownerfname","ownerlname","address","dateofbirth","contactnumber"
        ];
  
        for (let field of requiredFields) {
          if (!formattedOwner[field]) {
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
      


        await AddOwner(formattedOwner); // Call the backend function
        alert("owner added successfully");
        // Optionally reset form fields here
      } catch (error) {
        console.error("Error adding owner:", error);
        setError("Failed to add owner. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setOwner((prevOwner) => ({
        ...prevOwner,
        [name]: value,
      }));
    };
  
   

  return (
    <div className="container relative">
    <h1 className="text-xl font-bold mt-4 ml-8">REGISTRATION</h1>
    <div className="flex flex-col md:flex-row gap-24 mt-6">
      <div className="flex-1">
        <form
          className="space-y-3 mt-0 ml-44 w-3/4 h-screen"
          onSubmit={handleSubmit}
        >
          <div className="">
            <label className="text-sm font-medium ">OWNER FNAME</label>
            <input
              type="text"
              name="ownerfname"
              value={owner.ownerfname}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="">
            <label className="text-sm font-medium ">OWNER LNAME</label>
            <input
              type="text"
              name="ownerlname"
              value={owner.ownerlname}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">ADDRESS</label>
            <input
              type="text"
              name="address"
              value={owner.address}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">DATE OF BIRTH</label>
            <input
              type="date"
              name="dateofbirth"
              value={owner.dateofbirth}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CONTACT NUMBER</label>
            <input
              type="text"
              name="contactnumber"
              value={owner.contactnumber}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
         
         
          
          <button
            type="submit"
            className="absolute bottom-24 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-60"
          >
            REGISTER
          </button>
        </form>
      </div>

      
      
    </div>
  </div>
    
  )
}

export default OwnerRegisration;

