import { assets } from "../assets/assets";

function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <img
          src={assets.contact_img}
          alt=""
          className="rounded-xl"
        />

        <div>

          <h2 className="text-2xl font-semibold mb-4">
            Get In Touch
          </h2>

          <p className="text-gray-600 mb-3">
            📍 MernMart Headquarters
          </p>

          <p className="text-gray-600 mb-3">
            Lucknow, Uttar Pradesh, India
          </p>

          <p className="text-gray-600 mb-3">
            📞 +91 9876543210
          </p>

          <p className="text-gray-600 mb-3">
            ✉ support@mernmart.com
          </p>

          <button className="mt-5 bg-orange-500 text-white px-6 py-3 rounded-lg">
            Contact Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default Contact;