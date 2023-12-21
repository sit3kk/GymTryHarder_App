import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <a href="#" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">MyApp</span>
              </a>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Home</a>
              <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Services</a>
              <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">About</a>
              <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Contact Us</a>
            </div>
          </div>
          {/* Secondary Navbar items */}
          <div className="flex items-center space-x-3">
            <Link to="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">Login</Link>
            <Link to="/register" className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Sign Up</Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg className=" w-6 h-6 text-gray-500 hover:text-blue-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="hidden mobile-menu">
        <ul className="">
          <li><a href="home.html" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">Home</a></li>
          <li><a href="#services" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">Services</a></li>
          <li><a href="#about" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">About</a></li>
          <li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">Contact Us</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
