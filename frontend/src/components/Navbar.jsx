import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const { getCartCount } = useContext(ShopContext);

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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
    setMobileMenu(false);

    window.location.reload();
  };

  return (
    <>
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

          {/* Desktop Menu */}
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
              className="w-5 cursor-pointer hidden md:block"
            />

            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                alt=""
                className="w-6"
              />

              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            <Link
              to="/orders"
              className="hidden md:block"
            >
              My Orders
            </Link>

            {user?.isAdmin && (
              <Link
                to="/admin"
                className="hidden md:block text-red-500 font-semibold"
              >
                Admin Panel
              </Link>
            )}

            {/* Desktop User */}
            <div className="hidden md:block">
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

                    <span>{user.name}</span>
                  </div>

                  {showMenu && (
                    <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg w-40">

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
                <div className="flex gap-3">

                  <Link
                    to="/login"
                    className="border px-4 py-2 rounded-lg"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                  >
                    Register
                  </Link>

                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden text-3xl"
            >
              ☰
            </button>

          </div>

        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-[100] transform transition-transform duration-300 ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="text-xl font-bold">
            Menu
          </h2>

          <button
            onClick={() => setMobileMenu(false)}
            className="text-3xl"
          >
            ✕
          </button>

        </div>

        <div className="flex flex-col">

          <Link
            to="/"
            onClick={() => setMobileMenu(false)}
            className="px-5 py-4 border-b"
          >
            Home
          </Link>

          <Link
            to="/collection"
            onClick={() => setMobileMenu(false)}
            className="px-5 py-4 border-b"
          >
            Collection
          </Link>

          <Link
            to="/about"
            onClick={() => setMobileMenu(false)}
            className="px-5 py-4 border-b"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileMenu(false)}
            className="px-5 py-4 border-b"
          >
            Contact
          </Link>

          <Link
            to="/orders"
            onClick={() => setMobileMenu(false)}
            className="px-5 py-4 border-b"
          >
            My Orders
          </Link>

          {user?.isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenu(false)}
              className="px-5 py-4 border-b text-red-500 font-semibold"
            >
              Admin Panel
            </Link>
          )}

          {user ? (
            <button
              onClick={logoutHandler}
              className="text-left px-5 py-4 text-red-500"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="px-5 py-4 border-b"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="px-5 py-4 border-b"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>

      {/* Background Overlay */}
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 bg-black/40 z-50"
        />
      )}
    </>
  );
}

export default Navbar;