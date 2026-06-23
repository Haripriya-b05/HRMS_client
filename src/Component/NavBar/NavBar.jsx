import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          MyApp
        </div>

        

        {/* Buttons */}
        <div className="flex items-center gap-4">
        <Link to="/login">
          <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition">
            Login
          </button>
          </Link>

          <Link to="/signup">

          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition">
            Sign Up
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;