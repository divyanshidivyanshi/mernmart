import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      toast.success("Registration Successful");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black/50 flex items-center justify-center p-4">

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Join MernMart and start shopping
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;