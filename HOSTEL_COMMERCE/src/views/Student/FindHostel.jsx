import React, { useState } from "react";
import "../../../src/App.css";
import HostelCard from "../../components/HostelCard";
import HostelDetails from "../../components/HostelDetails";

// Example hostel data
const hostels = [
  {
    id: 1,
    name: "Green Valley Hostel",
    location: "Near CET, Trivandrum",
    price: 5000,
    rating: 4.5,
    details: "A cozy and affordable hostel near CET with great amenities.",
  },
  {
    id: 2,
    name: "Sunrise Hostel",
    location: "Kowdiar, Trivandrum",
    price: 6000,
    rating: 4.8,
    details: "Premium hostel with AC rooms and all basic facilities.",
  },
  {
    id: 3,
    name: "Blue Sky Hostel",
    location: "Sreekariyam, Trivandrum",
    price: 4500,
    rating: 4.2,
    details: "Economical hostel with clean rooms and a friendly atmosphere.",
  },
  {
    id: 4,
    name: "Green Valley Hostel",
    location: "Near CET, Trivandrum",
    price: 5000,
    rating: 4.5,
    details: "A cozy and affordable hostel near CET with great amenities.",
  },
  {
    id: 5,
    name: "Sunrise Hostel",
    location: "Kowdiar, Trivandrum",
    price: 6000,
    rating: 4.8,
    details: "Premium hostel with AC rooms and all basic facilities.",
  },
  {
    id: 6,
    name: "Blue Sky Hostel",
    location: "Sreekariyam, Trivandrum",
    price: 4500,
    rating: 4.2,
    details: "Economical hostel with clean rooms and a friendly atmosphere.",
  },
];

function FindHostel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const handleHostelClick = (hostel) => {
    setSelectedHostel(hostel);
  };

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
      (hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hostel.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      hostel.price >= priceRange[0] &&
      hostel.price <= priceRange[1] &&
      hostel.rating >= ratingFilter
  );

  return (
    <div className="app">
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
              <option value="4">4 Stars & Above</option>
              <option value="4.5">4.5 Stars & Above</option>
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
              key={hostel.id}
              hostel={hostel}
              onClick={() => handleHostelClick(hostel)}
            />
          ))
        ) : (
          <p>No hostels found</p>
        )}
      </div>

      {selectedHostel && (
        <HostelDetails
          hostel={selectedHostel}
          onClose={() => setSelectedHostel(null)}
        />
      )}
    </div>
  );
}

export default FindHostel;
