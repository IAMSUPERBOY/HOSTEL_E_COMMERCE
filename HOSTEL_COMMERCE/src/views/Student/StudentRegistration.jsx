import React, { useState } from "react";
import { AddStudent } from "../../backend/Owner/controller";

function StudentRegisration() {
    const [student, setStudent] = useState({
        studentfname: "",
        studentlname: "",
        institutionname: "",
        yearofstudy: "",
        age: "",
        gender: "",
        guardianname: "",
        phonenumber: "",
        addressline1: "",
        addressline2: "",
        city: "",
        pincode: "",
        state: "",
        currentresidence: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formattedStudent = { ...student };

        const validateInputs = () => {
            const requiredFields = [
                "studentfname",
                "studentlname",
                "institutionname",
                "yearofstudy",
                "age",
                "gender",
                "guardianname",
                "phonenumber",
                "addressline1",
                "addressline2",
                "city",
                "pincode",
                "state",
                "currentresidence",
            ];

            for (let field of requiredFields) {
                if (!formattedStudent[field]) {
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
            await AddStudent(formattedStudent); // Call the backend function
            alert("Student added successfully");
            // Optionally reset form fields here
        } catch (error) {
            console.error("Error adding student:", error);
            setError("Failed to add student. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    return (
        <div className="container relative">
            <h1 className="text-xl font-bold mt-4 ml-8">REGISTRATION</h1>
            <div className="flex flex-col md:flex-row gap-24 mt-6">
                <div className="flex-1">
                    <form
                        className="space-y-2 mt-0 ml-44 w-3/4 min-h-[150vh]"
                        onSubmit={handleSubmit}
                    >
                        {/* Student First Name */}
                        <div>
                            <label className="text-sm font-medium">STUDENT FNAME</label>
                            <input
                                type="text"
                                name="studentfname"
                                value={student.studentfname}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Student Last Name */}
                        <div>
                            <label className="text-sm font-medium">STUDENT LNAME</label>
                            <input
                                type="text"
                                name="studentlname"
                                value={student.studentlname}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Institution Name */}
                        <div>
                            <label className="block text-sm font-medium">INSTITUTION NAME</label>
                            <input
                                type="text"
                                name="institutionname"
                                value={student.institutionname}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Year of Study */}
                        <div>
                            <label className="block text-sm font-medium">YEAR OF STUDY</label>
                            <input
                                type="text"
                                name="yearofstudy"
                                value={student.yearofstudy}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium">AGE</label>
                            <input
                                type="text"
                                name="age"
                                value={student.age}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Gender */}
                        <p className="mt-8 block text-sm font-medium">GENDER</p>
                        <div className="flex items-center space-x-6 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={student.gender === "M"}
                                    onChange={handleRadioChange}
                                    className="h-4 w-4 text-black-500 focus:ring-blue-400"
                                />
                                <span className="ml-2 text-sm">M</span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={student.gender === "F"}
                                    onChange={handleRadioChange}
                                    className="h-4 w-4 focus:ring-black-800"
                                />
                                <span className="ml-2 text-sm">F</span>
                            </label>
                        </div>

                        {/* Guardian Name */}
                        <div>
                            <label className="block text-sm font-medium">GUARDIAN NAME</label>
                            <input
                                type="text"
                                name="guardianname"
                                value={student.guardianname}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium">PHONE NUMBER</label>
                            <input
                                type="text"
                                name="phonenumber"
                                value={student.phonenumber}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Address Line 1 */}
                        <div>
                            <label className="block text-sm font-medium">ADDRESS LINE 1</label>
                            <input
                                type="text"
                                name="addressline1"
                                value={student.addressline1}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Address Line 2 */}
                        <div>
                            <label className="block text-sm font-medium">ADDRESS LINE 2</label>
                            <input
                                type="text"
                                name="addressline2"
                                value={student.addressline2}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium">CITY</label>
                            <input
                                type="text"
                                name="city"
                                value={student.city}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Pincode */}
                        <div>
                            <label className="block text-sm font-medium">PINCODE</label>
                            <input
                                type="text"
                                name="pincode"
                                value={student.pincode}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* State */}
                        <div>
                            <label className="block text-sm font-medium">STATE</label>
                            <input
                                type="text"
                                name="state"
                                value={student.state}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Current Residence */}
                        <div>
                            <label className="block text-sm font-medium">CURRENT RESIDENCE</label>
                            <input
                                type="text"
                                name="currentresidence"
                                value={student.currentresidence}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 ">
                            <button
                                type="submit"
                                className="absolute w-40 bottom-6 right-8 bg-blue-600 font-bold text-white py-2 px-4 rounded-md hover:bg-blue-700"
                                disabled={loading}
                            >
                                SUBMIT
                            </button>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="mt-4 text-red-600 font-semibold">{error}</div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StudentRegisration;
