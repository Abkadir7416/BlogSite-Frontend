import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const blogId = useParams().id; // Get blog _id from URL
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState(""); // State for new comment
  const [comments, setComments] = useState([]); // State for comments
  const [loadingComments, setLoadingComments] = useState(false); // State for comment submission
  const [showAllComments, setShowAllComments] = useState(false); // State for toggling comments view

  useEffect(() => {
    // Fetch the blog data
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${blogId}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/blogs/comments/${blogId}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [blogId]);

  const handleLike = async () => {
    if (liked) {
      alert("You have already liked this blog!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/blogs/like/${blog._id}`,
        {},
        {
          headers: { Authorization: `${token}` },
        }
      );
      setBlog((prevBlog) => ({
        ...prevBlog,
        likes: response.data.likes,
      }));
      setLiked(true);
    } catch (error) {
      console.error("Error liking blog:", error);
      alert(error.response?.data?.msg || "An error occurred while liking.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    try {
      setLoadingComments(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/blogs/comments/${blogId}`,
        { commentText: newComment },
        {
          headers: { Authorization: `${token}` },
        }
      );
      setComments((prevComments) => [...prevComments, response.data]); // Update comments state directly
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-solid"></div>
        <p className="mt-4 text-xl text-gray-500">Loading blog details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">{blog.title}</h1>
      <div className="p-6 bg-white">
        <p className="text-lg font-bold mb-4">Written by: {blog.writer}</p>
        {blog.description && (
          <>
            {/* Split the description into paragraphs */}
            {blog.description.split("\n").map((paragraph, index, arr) => {
              if (index < 2) {
                // Render the first two paragraphs
                return (
                  <p key={index} className="mb-4 text-gray-800 text-lg">
                    {paragraph}
                  </p>
                );
              } else if (index === 2 && blog.imgSrc) {
                // Add the image after the second paragraph
                return (
                  <div key="image" className="flex justify-center mb-4">
                    <img
                      src={blog.imgSrc}
                      alt={blog.title}
                      // className="w-[90%] h-auto object-cover rounded-lg"
                      className="w-[60%] h-100 object-cover rounded-lg"
                    />
                  </div>
                );
              } else if (index >= 2) {
                // Render the remaining paragraphs after the image
                return (
                  <p key={index} className="mb-4 text-gray-800 text-lg">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </>
        )}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={handleLike}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Like 👍 {blog.likes}
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
            Comment 💬 {comments.length || 0}
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Share 🔗
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md">
            Subscribe 📩
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.length > 0 ? (
            <ul className="space-y-4">
              {showAllComments
                ? comments.map((comment, index) => (
                    <li
                      key={index}
                      className="p-4 border rounded-lg shadow-sm bg-gray-50"
                    >
                      <p className="text-gray-800">{comment.commentText}</p>
                    </li>
                  ))
                : comments.slice(0, 1).map((comment, index) => (
                    <li
                      key={index}
                      className="p-4 border rounded-lg shadow-sm bg-gray-50"
                    >
                      <p className="text-gray-800">{comment.commentText}</p>
                    </li>
                  ))}
            </ul>
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
          {!showAllComments && comments.length > 1 && (
            <button
              onClick={() => setShowAllComments(true)}
              className="mt-4 underline"
            >
              See more comments...
            </button>
          )}
          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border rounded-lg p-4 text-lg mb-4"
              rows={3}
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
              disabled={loadingComments}
            >
              {loadingComments ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
