import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import edit from "../icons/edit.png";
import del from "../icons/del.png";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [writers, setWriters] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  // Navigate to Add Blog Form
  const goToBlogForm = useCallback(() => {
    navigate("/add-blog");
  }, [navigate]);

  // Delete Blog Handler
  const deleteBlog = useCallback(
    async (blogId) => {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, {
          headers: { Authorization: `${token}` },
        });
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      } catch (error) {
        console.error("Error deleting the blog:", error);
        alert("Failed to delete blog. Please try again.");
      }
    },
    []
  );

  // Edit Blog Handler
  const editBlog = useCallback(
    (blogId) => {
      navigate(`/update-blog/${blogId}`);
    },
    [navigate]
  );

  // Navigate to Blog Details
  const handleBlogClick = useCallback(
    (id) => {
      navigate(`/blog/${id}`);
    },
    [navigate]
  );
  // Navigate to Writer Details
  const handleWriterClick = useCallback(
    (id) => {
      navigate(`/writer/${id}`);
    },
    [navigate]
  );

  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/blogs/home?limit=3",
          { headers: { Authorization: `${token}` } }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        alert("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };


    fetchBlogs();
  }, []);

  const fetchWriters = async (limit) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/writer?limit=${limit}`);
      setWriters(response.data.data);
    } catch (error) {
      console.error("Error fetching writers:", error);
      alert("Failed to fetch writers.");
    }
  };

  useEffect(() => {
    const initialLimit = showAll ? 1000 : 4; // Show 4 initially, or all if 'showAll' is true
    fetchWriters(initialLimit);
  }, [showAll]); // Trigger when showAll changes


  const showMoreWriter = (()=> {
    setShowAll((prevShowAll) => !prevShowAll); // Toggle between true and false
  })

  // Handle Search
  const handleSearch = useCallback(
    async (e) => {
      const query = e.target.value;
      setSearchTerm(query);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/blogs/search?query=${query}`,
          { headers: { Authorization: `${token}` } }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    },
    []
  );

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToBlogForm}
          className="border-2 border-black text-black px-4 py-2 rounded-md font-bold"
        >
          Add New Blog
        </button>

        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-600 px-4 py-2 rounded-lg w-1/3 placeholder-gray-700"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      {/* Blogs Section */}
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
          <p className="ml-4 text-gray-500">Loading blogs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {/* Blog Posts */}

          <div className="col-span-9">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="w-full grid grid-cols-10 border rounded-lg p-4 shadow-md mb-6"
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
            <button
              onClick={() => navigate("/blogs")}
              className="underline font-bold"
            >
              Read More Blogs...
            </button>
          </div>

          {/* Writers Section */}
          <div className="col-span-3 bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">More Writers</h3>
            {writers.map((writer) => (
              <div
                key={writer.id}
                className="flex items-center mb-4 p-3 border rounded-lg bg-white cursor-pointer"
                onClick={() => handleWriterClick(writer._id)}
              >
                <img
                  src={writer.imgSrc || "https://via.placeholder.com/80"}
                  alt={writer.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">{writer.name}</h4>
                  <p className="text-sm text-gray-500">
                    {writer.degree.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {writer.postCount} Posts
                  </p>
                </div>
              </div>
            ))}
            <button className="flex items-center space-x-2 font-bold border-2 border-slate-800 py-1 px-2 rounded-full"
            onClick={() => showMoreWriter()}
            >
              <span>
              {showAll ? "Show less writers" : "Show all writers"}
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
