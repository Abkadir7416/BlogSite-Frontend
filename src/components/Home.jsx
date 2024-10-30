import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import edit from "../icons/edit.png";
import del from "../icons/del.png";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate("");

  const goToBlogForm = () => {
    navigate("/add-blog");
  };

  const deleteBlog = async (blogId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, 
        {
          headers: {
            Authorization: `${token}`, // Set the Authorization header with Bearer token
          },
        });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      navigate(`/home`);
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  const editBlog = (blogId) => {
    navigate(`/update-blog/${blogId}`);
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleReadMore = () => {
    navigate("/blogs");
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(e.target.value);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/blogs/search?query=${query}`,
        {
          headers: {
            Authorization: `${token}`, // Set the Authorization header with Bearer token
          },
        }
      );
      // "response: ", response;
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage or any secure storage
        const response = await axios.get(
          "http://localhost:5000/api/blogs/home?limit=3",
          {
            headers: {
              Authorization: `${token}`, // Set the Authorization header with Bearer token
            },
          }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);
  

  return (
    <div className="w-full container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          className="border-2 font-bold border-black text-black px-4 py-2 rounded-md text-lg"
          onClick={goToBlogForm}
        >
          Add New Blog
        </button>

        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-600 px-4 py-3 rounded-lg w-1/3 text-gray-800 placeholder:text-gray-700 placeholder:font-semibold placeholder:text-lg"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      <div className=" px-4 py-2 rounded-md mb-4 text-lg ">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="w-[70%] grid grid-cols-10 border rounded-lg p-4 shadow-md m-10"
          >
            <div
              style={{ cursor: "pointer" }}
              className="content col-span-9"
              onClick={() => handleBlogClick(blog._id)}
            >
              <p className="text-gray-600 underline">by {blog.writer}</p>
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-800 mt-4">
                {blog.description.slice(0, 100)}...
              </p>
            </div>
            <div className="media col-span-1">
              <span>
                <img
                  style={{
                    display: "inline",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteBlog(blog._id)}
                  src={del}
                  alt="Delete"
                />
                <img
                  style={{ display: "inline", cursor: "pointer" }}
                  onClick={() => editBlog(blog._id)}
                  src={edit}
                  alt="Edit"
                />
              </span>
              <img
                src={blog.imgSrc}
                alt=""
                className="mt-4 h-35 object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleReadMore} className="pl-12 underline font-bold">
        Read More Blogs...
      </button>
    </div>
  );
};

export default Home;
