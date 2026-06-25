import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; 

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminSecretKey: "", 
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
      // Configured for combined Vercel layout via relative API routing
      await axios.post("/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        adminSecretKey: formData.adminSecretKey, 
      });

      toast.success("Registration Successful! Redirecting to Login...");
      setTimeout(() => {
        navigate("/login"); 
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black/50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Functional Close Cross Button */}
        <button 
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black cursor-pointer transition-colors"
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
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
            required
          />

          {/* Secure Admin Secret Passcode Input Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 px-1">
              Admin Secret Key (Leave empty for standard customer accounts)
            </label>
            <input
              type="password"
              name="adminSecretKey"
              placeholder="Enter Secret Code to become Admin"
              value={formData.adminSecretKey}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-red-500 bg-gray-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;