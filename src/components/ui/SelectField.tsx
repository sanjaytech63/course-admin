import React from 'react';
import { BsInfo } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';

export interface SelectFieldProps {
    label?: string;
    name?: string;
    id?: string;
    value?: string;
    onChange?: (value: string, e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    disabled?: boolean;
    required?: boolean;
    error?: string;
    helperText?: string;
    placeholder?: string;
    className?: string;
    variant?: 'default' | 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    id,
    value,
    onChange,
    options,
    disabled = false,
    required = false,
    error,
    helperText,
    placeholder = 'Select option',
    className = '',
    variant = 'default',
    size = 'md',
}) => {
    const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`;

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
                <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative rounded-md">
                <select
                    id={selectId}
                    name={name}
                    value={value}
                    disabled={disabled}
                    required={required}
                    onChange={(e) => onChange?.(e.target.value, e)}
                    className={`
                    block w-full rounded-md appearance-none
                    ${sizes[size]}
                    pl-3 pr-10
                    placeholder-gray-400 focus:outline-none border transition-colors duration-300
                    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : variants[variant]}
                    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                `}
                >
                    {placeholder && (
                        <option value="" disabled hidden>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <BiChevronDown className="text-gray-400 w-5 h-5" />
                </div>
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

export default SelectField;
