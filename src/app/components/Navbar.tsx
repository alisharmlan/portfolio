// components/Navbar.js
import React, { useState } from 'react'; // Import useState
import Link from 'next/link'; // Import Link

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Initialize state for menu

  const toggleMenu = () => {
    console.log("Toggling");
    
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  return (
    <nav className="bg-[#B23A48] p-4">
      <div className="container mx-auto flex items-center justify-between"style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Show menu button on small screens */}
        <div className="md:hidden">
          <button
            className="text-white"
            onClick={toggleMenu} // Call toggleMenu function on button click
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="relative ml-4">
        <input
          type="text"
          className="bg-white rounded-full px-4 py-2 focus:outline-none"
          placeholder="Search..."
        />
        <button className="absolute right-0 top-0 mt-1 mr-1 px-4 py-1 bg-purple-200 rounded-full text-black hover:bg-pink-300">
          Search
        </button>
      </div>
        {/* Show menu items on medium and larger screens */}
        <div className={`md:flex flex-col md:flex-row space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <Link href="/products">
            Products
          </Link>
          <Link href="/about">
            About
          </Link>
          <Link href="/contact">
            Contacts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
