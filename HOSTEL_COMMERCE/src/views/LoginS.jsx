//Login flow for student

import React, { useState } from 'react';
import supabase from '../backend/util/supabaseclient';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve studentID based on email
    
    try {
      const studentID = await getStudentID(email,password);
  
      const credentials = {
        studentid: studentID,
        ownerid:undefined,
      };
      const response = await fetch('http://localhost:5000/saveCredentialsStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (data.success==true) {
       navigate("/Student");
      } else {
        alert('Error saving credentials | Incorrect password or username');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getStudentID = async (email,password) => {
    try {
      const { data, error } = await supabase
        .from('student')
        .select('studentid')
        .eq('email', email)
        .eq('password',password)
        .single();
        
      if (error || data.studentid===null) {
        console.error("Error fetching student ID:", error.message);
        return null;
      }
      console.log(data.studentid)
      return data.studentid;
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute w-72 h-72 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl opacity-40 animate-pulse top-32 left-20"></div>
      <div className="absolute w-96 h-96 bg-gradient-to-tl from-purple-300 to-blue-300 rounded-full blur-2xl opacity-40 animate-pulse bottom-32 right-20"></div>

      <div className="relative z-10 max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back Student</h2>
        <p className="text-gray-500 text-center mb-6">Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
