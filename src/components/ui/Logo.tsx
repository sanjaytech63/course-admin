import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 group" aria-label="Home">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center   duration-300">
        <span className="text-white font-bold text-xl sm:text-2xl">S</span>
      </div>
      <span className="text-lg sm:text-xl uppercase font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text flex">
        Sanjay
      </span>
    </Link>
  );
};

export default Logo;
