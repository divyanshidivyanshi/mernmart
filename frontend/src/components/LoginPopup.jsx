import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPopup({ setShowLogin }) {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const url =
        currentState === "Sign Up"
          ? `${BACKEND_URL}/api/auth/register`
          : `${BACKEND_URL}/api/auth/login`;

      const payload =
        currentState === "Sign Up"
          ? {
              name,
              email,
              password,
            }
          : {
              email,
              password,
            };

      const { data } = await axios.post(url, payload);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      toast.success(
        currentState === "Sign Up"
          ? "Registered Successfully"
          : "Login Successful"
      );

      setShowLogin(false);

      window.location.reload();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-xl relative shadow-xl">
        <button
          onClick={() => setShowLogin(false)}
          className="absolute right-4 top-4 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">
          {currentState}
        </h2>

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4"
        >
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-lg"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            className="bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {currentState}
          </button>
        </form>

        {currentState === "Login" ? (
          <p className="text-center mt-5">
            Create a new account?
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-orange-500 cursor-pointer ml-1 font-semibold"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center mt-5">
            Already have an account?
            <span
              onClick={() => setCurrentState("Login")}
              className="text-orange-500 cursor-pointer ml-1 font-semibold"
            >
              Login here
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginPopup;