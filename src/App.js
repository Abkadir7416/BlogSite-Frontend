import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlogList from "./components/BlogList";
import About from  "./components/About";
import Contact from  "./components/Contact";
import BlogDetail from "./components/BlogDetail";
import UpdateBlog from "./components/UpdateBlog";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogForm from "./components/BlogForm";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Redirect routes based on isLoggedIn value */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-blog" element={<BlogForm />} />
              <Route path="/home" element={<Home />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/update-blog/:id" element={<UpdateBlog />} />
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
          </div>
          <Footer />
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}
