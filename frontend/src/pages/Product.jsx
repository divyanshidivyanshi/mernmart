import { useParams } from "react-router-dom";
import { products } from "../assets/assets";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function Product() {
  const { id } = useParams();
  const { addToCart } = useContext(ShopContext);

  const product = products.find(
    (item) => item._id === id
  );

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl">
        Product Not Found
      </div>
    );
  }

  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category &&
      item._id !== product._id
  );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl border"
          />
        </div>

        <div>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-4">
            Category: {product.category}
          </p>

          <p className="text-3xl font-bold text-orange-500 mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mb-8">
            Premium quality product with modern design and
            excellent durability. Perfect choice for daily use.
          </p>

          <button
            onClick={() => addToCart(product._id)}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
          >
            Add To Cart
          </button>

        </div>

      </div>

      {/* Related Products */}
      <div className="mt-20">

        <h2 className="text-3xl font-bold mb-8">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {relatedProducts.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-orange-500 font-bold mt-2">
                  ₹{item.price}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Product;