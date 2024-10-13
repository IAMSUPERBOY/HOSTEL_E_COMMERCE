import React from "react";

const Invoice = ({totalP,products}) => {
  // Sample data for products
  /* const products = [
    { id: "P001", name: "Product A", price: 30 },
    { id: "P002", name: "Product B", price: 50 },
    { id: "P003", name: "Product C", price: 40 },
  ];
 */
  // Calculate total price

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Invoice</h2>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-5 text-left text-gray-700 uppercase tracking-wide border-b">
                Product ID
              </th>
              <th className="py-3 px-5 text-left text-gray-700 uppercase tracking-wide border-b">
                Product Name
              </th>
              <th className="py-3 px-5 text-right text-gray-700 uppercase tracking-wide border-b">
                Price ($)
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-white even:bg-gray-50">
                <td className="py-4 px-5 border-b">{product.productid}</td>
                <td className="py-4 px-5 border-b">{product.productname}</td>
                <td className="py-4 px-5 text-right border-b">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center py-5 mt-5 border-t">
        <span className="font-semibold text-lg">Total:</span>
        <span className="text-lg font-semibold">${totalP.toFixed(2)}</span>
      </div>

      {/* Thank You Message */}
      <div className="text-center mt-8">
        <p className="text-xl font-medium text-gray-600">Thank you for your purchase!</p>
      </div>
    </div>
  );
};

export default Invoice;
