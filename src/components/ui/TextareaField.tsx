import React from "react";
import { BsInfo } from "react-icons/bs";

export interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  rows?: number;
  className?: string;
  name?: string;
  id?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
}

const TextareaField: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  helperText,
  rows = 4,
  className = "",
  name,
  id,
  variant = "default",
  size = "md",
}) => {
  const textareaId =
    id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const variants = {
    default: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
    filled:
      "bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500",
    outlined:
      "border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm",
  };

  const sizes = {
    sm: "py-2 text-sm",
    md: "py-2.5 text-base",
    lg: "py-3 text-lg",
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange?.(e.target.value, e)}
        className={`
          block w-full rounded-md border 
          ${sizes[size]}
          px-3 placeholder-gray-400 focus:outline-none transition-colors duration-300
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : variants[variant]}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
      />

      {error && (
        <div className="mt-1 flex items-center">
          <BsInfo className="h-4 w-4 text-red-500 mr-1" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default TextareaField;
