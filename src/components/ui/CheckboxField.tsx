import React from 'react';

export interface CheckboxFieldProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
    labelClassName?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
    label,
    checked,
    onChange,
    name,
    disabled = false,
    required = false,
    error,
    helperText,
    className = '',
    labelClassName = '',
    size = 'md',
    variant = 'default',
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };

    const variantClasses = {
        default: {
            checked: 'text-blue-600 border-gray-300 focus:ring-blue-500',
            unchecked: 'border-gray-300 focus:ring-blue-500',
        },
        primary: {
            checked: 'text-blue-600 border-gray-300 focus:ring-blue-500',
            unchecked: 'border-gray-300 focus:ring-blue-500',
        },
        success: {
            checked: 'text-green-600 border-gray-300 focus:ring-green-500',
            unchecked: 'border-gray-300 focus:ring-green-500',
        },
        warning: {
            checked: 'text-yellow-600 border-gray-300 focus:ring-yellow-500',
            unchecked: 'border-gray-300 focus:ring-yellow-500',
        },
        error: {
            checked: 'text-red-600 border-gray-300 focus:ring-red-500',
            unchecked: 'border-gray-300 focus:ring-red-500',
        },
    };

    const labelSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    name={name}
                    disabled={disabled}
                    required={required}
                    className={`
            rounded border-2 focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors duration-200
            ${sizeClasses[size]}
            ${checked
                            ? variantClasses[variant].checked
                            : variantClasses[variant].unchecked
                        }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${error ? 'border-red-500' : ''}
          `}
                />

                <label
                    className={`
            ml-3 font-medium text-gray-700 select-none
            ${labelSizeClasses[size]}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${labelClassName}
          `}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}

            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
};

export default CheckboxField;