import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">
          BlogSite
        </a>
        <div className="block lg:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
          <ul className="lg:flex lg:justify-end">
            <li className="text-white lg:ml-4">
              <a href="/" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
                Home
              </a>
            </li>
            <li className="text-white lg:ml-4">
              <a href="/blogs" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
                Blogs
              </a>
            </li>
            <li className="text-white lg:ml-4">
              <a href="/about" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
                About
              </a>
            </li>
            <li className="text-white lg:ml-4">
              <a href="/contact" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 rounded hover:bg-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
