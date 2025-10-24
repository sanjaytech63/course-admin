import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Button from './Button';

interface ErrorProps {
    error: string;
    onRetry?: () => void;
    retryText?: string;
    className?: string;
    fullScreen?: boolean;
}

export const ErrorState: React.FC<ErrorProps> = ({
    error,
    onRetry,
    retryText = 'Retry',
    className = '',
    fullScreen = false
}) => {
    const containerClass = fullScreen
        ? 'flex justify-center items-center min-h-screen'
        : 'flex justify-center items-center h-64';

    return (
        <div className={`${containerClass} ${className}`}>
            <div className="text-center max-w-md mx-auto">
                <FiAlertTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-red-800 mb-2">Something went wrong</h3>
                <p className="text-red-600 text-sm mb-4">{error}</p>
                {onRetry && (
                    <div className='flex items-center justify-center'>
                        <Button
                            onClick={onRetry}
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50"
                        >
                            {retryText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};