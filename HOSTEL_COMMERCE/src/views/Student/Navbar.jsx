import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import logo1 from "../../assets/logofinal2.png";



function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo"> 
        <img src={logo1} alt="Logo" />
      </div>
      <ul className="nav-links">
      <li><Link to="/Student" className="nav-item">Home</Link></li>
      <li><Link to="/Student/FindHostel" className="nav-item">Find Hostel</Link></li>
      <li><Link to="/Student/Buy" className="nav-item">Buy Items</Link></li>
      <li><Link to="/Student/UsedSell" className="nav-item">Sell Items</Link></li>
      </ul>
      <Link to="/"><button className="login-btn">LogOut</button></Link>
    </nav>
  );
}

export default Navbar;