import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import editImage from "../icons/edits.png";
import deleteImage from "../icons/deletes.png";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const goToBlogForm = () => {
    navigate("/add-blog"); // Redirect to /add-blog route
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  
  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId)); // Update state to remove deleted blog
      navigate(`/blogs`);
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };
  

  const editBlog = (blogId) => {
    navigate(`/update-blog/${blogId}`)
  }

  // Fetch the blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/blogs", 
          {
            headers: {
              Authorization: `${token}`, // Set the Authorization header with Bearer token
            },
          }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching the blog data:", error);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-slate-900 text-white px-4 py-2 rounded-md mb-4"
        onClick={goToBlogForm}
      >
        Add New Blog
      </button>
      {/* <h1 className="text-3xl font-bold mb-4">Blog List</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="p-4 border rounded-lg mb-10 shadow shadow-black"
          >
            {/* <span className="">
              <img
                style={{
                  display: "inline",
                  marginRight: "15px",
                  cursor: "pointer",
                }}
                src={deleteImage}
                alt=""
              />
              <img
                style={{ display: "inline", cursor: "pointer", width: "22px" }}
                src={editImage}
                alt=""
              />
            </span> */}
            
            <div className="flex justify-end mb-2">
        <img
          style={{
            display: "inline",
            marginRight: "10px",
            cursor: "pointer",
            width: "22px"
          }}
          src={deleteImage}
          alt="Delete"
          onClick={() => deleteBlog(blog._id)} 
        />
        <img
          style={{
            display: "inline",
            cursor: "pointer",
            width: "22px"
          }}
          src={editImage}
          alt="Edit"
          onClick={() => editBlog(blog._id)} 
        />
      </div>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleBlogClick(blog._id)}
            >
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-2 underline">
                By {blog.writer}
              </p>
              <p className="text-gray-700 mb-4">
                {blog.description.slice(0, 200)}...
              </p>
              {/* <div className=" items-center justify-between"> */}
              <img
                src={blog.imgSrc}
                alt=""
                className="w-full h-60 object-cover rounded-md"
              />
            </div>
            <div className="flex space-x-4">
              {/* <span className="space-x-4"> */}
              <span>👍 {blog.likes}</span>
              <span>💬 {blog.comments}</span>
              <span>📥 {blog.saved ? "Saved" : "Save"}</span>
              {/* </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
