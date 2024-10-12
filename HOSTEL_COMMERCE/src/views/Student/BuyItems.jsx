import React, { useState, useEffect } from 'react';
import "../../../src/App.css";
import ItemCard from "../../components/ItemCard";
import supabase from "../../backend/util/supabaseclient"; // Modify this path as per your setup

function BuyItems() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [conditionFilter, setConditionFilter] = useState("all");

  // Fetch product data from both tables
  useEffect(() => {
    const fetchItems = async () => {
        const { data: newProducts, error: newError } = await supabase
          .from('new_products')
          .select('*');
      
        const { data: usedProducts, error: usedError } = await supabase
          .from('used_products')
          .select('*');
      
        if (newError || usedError) {
          console.error('Error fetching products:', newError || usedError);
        } else {
          console.log('New Products:', newProducts); // Log new products
          console.log('Used Products:', usedProducts); // Log used products
          const combinedItems = [
            ...newProducts.map(item => ({ ...item, condition: 'New' })),
            ...usedProducts.map(item => ({ ...item, condition: 'Used' }))
          ];
          setItems(combinedItems);
        }
      };
      

    fetchItems();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePriceChange = (event) => {
    const [min, max] = event.target.value.split("-").map(Number);
    setPriceRange([min, max]);
  };

  const handleConditionChange = (event) => {
    setConditionFilter(event.target.value);
  };

  // Filter items based on search query, price range, and condition (used/new)
  const filteredItems = items.filter((item) => {
    const isInPriceRange = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesSearchQuery = item.productname.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Condition filter
    const isConditionMatched =
      conditionFilter === "all" ||
      (conditionFilter === "used" && item.condition === "Used") ||
      (conditionFilter === "new" && item.condition === "New");

    return matchesSearchQuery && isInPriceRange && isConditionMatched;
  });

  return (
    <div className="find-container">
      <div className="hero-finder">
        <h1 className="finder-title">BUY ITEMS</h1>
      </div>

      <div className="filter-and-search-box">
        <div className="filter-section">
          <h3>Filter By:</h3>
          <div className="price-range-filter">
            <label>Price Range:</label>
            <select className="filterbox" onChange={handlePriceChange}>
              <option value="0-10000">All</option>
              <option value="0-500">Below ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="1000-10000">Above ₹1000</option>
            </select>
          </div>
          <div className="condition-filter">
            <label>Condition:</label>
            <select className="filterbox" onChange={handleConditionChange}>
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search Items"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="item-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item.id} // Replace with your unique identifier
              item={item}
              // Handle what happens when an item is clicked
              onClick={() => console.log(`Selected item: ${item.productname}`)}
            />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}

export default BuyItems;
