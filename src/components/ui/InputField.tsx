import React, { useState } from 'react';
import {
  BiCalendar,
  BiCreditCard,
  BiLock,
  BiMailSend,
  BiPhone,
  BiSearch,
  BiUser,
} from 'react-icons/bi';
import { BsEye, BsInfo } from 'react-icons/bs';
import { FiEyeOff } from 'react-icons/fi';
import { MdFileUpload } from 'react-icons/md';

export interface InputProps {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'file'
    | 'credit-card';
  placeholder?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  accept?: string;
  helperText?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

const InputField: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  label,
  required = false,
  className = '',
  name,
  id,
  accept,
  helperText,
  icon,
  variant = 'default',
  size = 'md',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'email':
        return <BiMailSend className="text-gray-400" />;
      case 'password':
        return <BiLock className="text-gray-400" />;
      case 'search':
        return <BiSearch className="text-gray-400" />;
      case 'tel':
        return <BiPhone className="text-gray-400" />;
      case 'date':
        return <BiCalendar className="text-gray-400" />;
      case 'credit-card':
        return <BiCreditCard className="text-gray-400" />;
      case 'file':
        return <MdFileUpload className="text-gray-700" />;
      default:
        return <BiUser className="text-gray-400" />;
    }
  };

  const getInputType = () => {
    if (type === 'password' && showPassword) return 'text';
    return type;
  };

  const variants = {
    default: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
    filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500',
    outlined: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm',
  };

  const sizes = {
    sm: 'py-2 text-sm',
    md: 'py-2.5',
    lg: 'py-3 text-lg',
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-md">
        {(icon || type !== 'text') && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getIcon()}
          </div>
        )}

        <input
          type={getInputType()}
          id={inputId}
          name={name}
          accept={accept || 'image*'}
          value={type === 'file' ? undefined : value}
          onChange={e => {
            if (type === 'file') {
              onChange?.('', e);
            } else {
              onChange?.(e.target.value, e);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            block w-full rounded-md
            ${sizes[size]}
            ${icon || type !== 'text' ? 'pl-10' : 'pl-3'}
            ${type === 'password' ? 'pr-10' : 'pr-3'}
         placeholder-gray-400 focus:outline-none border focus:border-indigo-500  transition-colors duration-300
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : variants[variant]}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          `}
        />

        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <BsEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-1 flex items-center">
          <BsInfo className="h-4 w-4 text-red-500 mr-1" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

export default InputField;
