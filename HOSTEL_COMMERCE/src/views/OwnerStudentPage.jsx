import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logofinal2.png";

function OwnerStudentPage({ setUserType }) {
  // Function to handle button clicks

  const onClick = (userType) => {
    if (typeof setUserType === "function") {
      setUserType(userType); // Make sure this is called properly
    } else {
      console.error("setUserType is not a function");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-600">
      <div className="flex flex-col items-center justify-center ">
        <img className="w-48 h-auto" src={logo} alt="Logo" />
        <h1 className="text-6xl font-extrabold font-serif text-center mt-8 text-yellow-950 ">
          Welcome to HOSTELOHUB
        </h1>

        <h1 className="text-4xl font-serif font-bold mb-8 text-yellow-950">Select User Type</h1>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link to="/LoginOwner">
            <button
              className="bg-orange-950 hover:bg-yellow-50 hover:text-amber-800 text-yellow-300 font-bold py-2 px-4 rounded"
              onClick={() => onClick("owner")}
            >
              Owner
            </button>
          </Link>

          <Link to="/LoginStudent">
            <button
              className="bg-orange-950 hover:bg-yellow-50 hover:text-amber-800 text-yellow-300 font-bold py-2 px-4 rounded"
              onClick={() => onClick("student")}
            >
              Student
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OwnerStudentPage;
