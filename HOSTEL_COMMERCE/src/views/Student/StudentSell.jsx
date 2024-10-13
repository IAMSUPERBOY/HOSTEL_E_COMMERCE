import React, { useState } from "react";
import credentials from "../../credentials.json";

//import { useHistory } from "react-router-dom";
//import { SellUsedProduct } from "../../backend/Product/controller"; // Assuming you have a backend function
import { AddUsedProduct } from "../../backend/Student/controller";
export const SellUsedGoods = () => {
  const [product, setProduct] = useState({
    productname: "",
    category: "",
    price: "",
    condition: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formattedProduct = {
      ...product,
    };

    const validateInputs = () => {
      const requiredFields = [
        "productname",
        "category",
        "price",
        "condition",
        "description",
      ];

      for (let field of requiredFields) {
        if (!formattedProduct[field]) {
          setError(
            `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
          );
          return false;
        }
      }
      return true;
    };

    if (!validateInputs()) {
      setLoading(false);
      return;
    }
    try {
      await AddUsedProduct(formattedProduct); // Call the backend function
      alert("product added successfully");
      // Optionally reset form fields here
    } catch (error) {
      console.error("Error adding owner:", error);
      setError("Failed to add owner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevOwner) => ({
      ...prevOwner,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-5 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Sell Your Used Goods</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="productname"
            value={product.productname}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select a category</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Condition
          </label>
          <select
            name="condition"
            value={product.condition}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          ></textarea>
        </div>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          List Product
        </button>
      </form>
    </div>
  );
};

export default SellUsedGoods;