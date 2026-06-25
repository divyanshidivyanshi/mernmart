import Navbar from "../components/Navbar";
import { assets, products } from "../assets/assets";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid md:grid-cols-2 items-center gap-10 bg-orange-50 rounded-3xl p-10">

          <div>
            <p className="text-orange-500 font-semibold mb-3">
              OUR BESTSELLERS
            </p>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Latest Arrivals
            </h1>

            <p className="text-gray-600 mb-6">
              Discover fashion, electronics, furniture and much more at
              unbeatable prices.
            </p>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
              Shop Now
            </button>
          </div>

          <div>
            <img
              src={assets.hero_img}
              alt=""
              className="w-full"
            />
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-5 py-16">

        <h2 className="text-3xl font-bold text-center mb-3">
          Shop By Category
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Explore our top categories
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-orange-100 p-8 rounded-xl text-center font-semibold">
            Electronics
          </div>

          <div className="bg-blue-100 p-8 rounded-xl text-center font-semibold">
            Fashion
          </div>

          <div className="bg-green-100 p-8 rounded-xl text-center font-semibold">
            Furniture
          </div>

          <div className="bg-purple-100 p-8 rounded-xl text-center font-semibold">
            Accessories
          </div>

        </div>

      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-5 pb-20">

        <h2 className="text-3xl font-bold text-center mb-3">
          Featured Products
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Best products selected for you
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <Link
  to={`/product/${product._id}`}
  key={product._id}
  className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-xl transition block"
>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">

                <h3 className="font-semibold text-lg">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {product.category}
                </p>

                <p className="text-orange-500 font-bold text-xl mt-3">
                  ₹{product.price}
                </p>

                <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
                  Add To Cart
                </button>

              </div>

            </Link>
          ))}

        </div>

      </section>
    </>
  );
}

export default Home;