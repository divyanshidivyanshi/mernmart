import { assets } from "../assets/assets";

function About() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        About MernMart
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <img
          src={assets.about_img}
          alt=""
          className="rounded-xl"
        />

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Your Trusted Online Store
          </h2>

          <p className="text-gray-600 mb-4">
            MernMart is a modern e-commerce platform built using
            MongoDB, Express, React and Node.js.
          </p>

          <p className="text-gray-600 mb-4">
            We provide quality fashion, electronics and furniture
            products at affordable prices.
          </p>

          <p className="text-gray-600">
            Our goal is to deliver the best shopping experience
            with secure payments and fast delivery.
          </p>
        </div>

      </div>

    </div>
  );
}

export default About;