// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// // import Blogs from "./components/Blogs";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
// import BlogList from "./components/BlogList";
// import BlogForm from "./components/BlogForm";
// import Home from "./components/Home";
// import BlogDetail from "./components/BlogDetail";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import UpdateBlog from "./components/UpdateBlog";

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/blogs" element={<BlogList />} />
//         <Route path="/blog/:id" element={<BlogDetail  />} />
//         <Route path="/add-blog" element={<BlogForm />} />
//         <Route path="/update-blog/:id" element={<UpdateBlog />} />
//         <Route path="/about" element={<About />} />     {/* About Page */}
//         <Route path="/contact" element={<Contact />} /> {/* Contact Page */}
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }


import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Home from "./components/Home";
import BlogDetail from "./components/BlogDetail";
import About from "./components/About";
import Contact from "./components/Contact";
import UpdateBlog from "./components/UpdateBlog";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/add-blog" element={<BlogForm />} />
            <Route path="/update-blog/:id" element={<UpdateBlog />} />
            <Route path="/about" element={<About />} />     {/* About Page */}
            <Route path="/contact" element={<Contact />} /> {/* Contact Page */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
