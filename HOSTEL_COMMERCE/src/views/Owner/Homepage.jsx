import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

function Homepage() {
  return (
    <div className="app">
      
      <div className="hero-section">
        <div className="overlay">
          <h1>Easily Manage Your Hostel Listings and Bookings</h1>
          <p>Connect with students, track your bookings, and manage your hostel efficiently</p>
          <div className="button-group">
          <Link to="/add" ><button className="btn">ADD HOSTEL</button></Link>
            <button className="btn">MANAGE HOSTEL</button>
            <button className="btn">VIEW REQUEST</button>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default Homepage;