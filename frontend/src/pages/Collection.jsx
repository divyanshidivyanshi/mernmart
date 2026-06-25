import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../assets/assets";

function Collection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-3xl font-bold mb-6">
        All Products
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded-lg mb-6"
      />

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-8">

        <button
          onClick={() => setCategory("All")}
          className={`px-4 py-2 rounded-lg border ${
            category === "All"
              ? "bg-orange-500 text-white"
              : "bg-white"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setCategory("Women")}
          className={`px-4 py-2 rounded-lg border ${
            category === "Women"
              ? "bg-orange-500 text-white"
              : "bg-white"
          }`}
        >
          Women
        </button>

        <button
          onClick={() => setCategory("Men")}
          className={`px-4 py-2 rounded-lg border ${
            category === "Men"
              ? "bg-orange-500 text-white"
              : "bg-white"
          }`}
        >
          Men
        </button>

        <button
          onClick={() => setCategory("Electronics")}
          className={`px-4 py-2 rounded-lg border ${
            category === "Electronics"
              ? "bg-orange-500 text-white"
              : "bg-white"
          }`}
        >
          Electronics
        </button>

        <button
          onClick={() => setCategory("Furniture")}
          className={`px-4 py-2 rounded-lg border ${
            category === "Furniture"
              ? "bg-orange-500 text-white"
              : "bg-white"
          }`}
        >
          Furniture
        </button>
          <button
          onClick={() => setCategory("Kids")}
          className={`px-4 py-2 rounded-lg border ${
            category === "Kids"
              ? "bg-orange-500 text-white"
              : "bg-white"
          }`}
        >
          Kids
        </button>

      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {product.category}
                </p>

                <p className="text-orange-500 font-bold mt-2">
                  ₹{product.price}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">
            No products found.
          </p>
        )}

      </div>

    </div>
  );
}

export default Collection;