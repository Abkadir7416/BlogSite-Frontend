import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import BlogDetail from "./components/BlogDetail";
import About from "./components/About";
import Contact from "./components/Contact";
import UpdateBlog from "./components/UpdateBlog";
import Footer from "./components/Footer";

export default function App() {

  const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {!isLoggedIn ? (
              <Route path="/" element={<LandingPage />} />
            ) : (
              <Route path="/home" element={<Home />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* ================ */}
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/add-blog" element={<BlogForm />} />
            <Route path="/update-blog/:id" element={<UpdateBlog />} />
            <Route path="/about" element={<About />} /> {/* About Page */}
            <Route path="/contact" element={<Contact />} /> {/* Contact Page */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
