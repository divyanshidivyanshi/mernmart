import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const { getCartCount } = useContext(ShopContext);

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowMenu(false);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="MernMart"
            className="h-20"
          />
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/collection">Collection</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <img
            src={assets.search_icon}
            alt=""
            className="w-5 cursor-pointer"
          />

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt=""
              className="w-6 cursor-pointer"
            />

            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>
          <Link to="/orders">My Orders</Link>

          {/* User Section */}
          {user?.isAdmin && (
            <Link to="/admin" className="text-red-500 font-semibold px-1">
              Admin Panel
            </Link>
          )}
          
          {user ? (
            <div className="relative">

              <div
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={assets.profile_icon}
                  alt=""
                  className="w-6"
                />

                <span className="font-medium">
                  {user.name}
                </span>
              </div>

              {showMenu && (
                <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg min-w-[140px] z-50">

                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <>
              {/* --- CORRECTED: Links to routing paths instead of modal toggles --- */}
              <Link
                to="/login"
                className="border border-gray-300 px-4 py-2 rounded-lg text-center font-medium hover:bg-gray-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-orange-600 transition"
              >
                Register
              </Link>
              {/* ------------------------------------------------------------------ */}
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;