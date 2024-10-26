import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

function Homepage() {
  return (
    <div className="app">
      <Navbar />
      <div className="hero-section">
        <div className="overlay">
          <h1>Find Your Perfect Hostel & Shop Second-hand Essentials</h1>
          <p>Explore hostels and buy/sell essential items with ease</p>
          <div className="button-group">
          <Link to="/Student/FindHostel" ><button className="btn">FIND HOSTEL</button></Link>
          <Link to="/Student/Buy" ><button className="btn">BUY ITEMS</button></Link>
          <Link to="/Student/UsedSell" ><button className="btn">SELL ITEMS</button></Link>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default Homepage;
