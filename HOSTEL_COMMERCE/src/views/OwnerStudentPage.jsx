import React from 'react';
import { Link } from "react-router-dom";

function OwnerStudentPage({ setUserType }) {
  // Function to handle button clicks
 
  const onClick = (userType) => {
    if (typeof setUserType === 'function') {
      setUserType(userType); // Make sure this is called properly
    } else {
      console.error("setUserType is not a function");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Select User Type</h1>
        
        {/* Buttons */}
        <div className="flex space-x-4">
        <Link to="/ownerhome" ><button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={() => onClick('owner')}
          >
            Owner
          </button></Link>

          <Link to="/studenthome" ><button 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
            onClick={() => onClick('student')}
          >
            Student
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default OwnerStudentPage;
