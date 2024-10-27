import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-5">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} BlogSite. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            {/* Twitter SVG */}
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            {/* Facebook SVG */}
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            {/* LinkedIn SVG */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
