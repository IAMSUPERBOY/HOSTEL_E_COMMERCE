import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import logo1 from "../../assets/logo1.png"

import AddNewHostel from "./AddNewHostel";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo"> 
        <img src={logo1} alt="Logo" />
      </div>
      <ul className="nav-links">

      <li><Link to="/Owner" className="nav-item">Home</Link></li>
      <li><Link to="/Owner/add" className="nav-item">Add Hostel</Link></li>
        <li><a href="/Owner/" className="nav-item">Manage Hostels</a></li>

        <li><a href="#" className="nav-item">View Requests</a></li>
        <li><a href="#" className="nav-item">About Us</a></li>
      </ul>
      <button className="login-btn">Login/Sign Up</button>
    </nav>
  );
}

export default Navbar;
