import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">

      <h1 className="text-5xl font-bold text-green-600 mb-4">
        Order Placed Successfully
      </h1>

      <p className="text-gray-600 mb-8">
        Thank you for shopping with MernMart.
      </p>

      <Link
        to="/collection"
        className="bg-orange-500 text-white px-6 py-3 rounded-lg"
      >
        Continue Shopping
      </Link>

    </div>
  );
}

export default OrderSuccess;