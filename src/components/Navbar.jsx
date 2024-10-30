// import React, { useState } from 'react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-slate-900 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <a href="/" className="text-white text-2xl font-bold">
//           BlogSite
//         </a>
//         <div className="block lg:hidden">
//           <button 
//             onClick={toggleMenu} 
//             className="text-white focus:outline-none">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//             </svg>
//           </button>
//         </div>
//         <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
//           <ul className="lg:flex lg:justify-end">
//             <li className="text-white lg:ml-4">
//               <a href="/home" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
//                 Home
//               </a>
//             </li>
//             <li className="text-white lg:ml-4">
//               <a href="/blogs" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
//                 Blogs
//               </a>
//             </li>
//             <li className="text-white lg:ml-4">
//               <a href="/about" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
//                 About
//               </a>
//             </li>
//             <li className="text-white lg:ml-4">
//               <a href="/contact" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <nav className="bg-slate-900 p-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-white text-2xl font-bold">
//           BlogSite
//         </Link>
//         <div>
//           {token ? (
//             <div className="flex space-x-4">
//               <Link to="/home" className="text-white hover:text-gray-200">
//                 Home
//               </Link>
//               <Link to="/blogs" className="text-white hover:text-gray-200">
//                 Blogs
//               </Link>
//               <Link to="/about" className="text-white hover:text-gray-200">
//                 About
//               </Link>
//               <Link to="/contact" className="text-white hover:text-gray-200">
//                 Contact
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="text-white hover:text-gray-200"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex space-x-4">
//               <Link to="/login" className="text-white hover:text-gray-200">
//                 Login
//               </Link>
//               <Link to="/register" className="text-white hover:text-gray-200">
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// ===============================================

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";


const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to landing page on logout
    toast.success('Logged out!!')
  };

  return (
        <nav className="bg-slate-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          BlogSite
        </Link>
        <div>
          {isLoggedIn ? (
            <div className="flex space-x-4">
              <Link to="/home" className="text-white hover:text-gray-200">
                Home
              </Link>
              <Link to="/blogs" className="text-white hover:text-gray-200">
                Blogs
              </Link>
              <Link to="/about" className="text-white hover:text-gray-200">
                About
              </Link>
              <Link to="/contact" className="text-white hover:text-gray-200">
                Contact
              </Link>
              <button onClick={handleLogout} className="text-white hover:text-gray-200">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-200">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
