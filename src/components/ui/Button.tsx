import React from "react";
import Loader from "./Loader";

interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "small" | "medium" | "large" | "xlarge";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  onClick,
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-md transition-all duration-300  cursor-pointer flex items-center justify-center";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform",
    secondary: "bg-white 0 text-gray-700 ",
    outline: "border border-gray-300 text-gray-500 hover:bg-gray-100 ",
    ghost: "text-gray-700 hover:text-blue-600 hover:bg-gray-100",
    danger: "text-white  bg-red-600  hover:bg-red-700 ",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-5 py-2.5 text-sm",
    large: "px-6 py-3 text-base",
    xlarge: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || isLoading ? "opacity-70 cursor-not-allowed" : ""}
        ${isLoading ? "pointer-events-none" : ""}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <Loader label="Loading..." />
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;
