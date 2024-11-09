import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    message: ''
  });
  // const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/blogs/send-email', formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('failed to send email');
    }
    setFormData({ subject: '', email: '', message: '' }); // Reset form after submission
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      {/* {responseMessage && <p>{responseMessage}</p>} */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-lg font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
            rows="5"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-slate-900 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
