import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    writer: '',
    title: '',
    description: '',
    imgSrc: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the blog data to the backend API to store in MongoDB
      const token = localStorage.getItem("token");
      await axios.post('http://localhost:5000/api/blogs', formData,
        {
          headers: {
            Authorization: `${token}`, // Set the Authorization header with Bearer token
          },
        });
      // Redirect to blog list page after submission
      navigate('/blogs');
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Writer</label>
          <input
            type="text"
            name="writer"
            value={formData.writer}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="imgSrc"
            value={formData.imgSrc}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
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

export default BlogForm;
