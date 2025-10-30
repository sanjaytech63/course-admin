import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" aria-label="Home" className="flex items-center">
      <img
        src="/logo.svg"
        alt="Mentorly Logo"
        className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-auto object-contain select-none"
        loading="lazy"
      />
    </Link>
  );
};

export default Logo;
