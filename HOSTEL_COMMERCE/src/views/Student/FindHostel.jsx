import React, { useState, useEffect } from 'react';
import "../../../src/App.css";
import HostelCard from "../../components/HostelCard";
import HostelDetails from "../../components/HostelDetails";

import supabase from "../../backend/util/supabaseclient";

function FindHostel() {
  const [hostels, setHostels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  // Fetch hostel data from Supabase
  useEffect(() => {
    const fetchHostels = async () => {
      const { data, error } = await supabase
        .from('hostel') // Corrected table name 'hotel'
        .select('*'); 

      if (error) {
        console.error('Error fetching hostels:', error);
      } else {
        setHostels(data); // Store the hostel data in the state
       
      }
    };

    fetchHostels();
  }, []);

  console.log(hostels)

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePriceChange = (event) => {
    const [min, max] = event.target.value.split("-").map(Number);
    setPriceRange([min, max]);
  };

  const handleRatingChange = (event) => {
    setRatingFilter(Number(event.target.value));
  };

  // Filter hostels based on search query, price range, and rating
  const filteredHostels = hostels.filter(
    (hostel) =>
      (hostel.hostelname.toLowerCase().includes(searchQuery.toLowerCase()) ) &&
      hostel.startingprice >= priceRange[0] &&
      hostel.startingprice <= priceRange[1] &&
      hostel.rating >= ratingFilter
  );

  return (
    <div className="find-container">
      <div className="hero-finder">
        <h1 className="finder-title">FIND NEW HOSTEL</h1>
      </div>
      <div className="filter-and-search-box">
        <div className="filter-section">
          <h3>Filter By:</h3>
          <div className="price-range-filter">
            <label>Price Range:</label>
            <select className="filterbox" onChange={handlePriceChange}>
              <option value="0-10000">All</option>
              <option value="0-5000">Below ₹5000</option>
              <option value="5000-7000">₹5000 - ₹7000</option>
              <option value="7000-10000">Above ₹7000</option>
            </select>
          </div>
          <div className="rating-filter">
            <label>Rating:</label>
            <select className="filterbox" onChange={handleRatingChange}>
              <option value="0">All</option>
              <option value="4">4 & Above</option>
              <option value="4.5">4.5 & Above</option>
            </select>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search Hostel"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="hostel-grid">
        {filteredHostels.length > 0 ? (
          filteredHostels.map((hostel) => (
            <HostelCard
              key={hostel.hostelid}
              hostel={hostel}
              onClick={() => handleHostelClick(hostel)}
            />
          ))
        ) : (
          <p>No hostels found</p>
        )}
      </div>

      
    </div>
  );
}

export default FindHostel;
