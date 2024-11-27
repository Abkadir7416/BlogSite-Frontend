import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const WriterDetailPage = () => {
  const { id: writerId } = useParams(); // Extract writer ID directly
  const [writer, setWriter] = useState(null);
  const [articles, setArticles] = useState([]);
  const [moreWriters, setMoreWriters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for writer details
  const navigate = useNavigate();
  const articlesPerPage = 4;

  // Fetch writer details
  useEffect(() => {
    const fetchWriter = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/writer/${writerId}`
        );
        setWriter(data.data);
      } catch (error) {
        console.error("Error fetching writer details:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };
    fetchWriter();
  }, [writerId]);

  // Fetch more writers
  const fetchWriters = async () => {
    try {
      const limit = showAll ? 1000 : 5; // Default limit is 5
      const { data } = await axios.get(
        `http://localhost:5000/api/writer?excludeId=${writerId}&limit=${limit}`
      );
      setMoreWriters(data.data);
    } catch (error) {
      console.error("Error fetching writers:", error);
    }
  };

  useEffect(() => {
    fetchWriters();
  }, [showAll]); // Trigger when showAll changes

  const handleShowMoreWriters = () => setShowAll((prev) => !prev);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const writerdata = await axios.get(
          `http://localhost:5000/api/writer/${writerId}`
        );
        const writerName = writerdata.data.data.name;
        const { data } = await axios.get(
          `http://localhost:5000/api/writer/blogs/${writerName}?page=${currentPage}&limit=${articlesPerPage}`
        );

        if (data.totalBlogCount === 0) {
          setArticles([]);
          setTotalArticles(0);
        } else {
          setArticles(data.blogs);
          setTotalArticles(data.totalBlogCount);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, [writerId, currentPage]);

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  // Generate pagination buttons
  const generatePaginationButtons = () => {
    if (totalArticles <= articlesPerPage) return null; // Don't show buttons for 4 or fewer articles

    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page ? "bg-black text-white" : "bg-gray-300"
          }`}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  // Navigate to Article Details
  const handleArticleClick = useCallback(
    (id) => {
      navigate(`/blog/${id}`);
    },
    [navigate]
  );

  // Navigate to Article Details
  const handleWriterClick = useCallback(
    (id) => {
      navigate(`/writer/${id}`);
    },
    [navigate]
  );

  return (
    <div className="w-screen flex flex-col lg:flex-row lg:space-x-10 p-20">
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center w-screen mt-32 ">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
          <p className="ml-4 text-gray-500">Loading writer page...</p>
        </div>
      ) : (
        <>
          {/* Writer Details */}
          <div className="flex-1 mb-6 lg:mb-0">
            {writer && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={writer.imgSrc}
                    alt={writer.name}
                    className="w-56 h-56 mr-10 object-cover rounded-full shadow-md"
                  />
                  <div>
                    <h1 className="text-4xl font-bold mb-3">{writer.name}</h1>
                    {writer.degree?.length > 0 && (
                      <p className="text-gray-600 text-xl">
                        {writer.degree.join(", ")}
                      </p>
                    )}
                    <p className="text-gray-500">{writer.postCount} Posts</p>
                    <p className="text-gray-700">{writer.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Articles List */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">
                Articles by {writer?.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {totalArticles > 0 ? (
                  articles.map((article) => (
                    <div
                      key={article._id}
                      onClick={() => handleArticleClick(article._id)}
                      className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center cursor-pointer"
                    >
                      {article.imgSrc && (
                        <img
                          src={article.imgSrc}
                          alt={article.title}
                          className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                      )}
                      <h3 className="text-lg font-semibold">{article.title}</h3>
                    </div>
                  ))
                ) : (
                  // <h2>No articles written by {writer.name}</h2>
                  <p className="text-gray-600">No articlesc found for {writer?.name}.</p>
                )}
              </div>
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                  {generatePaginationButtons()}
                </div>
              )}
            </div>
          </div>

          {/* more writer list  */}
          <div className="lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">More Writers</h3>
            {moreWriters.map((writer) => (
              <div
                key={writer.id}
                onClick={() => handleWriterClick(writer._id)}
                className="flex items-center mb-4 p-3 border rounded-lg bg-white cursor-pointer"
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

            <button
              className="flex items-center space-x-2 font-bold border-2 border-slate-800 py-1 px-2 rounded-full"
              onClick={() => handleShowMoreWriters()}
            >
              <span>{showAll ? "Show less writers" : "Show all writers"}</span>
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
        </>
      )}
    </div>
  );
};

export default WriterDetailPage;
