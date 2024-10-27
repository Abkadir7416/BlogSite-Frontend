// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-slate-900 text-white py-5 mt-12 bottom-0">
//       <div className="container mx-auto text-center">
//         <p className="">
//           &copy; {new Date().getFullYear()} BlogSite. All Rights Reserved.
//         </p>
//         <div className="flex justify-center space-x-6 mt-4">
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
//             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
//             </svg>
//           </a>
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
//             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.62h3.128V8.411c0-3.1 1.892-4.788 4.655-4.788 1.324 0 2.462.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.62h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.324V1.325C24 .595 23.405 0 22.675 0z" />
//             </svg>
//           </a>
//           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
//             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.1-.9-2-2-2s-2 .9-2 2v5.5h-3v-10h3v1.35c.74-.91 1.87-1.35 3.02-1.35 2.21 0 4 1.79 4 4v6z" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


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
