import { useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>

          <img
            src={assets.contact_img}
            alt="Contact"
            className="rounded-xl shadow-lg mb-8"
          />

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

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white shadow-xl rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Send Us a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500"
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;