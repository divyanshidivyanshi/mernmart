import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const fetchProducts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/product/all"
    );
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    await axios.post(
      "http://localhost:5000/api/product/add",
      form
    );

    toast.success("Product Added");
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/product/${id}`
    );

    toast.success("Deleted");
    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        Admin Products
      </h1>

      {/* ADD PRODUCT */}
      <div className="grid gap-3 mb-6">
        <input
          placeholder="Name"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Price"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />
        <input
          placeholder="Image URL"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />
        <button
          onClick={addProduct}
          className="bg-orange-500 text-white p-2"
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="grid gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="border p-3 flex justify-between"
          >
            <div>
              <h2>{p.name}</h2>
              <p>₹{p.price}</p>
            </div>

            <button
              onClick={() => deleteProduct(p._id)}
              className="bg-red-500 text-white px-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;