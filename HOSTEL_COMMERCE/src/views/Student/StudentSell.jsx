import React, { useState } from "react";
import credentials from "../../credentials.json";
import { decode } from "base64-arraybuffer";
import { createClient } from "@supabase/supabase-js";
import { AddUsedProduct } from "../../backend/Student/controller";

import supabase from "../../backend/util/supabaseclient";
export const SellUsedGoods = () => {
  const [product, setProduct] = useState({
    productname: "",
    category: "",
    price: "",
    condition: "",
    description: "",
    imageUrl: "",
    studentid: credentials.studentid,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formattedProduct = { ...product };

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
          setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
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
      if (imageFile) {
        const fileName = `public/${Date.now()}`; // Unique filename
        const decodedFile = decode(imageFile);

        // Upload to Supabase storage
        const { data, error: uploadError } = await supabase.storage
          .from("used_products") // Ensure this bucket name matches in both upload and getPublicUrl
          .upload(fileName, decodedFile, { contentType: "image/jpeg", upsert: true });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          throw new Error(uploadError.message);
        }

        // Get the public URL of the uploaded file
        const { publicURL, error: urlError } = supabase.storage
          .from("used_products")
          .getPublicUrl(data.path);

        if (urlError) {
          console.error("Error getting public URL:", urlError.message);
          throw new Error(urlError.message);
        }

        formattedProduct.imageUrl = `https://sdspzxoxvksccuaglgjs.supabase.co/storage/v1/object/public/used_products/${fileName}`;
        console.log("Public URL:", formattedProduct.imageUrl);
      }

      await AddUsedProduct(formattedProduct); // Call the backend function
      alert("Product added successfully");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Capture the selected file
    const fileReader = new FileReader();

    fileReader.onloadend = function () {
      const base64String = fileReader.result.split(",")[1]; // Extract base64 string
      setImageFile(base64String); // Store base64 string
    };

    fileReader.readAsDataURL(file); // Read the file as a data URL
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-5 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Sell Your Used Goods</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
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
          <label className="block text-sm font-medium text-gray-700">Category</label>
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
          <label className="block text-sm font-medium text-gray-700">Price</label>
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
          <label className="block text-sm font-medium text-gray-700">Condition</label>
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
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Upload Product Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Listing Product..." : "List Product"}
        </button>
      </form>
    </div>
  );
};

export default SellUsedGoods;
