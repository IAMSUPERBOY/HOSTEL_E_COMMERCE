import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import logo1 from "../../assets/logo1.png";



function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo"> 
        <img src={logo1} alt="Logo" />
      </div>
      <ul className="nav-links">
      <li><Link to="/studenthome" className="nav-item">Home</Link></li>
      <li><Link to="/findhostel" className="nav-item">Find Hostel</Link></li>
      <li><Link to="/buyitems" className="nav-item">Buy Items</Link></li>
        <li><a href="#" className="nav-item">Sell Items</a></li>
        <li><a href="#" className="nav-item">About Us</a></li>
      </ul>
      <button className="login-btn">Login/Sign Up</button>
    </nav>
  );
}

export default Navbar;