import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    // You can integrate your backend logic here
  };

  return (
    <section id="contact" className=" py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        
        {/* Info Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 text-lg mb-8">
            Have questions or feedback? We'd love to hear from you. Reach out using the form or through our contact details below.
          </p>

          <ul className="space-y-6 text-gray-700">
            <li>
              <h4 className="font-semibold text-gray-900">📍 Address</h4>
              <p>123 Book Street, Fiction City, ABC 456</p>
            </li>
            <li>
              <h4 className="font-semibold text-gray-900">📧 Email</h4>
              <p>contact@bookstore.com</p>
            </li>
            <li>
              <h4 className="font-semibold text-gray-900">📞 Phone</h4>
              <p>+123 456 7890</p>
            </li>
          </ul>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-amber-600 text-white py-3 rounded-md font-medium hover:bg-amber-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
