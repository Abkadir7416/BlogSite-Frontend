import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  let blogId  = useParams(); // Get blog _id from URL
  blogId = blogId.id
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    // Fetch the blog data using the blogId
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${blogId}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);


  if (!blog) return <p>Loading blog details...</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Blog Heading (outside the box) */}
      <h1 className="text-4xl font-bold text-center mb-6">{blog.title}</h1>

      {/* Blog Content Box */}
      <div className="border rounded-lg shadow-lg p-6 bg-white">
        {/* Writer's Name */}
        <p className="text-lg font-semibold text-gray-600 mb-4">
          Written by: {blog.writer}
        </p>

        {/* Blog Image */}
        <img
          src={blog.imgSrc}
          alt={blog.title}
          className="w-[80%]  h-80 object-cover mb-4 rounded-lg"
        />

        {/* Blog Content */}
        <div className="text-lg text-gray-800 leading-relaxed mb-6">
          {blog.description}
        </div>

        {/* Blog Actions: Like, Dislike, Comment, Share, Subscribe */}
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Like 👍
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            Dislike 👎
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
            Comment 💬
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Share 🔗
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md">
            Subscribe 📩
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
