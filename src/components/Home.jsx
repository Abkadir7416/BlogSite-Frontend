import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import edit from "../icons/edit.png"
import edit from "../icons/edit.png"
import del from "../icons/del.png"
// import UpdateBlog from "./updateBlog";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate('');

  const goToBlogForm = () => {
    navigate("/add-blog"); // Redirect to /add-blog route
  };

  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId)); // Update state to remove deleted blog
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };
  

  const editBlog = (blogId) => {
    // <Route path="/update-blog" element={<UpdateBlog />} />
    console.log('update blog is called with id: ', blogId)
    // navigate(`/update-blog/${blogId}`)
    navigate(`/update-blog/${blogId}`)
  }

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  // Fetch limited blogs (3-4)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Assuming your backend has an endpoint to return limited blogs
        const response = await axios.get(
          "http://localhost:5000/api/blogs/home?limit=3"
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = () => {
    navigate("/blogs"); // Redirect to the main blog page
  };

  return (
    <div className="w-full container mx-auto p-4">
      <button
        className="border-2 font-bold border-black text-black px-4 py-2 rounded-md mb-4 text-lg "
        onClick={goToBlogForm}
      >
        Add New Blog
      </button>
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      <div className="  ">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="w-[70%] grid grid-cols-10 border rounded-lg p-4 shadow-md m-10"
            
          >
            <div style={{cursor:"pointer"}} className="content col-span-9" onClick={() => handleBlogClick(blog._id)}>
              <p className="text-gray-600 underline">by {blog.writer}</p>
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-800 mt-4">
                {blog.description.slice(0, 100)}...
              </p>
            </div>
            <div className="media col-span-1">
              
              <span>
              <img style={{display:"inline", marginRight: "10px", cursor: "pointer"}} onClick={() => deleteBlog(blog._id)} src={del}  alt="" />
              <img style={{display:"inline", cursor: "pointer"}} onClick={() => editBlog(blog._id)} src={edit} alt="" />
              </span>
              <img
                src={blog.imgSrc}
                alt=""
                className="mt-4  h-35 object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Button to navigate to the full blog list page */}
      <button onClick={handleReadMore} className="pl-12 underline font-bold">
        Read More Blogs...
      </button>
    </div>
  );
};

export default Home;
