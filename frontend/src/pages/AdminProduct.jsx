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

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/product/all`
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/product/add`,
        form
      );

      toast.success("Product Added");
      setForm({
        name: "",
        price: "",
        image: "",
        description: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${BACKEND_URL}/api/product/${id}`
      );

      toast.success("Product Deleted");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        Admin Products
      </h1>

      <div className="grid gap-3 mb-6">
        <input
          value={form.name}
          placeholder="Name"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          value={form.price}
          placeholder="Price"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          value={form.image}
          placeholder="Image URL"
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <button
          onClick={addProduct}
          className="bg-orange-500 text-white p-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="grid gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="border p-3 flex justify-between items-center rounded"
          >
            <div>
              <h2 className="font-semibold">{p.name}</h2>
              <p>₹{p.price}</p>
            </div>

            <button
              onClick={() => deleteProduct(p._id)}
              className="bg-red-500 text-white px-3 py-2 rounded"
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