import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
  const { id: blogId } = useParams(); // Get blog _id from URL
  const [formData, setFormData] = useState({
    writer: '',
    title: '',
    description: '',
    imgSrc: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the blog data using the blogId
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${blogId}`
        );
        setFormData(response.data); // Set formData with fetched blog data
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const update_Blog = async (e) => {
    e.preventDefault();
    try {
      // Send the blog data to the backend API to store in MongoDB
      await axios.put(`http://localhost:5000/api/blogs/${blogId}`, formData);
      // Redirect to blog list page after submission
      navigate('/blogs');
    } catch (error) {
      console.error('Error in updating the blog:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Blog</h2>
      <form onSubmit={update_Blog}>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
