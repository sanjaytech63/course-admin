import React from 'react';
import { FiLoader } from 'react-icons/fi';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  label?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'small', className = '', label = '' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24,
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-2">
        <FiLoader size={iconSizes[size]} className={`${sizes[size]} animate-spin text-current`} />
        <span className={`${className}`}>{label}</span>
      </div>
    </div>
  );
};

export default Loader;
