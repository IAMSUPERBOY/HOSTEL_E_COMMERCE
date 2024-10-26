import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import logo1 from "../../assets/logofinal2.png"

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
      <li><Link to="/Owner/viewHostels" className="nav-item">Manage Hostel</Link></li>

      <li><Link to="/Owner/Applications" className="nav-item">View Request</Link></li>
      </ul>
      <Link to="/"><button className="login-btn">LogOut</button></Link>
    </nav>
  );
}

export default Navbar;
